/**
 * LLM Chess Engine for ChessLM
 */

import { LLMModel, AIThought } from '@/types/chess'

export class LLMChessEngine {
  private model: LLMModel
  private apiKey: string

  constructor(model: LLMModel) {
    this.model = model
    this.apiKey = this.getApiKey()
    
    // Validate Azure configuration on initialization
    if (model.provider === 'openai' && process.env.AZURE_OPENAI_ENDPOINT) {
      this.validateAzureConfig()
    }
  }
  
  private validateAzureConfig(): void {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT
    const apiKey = process.env.AZURE_OPENAI_API_KEY
    const deploymentName = this.model.azureDeploymentName || this.model.id
    
    const issues: string[] = []
    
    if (!endpoint) {
      issues.push('AZURE_OPENAI_ENDPOINT is not set')
    } else if (!endpoint.includes('openai.azure.com') && !endpoint.includes('cognitiveservices.azure.com')) {
      issues.push(`AZURE_OPENAI_ENDPOINT format may be incorrect: ${endpoint}`)
    }
    
    if (!apiKey) {
      issues.push('AZURE_OPENAI_API_KEY is not set')
    }
    
    if (!deploymentName) {
      issues.push('No deployment name configured for this model')
    }
    
    if (issues.length > 0) {
      console.warn('Azure OpenAI configuration issues:', issues)
    }
  }

  private getApiKey(): string {
    switch (this.model.provider) {
      case 'openai':
        // For Azure OpenAI, use AZURE_OPENAI_API_KEY if available, otherwise OPENAI_API_KEY
        const azureKey = process.env.AZURE_OPENAI_API_KEY
        const openaiKey = process.env.OPENAI_API_KEY
        
        if (process.env.AZURE_OPENAI_ENDPOINT && azureKey) {
          return azureKey
        } else if (openaiKey) {
          return openaiKey
        }
        
        throw new Error('Missing API key: Please set AZURE_OPENAI_API_KEY or OPENAI_API_KEY in your environment variables')
        
      case 'anthropic':
        const anthropicKey = process.env.ANTHROPIC_API_KEY
        if (!anthropicKey) {
          throw new Error('Missing API key: Please set ANTHROPIC_API_KEY in your environment variables')
        }
        return anthropicKey
        
      case 'replicate':
        const replicateKey = process.env.REPLICATE_API_TOKEN
        if (!replicateKey) {
          throw new Error('Missing API key: Please set REPLICATE_API_TOKEN in your environment variables')
        }
        return replicateKey
        
      default:
        throw new Error(`Unknown provider: ${this.model.provider}`)
    }
  }

  async generateMove(fen: string, pgn: string): Promise<AIThought> {
    const prompt = this.createChessPrompt(fen, pgn)
    
    try {
      const response = await this.callLLM(prompt)
      return this.parseResponse(response)
    } catch (error) {
      console.error('Error generating move:', error)
      throw error
    }
  }

  private createChessPrompt(fen: string, pgn: string): string {
    // Parse FEN to determine whose turn it is
    const fenParts = fen.split(' ')
    const activePlayer = fenParts[1] // 'w' for white, 'b' for black
    const playerToMove = activePlayer === 'w' ? 'White' : 'Black'
    
    return `You are a skilled chess player. Analyze the current position and make the best move for ${playerToMove}.

Current position (FEN): ${fen}
Game moves (PGN): ${pgn}

It is ${playerToMove}'s turn to move. You must make a legal move for ${playerToMove} pieces only.

Please respond in the following JSON format:
{
  "move": "e2e4",
  "reasoning": "Your reasoning for this move",
  "evaluation": 0.5,
  "depth": 3
}

IMPORTANT: Move format requirements:
- Use UCI notation for moves (e.g., "e2e4", "g1f3", "e7e8q" for promotion)
- UCI format is: source_square + destination_square + promotion_piece_if_any
- Examples: "e2e4" (pawn move), "b1c3" (knight move), "e7e8q" (pawn promotes to queen)
- DO NOT use algebraic notation like "e4", "Nf3", "exd5" - these will cause errors
- Evaluation should be between -1 (black advantage) and 1 (white advantage)
- Provide clear reasoning for your move choice
- Depth represents how many moves ahead you calculated`
  }

