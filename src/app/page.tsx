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
    id: 'bf5f3852-91eb-4bba-8788-c7501e7b45ca',
    blobId: 'c5682c92-d7af-4daa-a8c3-eace97d692b5',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Generative_AI_Software_Engineering-38f26070-LCXgT1d9jpFe7AcRNkVX0jmb2RSseu.jpeg',
    createdAt: '2026-09-10T14:16:27.124452',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/FZADQFXI97NY?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n',
    description:
      'This specialization builds AI-powered software engineering competencies through four courses covering Claude Code development, AI agents and agentic AI with Python, prompt engineering for ChatGPT, creating custom AI assistants with OpenAI GPTs, orchestrating autonomous agents, managing parallel development workflows, and transforming generative AI tools into domain-expert assistants for complex professional tasks.',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'MAIN',
    title: 'Generative AI Software Engineering',
    updatedAt: '2026-09-10T14:16:27.124466',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: 'd9b4ff83-b5d2-4eec-b2dc-8d4873bc2e6a',
    blobId: '0e2b22c6-2d2a-44b3-a382-6b958ac70d6f',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/AI_Agents_and_Agentic_AI_with_Python___Generative_AI-4198d990-8tSQTDmvomRr0XHqvn6hztnXgiW2JT.jpeg',
    createdAt: '2026-09-10T14:11:53.41144',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/O7Y5YO2HKOGS?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds AI agent development competencies covering Python-based agentic AI systems, designing autonomous agents, implementing agent architectures, integrating generative AI models, building intelligent workflows, creating decision-making systems, developing multi-agent collaboration, orchestrating complex tasks, and applying agentic AI principles to solve real-world problems with practical Python implementations.',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'AI Agents and Agentic AI with Python & Generative AI',
    updatedAt: '2026-09-10T14:11:53.411468',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: 'd7fa2440-dbfe-441c-a9d7-0ad2e6afabde',
    blobId: 'c2abeacd-d7b7-4d84-a0a9-4e5133707992',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Claude_Code__Software_Engineering_with_Generative_AI_Agents-174a1b97-N913096njspruytXDtHvtO9I0shUIp.jpeg',
    createdAt: '2026-09-10T14:11:50.28679',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/57IH48JHP7MZ?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds software engineering competencies covering Claude Code development, building integrated automation systems with AI agents, orchestrating full-stack applications, managing parallel development workflows across multiple git branches, processing data autonomously, analyzing documents, executing complex multi-step workflows, and leveraging generative AI agents for rapid application development.',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'Claude Code: Software Engineering with Generative AI Agents',
    updatedAt: '2026-09-10T14:11:50.286842',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: '751c2c63-ea10-4943-bee7-ec40a5e9ce97',
    blobId: 'f740e1ce-d9ab-4bc1-a044-ebc9fe435bc2',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/OpenAI_GPTs__Creating_Your_Own_Custom_AI_Assistants-069e17dd-wZXXnbmsclYkQstlisAOVdo6oSmpob.jpeg',
    createdAt: '2026-09-10T13:58:29.641188',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/7FCMUSUT431H?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds custom AI assistant development competencies covering OpenAI GPT configuration, designing specialized AI assistants, defining custom instructions and behaviors, integrating knowledge bases, configuring conversation starters, tailoring responses to specific business contexts, deploying custom GPTs, managing assistant capabilities, and transforming generative AI tools into domain-expert assistants for professional tasks.',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'OpenAI GPTs: Creating Your Own Custom AI Assistants',
    updatedAt: '2026-09-10T13:58:29.641209',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    id: '58fcfa12-18c5-4fb5-817a-35a000416af1',
    blobId: '4074560d-0b61-4c45-a235-8ea271cb0744',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Prompt_Engineering_for_ChatGPT-bec251a0-PTqOK381ks2O8cOgbIAbHZ94NWyQTl.jpeg',
    createdAt: '2026-09-10T13:47:53.305067',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/ALFFLMX4Z6UF?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds prompt engineering competencies covering effective prompt design principles, crafting clear and specific instructions, using context and examples, iterative prompt refinement, zero-shot and few-shot learning techniques, chain-of-thought prompting, controlling output format and style, troubleshooting common issues, and optimizing ChatGPT interactions for various professional applications and use cases.',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'Prompt Engineering for ChatGPT',
    updatedAt: '2026-09-10T13:47:53.305087',
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
