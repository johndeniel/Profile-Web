'use client';

import type { ProfessionalExperience } from '@/types';

interface ProfessionalExperienceProps {
  experiences: ProfessionalExperience[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function ProfessionalExperienceList({
  experiences,
}: ProfessionalExperienceProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Experience
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {experiences.map((item) => (
          <div key={item.id} className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold text-foreground">
              {item.title}
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{item.company}</span>
              <span>&middot;</span>
              <span>{item.type}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>
                {formatDate(item.startDate)} -{' '}
                {item.endDate ? formatDate(item.endDate) : 'Present'}
              </span>
              <span>&middot;</span>
              <span>{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
