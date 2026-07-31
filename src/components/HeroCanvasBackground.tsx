import React, { useEffect, useRef } from 'react';

export const HeroCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frames313Count = 165;
    const images: HTMLImageElement[] = [];

    // Preload all images for the sequence
    for (let i = 1; i <= frames313Count; i++) {
      const img = new Image();
      // Zero-padded to 3 digits (e.g., 001, 002)
      const paddedIndex = String(i).padStart(3, '0');
      img.src = `/ezgif-78053e59dc3a8313-jpg/ezgif-frame-${paddedIndex}.jpg`;
      images.push(img);

      // Set canvas dimensions based on the first image and draw it
      if (i === 1) {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
        };
      }
    }

    let scrollY = window.scrollY;
    let currentScrollY = scrollY;
    const lerpFactor = 0.08;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    let animationFrameId: number;

    const render = () => {
      // Interpolate scroll position for smoothness
      currentScrollY += (scrollY - currentScrollY) * lerpFactor;

      // Calculate scroll progress over the container's height
      if (containerRef.current) {
        // Find the start offset of the container relative to the document
        // window.scrollY + rect.top gives the absolute position of the container
        const rect = containerRef.current.getBoundingClientRect();
        const containerStart = window.scrollY + rect.top;

        // We want to animate over the duration of the container's extra height
        // Since the inner content is sticky for 'h-screen', the scrollable distance is:
        const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;

        if (scrollableDistance > 0) {
          // Progress from 0 to 1 as we scroll past the container
          const scrolledPastStart = currentScrollY - containerStart;
          const scrollFraction = Math.max(0, Math.min(1, scrolledPastStart / scrollableDistance));

          const frameIndex = Math.floor(scrollFraction * frames313Count);
          const safeFrameIndex = Math.min(frames313Count - 1, frameIndex);

          const img = images[safeFrameIndex];
          if (img && img.complete && img.naturalWidth !== 0 && canvas.width > 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-[300vh] -z-10 pointer-events-none">
      {/* 
         The canvas is sticky, so it stays fixed in the background 
         while the user scrolls through the 300vh container.
       */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover opacity-60"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
          }}
        />
      </div>
    </div>
  );
};
