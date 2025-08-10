import { NextResponse } from 'next/server'
import { LLMChessEngine } from '@/lib/llm-engine'
import { getModelById } from '@/lib/models'

export async function POST(request: Request) {
  try {
    const { modelId, fen, pgn } = await request.json()
    
    const model = getModelById(modelId)
    if (!model) {
      return NextResponse.json({ error: 'Model not found' }, { status: 400 })
    }

    const engine = new LLMChessEngine(model)
    const thought = await engine.generateMove(fen, pgn)
    
    return NextResponse.json({ thought })
  } catch (error) {
    console.error('AI move generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate AI move' }, 
      { status: 500 }
    )
  }
}
