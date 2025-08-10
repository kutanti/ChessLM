'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { GameModeSelector } from '@/components/GameModeSelector'
import { MoveHistory } from '@/components/MoveHistory'
import { useGameStore } from '@/lib/store'

export function GameSidebar() {
  const { config, gameState } = useGameStore()

  return (
    <div className="space-y-4">
      <GameModeSelector />
      
      {config && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Game Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Mode:</span>
                <span className="text-sm font-medium">{config.mode.replace('-', ' vs ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">White:</span>
                <span className="text-sm font-medium">
                  {config.whitePlayer.type === 'ai' 
                    ? config.whitePlayer.model?.name || 'AI' 
                    : 'Human'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Black:</span>
                <span className="text-sm font-medium">
                  {config.blackPlayer.type === 'ai' 
                    ? config.blackPlayer.model?.name || 'AI' 
                    : 'Human'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Moves:</span>
                <span className="text-sm font-medium">{gameState.moves.length}</span>
              </div>
            </CardContent>
          </Card>

          <MoveHistory />
        </>
      )}
    </div>
  )
}
