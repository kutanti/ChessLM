# ChessLM - AI Chess Platform

A modern chess application that allows players to compete against various Large Language Models (LLMs) with real-time move analysis and reasoning.

## Features

### ✨ Core Features
- **Human vs AI**: Play against various LLM models with real-time analysis
- **AI vs AI**: Watch different AI models compete against each other
- **Real-time Analysis**: See AI reasoning for each move
- **Move History**: Complete game record with timestamps
- **Multiple LLM Support**: OpenAI GPT, Anthropic Claude, and Llama models

### 🤖 Supported AI Models
- **OpenAI**: GPT-4, GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic**: Claude 3 Opus, Sonnet, Haiku
- **Meta**: Llama 2 (70B, 13B, 7B) via Replicate

## Installation

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn package manager
- API keys for AI providers (optional, for AI features)

### Setup
1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Starting a Game
1. **Select Game Mode**: Choose from Human vs AI or AI vs AI
2. **Pick AI Models**: Select which models to play against or watch compete
3. **Configure Settings**: Adjust time controls and other preferences
4. **Start Playing**: Begin your chess adventure

### Playing Chess
- **Click to Move**: Click on a piece, then click on the destination square
- **Drag and Drop**: Drag pieces to their destination
- **AI Thinking**: Watch the AI analyze positions in real-time
- **Move Analysis**: See detailed reasoning for each AI move

### Features in Detail

#### Game Modes
### Core Game Modes
- **Human vs AI**: Battle against state-of-the-art language models
- **AI vs AI**: Watch different AI models compete with unique strategies

#### Real-time Analysis
- **Move Reasoning**: Understand why the AI chose each move
- **Position Evaluation**: See numerical assessment of the position
- **Alternative Moves**: View other moves the AI considered
- **Thinking Depth**: See how many moves ahead the AI calculated

#### Move History
- **Complete Record**: Full game history with timestamps
- **Algebraic Notation**: Standard chess move notation
- **Visual Indicators**: White/black piece indicators
- **Scrollable**: Easy navigation through long games

## Architecture

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Chess Engine**: chess.js
- **Chess Board**: react-chessboard
- **State Management**: Zustand
- **UI Components**: Custom components with Radix-inspired design

### Project Structure
```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── ChessBoard.tsx  # Main chess board component
│   ├── GameSidebar.tsx # Game information sidebar
│   └── ...
├── lib/                # Utility libraries
│   ├── store.ts        # Game state management
│   ├── llm-engine.ts   # AI integration
│   └── models.ts       # AI model definitions
└── types/              # TypeScript type definitions
```

## API Integration

### Supported Providers
- **OpenAI**: GPT models via OpenAI API
- **Anthropic**: Claude models via Anthropic API  
- **Replicate**: Llama models via Replicate API

### API Endpoints
- `POST /api/ai-move`: Generate AI moves with reasoning

## Competitive Analysis

ChessLM addresses gaps identified in existing chess AI platforms:

### Key Differentiators
1. **Unified Platform**: Supports both human vs AI and AI vs AI with consistent UI/UX
2. **Multiple Providers**: Integrates OpenAI, Anthropic, and open-source models
3. **Real-time Analysis**: Live move reasoning and position evaluation
4. **Production Quality**: Polished interface designed for general users
5. **Educational Focus**: Detailed explanations help players learn

### Comparison with Existing Solutions
- **LLMsChess**: Similar concept but ChessLM offers better UX and more model variety
- **LLM Chess Arena**: Good for AI battles but lacks human vs AI polish
- **Chess-with-LLM**: Basic implementation; ChessLM provides comprehensive features

## Development

### Running Locally
```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### Environment Variables
```env
# Required for AI features
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
REPLICATE_API_TOKEN=r8_...

# Optional
DATABASE_URL=...  # For game history persistence
NEXTAUTH_URL=...  # For user authentication
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Roadmap

### Near Term
- [ ] Game persistence and history
- [ ] Tournament mode with brackets
- [ ] Elo rating system for models
- [ ] Export games as PGN
- [ ] Analysis engine integration

### Future Features
- [ ] Custom model fine-tuning
- [ ] Multiplayer online games
- [ ] Opening book integration
- [ ] Puzzle solving mode
- [ ] Mobile app version

## Troubleshooting

### Common Issues

**Build Errors**: Ensure Node.js version 18.17.0+
**API Errors**: Check environment variables and API key validity
**UI Issues**: Clear browser cache and restart development server

### Getting Help
- Check the GitHub issues for known problems
- Review the console for error messages
- Ensure all dependencies are properly installed

---

Built with ❤️ for the chess and AI communities.
