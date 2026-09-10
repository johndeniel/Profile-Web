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
    blobId: 'da192de7-75c9-4474-8e71-58e15e19f1a6',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Accelerate_Your_Job_Search_with_AI-b3d6b078-fEfLSzf9EjSR9VbaJME0KhaGRfXPlG.jpeg',
    createdAt: '2026-09-10T16:04:43.969416',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/9JMGV0BRORYY?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds job search competencies covering AI-powered resume optimization, leveraging AI tools for job applications, creating compelling cover letters, interview preparation using AI resources, personal branding strategies, networking techniques, utilizing job search platforms effectively, and applying artificial intelligence to streamline and enhance the career search process.',
    id: 'd35b7c1b-a2da-4995-b579-4d8460f22360',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Accelerate Your Job Search with AI',
    updatedAt: '2026-09-10T16:04:43.969433',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '601b8fa5-0089-40b3-8024-974000782865',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Agile_Project_Management-8075e8f6-GtZ53bfhZxIXoZU88mgGrpjfFzZpO0.jpeg',
    createdAt: '2026-09-10T16:04:41.647971',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/RR2KPBH2LGVR?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds Agile project management competencies covering Agile philosophy and principles, Scrum framework and ceremonies, sprint planning and execution, user stories and backlog management, Kanban methodology, iterative development processes, team roles in Agile environments, facilitating Scrum events, continuous improvement practices, adaptive planning, and implementing Agile approaches to deliver value-driven projects.',
    id: 'ff0b86d3-202b-4132-a055-239ae289194d',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Agile Project Management',
    updatedAt: '2026-09-10T16:04:41.647995',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '23a91a78-3312-4a86-8320-37a726ae9f03',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Capstone__Applying_Project_Management_in_the_Real_World-d36fdbb6-HOI7kBtsTUz1QkdeLtO32ny9JKpvPt.jpeg',
    createdAt: '2026-09-10T16:04:39.676898',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/09QQYL3772FE?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This capstone course builds integrated project management competencies covering end-to-end project application, comprehensive project documentation, creating project plans and schedules, implementing risk management strategies, applying both traditional and Agile methodologies, solving real-world challenges, stakeholder management, and demonstrating practical skills through hands-on scenario-based problem-solving.',
    id: '616d6d27-8c96-40d8-ba3a-a89db5d2cc9f',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Capstone: Applying Project Management in the Real World',
    updatedAt: '2026-09-10T16:04:39.676937',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '412d24be-f547-44c3-b9c6-3cedae37cefa',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Foundations_of_Project_Management-6cc6640d-u52RBDqkmRDkPIxJZ6qRf61gLrwIhc.jpeg',
    createdAt: '2026-09-10T16:04:37.656475',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/GIBXVW8C19I0?utm_source=android&utm_product=course&utm_content=cert_image&utm_campaign=sharing_cta&utm_medium=certificate',
    description:
      'This course builds foundational project management competencies covering project lifecycles and phases, organizational structures and their impact on projects, defining project goals and scope, stakeholder identification and management, project management methodologies and frameworks, the role and responsibilities of project managers, and essential project management terminology and documentation practices.',
    id: '82eab746-4f1c-4689-a58c-d112c764ebe3',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Foundations of Project Management',
    updatedAt: '2026-09-10T16:04:37.656496',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '8c92304c-d942-4932-bd51-fab3ab669e46',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Google_Project_Management-b3a4b2b4-SD2GCwsV9svsasKl1FBkuF5R2Fdi0z.jpeg',
    createdAt: '2026-09-10T16:04:35.571823',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/M45UWN8Y27S3?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n',
    description:
      'This professional certificate builds comprehensive project management competencies through seven courses covering project foundations, lifecycle management, initiation and stakeholder identification, planning and budgeting, risk management, execution and quality assurance, Agile methodologies, Scrum practices, real-world application, problem-solving, and career preparation strategies.',
    id: '4ae54344-ef60-4951-bccd-b2d0dd07d7f9',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'MAIN',
    title: 'Google Project Management',
    updatedAt: '2026-09-10T16:04:35.57186',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: 'ccbf2922-877e-4ff1-b8fe-44578a483b12',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Project_Execution__Running_the_Project-16826627-GFGpQZcs1uUoTgd6AFAbM78xczPxWn.jpeg',
    createdAt: '2026-09-10T16:04:33.665811',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/BBBR2N8UT4S1?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds project execution competencies covering tracking project progress and performance, managing quality standards and processes, effective team building and leadership, data-driven decision making, stakeholder communication and reporting, risk management during execution, problem-solving and escalation procedures, change management, team motivation and conflict resolution, and utilizing project management tools to ensure successful project delivery.',
    id: '5d417d80-4f25-4ac7-91c7-6f4e447158df',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Project Execution: Running the Project',
    updatedAt: '2026-09-10T16:04:33.665827',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '1ec9a587-8112-4c09-afab-d15b4ae88d12',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Project_Initiation__Starting_a_Successful_Project-ebd0d5c2-Yko6XLHo8LQDjc9cATPRKtIR2oWmtj.jpeg',
    createdAt: '2026-09-10T16:04:31.41254',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/N02ZUFBYN218?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds project initiation competencies covering defining project goals and success criteria, identifying stakeholders and their needs, creating project charters, understanding project scope and deliverables, conducting cost-benefit analysis, establishing project roles and responsibilities, utilizing project management tools and templates, and developing effective communication strategies for project kickoff and stakeholder alignment.',
    id: '161a05a7-dd1c-4ade-a19f-d6f88bc126e9',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Project Initiation: Starting a Successful Project',
    updatedAt: '2026-09-10T16:04:31.412568',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: 'b399c73a-1d49-4b10-b568-4ccb36980732',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Project_Planning__Putting_It_All_Together-ad81d266-E9ejNkauIz10ilpeXnLdIPNFklVapl.jpeg',
    createdAt: '2026-09-10T16:04:29.289096',
    credentialId: 'M45UWN8Y27S3',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/63F3Q4GEHXGE?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds comprehensive project planning competencies covering project schedule development, work breakdown structures, task sequencing and dependencies, budget creation and cost estimation, risk identification and mitigation planning, quality management standards, resource allocation, procurement processes, communication planning, and utilizing project management documentation and tools to create effective project plans.',
    id: '7ba3ec7a-b1a0-4b5c-905d-3aebb87bdb9a',
    issued: '2025-11-16T00:00:00',
    issuer: 'GOOGLE',
    level: 'SUB',
    title: 'Project Planning: Putting It All Together',
    updatedAt: '2026-09-10T16:04:29.28912',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: 'c5682c92-d7af-4daa-a8c3-eace97d692b5',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Generative_AI_Software_Engineering-38f26070-LCXgT1d9jpFe7AcRNkVX0jmb2RSseu.jpeg',
    createdAt: '2026-09-10T14:16:27.124452',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/specialization/FZADQFXI97NY?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Ds12n',
    description:
      'This specialization builds AI-powered software engineering competencies through four courses covering Claude Code development, AI agents and agentic AI with Python, prompt engineering for ChatGPT, creating custom AI assistants with OpenAI GPTs, orchestrating autonomous agents, managing parallel development workflows, and transforming generative AI tools into domain-expert assistants for complex professional tasks.',
    id: 'bf5f3852-91eb-4bba-8788-c7501e7b45ca',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'MAIN',
    title: 'Generative AI Software Engineering',
    updatedAt: '2026-09-10T14:16:27.124466',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '0e2b22c6-2d2a-44b3-a382-6b958ac70d6f',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/AI_Agents_and_Agentic_AI_with_Python___Generative_AI-4198d990-8tSQTDmvomRr0XHqvn6hztnXgiW2JT.jpeg',
    createdAt: '2026-09-10T14:11:53.41144',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/O7Y5YO2HKOGS?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds AI agent development competencies covering Python-based agentic AI systems, designing autonomous agents, implementing agent architectures, integrating generative AI models, building intelligent workflows, creating decision-making systems, developing multi-agent collaboration, orchestrating complex tasks, and applying agentic AI principles to solve real-world problems with practical Python implementations.',
    id: 'd9b4ff83-b5d2-4eec-b2dc-8d4873bc2e6a',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'AI Agents and Agentic AI with Python & Generative AI',
    updatedAt: '2026-09-10T14:11:53.411468',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: 'c2abeacd-d7b7-4d84-a0a9-4e5133707992',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Claude_Code__Software_Engineering_with_Generative_AI_Agents-174a1b97-N913096njspruytXDtHvtO9I0shUIp.jpeg',
    createdAt: '2026-09-10T14:11:50.28679',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/57IH48JHP7MZ?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds software engineering competencies covering Claude Code development, building integrated automation systems with AI agents, orchestrating full-stack applications, managing parallel development workflows across multiple git branches, processing data autonomously, analyzing documents, executing complex multi-step workflows, and leveraging generative AI agents for rapid application development.',
    id: 'd7fa2440-dbfe-441c-a9d7-0ad2e6afabde',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'Claude Code: Software Engineering with Generative AI Agents',
    updatedAt: '2026-09-10T14:11:50.286842',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: 'f740e1ce-d9ab-4bc1-a044-ebc9fe435bc2',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/OpenAI_GPTs__Creating_Your_Own_Custom_AI_Assistants-069e17dd-wZXXnbmsclYkQstlisAOVdo6oSmpob.jpeg',
    createdAt: '2026-09-10T13:58:29.641188',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/7FCMUSUT431H?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds custom AI assistant development competencies covering OpenAI GPT configuration, designing specialized AI assistants, defining custom instructions and behaviors, integrating knowledge bases, configuring conversation starters, tailoring responses to specific business contexts, deploying custom GPTs, managing assistant capabilities, and transforming generative AI tools into domain-expert assistants for professional tasks.',
    id: '751c2c63-ea10-4943-bee7-ec40a5e9ce97',
    issued: '2025-11-09T05:32:46.821',
    issuer: 'Vanderbilt University',
    level: 'SUB',
    title: 'OpenAI GPTs: Creating Your Own Custom AI Assistants',
    updatedAt: '2026-09-10T13:58:29.641209',
    uploaderId: '173e86b0-3ffa-429d-a23b-5b90007f2967',
  },
  {
    blobId: '4074560d-0b61-4c45-a235-8ea271cb0744',
    blobUrl:
      'https://ac7i1iecykk48zds.public.blob.vercel-storage.com/uploads/Prompt_Engineering_for_ChatGPT-bec251a0-PTqOK381ks2O8cOgbIAbHZ94NWyQTl.jpeg',
    createdAt: '2026-09-10T13:47:53.305067',
    credentialId: 'FZADQFXI97NY',
    credentialUrl:
      'https://www.coursera.org/account/accomplishments/verify/ALFFLMX4Z6UF?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse',
    description:
      'This course builds prompt engineering competencies covering effective prompt design principles, crafting clear and specific instructions, using context and examples, iterative prompt refinement, zero-shot and few-shot learning techniques, chain-of-thought prompting, controlling output format and style, troubleshooting common issues, and optimizing ChatGPT interactions for various professional applications and use cases.',
    id: '58fcfa12-18c5-4fb5-817a-35a000416af1',
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
