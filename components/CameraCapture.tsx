'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CameraCaptureProps {
  onComplete: (images: string[]) => void;
  onCancel: () => void;
}

const instructions = [
  'Look straight at the camera',
  'Turn your head all the way to the LEFT',
  'Turn your head all the way to the RIGHT',
];

export function CameraCapture({ onComplete, onCancel }: CameraCaptureProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Reconnect video element whenever we return to camera view (not preview)
  useEffect(() => {
    if (!showPreview && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showPreview, stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 1280, height: 720 },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please ensure you have granted camera permissions.');
      onCancel();
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip the image horizontally to match what user sees
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0);
        ctx.restore();
        
        const imageData = canvas.toDataURL('image/jpeg', 0.95);
        setPreviewImage(imageData);
        setShowPreview(true);
      }
    }
  };

  const handleRetake = () => {
    setShowPreview(false);
    setPreviewImage('');
    // Ensure video element reconnects to the stream
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  };

  const handleConfirm = () => {
    const newImages = [...capturedImages, previewImage];
    setCapturedImages(newImages);
    setShowPreview(false);
    setPreviewImage('');

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      // Ensure video element reconnects to the stream
      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
      }
    } else {
      // All photos captured
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onComplete(newImages);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 md:p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Indicator */}
        <div className="mb-4 md:mb-6 flex justify-center gap-2">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`h-2 w-12 md:w-16 rounded-full transition-colors ${
                step < currentStep
                  ? 'bg-green-500'
                  : step === currentStep
                  ? 'bg-blue-500'
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Instruction */}
        <motion.h2
          key={currentStep}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl md:text-3xl font-bold text-white text-center mb-4 md:mb-8 px-2"
        >
          Step {currentStep + 1}: {instructions[currentStep]}
        </motion.h2>

        {/* Camera View or Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl mb-4 md:mb-6 max-h-[60vh]">
          {!showPreview ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Capture Button */}
              <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={capturePhoto}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-4 border-gray-300 shadow-lg hover:bg-gray-100 transition-colors"
                />
              </div>
            </>
          ) : (
            <>
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              
              {/* Preview Actions */}
              <div className="absolute bottom-4 md:bottom-8 left-0 right-0 flex justify-center items-center gap-3 px-2">
                <button
                  onClick={handleConfirm}
                  className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors shadow-lg"
                >
                  Looks Good!
                </button>
                <button
                  onClick={handleRetake}
                  className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                  aria-label="Retake photo"
                >
                  <svg 
                    className="w-6 h-6 md:w-7 md:h-7" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Cancel Button */}
        <button
          onClick={onCancel}
          className="w-full py-3 text-sm md:text-base text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

