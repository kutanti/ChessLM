'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useGameStore } from '@/lib/store'
import { Brain, Clock, Target } from 'lucide-react'

export function AIAnalysis() {
  const { analysis, isThinking } = useGameStore()

  const latestAnalysis = analysis.length > 0 ? analysis[analysis.length - 1] : null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isThinking ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
              <div className="spinner"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                AI is thinking...
              </span>
            </div>
          </div>
        ) : latestAnalysis ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={latestAnalysis.playerType === 'ai' ? 'default' : 'secondary'}>
                {latestAnalysis.playerType === 'ai' 
                  ? latestAnalysis.model?.name || 'AI' 
                  : 'Human'
                }
              </Badge>
              <div className="flex items-center space-x-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                <span>Depth: {latestAnalysis.thought.depth}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-mono text-sm">{latestAnalysis.thought.move}</span>
                <div className={`px-2 py-1 rounded text-xs ${
                  latestAnalysis.thought.evaluation > 0 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : latestAnalysis.thought.evaluation < 0
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {latestAnalysis.thought.evaluation > 0 ? '+' : ''}{latestAnalysis.thought.evaluation.toFixed(2)}
                </div>
              </div>
              
              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {latestAnalysis.thought.reasoning}
              </div>
            </div>

            {latestAnalysis.thought.alternatives.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <h4 className="text-sm font-medium mb-2">Alternative moves:</h4>
                <div className="space-y-1">
                  {latestAnalysis.thought.alternatives.slice(0, 2).map((alt, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="font-mono">{alt.move}</span>
                      <div className={`px-1 py-0.5 rounded text-xs ${
                        alt.evaluation > 0 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : alt.evaluation < 0
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
                      }`}>
                        {alt.evaluation > 0 ? '+' : ''}{alt.evaluation.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-600 dark:text-slate-400">
              AI analysis will appear here during gameplay
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
