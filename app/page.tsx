'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CameraCapture } from '@/components/CameraCapture';
import { ResultsGrid } from '@/components/ResultsGrid';
import { LoadingScreen } from '@/components/LoadingScreen';
import { DecisionButtons } from '@/components/DecisionButtons';
import { ShareModal } from '@/components/ShareModal';

type AppState = 'landing' | 'camera' | 'processing' | 'results' | 'share';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [userDecision, setUserDecision] = useState<'yes' | 'no' | 'maybe' | null>(null);

  const handleStartCapture = () => {
    setAppState('camera');
  };

  const handleImagesCapture = async (images: string[]) => {
    setCapturedImages(images);
    setAppState('processing');
    
    // Call API to generate images
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images }),
      });
      
      const data = await response.json();
      setGeneratedImages(data.generatedImages);
      setAppState('results');
    } catch (error) {
      console.error('Error generating images:', error);
      alert('Failed to generate images. Please try again.');
      setAppState('landing');
    }
  };

  const handleDecision = (decision: 'yes' | 'no' | 'maybe') => {
    setUserDecision(decision);
    setAppState('share');
  };

  const handleBackToStart = () => {
    setAppState('landing');
    setCapturedImages([]);
    setGeneratedImages([]);
    setUserDecision(null);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
      <AnimatePresence mode="wait">
        {appState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-screen items-center justify-center p-4"
          >
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartCapture}
              className="px-12 py-6 text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Should I shave my head?
            </motion.button>
          </motion.div>
        )}

        {appState === 'camera' && (
          <CameraCapture
            key="camera"
            onComplete={handleImagesCapture}
            onCancel={handleBackToStart}
          />
        )}

        {appState === 'processing' && (
          <LoadingScreen key="processing" />
        )}

        {appState === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen p-4 md:p-8 py-8"
          >
            <div className="max-w-6xl mx-auto">
              <ResultsGrid
                originalImages={capturedImages}
                generatedImages={generatedImages}
              />
              <DecisionButtons onDecision={handleDecision} />
              <button
                onClick={handleBackToStart}
                className="mt-6 md:mt-8 mx-auto block px-6 py-3 text-sm md:text-base text-gray-600 hover:text-gray-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </motion.div>
        )}

        {appState === 'share' && userDecision && (
          <ShareModal
            key="share"
            originalImages={capturedImages}
            generatedImages={generatedImages}
            decision={userDecision}
            onClose={handleBackToStart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
