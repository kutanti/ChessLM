'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useGameStore } from '@/lib/store'
import { formatTimestamp } from '@/lib/utils'

export function MoveHistory() {
  const { gameState } = useGameStore()

  if (gameState.moves.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Move History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-4">
            No moves yet. Start playing!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Move History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
          {gameState.moves.map((move, index) => {
            const moveNumber = Math.floor(index / 2) + 1
            const isWhiteMove = index % 2 === 0
            
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  {isWhiteMove && (
                    <span className="text-slate-500 font-medium w-6">
                      {moveNumber}.
                    </span>
                  )}
                  <span className={`font-mono ${isWhiteMove ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                    {move.san}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${isWhiteMove ? 'bg-white border border-slate-300' : 'bg-slate-800 dark:bg-slate-200'}`}></span>
                </div>
                <span className="text-xs text-slate-500">
                  {formatTimestamp(move.timestamp)}
                </span>
              </div>
            )
          })}
        </div>
        
        <div className="mt-4 pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-600 dark:text-slate-400 text-center">
            {gameState.moves.length} moves played
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
