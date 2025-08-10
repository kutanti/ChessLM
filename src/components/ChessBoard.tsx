'use client'

import React, { useState, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import { useGameStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface Square {
  square: string
  piece?: string
}

export function ChessBoard() {
  const { 
    chess, 
    gameState, 
    makeMove, 
    getPossibleMoves, 
    isThinking,
    config 
  } = useGameStore()
  
  const [moveFrom, setMoveFrom] = useState<string>('')
  const [possibleMoves, setPossibleMoves] = useState<string[]>([])
  const [optionSquares, setOptionSquares] = useState({})

  const safeGameMutate = useCallback((modify: () => void) => {
    try {
      modify()
      return true
    } catch (error) {
      console.error('Game mutation error:', error)
      return false
    }
  }, [])

  const getMoveOptions = useCallback((square: string) => {
    const moves = getPossibleMoves(square)
    if (moves.length === 0) {
      setOptionSquares({})
      return false
    }

    const newSquares: any = {}
    moves.forEach((move) => {
      const targetPiece = chess.get(move as any)
      const sourcePiece = chess.get(square as any)
      
      newSquares[move] = {
        background:
          targetPiece && targetPiece.color !== sourcePiece?.color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      }
    })
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    }
    setOptionSquares(newSquares)
    return true
  }, [chess, getPossibleMoves])

  const onSquareClick = useCallback((square: string) => {
    // If it's not human's turn, don't allow moves
    if (config) {
      const currentPlayerConfig = gameState.currentPlayer === 'white' 
        ? config.whitePlayer 
        : config.blackPlayer
      
      if (currentPlayerConfig.type === 'ai') {
        return
      }
    }

    setOptionSquares({})

    // If we haven't selected a piece yet
    if (!moveFrom) {
      const piece = chess.get(square as any)
      if (piece && piece.color === chess.turn()) {
        setMoveFrom(square)
        getMoveOptions(square)
        setPossibleMoves(getPossibleMoves(square))
      }
      return
    }

    // If clicking the same square, deselect
    if (moveFrom === square) {
      setMoveFrom('')
      setPossibleMoves([])
      return
    }

    // Try to make the move
    const move = {
      from: moveFrom,
      to: square,
      promotion: 'q' // Always promote to queen for simplicity
    }

    const success = makeMove(move)
    
    if (success) {
      setMoveFrom('')
      setPossibleMoves([])
    } else {
      // If invalid move, try selecting the new square
      const piece = chess.get(square as any)
      if (piece && piece.color === chess.turn()) {
        setMoveFrom(square)
        getMoveOptions(square)
        setPossibleMoves(getPossibleMoves(square))
      } else {
        setMoveFrom('')
        setPossibleMoves([])
      }
    }
  }, [moveFrom, chess, getMoveOptions, getPossibleMoves, makeMove, config, gameState.currentPlayer])

  const onPieceDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    // If it's not human's turn, don't allow moves
    if (config) {
      const currentPlayerConfig = gameState.currentPlayer === 'white' 
        ? config.whitePlayer 
        : config.blackPlayer
      
      if (currentPlayerConfig.type === 'ai') {
        return false
      }
    }

    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Always promote to queen for simplicity
    }

    const success = makeMove(move)
    
    if (success) {
      setMoveFrom('')
      setPossibleMoves([])
      setOptionSquares({})
    }
    
    return success
  }, [makeMove, config, gameState.currentPlayer])

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          ChessLM Game Board
        </CardTitle>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700">
              {/* Chess piece icon based on current player */}
              <div className={`text-2xl ${gameState.currentPlayer === 'white' ? 'text-slate-200' : 'text-slate-800'}`}>
                {gameState.currentPlayer === 'white' ? '♔' : '♚'}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm capitalize text-slate-800 dark:text-slate-200">
                    {gameState.currentPlayer}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${gameState.currentPlayer === 'white' ? 'bg-white border-2 border-slate-400' : 'bg-slate-800 border-2 border-slate-600'}`}></div>
                </div>
                {config && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400">
                      {gameState.currentPlayer === 'white' 
                        ? config.whitePlayer.type === 'human' 
                          ? '👤 Human' 
                          : `🤖 AI (${config.whitePlayer.model?.name || 'Unknown'})` 
                        : config.blackPlayer.type === 'human' 
                          ? '👤 Human' 
                          : `🤖 AI (${config.blackPlayer.model?.name || 'Unknown'})`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {gameState.isGameOver ? (
              <div className="px-3 py-2 rounded-lg bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700">
                <span className="text-red-800 dark:text-red-200 font-semibold text-sm">
                  🏁 Game Over - {
                    gameState.result === 'white' ? 'White Wins!' :
                    gameState.result === 'black' ? 'Black Wins!' :
                    gameState.result === 'draw' ? 'Draw' :
                    'Game Ended'
                  }
                  {gameState.checkmate ? ' (Checkmate)' : ''}
                  {gameState.stalemate ? ' (Stalemate)' : ''}
                  {gameState.threefoldRepetition ? ' (Threefold Repetition)' : ''}
                  {gameState.insufficientMaterial ? ' (Insufficient Material)' : ''}
                </span>
              </div>
            ) : isThinking ? (
              <div className="px-3 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 animate-pulse">
                <span className="text-blue-800 dark:text-blue-200 font-medium text-sm">
                  🧠 AI Thinking...
                </span>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-lg bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700">
                <span className="text-green-800 dark:text-green-200 font-medium text-sm">
                  ✅ Ready
                </span>
              </div>
            )}
          </div>
        </div>
        {gameState.inCheck && (
          <div className="text-center text-red-600 font-semibold">
            Check!
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full max-w-md mx-auto">
          <Chessboard
            position={gameState.fen}
            onSquareClick={onSquareClick}
            onPieceDrop={onPieceDrop}
            customSquareStyles={optionSquares}
            areArrowsAllowed={false}
            arePiecesDraggable={!isThinking && !gameState.isGameOver}
            boardOrientation={config?.mode === 'human-vs-ai' ? 'white' : 'white'}
          />
        </div>
        
        {gameState.moves.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Last move: {gameState.moves[gameState.moves.length - 1].san}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
