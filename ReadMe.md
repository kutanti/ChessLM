# ChessLM

> AI-powered chess platform featuring human vs. language model and language model vs. language model battles, with real-time analysis and reasoning.

## Features

- 🎯 **Human vs AI** - Challenge GPT, Claude, and Llama models
- 🤖 **AI vs AI** - Watch different AI models compete
- 🧠 **Real-time Analysis** - See AI reasoning for every move
- 📱 **Responsive Design** - Works on desktop and mobile

## Game Modes

### 🎯 Human vs AI
Challenge yourself against state-of-the-art language models. Choose your opponent from GPT-4o, Claude 3 Opus, Llama 2, and more. Perfect for improving your game while learning from AI strategies.

### 🤖 AI vs AI  
Watch epic battles between different AI models. Compare how GPT-4o plays against Claude 3, or see Llama 2 face off against GPT-3.5. Great for studying different AI reasoning patterns.

### � Analysis Mode
Review any position with AI assistance. Get detailed explanations of the best moves, alternative options, and strategic considerations from multiple AI perspectives.

### 📊 Tournament Mode *(Coming Soon)*
Multi-round competitions between AI models with Elo ratings and performance tracking.

## Quick Start

```bash
# Clone and install
git clone https://github.com/kutanti/ChessLM.git
cd ChessLM
npm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Start development server
npm run dev
# Open http://localhost:3000
```

## Environment Variables

```env
# Choose one or more providers
AZURE_OPENAI_API_KEY=your_azure_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/

OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
REPLICATE_API_TOKEN=your_replicate_token
```

## Tech Stack

- **Next.js 13** + **TypeScript** + **Tailwind CSS**
- **chess.js** for game logic
- **react-chessboard** for UI
- **Zustand** for state management

## License

MIT License - see [LICENSE](LICENSE) for details.
