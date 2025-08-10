import { ChessBoard } from '@/components/ChessBoard'
import { GameSidebar } from '@/components/GameSidebar'
import { Header } from '@/components/Header'
import { AIGameController } from '@/components/AIGameController'
import { AIAnalysis } from '@/components/AIAnalysis'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <AIGameController />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-1">
            <AIAnalysis />
          </div>
          <div className="lg:col-span-3">
            <ChessBoard />
          </div>
          <div className="lg:col-span-1">
            <GameSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
