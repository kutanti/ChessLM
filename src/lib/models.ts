import { LLMModel, LLMProvider } from '@/types/chess'

export const LLM_MODELS: LLMModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'openai',
    description: 'Latest and most capable GPT model with strong reasoning',
    strength: 9,
    azureDeploymentName: 'gpt-4o',
    azureApiVersion: '2025-01-01-preview'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'openai',
    description: 'Smaller, faster, and more cost-effective GPT-4o',
    strength: 8,
    azureDeploymentName: 'gpt-4o-mini',
    azureApiVersion: '2025-01-01-preview'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'openai',
    description: 'Previous generation GPT-4 Turbo',
    strength: 8,
    azureDeploymentName: 'gpt-4-turbo',
    azureApiVersion: '2025-01-01-preview'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'openai',
    description: 'Fast and capable model for most tasks',
    strength: 7,
    azureDeploymentName: 'gpt-turbo',
    azureApiVersion: '2025-01-01-preview'
  },
  {
    id: 'o4-mini',
    name: 'o4-mini',
    provider: 'openai',
    description: 'Fast and capable model for most tasks',
    strength: 7,
    azureDeploymentName: 'o4-mini',
    azureApiVersion: '2025-01-01-preview'
  },

  // Anthropic Models
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'anthropic',
    description: 'Most powerful Claude model with excellent reasoning',
    strength: 9
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'anthropic',
    description: 'Balanced performance and speed',
    strength: 8
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'anthropic',
    description: 'Fast and efficient Claude model',
    strength: 7
  },
  
  // Replicate Models (Llama)
  {
    id: 'llama-2-70b-chat',
    name: 'Llama 2 70B Chat',
    provider: 'replicate',
    description: 'Large open-source model with strong performance',
    strength: 8
  },
  {
    id: 'llama-2-13b-chat',
    name: 'Llama 2 13B Chat',
    provider: 'replicate',
    description: 'Medium-sized open-source model',
    strength: 6
  },
  {
    id: 'llama-2-7b-chat',
    name: 'Llama 2 7B Chat',
    provider: 'replicate',
    description: 'Smaller, faster open-source model',
    strength: 5
  }
]

export const getModelsByProvider = (provider: LLMProvider): LLMModel[] => {
  return LLM_MODELS.filter(model => model.provider === provider)
}

export const getModelById = (id: string): LLMModel | undefined => {
  return LLM_MODELS.find(model => model.id === id)
}

export const getDefaultModel = (): LLMModel => {
  return LLM_MODELS.find(model => model.id === 'gpt-3.5-turbo') || LLM_MODELS[0]
}
