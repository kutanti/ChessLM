export type Player = 'white' | 'black'

export type GameMode = 'human-vs-ai' | 'ai-vs-ai'

export type LLMProvider = 'openai' | 'anthropic' | 'replicate'

export interface LLMModel {
  id: string
  name: string
  provider: LLMProvider
  description: string
  strength: number // 1-10 rating
  azureDeploymentName?: string // Azure OpenAI deployment name
  azureApiVersion?: string // Azure OpenAI API version
}

export interface GameConfig {
  mode: GameMode
  whitePlayer: {
    type: 'human' | 'ai'
    model?: LLMModel
  }
  blackPlayer: {
    type: 'human' | 'ai'
    model?: LLMModel
  }
  timeControl?: {
    time: number // in minutes
    increment: number // in seconds
  }
}

export interface Move {
  from: string
  to: string
  promotion?: string
  san: string
  fen: string
  timestamp: number
}

export interface GameState {
  fen: string
  pgn: string
  moves: Move[]
  currentPlayer: Player
  isGameOver: boolean
  result?: 'white' | 'black' | 'draw'
  inCheck: boolean
  checkmate: boolean
  stalemate: boolean
  draw: boolean
  threefoldRepetition: boolean
  insufficientMaterial: boolean
}

export interface AIThought {
  move: string
  reasoning: string
  evaluation: number
  depth: number
  alternatives: Array<{
    move: string
    evaluation: number
    reasoning: string
  }>
  timestamp: number
}

export interface GameAnalysis {
  move: Move
  thought: AIThought
  playerType: 'human' | 'ai'
  model?: LLMModel
}

export interface Tournament {
  id: string
  name: string
  participants: LLMModel[]
  games: Game[]
  standings: Array<{
    model: LLMModel
    wins: number
    losses: number
    draws: number
    points: number
  }>
}

export interface Game {
  id: string
  config: GameConfig
  state: GameState
  analysis: GameAnalysis[]
  startTime: number
  endTime?: number
}

export interface ChatMessage {
  id: string
  content: string
  timestamp: number
  type: 'system' | 'user' | 'ai'
  model?: LLMModel
}
