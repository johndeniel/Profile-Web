'use client';

import type { TechStack } from '@/types';

interface TechStackProps {
  techs: TechStack[];
}

export function TechStackList({ techs }: TechStackProps) {
  return (
    <div className="flex flex-col gap-3 pt-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Tech Stack
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {techs.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
          >
            {item.tech}
          </span>
        ))}
      </div>
    </div>
  );
}
