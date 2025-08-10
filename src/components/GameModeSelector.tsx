'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { useGameStore } from '@/lib/store'
import { LLM_MODELS, getModelById } from '@/lib/models'
import { GameMode, GameConfig, LLMModel } from '@/types/chess'

export function GameModeSelector() {
  const { initializeGame, config } = useGameStore()
  
  const [mode, setMode] = useState<GameMode>('human-vs-ai')
  const [whiteModel, setWhiteModel] = useState<string>(LLM_MODELS[0].id)
  const [blackModel, setBlackModel] = useState<string>(LLM_MODELS[1].id)

  const handleStartGame = () => {
    const newConfig: GameConfig = {
      mode,
      whitePlayer: {
        type: mode === 'ai-vs-ai' ? 'ai' : 'human',
        model: mode === 'ai-vs-ai' ? getModelById(whiteModel) : undefined
      },
      blackPlayer: {
        type: 'ai',
        model: getModelById(blackModel)
      }
    }

    initializeGame(newConfig)
  }

  const isGameActive = config !== null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Game Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Game Mode</label>
          <Select value={mode} onValueChange={(value) => setMode(value as GameMode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="human-vs-ai">Human vs AI</SelectItem>
              <SelectItem value="ai-vs-ai">AI vs AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(mode === 'ai-vs-ai') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">White Player (AI)</label>
            <Select value={whiteModel} onValueChange={setWhiteModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LLM_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} ({model.provider})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {(mode === 'human-vs-ai' || mode === 'ai-vs-ai') && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {mode === 'ai-vs-ai' ? 'Black Player (AI)' : 'AI Opponent'}
            </label>
            <Select value={blackModel} onValueChange={setBlackModel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LLM_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} ({model.provider}) - Strength: {model.strength}/10
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button 
          onClick={handleStartGame} 
          className="w-full"
          variant={isGameActive ? "outline" : "default"}
        >
          {isGameActive ? 'New Game' : 'Start Game'}
        </Button>

        {isGameActive && (
          <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
            Game in progress. Click "New Game" to restart.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
