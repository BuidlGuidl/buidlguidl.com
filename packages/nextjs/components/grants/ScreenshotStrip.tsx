import { useState } from "react";
import Image from "next/image";
import { ImageLightbox, LightboxImageData } from "~~/components/ImageLightbox";

export type Screenshot = LightboxImageData;

// Row of small screenshots of the sites a section describes; click opens the lightbox.
// The sites are being retired, so these are the only record of what they looked like.
export const ScreenshotStrip = ({ shots }: { shots: Screenshot[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (shots.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="font-mono text-[10px] text-base-content/40 uppercase tracking-[0.2em] mb-2">
        screenshots ({shots.length})
      </div>
      {/* The strip scrolls sideways; the fade hints at that when there is more than a screenful. */}
      <div className="relative">
        {shots.length > 4 && (
          <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-white to-transparent z-10" />
        )}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {shots.map((shot, index) => (
            <button
              key={shot.src}
              className="group shrink-0 text-left"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open screenshot: ${shot.caption || shot.alt}`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={320}
                height={200}
                className="w-40 h-24 object-cover object-top rounded-lg border border-base-content/10 group-hover:border-primary transition-colors"
              />
              <span className="block mt-1 w-40 truncate font-mono text-[10px] text-base-content/50 group-hover:text-base-content/80 transition-colors">
                {shot.caption}
              </span>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <ImageLightbox
          images={shots}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  );
};
