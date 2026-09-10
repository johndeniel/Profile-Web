'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import type { CurriculumVitae } from '@/types';

interface CurriculumVitaeProps {
  cvs: CurriculumVitae[];
}

function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

export function CurriculumVitaeList({ cvs }: CurriculumVitaeProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Curriculum Vitae
        </h3>

        <Badge variant="secondary" className="text-xs">
          {cvs.length} {cvs.length === 1 ? 'document' : 'documents'}
        </Badge>
      </div>

      {/* CV List */}
      <div className="flex flex-row flex-nowrap items-start gap-3 overflow-x-auto scrollbar-none">
        {cvs.map((cv) => (
          <div
            key={cv.id}
            className="shrink-0 cursor-pointer"
            onClick={() => setSelectedImage(cv.blobUrl)}
          >
            <div className="overflow-hidden rounded-lg border border-border transition-all hover:border-muted-foreground/20 hover:shadow-md">
              <Image
                src={cv.blobUrl}
                alt="Curriculum Vitae"
                width={300}
                height={400}
                sizes="224px"
                loading="eager"
                className="h-72 w-56 object-cover transition-transform hover:scale-105"
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {formatYear(cv.issued)}
            </p>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Close Curriculum Vitae"
            className="absolute right-4 top-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[85vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Curriculum Vitae"
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
