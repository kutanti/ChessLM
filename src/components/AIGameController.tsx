'use client'

import React, { useEffect, useRef } from 'react'
import { useGameStore } from '@/lib/store'
import { useAIEngine } from '@/hooks/useAIEngine'

export function AIGameController() {
  const { config, gameState, isThinking } = useGameStore()
  const { generateAIMove } = useAIEngine()
  const lastMoveRef = useRef<number>(0)

  useEffect(() => {
    if (!config || gameState.isGameOver || isThinking) return

    const currentPlayerConfig = gameState.currentPlayer === 'white' 
      ? config.whitePlayer 
      : config.blackPlayer

    // If it's an AI's turn, generate a move
    if (currentPlayerConfig.type === 'ai' && currentPlayerConfig.model) {
      // Prevent rapid-fire AI moves by checking timestamp
      const currentTime = Date.now()
      if (currentTime - lastMoveRef.current < 500) { // Reduced from 2000ms to 500ms
        console.log('Throttling AI move generation to prevent rapid-fire moves')
        return
      }

      console.log(`AI turn detected for ${gameState.currentPlayer} player using model ${currentPlayerConfig.model.name}`)
      
      const timer = setTimeout(() => {
        lastMoveRef.current = Date.now() // Set timestamp when actually generating the move
        generateAIMove(currentPlayerConfig.model!)
      }, 1000) // Small delay to show the thinking state

      return () => clearTimeout(timer)
    }
  }, [config, gameState.currentPlayer, gameState.isGameOver, gameState.fen, isThinking, generateAIMove])

  // This component doesn't render anything, it just handles AI logic
  return null
}

export default AIGameController
