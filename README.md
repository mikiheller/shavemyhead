# Should I Shave My Head? 🧑‍🦲

An AI-powered web app that shows men what they would look like with a shaved head using advanced image generation technology.

## Features

- **Simple Interface**: One-click to get started
- **Camera Capture**: Take 3 selfies (front, left, right) directly in the app
- **AI Generation**: Uses Google's Gemini 3 Pro Image (Nano Banana 2 🍌) to generate realistic bald versions
- **Interactive Gallery**: View before/after in a 2x3 grid with full-screen zoom
- **Social Sharing**: Share your results on social media with built-in watermarks

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key (get one at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

1. Clone or navigate to this repository:
```bash
cd shouldishavemyhead
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
touch .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
```

### Running Locally

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Click the "Find Out Now!" button
2. Grant camera permissions
3. Take 3 selfies following the on-screen instructions
4. Wait while AI generates your bald look
5. View the before/after results
6. Decide if you're going to do it!
7. Share your results (optional)

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **Google Gemini API**: Gemini 3 Pro + Gemini 3 Pro Image (Nano Banana 2 🍌) for image generation

## Important Notes

- Camera access is required for the app to work
- Image generation uses OpenAI API credits (costs apply)
- Processing 3 images typically takes 30-60 seconds
- Best results with clear, well-lit photos

## API Usage

The app uses Google's Gemini API which requires billing enabled. Approximate costs:
- Gemini 3 Pro analysis: ~$0.02 per image
- Gemini 3 Pro Image generation: ~$0.134 per image
- **Total per session**: ~$0.46 (for 3 images)

Note: Gemini may offer free tier quotas that could reduce or eliminate costs for testing!

## Future Enhancements

- Support for different hair styles (not just bald)
- Better image-to-image editing (when APIs improve)
- User accounts and history
- Mobile app versions

## License

MIT

---

Built with ❤️ for people contemplating the big shave!
