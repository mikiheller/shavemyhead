# Setup Instructions

## Quick Start Guide

Follow these steps to get your "Should I Shave My Head" app running locally:

### Step 1: Install Dependencies

The dependencies are already installed! If you need to reinstall:

```bash
npm install
```

### Step 2: Set Up Your Gemini API Key

**IMPORTANT**: You need a Gemini API key for the image generation to work. The app uses **Gemini 3 Pro Image (Nano Banana 2)** 🍌!

1. Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API key"
4. Copy your API key

5. Create a file called `.env.local` in the project root:
```bash
echo "GEMINI_API_KEY=your_actual_key_here" > .env.local
```

Replace `your_actual_key_here` with your actual Gemini API key.

**Example:**
```
GEMINI_API_KEY=AIzaSyAbc123def456ghi789...
```

### Step 3: Run the Development Server

```bash
npm run dev
```

### Step 4: Open in Browser

Open [http://localhost:3000](http://localhost:3000)

You should see the landing page with a big "Find Out Now!" button!

## Testing the App

1. Click "Find Out Now!"
2. Allow camera access when prompted
3. Follow the instructions to take 3 selfies
4. Wait for the AI to generate your bald look (30-60 seconds)
5. View your results!

## Troubleshooting

### Camera Not Working
- Make sure you granted camera permissions
- Try a different browser (Chrome/Safari recommended)
- Check if another app is using your camera

### API Key Errors
- Double-check your `.env.local` file exists in the project root
- Make sure the key starts with `AIza`
- Restart the dev server after adding the key (`Ctrl+C` then `npm run dev` again)

### Image Generation Fails
- Check your Google Cloud account has credits/billing enabled
- Verify your API key has the correct permissions
- Look at the terminal for error messages

## Cost Estimates

Each session (3 images) costs approximately:
- **$0.06** for Gemini 3 Pro analysis (3 images × $0.02)
- **$0.40** for Gemini 3 Pro Image generation (3 images × ~$0.134)
- **Total: ~$0.46 per user session**

Make sure you have billing enabled in your Google Cloud account! Note: Gemini may have free tier quotas available.

## What's Next?

Once it's working locally, you can:
- Test with different people and lighting conditions
- Refine the AI prompt if results aren't perfect
- Deploy to Vercel/Netlify when ready
- Buy the domain shouldishavemyhead.ai

Enjoy! 🧑‍🦲

