import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message, data } = await request.json()
    console.log('=== CLIENT DEBUG ===', message, data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ error: 'Failed to log debug info' }, { status: 500 })
  }
}
