import type { TechStack } from '@/types';

interface TechStackProps {
  techs: TechStack[];
}

/** Wrap-style pill list of technologies. */
export function TechStackList({ techs }: TechStackProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Tech Stack
        </h3>
      </div>

      {techs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No technologies added yet.
        </p>
      ) : (
        /* Technology pills */
        <ul className="flex flex-wrap gap-2">
          {techs.map((item) => (
            <li
              key={item.id}
              className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {item.tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
