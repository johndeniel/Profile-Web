'use client';

import { useState } from 'react';
import { PersonalInformationCard } from '@/components/personal-information';
import { Contact } from '@/components/contact';
import { SocialLinks } from '@/components/social-links';
import { SkillSetList } from '@/components/skill-set';
import { GitHubProjects } from '@/components/github-projects';
import { GitHubProjectsSkeleton } from '@/components/github-projects-skeleton';
import { CurriculumVitaeList } from '@/components/curriculum-vitae';
import { LicenseCertificateList } from '@/components/license-certificate';
import { useGitHubRepos } from '@/hooks/use-github-repos';
import type {
  PersonalInformation,
  SocialLink,
  SkillSet,
  CurriculumVitae,
  LicenseCertificate,
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
    id: 'cadd56f1-ae57-427c-9cea-c2025926140d',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
  {
    id: 'cadd56f1-ae57-427c-9cea-c2025926140p',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
  {
    id: 'cadd56f1-ae57-427c-9cea-c2025926140e',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
  {
    id: 'cadd56f1-ae57-427c-9cea-c2025926140l',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
  {
    id: 'cadd56f1-ae57-427c-9cea-c2025926p40d',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
  {
    id: 'cadd56f1-ae57-427c-9cea-c2p25926140d',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: 'f16222fc-f471-48a9-8e0a-65a57b362573',
    issued: '2025-07-01T03:26:45.39',
    createdAt: '2026-09-10T11:31:11.294943334',
    updatedAt: '2026-09-10T11:31:11.295112501',
  },
];

const mockLicenseCertificates: LicenseCertificate[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    title: 'AWS Solutions Architect',
    issuer: 'Amazon',
    issued: '2025-01-01T00:00:00',
    level: 'MAIN',
    credentialId: 'AWS-123-456',
    credentialUrl: 'https://aws.amazon.com/verification/123',
    description: 'AWS Certified Solutions Architect - Professional',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: '550e8400-e29b-41d4-a716-446655440000',
    createdAt: '2026-09-08T09:00:00',
    updatedAt: '2026-09-08T09:00:00',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon',
    issued: '2024-06-15T00:00:00',
    level: 'SUB',
    credentialId: 'AWS-123-456',
    credentialUrl: 'https://aws.amazon.com/verification/123',
    description: 'AWS Cloud Practitioner Foundations',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: '550e8400-e29b-41d4-a716-446655440001',
    createdAt: '2026-09-08T09:00:00',
    updatedAt: '2026-09-08T09:00:00',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    title: 'AWS Developer Associate',
    issuer: 'Amazon',
    issued: '2024-09-20T00:00:00',
    level: 'SUB',
    credentialId: 'AWS-123-456',
    credentialUrl: 'https://aws.amazon.com/verification/123',
    description: 'AWS Certified Developer - Associate',
    blobUrl: null,
    blobId: null,
    createdAt: '2026-09-08T09:00:00',
    updatedAt: '2026-09-08T09:00:00',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    title: 'Oracle Java SE Programmer',
    issuer: 'Oracle',
    issued: '2024-06-15T00:00:00',
    level: 'MAIN',
    credentialId: 'ORACLE-JAVA-789',
    credentialUrl: 'https://education.oracle.com/verification/789',
    description: 'Oracle Certified Professional: Java SE 17 Developer',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    createdAt: '2026-09-08T09:00:00',
    updatedAt: '2026-09-08T09:00:00',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c9',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
    title: 'Oracle Java SE Associate',
    issuer: 'Oracle',
    issued: '2023-11-10T00:00:00',
    level: 'SUB',
    credentialId: 'ORACLE-JAVA-789',
    credentialUrl: 'https://education.oracle.com/verification/789',
    description: 'Oracle Certified Associate: Java SE 17 Developer',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/resume-2025-ee3664b6-czJGPLWs9STT7S4yppY6Uwpy9pZDJC.png',
    blobId: '6ba7b810-9dad-11d1-80b4-00c04fd430c9',
    createdAt: '2026-09-08T09:00:00',
    updatedAt: '2026-09-08T09:00:00',
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
          <div className="mt-8">
            <LicenseCertificateList certificates={mockLicenseCertificates} />
          </div>
        </div>
      </div>
    </main>
  );
}
