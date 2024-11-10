import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface ListingHeroProps {
  images: string[];
  activeIndex: number;
  onImageClick: (index: number) => void;
  onGalleryOpen: () => void;
}

export function ListingHero({ 
  images, 
  activeIndex, 
  onImageClick, 
  onGalleryOpen 
}: ListingHeroProps) {
  return (
    <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <img
            src={images[activeIndex]}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/25 to-slate-950" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 flex gap-2">
        {images.slice(0, 4).map((image, index) => (
          <motion.button
            key={index}
            onClick={() => onImageClick(index)}
            className={cn(
              "relative h-16 w-16 rounded-lg overflow-hidden border-2",
              index === activeIndex 
                ? "border-emerald-500" 
                : "border-white/20"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={image} 
              alt="" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          onClick={onGalleryOpen}
          className="h-16 w-16 bg-white/10 backdrop-blur-sm hover:bg-white/20"
        >
          <ImageIcon className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
} 