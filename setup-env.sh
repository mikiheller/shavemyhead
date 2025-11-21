#!/bin/bash

echo "=========================================="
echo "Should I Shave My Head - Environment Setup"
echo "=========================================="
echo ""
echo "This script will help you set up your Gemini API key."
echo ""
echo "If you don't have an API key yet:"
echo "1. Go to https://aistudio.google.com/app/apikey"
echo "2. Sign in with your Google account"
echo "3. Click 'Create API key'"
echo "4. Copy your key and paste it below"
echo ""
read -p "Enter your Gemini API key: " api_key

if [ -z "$api_key" ]; then
    echo "Error: API key cannot be empty"
    exit 1
fi

echo "GEMINI_API_KEY=$api_key" > .env.local

echo ""
echo "✅ Success! Your API key has been saved to .env.local"
echo ""
echo "Next steps:"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Start shaving heads! 🧑‍🦲"
echo ""
