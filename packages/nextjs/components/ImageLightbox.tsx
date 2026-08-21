import { useCallback, useEffect } from "react";

export interface LightboxImageData {
  src: string;
  alt: string;
  // Short label, shown under the thumbnail and in the lightbox caption bar.
  caption?: string;
  // Where the shot came from, linked from the caption bar.
  sourceUrl?: string;
}

interface ImageLightboxProps {
  images: LightboxImageData[];
  index: number;
  // Omit for a single image: the prev/next controls are hidden either way.
  onIndexChange?: (index: number) => void;
  onClose: () => void;
}

// Full-screen image viewer with keyboard navigation. Used by the /grants-archive screenshot strips
// and by the blog's inline images (a one-image gallery).
export const ImageLightbox = ({ images, index, onIndexChange, onClose }: ImageLightboxProps) => {
  const total = images.length;

  const step = useCallback(
    (delta: number) => {
      if (!onIndexChange || total < 2) return;
      onIndexChange((index + delta + total) % total);
    },
    [index, onIndexChange, total],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, step]);

  const image = images[index];
  if (!image) return null;

  const hasCaption = Boolean(image.caption || total > 1);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 cursor-zoom-out overflow-auto p-4 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={image.caption || image.alt}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 z-10 text-white/50 hover:text-white text-3xl leading-none transition-colors"
        onClick={onClose}
        aria-label="Close"
        autoFocus
      >
        ×
      </button>

      {total > 1 && (
        <>
          <button
            className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-10 px-3 py-2 text-white/50 hover:text-white text-4xl leading-none transition-colors"
            onClick={e => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-10 px-3 py-2 text-white/50 hover:text-white text-4xl leading-none transition-colors"
            onClick={e => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={image.src}
        src={image.src}
        alt={image.alt}
        className="max-w-full sm:max-w-[92vw] max-h-[78vh] object-contain rounded-lg animate-scale-in cursor-default"
        onClick={e => e.stopPropagation()}
      />

      {hasCaption && (
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] sm:text-xs text-white/50 cursor-default"
          onClick={e => e.stopPropagation()}
        >
          {image.caption &&
            (image.sourceUrl ? (
              <a
                href={image.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline underline-offset-2 hover:text-white"
              >
                {image.caption}
              </a>
            ) : (
              <span className="text-white/80">{image.caption}</span>
            ))}
          {total > 1 && (
            <span className="text-white/40">
              {index + 1} / {total}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
