import { useCallback } from 'react'
import { useGameStore } from '@/lib/store'
import { LLMModel, AIThought, GameAnalysis } from '@/types/chess'

export function useAIEngine() {
  const { gameState, config, addAnalysis, setThinking, makeMove, getGameState } = useGameStore()

  const callAIAPI = useCallback(async (model: LLMModel, fen: string, pgn: string): Promise<AIThought | null> => {
    try {
      const response = await fetch('/api/ai-move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: model.id,
          fen,
          pgn
        })
      })

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.thought
    } catch (error) {
      console.error('AI API call failed:', error)
      return null
    }
  }, [])

  const generateAIMove = useCallback(async (model: LLMModel) => {
    if (!config) return

    setThinking(true)
    
    try {
      // Get the current game state before making the API call
      const currentGameState = getGameState()
      
      // Call the actual LLM API
      const thought = await callAIAPI(model, currentGameState.fen, currentGameState.pgn)
      
      if (!thought || !thought.move) {
        console.error('No valid move returned from AI')
        setThinking(false)
        return
      }

      // Parse UCI move format (e.g., "e2e4", "e7e8q")
      const moveString = thought.move.toLowerCase()
      
      // Validate move format
      if (moveString.length < 4 || moveString.length > 5) {
        console.error('Invalid move format from AI:', moveString)
        setThinking(false)
        return
      }

      const from = moveString.slice(0, 2)
      const to = moveString.slice(2, 4)
      const promotion = moveString.length === 5 ? moveString[4] : undefined

      console.log('AI suggested move:', { from, to, promotion, original: moveString })

      // Attempt to make the move
      const moveObj: { from: string; to: string; promotion?: string } = { from, to }
      if (promotion) {
        moveObj.promotion = promotion
      }
      const moveResult = makeMove(moveObj)

      if (moveResult) {
        // Get the updated game state after the move
        const updatedGameState = getGameState()
        
        // Create analysis record with the actual move that was made
        const analysis: GameAnalysis = {
          move: {
            from,
            to,
            promotion,
            san: moveString, // We'll use the UCI notation for now
            fen: updatedGameState.fen, // Use the updated FEN
            timestamp: Date.now()
          },
          thought,
          playerType: 'ai',
          model
        }

        addAnalysis(analysis)
        console.log('AI move successfully made:', moveString)
      } else {
        console.error('Failed to make AI move - invalid or illegal move:', moveString)
        console.error('Current FEN:', currentGameState.fen)
        console.error('AI thought:', thought)
      }

    } catch (error) {
      console.error('AI move generation failed:', error)
    } finally {
      setThinking(false)
    }
  }, [config, gameState, addAnalysis, setThinking, makeMove, callAIAPI])

  return {
    generateAIMove,
    callAIAPI
  }
}
