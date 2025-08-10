#!/bin/bash

# Setup script for ChessLM environment variables

echo "🏗️  Setting up ChessLM environment..."

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Copy the example file
cp .env.example .env.local

echo "✅ Created .env.local from .env.example"
echo ""
echo "📝 Please edit .env.local and add your API keys:"
echo ""
echo "   # For Azure OpenAI (recommended):"
echo "   AZURE_OPENAI_API_KEY=your_azure_openai_api_key_here"
echo "   AZURE_OPENAI_ENDPOINT=https://eastus-demo-oai.openai.azure.com/"
echo "   AZURE_OPENAI_API_VERSION=2024-02-15-preview"
echo ""
echo "   # OR for standard OpenAI:"
echo "   OPENAI_API_KEY=your_openai_api_key_here"
echo ""
echo "   # Other providers:"
echo "   ANTHROPIC_API_KEY=your_anthropic_api_key_here" 
echo "   REPLICATE_API_TOKEN=your_replicate_api_token_here"
echo ""
echo "🔑 You can get API keys from:"
echo "   • Azure OpenAI: https://portal.azure.com/ (recommended)"
echo "   • OpenAI: https://platform.openai.com/api-keys"
echo "   • Anthropic: https://console.anthropic.com/"
echo "   • Replicate: https://replicate.com/account/api-tokens"
echo ""
echo "💡 You only need to add keys for the AI providers you want to use."
echo "   For Azure OpenAI, deployment names are automatically selected based on the chosen model."
echo ""
echo "🚀 After adding your keys, run: npm run dev"
