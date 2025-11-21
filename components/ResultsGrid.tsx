'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsGridProps {
  originalImages: string[];
  generatedImages: string[];
}

type ViewMode = 'grid' | 'front' | 'left' | 'right';

export function ResultsGrid({ originalImages, generatedImages }: ResultsGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isOriginal, setIsOriginal] = useState(true);

  const handleImageClick = (index: number, original: boolean) => {
    setSelectedImageIndex(index);
    setIsOriginal(original);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (viewMode === 'grid') setViewMode('front');
    else if (viewMode === 'front') setViewMode('left');
    else if (viewMode === 'left') setViewMode('right');
    else if (viewMode === 'right') setViewMode('grid');
  };

  const handlePrevious = () => {
    if (viewMode === 'grid') setViewMode('right');
    else if (viewMode === 'right') setViewMode('left');
    else if (viewMode === 'left') setViewMode('front');
    else if (viewMode === 'front') setViewMode('grid');
  };

  const handleFullscreenPrevious = () => {
    if (selectedImageIndex !== null) {
      if (!isOriginal) {
        setIsOriginal(true);
      } else if (selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
        setIsOriginal(false);
      }
    }
  };

  const handleFullscreenNext = () => {
    if (selectedImageIndex !== null) {
      if (isOriginal) {
        setIsOriginal(false);
      } else if (selectedImageIndex < 2) {
        setSelectedImageIndex(selectedImageIndex + 1);
        setIsOriginal(true);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handleFullscreenPrevious();
    if (e.key === 'ArrowRight') handleFullscreenNext();
    if (e.key === 'Escape') handleClose();
  };

  return (
    <>
      {/* Main View */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[0, 1, 2].map((index) => (
                <div key={index} className="grid grid-cols-2 gap-2 md:gap-4">
                  {/* Original */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg aspect-square"
                    onClick={() => handleImageClick(index, true)}
                  >
                    <img
                      src={originalImages[index]}
                      alt={`Original ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Generated */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg aspect-square"
                    onClick={() => handleImageClick(index, false)}
                  >
                    <img
                      src={generatedImages[index]}
                      alt={`Generated ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}

          {viewMode !== 'grid' && (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="space-y-4 max-w-md mx-auto"
            >
              {/* Original on top */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg aspect-square w-full"
                onClick={() => handleImageClick(
                  viewMode === 'front' ? 0 : viewMode === 'left' ? 1 : 2,
                  true
                )}
              >
                <img
                  src={originalImages[viewMode === 'front' ? 0 : viewMode === 'left' ? 1 : 2]}
                  alt="Original"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Generated below */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer rounded-lg overflow-hidden shadow-lg aspect-square w-full"
                onClick={() => handleImageClick(
                  viewMode === 'front' ? 0 : viewMode === 'left' ? 1 : 2,
                  false
                )}
              >
                <img
                  src={generatedImages[viewMode === 'front' ? 0 : viewMode === 'left' ? 1 : 2]}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-center items-center gap-8 mt-6">
          <button
            onClick={handlePrevious}
            className="w-12 h-12 flex items-center justify-center text-3xl text-gray-700 hover:text-gray-900 transition-colors"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {['grid', 'front', 'left', 'right'].map((mode) => (
              <div
                key={mode}
                className={`w-2 h-2 rounded-full transition-colors ${
                  viewMode === mode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center text-3xl text-gray-700 hover:text-gray-900 transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
            onClick={handleClose}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-4xl z-50 hover:text-gray-300 transition-colors w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>

            {/* Image Container */}
            <div
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={`${isOriginal ? 'original' : 'generated'}-${selectedImageIndex}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                src={isOriginal ? originalImages[selectedImageIndex] : generatedImages[selectedImageIndex]}
                alt="Full size"
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Arrows */}
              {!(isOriginal && selectedImageIndex === 0) && (
                <button
                  onClick={handleFullscreenPrevious}
                  className="absolute left-4 text-white text-5xl hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center"
                >
                  ‹
                </button>
              )}
              {!(!isOriginal && selectedImageIndex === 2) && (
                <button
                  onClick={handleFullscreenNext}
                  className="absolute right-4 text-white text-5xl hover:text-gray-300 transition-colors w-12 h-12 flex items-center justify-center"
                >
                  ›
                </button>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-base md:text-lg">
                Photo {selectedImageIndex + 1} of 3
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
