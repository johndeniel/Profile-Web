'use client';

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

/**
 * Profile homepage: hero card plus a sidebar (headline, links, skills,
 * background) and a main column (projects, CV, certificates).
 * Client-rendered because the GitHub section fetches live repo data.
 */
export default function HomePage() {
  // TODO: replace with API data once the backend is wired up.
  const people: PersonalInformation[] = mockPersonalInformation;
  const { repos, loading, error } = useGitHubRepos(
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? ''
  );

  if (people.length === 0) return null;

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile hero */}
      {people.map((person) => (
        <PersonalInformationCard key={person.id} person={person} />
      ))}

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-16">
        {/* Sidebar: identity, skills, background */}
        <div className="flex w-full flex-col gap-8 lg:max-w-xs lg:shrink-0">
          <Headline person={people[0]} />
          <SocialLinks links={mockSocialLinks} />
          <TechStackList techs={mockTechStack} />
          <ProfessionalExperienceList
            experiences={mockProfessionalExperience}
          />
          <EducationalAttainmentList educations={mockEducationalAttainment} />
        </div>

        {/* Main column: work output */}
        <div className="flex min-h-75 min-w-0 flex-1 flex-col gap-8">
          {error && (
            <div role="alert" className="text-sm text-destructive">
              {error}
            </div>
          )}
          {loading && <GitHubProjectsSkeleton />}
          {!loading && !error && <GitHubProjects repos={repos} />}
          <CurriculumVitaeList cvs={mockCurriculumVitae} />
          <LicenseCertificateList certificates={mockLicenseCertificates} />
        </div>
      </div>
    </main>
  );
}
