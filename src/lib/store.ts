import { create } from 'zustand'
import { Chess } from 'chess.js'
import { GameConfig, GameState, Move, GameAnalysis, LLMModel } from '@/types/chess'

interface GameStore {
  // Game state
  chess: Chess
  gameState: GameState
  config: GameConfig | null
  analysis: GameAnalysis[]
  isThinking: boolean
  
  // Actions
  initializeGame: (config: GameConfig) => void
  makeMove: (move: { from: string; to: string; promotion?: string }) => boolean
  resetGame: () => void
  setThinking: (thinking: boolean) => void
  addAnalysis: (analysis: GameAnalysis) => void
  
  // Getters
  getPossibleMoves: (square?: string) => string[]
  getGameState: () => GameState
}

const createInitialGameState = (chess: Chess): GameState => {
  const isGameOver = chess.isGameOver()
  const isCheckmate = chess.isCheckmate()
  const isDraw = chess.isDraw()
  
  let result: 'white' | 'black' | 'draw' | undefined = undefined
  
  if (isGameOver) {
    if (isCheckmate) {
      // If checkmate, the winner is the opposite of whose turn it is
      result = chess.turn() === 'w' ? 'black' : 'white'
    } else if (isDraw) {
      result = 'draw'
    }
  }
  
  return {
    fen: chess.fen(),
    pgn: chess.pgn(),
    moves: [],
    currentPlayer: chess.turn() === 'w' ? 'white' : 'black',
    isGameOver,
    result,
    inCheck: chess.inCheck(),
    checkmate: isCheckmate,
    stalemate: chess.isStalemate(),
    draw: isDraw,
    threefoldRepetition: chess.isThreefoldRepetition(),
    insufficientMaterial: chess.isInsufficientMaterial(),
  }
}

export const useGameStore = create<GameStore>((set, get) => ({
  chess: new Chess(),
  gameState: createInitialGameState(new Chess()),
  config: null,
  analysis: [],
  isThinking: false,

  initializeGame: (config: GameConfig) => {
    const chess = new Chess()
    set({
      chess,
      config,
      gameState: createInitialGameState(chess),
      analysis: [],
      isThinking: false,
    })
  },

  makeMove: (move) => {
    const { chess } = get()
    
    try {
      // Let chess.js validate the move directly instead of pre-validating
      // This is more reliable as chess.js handles all edge cases correctly
      const moveResult = chess.move(move)
      
      if (moveResult) {
        const newMove: Move = {
          from: moveResult.from,
          to: moveResult.to,
          promotion: moveResult.promotion,
          san: moveResult.san,
          fen: chess.fen(),
          timestamp: Date.now(),
        }

        const newGameState = {
          ...createInitialGameState(chess),
          moves: [...get().gameState.moves, newMove],
        }

        set({ gameState: newGameState })
        return true
      } else {
        // This should not happen as chess.move() throws on invalid moves
        console.error('Chess.move returned null/false for move:', move)
        return false
      }
    } catch (error) {
      console.error('Invalid move error:', error)
      console.error('Attempted move:', move)
      console.error('Current FEN:', chess.fen())
      console.error('Legal moves:', chess.moves())
      return false
    }
  },

  resetGame: () => {
    const chess = new Chess()
    set({
      chess,
      gameState: createInitialGameState(chess),
      analysis: [],
      isThinking: false,
    })
  },

  setThinking: (thinking: boolean) => {
    set({ isThinking: thinking })
  },

  addAnalysis: (analysis: GameAnalysis) => {
    set(state => ({
      analysis: [...state.analysis, analysis]
    }))
  },

  getPossibleMoves: (square?: string) => {
    const { chess } = get()
    if (square) {
      return chess.moves({ square: square as any, verbose: true }).map((move: any) => move.to)
    }
    return chess.moves()
  },

  getGameState: () => get().gameState,
}))
