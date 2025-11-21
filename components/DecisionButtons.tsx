'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DecisionButtonsProps {
  onDecision: (decision: 'yes' | 'no' | 'maybe') => void;
}

export function DecisionButtons({ onDecision }: DecisionButtonsProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<'yes' | 'no' | 'maybe' | null>(null);

  const handleNo = () => {
    setSelectedDecision('no');
    setShowCheckmark(true);
    onDecision('no');
  };

  const handleMaybe = () => {
    setSelectedDecision('maybe');
    setShowCheckmark(true);
    onDecision('maybe');
  };

  const handleYes = () => {
    setSelectedDecision('yes');
    onDecision('yes');
  };

  return (
    <div className="mt-8 md:mt-12 text-center px-4">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
        Are you going to shave your head?
      </h3>

      <AnimatePresence mode="wait">
        {!selectedDecision && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex justify-center gap-2 md:gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNo}
              className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              No
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMaybe}
              className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Maybe
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYes}
              className="px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              Yes
            </motion.button>
          </motion.div>
        )}

        {showCheckmark && (selectedDecision === 'no' || selectedDecision === 'maybe') && (
          <motion.div
            key="checkmark"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-green-500 flex items-center justify-center">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
