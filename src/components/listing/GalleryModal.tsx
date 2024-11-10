import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface GalleryModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function GalleryModal({
  images,
  initialIndex,
  onClose,
  onNext,
  onPrevious,
}: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    } else {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
    >
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="relative h-full flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl px-4"
          >
            <img
              src={images[currentIndex]}
              alt=""
              className="w-full h-[80vh] object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          className="absolute right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
} 