# 🚀 Quick Start

Get your "Should I Shave My Head?" app running in 3 minutes!

## Step 1: Get Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key (starts with `AI...`)

## Step 2: Set Up Environment

**Option A: Use the helper script (easiest)**
```bash
./setup-env.sh
```
Paste your API key when prompted.

**Option B: Manual setup**
```bash
echo "GEMINI_API_KEY=your-key-here" > .env.local
```

## Step 3: Run the App

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 🎉 That's It!

Click the big button and try it out!

---

## Need Help?

- **Camera not working?** Check browser permissions
- **API errors?** Verify your `.env.local` file exists and has your key
- **Build errors?** Run `npm install` again
- **Other issues?** Check `SETUP.md` for detailed troubleshooting

## What's What?

- `SETUP.md` - Detailed setup instructions
- `CUSTOMIZATION.md` - How to tweak the AI prompt and styling
- `README.md` - Full project documentation

## Costs

Each person who uses the app costs about $0.40 in Gemini API credits (for 3 images). Make sure you have credits in your Google Cloud account! The app now uses **Gemini 3 Pro Image (Nano Banana 2)** 🍌 for better results!

---

**Ready to see if you should shave your head?** 🧑‍🦲

Start with: `npm run dev`

