import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import bannerImage from '@/assets/images/banner.jpeg';
import type { PersonalInformation } from '@/types';

interface PersonalInformationProps {
  person: PersonalInformation;
}

/** Joins name parts while skipping empty ones (no stray double spaces). */
function getFullName(person: PersonalInformation): string {
  return [person.firstName, person.middleName, person.lastName]
    .filter(Boolean)
    .join(' ');
}

/** Profile hero: banner, overlapping avatar, name, and job title. */
export function PersonalInformationCard({ person }: PersonalInformationProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-card">
      {/* Banner backdrop */}
      <div
        role="img"
        aria-label="Profile banner"
        className="h-40 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerImage.src})` }}
      />

      {/* Avatar overlapping the banner, name offset to clear it */}
      <div className="relative px-4 pb-8 sm:px-8">
        <Avatar className="absolute -top-12 left-4 h-24 w-24 border-4 border-card sm:-top-16 sm:left-8 sm:h-32 sm:w-32">
          <AvatarImage
            src={person.blobUrl}
            alt={`${getFullName(person)}'s profile photo`}
          />
          <AvatarFallback className="text-3xl font-medium">
            {person.firstName[0]}
            {person.lastName[0]}
          </AvatarFallback>
        </Avatar>

        <div className="ml-32 sm:ml-36">
          <h1 className="font-heading pt-2 text-xl font-bold tracking-tight text-foreground">
            {getFullName(person)}
          </h1>
          <p className="text-base text-muted-foreground">{person.title}</p>
        </div>
      </div>
    </div>
  );
}
