'use client';

import { useState } from 'react';
import { PersonalInformationCard } from '@/components/personal-information';
import { Contact } from '@/components/contact';
import { SocialLinks } from '@/components/social-links';
import { GitHubProjects } from '@/components/github-projects';
import { GitHubProjectsSkeleton } from '@/components/github-projects-skeleton';
import { useGitHubRepos } from '@/hooks/use-github-repos';
import type { PersonalInformation, SocialLink } from '@/types';

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
    emailAddress: 'johndenieldelapena97@gmail.com',
    phoneNumber: '09213020765',
    location: 'San Nicolas Bulakan Bulacan Philippines',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-20T14:45:00Z',
  },
];

const mockSocialLinks: SocialLink[] = [
  {
    id: '9b50206a-fed1-441e-a932-5754626407dd',
    platform: 'LEETCODE',
    platformUrl: 'https://leetcode.com/u/Lu6oIoxumq',
    createdAt: '2026-09-09T17:10:39.358521',
    updatedAt: '2026-09-09T17:10:39.358541',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: 'f9187559-fa90-4945-9fe2-e986245b2e09',
    platform: 'LINKEDIN',
    platformUrl: 'https://www.linkedin.com/in/johndeniel',
    createdAt: '2026-09-09T17:06:31.732116',
    updatedAt: '2026-09-09T17:06:31.73213',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: '0903ebb2-1569-4331-9f73-759b625ee72c',
    platform: 'GITHUB',
    platformUrl: 'https://github.com/johndeniel',
    createdAt: '2026-09-09T17:04:13.930568',
    updatedAt: '2026-09-09T17:04:13.930714',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: '6bf18ece-d961-4114-ae84-c7d8900583d7',
    platform: 'INSTAGRAM',
    platformUrl: 'https://www.instagram.com/johndeniel_',
    createdAt: '2026-09-09T17:02:28.740423',
    updatedAt: '2026-09-09T17:02:28.740444',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
];

export default function HomePage() {
  const [data] = useState<PersonalInformation[]>(mockPersonalInformation);
  const { repos, loading, error } = useGitHubRepos(
    process.env.NEXT_PUBLIC_GITHUB_USERNAME!
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <main className="py-8">
      {data.map((person) => (
        <PersonalInformationCard key={person.id} person={person} />
      ))}
      <div className="mt-8 flex gap-16">
        <div className="flex flex-col gap-8">
          <Contact person={data[0]} />
          <SocialLinks links={mockSocialLinks} />
        </div>
        <div className="flex-1 min-h-75">
          {error && <div className="text-sm text-destructive">{error}</div>}
          {loading && <GitHubProjectsSkeleton />}
          {!loading && !error && <GitHubProjects repos={repos} />}
        </div>
      </div>
    </main>
  );
}