  private async callLLM(prompt: string): Promise<string> {
    switch (this.model.provider) {
      case 'openai':
        return this.callOpenAI(prompt)
      case 'anthropic':
        return this.callAnthropic(prompt)
      case 'replicate':
        return this.callReplicate(prompt)
      default:
        throw new Error(`Unsupported provider: ${this.model.provider}`)
    }
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT
    
    // Check if we're using Azure OpenAI (endpoint is configured) or standard OpenAI
    const isAzure = azureEndpoint && azureEndpoint.trim() !== ''
    
    if (isAzure) {
      // Try deployment-specific configurations
      const deploymentOptions = [
        { 
          name: this.model.azureDeploymentName || this.model.id,
          apiVersion: this.model.azureApiVersion || '2024-02-15-preview'
        },
        { name: 'o4-mini', apiVersion: '2025-01-01-preview' },
        { name: 'gpt-4o-mini', apiVersion: '2024-02-15-preview' },
        { name: 'gpt-35-turbo', apiVersion: '2024-02-15-preview' }, 
        { name: 'gpt-4', apiVersion: '2024-02-15-preview' }
      ]
      
      for (const option of deploymentOptions) {
        try {
          const result = await this.tryAzureDeployment(prompt, option.name, option.apiVersion)
          return result
        } catch (error) {
          console.log(`Failed with deployment ${option.name}: ${(error as Error).message}`)
          continue
        }
      }
      
      throw new Error('All Azure OpenAI deployment attempts failed')
    } else {
      return this.callStandardOpenAI(prompt)
    }
  }
  
  private async tryAzureDeployment(prompt: string, deploymentName: string, apiVersion?: string): Promise<string> {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT?.replace(/\/$/, '')
    // Use provided API version or fall back to model's configured version or default
    const useApiVersion = apiVersion || this.model.azureApiVersion || '2024-02-15-preview'
    const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${useApiVersion}`
    
    console.log(`Trying Azure OpenAI - Deployment: ${deploymentName}, API Version: ${useApiVersion}`)
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'api-key': this.apiKey
    }
    
    const requestBody = {
      messages: [
        {
          role: 'system',
          content: 'You are a chess expert that provides moves in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_completion_tokens: 1000,
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Azure OpenAI API error (${response.status}): ${errorText}`)
    }
    
    const data = await response.json()
    
    if (!data?.choices?.[0]?.message?.content) {
      throw new Error(`Empty response from deployment ${deploymentName}`)
    }
    
    console.log(`Success with deployment: ${deploymentName}`)
    return data.choices[0].message.content
  }
  
  private async callStandardOpenAI(prompt: string): Promise<string> {
    console.log(`Using standard OpenAI API with model: ${this.model.id}`)
    
    const url = 'https://api.openai.com/v1/chat/completions'
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    }
    
    const requestBody = {
      model: this.model.id,
      messages: [
        {
          role: 'system',
          content: 'You are a chess expert that provides moves in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 500,
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenAI API error: ${response.statusText} - ${errorText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  }

  private async callAnthropic(prompt: string): Promise<string> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model.id,
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.content[0].text
  }

  private async callReplicate(prompt: string): Promise<string> {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: this.getReplicateVersion(),
        input: {
          prompt: prompt,
          max_new_tokens: 1000,
          temperature: 0.7,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`)
    }

    const prediction = await response.json()
    
    // Poll for completion
    let result = prediction
    while (result.status !== 'succeeded' && result.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const pollResponse = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
        },
      })
      result = await pollResponse.json()
    }

    if (result.status === 'failed') {
      throw new Error(`Replicate prediction failed: ${result.error}`)
    }

    return result.output.join('')
  }

  private getReplicateVersion(): string {
    // These would need to be updated with actual Replicate model versions
    const versionMap: Record<string, string> = {
      'llama-2-70b-chat': 'meta/llama-2-70b-chat:latest',
      'llama-2-13b-chat': 'meta/llama-2-13b-chat:latest',
      'llama-2-7b-chat': 'meta/llama-2-7b-chat:latest',
    }
    return versionMap[this.model.id] || 'meta/llama-2-70b-chat:latest'
  }

  private parseResponse(response: string): AIThought {
    try {
      if (!response?.trim()) {
        throw new Error('Empty response')
      }
      
      // Extract JSON from markdown code blocks or direct JSON
      let jsonText = response
      const markdownMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
      if (markdownMatch) {
        jsonText = markdownMatch[1].trim()
      } else {
        const jsonMatch = response.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          jsonText = jsonMatch[0]
        }
      }

      const parsed = JSON.parse(jsonText)
      
      return {
        move: parsed.move || '',
        reasoning: parsed.reasoning || 'No reasoning provided',
        evaluation: parsed.evaluation || 0,
        depth: parsed.depth || 1,
        alternatives: parsed.alternatives || [],
        timestamp: Date.now(),
      }
    } catch (error) {
      // Fallback parsing - extract move from text
      const moveMatch = response.match(/([a-h][1-8][a-h][1-8])/i)
      return {
        move: moveMatch ? moveMatch[1] : '',
        reasoning: 'Failed to parse response',
        evaluation: 0,
        depth: 1,
        alternatives: [],
        timestamp: Date.now(),
      }
    }
  }
}
