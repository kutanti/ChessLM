# ChessLM - AI Chess Platform

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
</div>

A modern chess application that allows players to compete against various Large Language Models (LLMs) with real-time move analysis and reasoning. Built with Next.js, TypeScript, and integrated with OpenAI, Anthropic, and Replicate APIs.

## 🎯 Features

### Core Gameplay
- **Human vs AI**: Challenge yourself against state-of-the-art language models
- **AI vs AI**: Watch different AI models battle with unique strategies
- **Real-time Analysis**: See AI reasoning for every move

### AI Integration
- **Multiple Providers**: OpenAI GPT, Anthropic Claude, Meta Llama
- **Move Reasoning**: Detailed explanations for each AI decision
- **Position Evaluation**: Numerical assessment of board positions
- **Alternative Analysis**: See other moves the AI considered
- **Thinking Depth**: Track how many moves ahead AI calculated

### User Experience
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Move History**: Complete game record with timestamps
- **Drag & Drop**: Natural piece movement
- **Responsive Design**: Works on desktop and mobile
- **Dark Mode**: Eye-friendly interface options

## 🚀 Quick Start

### Prerequisites
- Node.js 16.19.0 or higher
- npm or yarn package manager

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ChessLM
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   # Azure OpenAI (recommended for production)
   AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
   AZURE_OPENAI_API_VERSION=2025-06-01

   # OpenAI API Key (alternative to Azure OpenAI)
   OPENAI_API_KEY=your_openai_api_key_here

   # Anthropic API Key (for Claude models)
   ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # Replicate API Token (for Llama and other models)
   REPLICATE_API_TOKEN=your_replicate_api_token_here

   # Optional: Next.js configuration
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=your_database_url_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Play

### Setting Up a Game
1. **Choose Game Mode**: Select from Human vs AI or AI vs AI
2. **Select AI Models**: Pick which models you want to play against or watch compete
3. **Start Playing**: Click "Start Game" to begin your chess adventure

### During Gameplay
- **Making Moves**: Click a piece, then click the destination square, or drag and drop
- **AI Analysis**: Watch real-time analysis appear in the sidebar
- **Move History**: Track all moves with timestamps in the history panel
- **Game Status**: Monitor check, checkmate, and game state in real-time

## 🤖 Supported AI Models

### OpenAI Models (Azure OpenAI & Standard API)
- **GPT-4o**: Latest and most capable GPT model with strong reasoning (Strength: 9/10)
- **GPT-4o Mini**: Smaller, faster, and more cost-effective GPT-4o (Strength: 8/10)
- **GPT-4 Turbo**: Previous generation GPT-4 Turbo (Strength: 8/10)
- **GPT-3.5 Turbo**: Fast and capable model for most tasks (Strength: 7/10)

### Anthropic Models
- **Claude 3 Opus**: Most powerful Claude model with excellent reasoning (Strength: 9/10)
- **Claude 3 Sonnet**: Balanced performance and speed (Strength: 8/10)
- **Claude 3 Haiku**: Fast and efficient Claude model (Strength: 7/10)

### Meta Models (via Replicate)
- **Llama 2 70B Chat**: Large open-source model with strong performance (Strength: 8/10)
- **Llama 2 13B Chat**: Medium-sized open-source model (Strength: 6/10)
- **Llama 2 7B Chat**: Smaller, faster open-source model (Strength: 5/10)

## 🏗️ Technical Architecture

### Technology Stack
- **Frontend**: Next.js 13.5, React 18, TypeScript 5.2
- **Styling**: Tailwind CSS 3.3 with custom components
- **Chess Logic**: chess.js 1.0.0-beta.6 library
- **Chess Board**: react-chessboard 4.4.0 component
- **State Management**: Zustand 4.4.6
- **AI Integration**: OpenAI 4.20.1, Anthropic SDK 0.9.1, Replicate 0.25.1
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.292.0
- **Utilities**: clsx, tailwind-merge for conditional styling

### Project Structure
```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── ChessBoard.tsx     # Main chess board
│   ├── GameSidebar.tsx    # Game information panel
│   ├── AIAnalysis.tsx     # AI move analysis
│   └── ...
├── lib/                   # Utility libraries
│   ├── store.ts           # Game state management
│   ├── llm-engine.ts      # AI integration logic
│   ├── models.ts          # AI model definitions
│   └── utils.ts           # Helper functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── ...
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### API Routes
- `POST /api/ai-move`: Generate AI moves with reasoning

### Environment Variables
```env
# Azure OpenAI Configuration (recommended)
AZURE_OPENAI_API_KEY=sk-...                     # Azure OpenAI API key
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/  # Azure OpenAI endpoint
AZURE_OPENAI_API_VERSION=2025-06-01             # Azure OpenAI API version

# Alternative: Direct OpenAI API
OPENAI_API_KEY=sk-...                           # OpenAI API key

# Other AI Provider API Keys
ANTHROPIC_API_KEY=sk-ant-...                    # Anthropic API key
REPLICATE_API_TOKEN=r8_...                      # Replicate API token

