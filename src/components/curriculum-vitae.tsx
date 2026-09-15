'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { CurriculumVitae } from '@/types';

interface CurriculumVitaeProps {
  cvs: CurriculumVitae[];
}

/** Extracts the calendar year (e.g. "2025") from an ISO date string. */
function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

/**
 * Horizontally scrollable CV gallery. Selecting a thumbnail opens a
 * fullscreen preview that closes on backdrop click or the Escape key.
 */
export function CurriculumVitaeList({ cvs }: CurriculumVitaeProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Close on Escape and lock background scroll while the preview is open.
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedImage]);

  return (
    <div className="flex flex-col gap-4">
      {/* Section header with document count */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Curriculum Vitae
        </h3>

        <Badge variant="secondary" className="text-xs">
          {cvs.length} {cvs.length === 1 ? 'document' : 'documents'}
        </Badge>
      </div>

      {cvs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No curriculum vitae uploaded yet.
        </p>
      ) : (
        /* Thumbnail strip */
        <div className="flex flex-row flex-nowrap items-start gap-3 overflow-x-auto scrollbar-none pb-2">
          {cvs.map((cv, index) => (
            <button
              key={cv.id}
              type="button"
              onClick={() => setSelectedImage(cv.blobUrl)}
              className="shrink-0 cursor-pointer text-left"
            >
              <span className="block overflow-hidden rounded-lg border border-border transition-all hover:border-muted-foreground/20 hover:shadow-md">
                <Image
                  src={cv.blobUrl}
                  alt={`Curriculum Vitae ${formatYear(cv.issued)}`}
                  width={300}
                  height={400}
                  sizes="(max-width: 640px) 192px, 224px"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="h-60 w-48 object-cover transition-transform hover:scale-105 sm:h-72 sm:w-56"
                />
              </span>

              <span className="mt-2 block text-xs text-muted-foreground">
                {formatYear(cv.issued)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Close Curriculum Vitae"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-lg p-1 text-white transition-colors hover:bg-white/10 hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Curriculum Vitae preview"
              width={600}
              height={800}
              sizes="85vw"
              className="h-auto w-auto max-h-[85vh] max-w-[85vw] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
