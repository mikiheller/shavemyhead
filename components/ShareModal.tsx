'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShareModalProps {
  originalImages: string[];
  generatedImages: string[];
  decision: 'yes' | 'no' | 'maybe';
  onClose: () => void;
}

export function ShareModal({ originalImages, generatedImages, decision, onClose }: ShareModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [compositeImage, setCompositeImage] = useState<string>('');

  useEffect(() => {
    generateCompositeImage();
  }, []);

  const generateCompositeImage = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for a 2x3 grid
    const imgWidth = 400;
    const imgHeight = 300;
    const padding = 20;
    const watermarkHeight = 60;

    canvas.width = (imgWidth * 2) + (padding * 3);
    canvas.height = (imgHeight * 3) + (padding * 4) + watermarkHeight;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Load and draw all images
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };

    try {
      for (let i = 0; i < 3; i++) {
        // Original image (left column)
        const originalImg = await loadImage(originalImages[i]);
        const x1 = padding;
        const y1 = padding + (i * (imgHeight + padding));
        ctx.drawImage(originalImg, x1, y1, imgWidth, imgHeight);

        // Generated image (right column)
        const generatedImg = await loadImage(generatedImages[i]);
        const x2 = padding * 2 + imgWidth;
        const y2 = padding + (i * (imgHeight + padding));
        ctx.drawImage(generatedImg, x2, y2, imgWidth, imgHeight);
      }

      // Add watermark
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      const watermarkY = canvas.height - 30;
      ctx.fillText('shouldishavemyhead.ai', canvas.width / 2, watermarkY);

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      setCompositeImage(dataUrl);
    } catch (error) {
      console.error('Error generating composite image:', error);
    }
  };

  const handleDownload = () => {
    if (!compositeImage) return;

    const link = document.createElement('a');
    link.href = compositeImage;
    link.download = 'should-i-shave-my-head.png';
    link.click();
  };

  // Custom share text based on decision
  const getShareText = () => {
    switch (decision) {
      case 'yes':
        return "I used shouldishavemyhead.ai and decided it's time to shave my head! 🪒 Check out the before/after and try it yourself";
      case 'no':
        return "I used shouldishavemyhead.ai and decided to keep my hair! 💇 But the AI version is wild - see for yourself";
      case 'maybe':
        return "I used shouldishavemyhead.ai and I'm on the fence... 🤔 What do you think? Try it yourself and see";
    }
  };

  const shareText = getShareText();

  const handleTwitterShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(tweetUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://shouldishavemyhead.ai')}`;
    window.open(fbUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareText);
    alert('Text copied to clipboard!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Share Your Results!</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl"
          >
            ×
          </button>
        </div>

        {/* Preview of composite image */}
        {compositeImage && (
          <div className="mb-6">
            <img
              src={compositeImage}
              alt="Composite"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Hidden canvas for generating the composite */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Share message */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700 italic">"{shareText}"</p>
        </div>

        {/* Share buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTwitterShare}
            className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Share on X (Twitter)
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-full py-4 px-6 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Share on Facebook
          </button>

          <button
            onClick={handleDownload}
            className="w-full py-4 px-6 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Image
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full py-4 px-6 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Text
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

