import { useState, useCallback } from 'react';

export function useListingGallery(initialImages: string[]) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % initialImages.length);
  }, [initialImages.length]);

  const previousImage = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + initialImages.length) % initialImages.length);
  }, [initialImages.length]);

  const openGallery = useCallback(() => {
    setIsGalleryOpen(true);
  }, []);

  const closeGallery = useCallback(() => {
    setIsGalleryOpen(false);
  }, []);

  return {
    activeIndex,
    isGalleryOpen,
    setActiveIndex,
    nextImage,
    previousImage,
    openGallery,
    closeGallery,
  };
} 