import { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  placeholder = 'data:image/svg+xml,...',
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) {
    return (
      <div 
        className={cn(
          "bg-slate-800 flex items-center justify-center",
          className
        )}
      >
        <span className="text-white/60">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={loaded ? src : placeholder}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          !loaded && "opacity-0",
          loaded && "opacity-100"
        )}
        {...props}
      />
    </div>
  );
} 