import type { ProfessionalExperience } from '@/types';

interface ProfessionalExperienceProps {
  experiences: ProfessionalExperience[];
}

/** Formats an ISO date string as "Jan 2020". */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** Formats a start/end pair as "Oct 2025 - Jun 2026" ("Present" if ongoing). */
function formatDateRange(startDate: string, endDate: string): string {
  const end = endDate ? formatDate(endDate) : 'Present';

  return `${formatDate(startDate)} - ${end}`;
}

/** Stacked list of work entries with role, company, period, and location. */
export function ProfessionalExperienceList({
  experiences,
}: ProfessionalExperienceProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Experience
        </h3>
      </div>

      {experiences.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No professional experience added yet.
        </p>
      ) : (
        /* Experience entries */
        <div className="flex flex-col gap-4">
          {experiences.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-foreground">
                {item.title}
              </h4>

              <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                <span>{item.company}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{item.type}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span>{formatDateRange(item.startDate, item.endDate)}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
