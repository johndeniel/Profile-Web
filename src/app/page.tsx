'use client';

import { useState } from 'react';
import { PersonalInformationCard } from '@/components/personal-information';
import { Contact } from '@/components/contact';
import { SocialLinks } from '@/components/social-links';
import { SkillSetList } from '@/components/skill-set';
import { GitHubProjects } from '@/components/github-projects';
import { GitHubProjectsSkeleton } from '@/components/github-projects-skeleton';
import { CurriculumVitaeList } from '@/components/curriculum-vitae';
import { useGitHubRepos } from '@/hooks/use-github-repos';
import type {
  PersonalInformation,
  SocialLink,
  SkillSet,
  CurriculumVitae,
} from '@/types';

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

const mockSkillSet: SkillSet[] = [
  {
    id: '1',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'Java',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'Spring Boot',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '3',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'SQL',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '4',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'Maven',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '5',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'REST API',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '6',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'Git',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '7',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'GitHub',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '8',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    skill: 'Docker',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
];

const mockCurriculumVitae: CurriculumVitae[] = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
    blobId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    issued: '2026-09-10T00:33:08.155Z',
    createdAt: '2026-09-10T00:33:08.156Z',
    updatedAt: '2026-09-10T00:33:08.156Z',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800',
    blobId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    issued: '2025-06-15T00:33:08.155Z',
    createdAt: '2025-06-15T00:33:08.156Z',
    updatedAt: '2025-06-15T00:33:08.156Z',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    blobId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    issued: '2025-01-20T00:33:08.155Z',
    createdAt: '2025-01-20T00:33:08.156Z',
    updatedAt: '2025-01-20T00:33:08.156Z',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    blobId: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    issued: '2024-09-05T00:33:08.155Z',
    createdAt: '2024-09-05T00:33:08.156Z',
    updatedAt: '2024-09-05T00:33:08.156Z',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800',
    blobId: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    issued: '2024-03-12T00:33:08.155Z',
    createdAt: '2024-03-12T00:33:08.156Z',
    updatedAt: '2024-03-12T00:33:08.156Z',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    blobId: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    issued: '2023-11-18T00:33:08.155Z',
    createdAt: '2023-11-18T00:33:08.156Z',
    updatedAt: '2023-11-18T00:33:08.156Z',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800',
    blobId: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    issued: '2023-07-22T00:33:08.155Z',
    createdAt: '2023-07-22T00:33:08.156Z',
    updatedAt: '2023-07-22T00:33:08.156Z',
  },
  {
    id: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    blobId: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
    issued: '2023-02-10T00:33:08.155Z',
    createdAt: '2023-02-10T00:33:08.156Z',
    updatedAt: '2023-02-10T00:33:08.156Z',
  },
  {
    id: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    blobId: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
    issued: '2022-08-05T00:33:08.155Z',
    createdAt: '2022-08-05T00:33:08.156Z',
    updatedAt: '2022-08-05T00:33:08.156Z',
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
        <div className="mt-4 flex max-w-xs flex-col gap-4">
          <Contact person={data[0]} />
          <SocialLinks links={mockSocialLinks} />
          <SkillSetList skills={mockSkillSet} />
        </div>
        <div className="flex-1 min-h-75">
          {error && <div className="text-sm text-destructive">{error}</div>}
          {loading && <GitHubProjectsSkeleton />}
          {!loading && !error && <GitHubProjects repos={repos} />}
          <div className="mt-8">
            <CurriculumVitaeList cvs={mockCurriculumVitae} />
          </div>
        </div>
      </div>
    </main>
  );
}
