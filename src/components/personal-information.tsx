'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import bannerImage from '@/assets/fonts/images/photo-1451187580459-43490279c0fa.jpeg';
import type { PersonalInformation } from '@/types';

interface PersonalInformationProps {
  person: PersonalInformation;
}

export function PersonalInformationCard({ person }: PersonalInformationProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-card font-sans">
      <div
        className="h-40 w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImage.src})`,
        }}
      />
      <div className="relative px-8 pb-8">
        <Avatar className="absolute -top-16 left-8 h-32 w-32 border-4 border-card">
          <AvatarImage
            src={person.blobUrl}
            alt={`${person.firstName} ${person.lastName}`}
          />
          <AvatarFallback className="text-3xl font-medium">
            {person.firstName[0]}
            {person.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="ml-36 pt-2 text-left">
          <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">
            {person.firstName} {person.middleName} {person.lastName}
          </h1>
          <p className="text-base text-muted-foreground">{person.headline}</p>
        </div>
      </div>
    </div>
  );
}
