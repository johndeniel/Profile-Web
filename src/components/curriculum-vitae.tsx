'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { CurriculumVitae } from '@/types';

interface CurriculumVitaeProps {
  cvs: CurriculumVitae[];
}

function formatYear(dateString: string): string {
  return new Date(dateString).getFullYear().toString();
}

export function CurriculumVitaeList({ cvs }: CurriculumVitaeProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Curriculum Vitae
        </h3>
        <Badge variant="secondary" className="text-xs">
          {cvs.length} {cvs.length === 1 ? 'document' : 'documents'}
        </Badge>
      </div>
      <div className="flex flex-row flex-nowrap gap-3 items-start overflow-x-auto scrollbar-none">
        {cvs.map((cv) => (
          <a
            key={cv.id}
            href={cv.blobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0"
          >
            <div className="overflow-hidden rounded-lg border border-border transition-all hover:border-muted-foreground/20 hover:shadow-md">
              <Image
                src={cv.blobUrl}
                alt="Curriculum Vitae"
                width={300}
                height={400}
                className="h-72 w-56 object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {formatYear(cv.issued)}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