# Optional Configuration
NEXTAUTH_URL=http://localhost:3000              # For authentication
DATABASE_URL=...                                # For game persistence
```

### Azure OpenAI Configuration
The application supports both Azure OpenAI and direct OpenAI API access. For production deployments, Azure OpenAI is recommended for better reliability and compliance.

**Azure OpenAI Setup:**
1. Create an Azure OpenAI resource in Azure Portal
2. Deploy the models you want to use (gpt-4o, gpt-4o-mini, etc.)
3. Note the deployment names - they should match the `azureDeploymentName` in `src/lib/models.ts`
4. Set the environment variables with your Azure endpoint and API key

**Model Deployment Names:**
The following deployment names are configured by default:
- `gpt-4o` → Azure deployment name: `gpt-4o`
- `gpt-4o-mini` → Azure deployment name: `gpt-4o-mini`
- `gpt-4-turbo` → Azure deployment name: `gpt-4-turbo`
- `gpt-turbo` → Azure deployment name: `gpt-turbo` (for GPT-3.5)

## 📊 Competitive Analysis

### Advantages Over Existing Solutions

| Feature | ChessLM | LLMsChess | LLM Chess Arena | Chess-with-LLM |
|---------|-----------|-----------|-----------------|----------------|
| Multiple Providers | ✅ | ❌ | ❌ | ❌ |
| Real-time Analysis | ✅ | ✅ | ✅ | ❌ |
| Production UI/UX | ✅ | ❌ | ❌ | ❌ |
| Human vs AI | ✅ | ✅ | ✅ | ✅ |
| AI vs AI | ✅ | ✅ | ✅ | ❌ |
| Move Reasoning | ✅ | ✅ | ✅ | Partial |

### Key Differentiators
1. **Unified Platform**: Seamless experience for all game modes
2. **Provider Agnostic**: Support for multiple AI providers
3. **Educational Focus**: Detailed move explanations help players learn
4. **Modern Architecture**: Built with latest React/Next.js best practices
5. **Developer Friendly**: Clean codebase with comprehensive documentation

## 🛠️ Customization

### Adding New AI Models
1. **Update Model Definitions**: Add new models to `src/lib/models.ts`:
   ```typescript
   {
     id: 'your-new-model-id',
     name: 'Your New Model Name',
     provider: 'openai' | 'anthropic' | 'replicate',
     description: 'Model description',
     strength: 8, // 1-10 rating
     azureDeploymentName: 'deployment-name', // For Azure OpenAI only
     azureApiVersion: '2025-06-01' // For Azure OpenAI only
   }
   ```

2. **Extend Provider Support**: If adding a new provider, update:
   - `LLMProvider` type in `src/types/chess.ts`
   - API integration logic in `src/lib/llm-engine.ts`
   - Environment variable handling in `getApiKey()` method

3. **Test Integration**: Ensure the new model works with the chess reasoning prompt format

### Styling Customization
- Modify `tailwind.config.js` for theme customization
- Update `src/app/globals.css` for global styles
- Customize component styles in individual component files

### Game Features
- Extend `GameConfig` type for new game modes
- Add new analysis features in `AIAnalysis` component
- Implement tournament modes in dedicated components

## 🐛 Troubleshooting

### Common Issues

**Azure OpenAI 404 Errors**
- Verify your Azure OpenAI endpoint format: `https://your-resource-name.openai.azure.com/`
- Check deployment names in Azure Portal match `azureDeploymentName` in `models.ts`
- Ensure API version is compatible (recommended: `2025-06-01`)
- Verify your Azure OpenAI resource is properly configured and deployed

**API Key Issues**
- Ensure environment variables are set correctly in `.env.local`
- For Azure OpenAI: Set `AZURE_OPENAI_API_KEY` and `AZURE_OPENAI_ENDPOINT`
- For direct OpenAI: Set `OPENAI_API_KEY`
- Check API key permissions and quotas in respective provider dashboards

**Build Errors**
- Ensure Node.js version 16.19.0 or higher
- Clear cache and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Run type check: `npm run type-check`

**Chess Board Issues**
- Refresh browser cache (Cmd+Shift+R / Ctrl+Shift+R)
- Check browser console for JavaScript errors
- Ensure react-chessboard version 4.4.0 is properly installed

**Model Configuration Issues**
- Verify model IDs in `src/lib/models.ts` match your API provider's model names
- For Azure OpenAI, ensure deployment names are correctly configured
- Check model availability in your API provider's region

### Getting Help
- Check browser console for error messages
- Review API response logs
- Ensure environment variables are correctly set

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic builds

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Roadmap

### Near Term (v1.1)
- [ ] Game persistence and history
- [ ] Enhanced move validation
- [ ] Improved error handling
- [ ] Performance optimizations

### Medium Term (v1.2)
- [ ] Tournament mode with brackets
- [ ] Elo rating system for models
- [ ] Export games as PGN
- [ ] Opening book integration

### Long Term (v2.0)
- [ ] User authentication and profiles
- [ ] Multiplayer online games
- [ ] Mobile app version
- [ ] Custom model fine-tuning

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **chess.js**: Excellent chess logic library
- **react-chessboard**: Beautiful chess board component
- **Next.js**: Amazing React framework
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon set

## 📞 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

**Built with ❤️ for the chess and AI communities**

*ChessLM - Where Human Creativity Meets Artificial Intelligence*
