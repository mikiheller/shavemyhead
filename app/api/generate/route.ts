import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Gemini client will be initialized when needed
let genAI: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!genAI && process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return genAI;
}

export async function POST(request: NextRequest) {
  try {
    const { images } = await request.json();

    if (!images || images.length !== 3) {
      return NextResponse.json(
        { error: 'Three images are required' },
        { status: 400 }
      );
    }

    const client = getGeminiClient();
    
    if (!client || !process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your .env.local file' },
        { status: 500 }
      );
    }

    // Process each image with Gemini 3 Pro Image
    const generatedImages: string[] = [];

    for (let i = 0; i < images.length; i++) {
      try {
        // Send the original image WITH the instruction to Gemini 3 Pro Image
        // This way it can see the original and edit it, rather than generating from scratch
        const imageResponse = await client.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: 'Keep this picture exactly the same in every way, except this person has shaved their head. Not their facial hair if they have any, just their head. Generate the edited version of THIS exact photo.',
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: images[i].split(',')[1], // Remove data:image/jpeg;base64, prefix
                  },
                },
              ],
            },
          ],
          config: {
            imageConfig: {
              aspectRatio: '1:1',
              imageSize: '2K', // High quality, native 2K resolution
            },
            // Note: thinkingLevel uses 'high' by default for gemini-3-pro-image-preview
          },
        });

        // Extract the generated image
        if (imageResponse.candidates && imageResponse.candidates[0]?.content?.parts) {
          const parts = imageResponse.candidates[0].content.parts;
          
          for (const part of parts) {
            if (part.inlineData) {
              const imageData = part.inlineData.data;
              const mimeType = part.inlineData.mimeType || 'image/png';
              generatedImages.push(`data:${mimeType};base64,${imageData}`);
              break;
            }
          }
        }

        // If we didn't get an image, use a fallback
        if (generatedImages.length <= i) {
          console.error(`No image generated for index ${i}`);
          generatedImages.push(images[i]); // Fallback to original
        }

      } catch (error) {
        console.error(`Error processing image ${i}:`, error);
        // Use placeholder if one image fails
        generatedImages.push(images[i]); // Fallback to original
      }
    }

    return NextResponse.json({ generatedImages });

  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: 'Failed to generate images' },
      { status: 500 }
    );
  }
}
