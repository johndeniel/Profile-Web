'use client';

import type { EducationalAttainment } from '@/types';

interface EducationalAttainmentProps {
  educations: EducationalAttainment[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function EducationalAttainmentList({
  educations,
}: EducationalAttainmentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Educational
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {educations.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold text-foreground">
              {item.degree} in {item.field}
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.institution}</span>
              {item.award && (
                <>
                  <span>&middot;</span>
                  <span>{item.award}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatDate(item.startDate)} -{' '}
                {item.endDate ? formatDate(item.endDate) : 'Present'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
