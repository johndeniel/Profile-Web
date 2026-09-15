import type { EducationalAttainment } from '@/types';

interface EducationalAttainmentProps {
  educations: EducationalAttainment[];
}

/** Formats an ISO date string as "Jan 2020". */
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

/** Formats a start/end pair as "Aug 2021 - Jul 2025" ("Present" if ongoing). */
function formatDateRange(startDate: string, endDate: string): string {
  const end = endDate ? formatDate(endDate) : 'Present';

  return `${formatDate(startDate)} - ${end}`;
}

/** Stacked list of education entries with institution, award, and period. */
export function EducationalAttainmentList({
  educations,
}: EducationalAttainmentProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Education
        </h3>
      </div>

      {educations.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No education history added yet.
        </p>
      ) : (
        /* Education entries */
        <div className="flex flex-col gap-4">
          {educations.map((item) => (
            <div key={item.id} className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-foreground">
                {item.degree} in {item.field}
              </h4>

              <div className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                <span>{item.institution}</span>
                {item.award && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span>{item.award}</span>
                  </>
                )}
              </div>

              <div className="text-xs text-muted-foreground">
                {formatDateRange(item.startDate, item.endDate)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
