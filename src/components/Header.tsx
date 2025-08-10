'use client'

import React from 'react'
import { Crown, Settings, Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Crown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            ChessLM
          </h1>
          <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            AI Chess Platform
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Play
          </a>
          <a 
            href="#" 
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Tournament
          </a>
          <a 
            href="#" 
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Analysis
          </a>
          <a 
            href="#" 
            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Leaderboard
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
