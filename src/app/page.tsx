'use client';

import { useState } from 'react';
import { PersonalInformationCard } from '@/components/personal-information';
import { Headline } from '@/components/headline';
import { SocialLinks } from '@/components/social-links';
import { TechStackList } from '@/components/tech-stack';
import { ProfessionalExperienceList } from '@/components/professional-experience';
import { EducationalAttainmentList } from '@/components/educational-attainment';
import { GitHubProjects } from '@/components/github-projects';
import { GitHubProjectsSkeleton } from '@/components/github-projects-skeleton';
import { CurriculumVitaeList } from '@/components/curriculum-vitae';
import { LicenseCertificateList } from '@/components/license-certificate';
import { useGitHubRepos } from '@/hooks/use-github-repos';
import {
  mockPersonalInformation,
  mockSocialLinks,
  mockTechStack,
  mockProfessionalExperience,
  mockEducationalAttainment,
  mockCurriculumVitae,
  mockLicenseCertificates,
} from './mock';

import type { PersonalInformation } from '@/types';

export default function HomePage() {
  const [data] = useState<PersonalInformation[]>(mockPersonalInformation);
  const { repos, loading, error } = useGitHubRepos(
    process.env.NEXT_PUBLIC_GITHUB_USERNAME!
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <main className="mx-auto max-w-screen-2xl py-8">
      {data.map((person) => (
        <PersonalInformationCard key={person.id} person={person} />
      ))}
      <div className="mt-8 flex gap-16">
        <div className="flex max-w-xs flex-col gap-4">
          <Headline person={data[0]} />
          <SocialLinks links={mockSocialLinks} />
          <div className="mt-8">
            <TechStackList techs={mockTechStack} />
          </div>
          <div className="mt-8">
            <ProfessionalExperienceList
              experiences={mockProfessionalExperience}
            />
          </div>
          <div className="mt-8">
            <EducationalAttainmentList educations={mockEducationalAttainment} />
          </div>
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
