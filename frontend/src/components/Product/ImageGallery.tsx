import React, { useState, useEffect, useMemo, useRef, TouchEvent } from 'react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  // Memoize the filtered gallery so its reference doesn't change on every render.
  const filteredGallery = useMemo(() => {
    return (images || []).filter(url => url && url.trim());
  }, [images]);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for thumbnail carousel navigation.
  const [thumbStart, setThumbStart] = useState(0);
  const thumbnailsToShow = 3; // Number of thumbnails to show at a time.

  // Refs for handling touch events.
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Set initial image and reset thumbnail start when the gallery changes.
  useEffect(() => {
    if (filteredGallery.length > 0) {
      setSelectedImage(filteredGallery[0]);
      setCurrentIndex(0);
      setThumbStart(0);
    }
  }, [filteredGallery]);

  const navigateToImage = (index: number) => {
    if (index >= 0 && index < filteredGallery.length) {
      setCurrentIndex(index);
      setSelectedImage(filteredGallery[index]);
    }
  };

  const handleImageNavigation = (direction: 'next' | 'prev') => {
    if (filteredGallery.length < 2) return;
    
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredGallery.length
      : (currentIndex - 1 + filteredGallery.length) % filteredGallery.length;
    
    navigateToImage(newIndex);
  };

  // Thumbnail navigation handlers.
  const handleThumbUp = () => {
    if (thumbStart > 0) {
      setThumbStart(thumbStart - 1);
    }
  };

  const handleThumbDown = () => {
    if (thumbStart + thumbnailsToShow < filteredGallery.length) {
      setThumbStart(thumbStart + 1);
    }
  };

  // Touch event handlers for swiping.
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance to trigger navigation.
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left - go to next image.
        handleImageNavigation('next');
      } else {
        // Swiped right - go to previous image.
        handleImageNavigation('prev');
      }
    }
    
    // Reset touch coordinates.
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard event handler for left/right arrow keys.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleImageNavigation('prev');
      } else if (e.key === 'ArrowRight') {
        handleImageNavigation('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, filteredGallery]);

  if (filteredGallery.length === 0) {
    return (
      <div data-testid="product-gallery">
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="product-gallery">
      <div className="flex gap-4">
        {/* Thumbnail Column with up and down arrows */}
        <div className="w-1/5 flex flex-col items-center">
          {thumbStart > 0 && (
            <button 
              onClick={handleThumbUp} 
              aria-label="Scroll up" 
              className="mb-2 text-xl"
            >
              ↑
            </button>
          )}
          <div className="flex flex-col gap-2">
            {filteredGallery.slice(thumbStart, thumbStart + thumbnailsToShow).map((img, idx) => {
              const actualIndex = thumbStart + idx;
              return (
                <img
                  key={`thumb-${actualIndex}`}
                  src={img}
                  alt={`${productName} ${actualIndex + 1}`}
                  className={`cursor-pointer border-2 ${actualIndex === currentIndex ? 'border-primary opacity-75' : 'border-transparent'}`}
                  onClick={() => navigateToImage(actualIndex)}
                />
              );
            })}
          </div>
          {thumbStart + thumbnailsToShow < filteredGallery.length && (
            <button 
              onClick={handleThumbDown} 
              aria-label="Scroll down" 
              className="mt-2 text-xl"
            >
              ↓
            </button>
          )}
        </div>

        {/* Main Image with Navigation */}
        <div 
          ref={mainImageRef}
          className="w-4/5 relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt={productName}
              className="object-contain w-full h-auto max-h-[70vh]"
              draggable={false} // Prevent image dragging to improve swipe experience.
            />
          )}
          
          {filteredGallery.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleImageNavigation('prev')}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                onClick={() => handleImageNavigation('next')}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile navigation dots */}
      {filteredGallery.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {filteredGallery.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
              onClick={() => navigateToImage(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
