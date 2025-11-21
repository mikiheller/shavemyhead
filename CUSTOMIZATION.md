# Customization Guide

## Adjusting the AI Prompt

The most important part of this app is the AI prompt that generates the bald versions using **Gemini 3 Pro Image (Nano Banana 2 🍌)**. You'll likely need to test and refine it based on your results.

### Current Prompt Location

The prompt is in: `app/api/generate/route.ts` around line 50-60

### Current Prompt
The app uses a two-step process with Gemini:
1. **Analysis**: Gemini 3 Pro analyzes the photo to create a detailed description
2. **Generation**: Gemini 3 Pro Image generates the bald version from that description

```typescript
const prompt = `Create a photorealistic image matching this exact description, but with ONE CRITICAL CHANGE: the person has a completely shaved/bald head (smooth scalp, no hair on top of the head). Keep ALL facial hair (beard, mustache, eyebrows) exactly as described. Keep everything else IDENTICAL.

Description: ${description}

IMPORTANT: Make the bald head look natural, with realistic skin tone matching their complexion, appropriate lighting and shadows on the scalp. The image should be indistinguishable from the original except for the lack of hair on the head.`;
```

### Tips for Improving Results

**If the AI is changing too much:**
- Add more emphasis on "IDENTICAL" and "ONLY change the head hair"
- Specify what should NOT change more explicitly
- Try phrases like "exact same lighting conditions" or "preserve the exact background"

**If results don't look natural:**
- Add phrases like "photorealistic", "natural skin tone", "seamless transition"
- Try "make it look like a professional photograph"
- Add "maintain realistic shadows and lighting on the scalp"

**If facial features are changing:**
- Add "preserve exact facial features, face shape, and proportions"
- Try "keep the person's identity completely recognizable"

**Example alternative prompts to try:**

```typescript
// More conservative (fewer changes)
const prompt = `Create a photorealistic image identical to the provided photo in EVERY aspect - same person, face, pose, expression, background, lighting, and clothing. The ONLY difference: this person has a cleanly shaved, bald head. Preserve all facial hair (if any). Make the bald scalp look natural with appropriate skin tone and lighting.`;

// More focused on quality
const prompt = `Generate a high-quality, photorealistic portrait that matches the provided image exactly, with one change: show this person with a completely bald/shaved head (not their facial hair). Maintain the exact same: facial features, expression, pose, background, lighting conditions, and image quality. The edit should be seamless and natural-looking.`;

// More detailed
const prompt = `Transform this photo by giving the person a completely shaved/bald head while keeping EVERYTHING else exactly the same:
- Same face shape and facial features
- Same facial expression and pose  
- Same facial hair (beard, mustache, etc.)
- Same background and environment
- Same lighting and shadows
- Same image quality and resolution
Make the bald head look natural and photorealistic with appropriate skin tone matching their complexion.`;
```

## Adjusting Processing Time

The app processes 3 images sequentially. If it's too slow, you could:

1. **Process in parallel** (costs more, faster):
```typescript
const promises = images.map(async (image, i) => {
  // ... processing code
});
const results = await Promise.all(promises);
```

2. **Reduce thinking level** (faster, less reasoning):
Change `thinkingLevel: 'high'` to `thinkingLevel: 'low'` in the config

3. **Reduce image size**:
Change `imageSize: '2K'` to `imageSize: '1K'` (costs less, lower quality)

## Styling Customization

### Colors
The main brand colors are in `app/page.tsx` and components:
- Primary blue: `from-blue-600 to-indigo-600`
- Background: `from-blue-50 to-indigo-100`

To change the color scheme, search and replace these gradient classes.

### Button Text
- Landing page button: `app/page.tsx` line ~40
- Camera instructions: `components/CameraCapture.tsx` lines ~15-19
- Decision question: `components/DecisionButtons.tsx` line ~29

### Share Message
Edit the share text in `components/ShareModal.tsx` line ~73:
```typescript
const shareText = "Your custom message here!";
```

## Advanced: Using a Different AI Model

Currently, the app uses Gemini 3 Pro + Gemini 3 Pro Image (Nano Banana 2 🍌). You could try:

### Alternative Google Models
- Different aspect ratios: `aspectRatio: '4:3'` or `aspectRatio: '16:9'`
- Different sizes: `imageSize: '1K'`, `imageSize: '2K'`, or `imageSize: '4K'`

### Alternative APIs
- OpenAI (DALL-E 3)
- Stability AI (Stable Diffusion)
- Midjourney API
- Replicate.com (various models)

You'd need to modify `app/api/generate/route.ts` to use a different provider.

## Testing Tips

1. **Use consistent lighting**: Take photos in good, even lighting
2. **Clear background**: Simple backgrounds work better
3. **Face the camera directly**: Makes the transformation more convincing
4. **Test with different hair types**: Curly, straight, short, long
5. **Test skin tones**: Ensure it works well for everyone

## Performance Optimization

If you're getting rate limited or costs are too high:

1. **Cache results**: Store generated images to avoid regenerating
2. **Add queue system**: Process one request at a time
3. **Implement authentication**: Prevent abuse
4. **Add usage limits**: X generations per day per user

## UI Improvements

Ideas for enhancement:
- Add a "Try Again" button if results aren't good
- Show multiple variations per image
- Add before/after slider instead of side-by-side
- Save history for logged-in users
- Add feedback buttons to improve the AI prompt

---

Feel free to experiment! The beauty of running locally is you can break things and try again. 😊

