'use client';

import { useState } from 'react';
import { PersonalInformationCard } from '@/components/personal-information';
import { Contact } from '@/components/contact';
import { GitHubProjects } from '@/components/github-projects';
import type { PersonalInformation } from '@/types';

const mockPersonalInformation: PersonalInformation[] = [
  {
    id: '1',
    firstName: 'John Deniel',
    middleName: 'Santos',
    lastName: 'Dela Peña',
    headline: 'Junior Java Developer',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/johndeniel-e84c3263-ofh07DeAj1vs5QLeGaOLL6Gf9XMbI0.png',
    blobId: 'avatar-1',
    bannerUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop',
    emailAddress: 'johndenieldelapena97@gmail.com',
    phoneNumber: '09213020765',
    location: 'San Nicolas Bulakan Bulacan, Philippines',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  },
];

export default function HomePage() {
  const [data] = useState<PersonalInformation[]>(mockPersonalInformation);

  if (data.length === 0) {
    return null;
  }

  return (
    <main className="py-8">
      {data.map((person) => (
        <PersonalInformationCard key={person.id} person={person} />
      ))}
      <div className="mt-8 flex gap-16">
        <Contact person={data[0]} />
        <GitHubProjects username="johndeniel" />
      </div>
    </main>
  );
}
