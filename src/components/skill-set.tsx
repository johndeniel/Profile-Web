'use client';

import type { SkillSet } from '@/types';

interface SkillSetProps {
  skills: SkillSet[];
}

export function SkillSetList({ skills }: SkillSetProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Skills
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
          >
            {item.skill}
          </span>
        ))}
      </div>
    </div>
  );
}
