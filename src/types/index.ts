export interface PersonalInformation {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  headline: string;
  blobUrl: string;
  blobId: string;
  emailAddress: string;
  phoneNumber: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  owner: {
    login: string;
  };
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}

export interface SocialLink {
  id: string;
  uploaderId: string;
  platform: string;
  platformUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechStack {
  id: string;
  uploaderId: string;
  tech: string;
  createdAt: string;
  updatedAt: string;
}

export interface CurriculumVitae {
  id: string;
  uploaderId: string;
  blobUrl: string;
  blobId: string;
  issued: string;
  createdAt: string;
  updatedAt: string;
}

export interface LicenseCertificate {
  id: string;
  uploaderId: string;
  title: string;
  issuer: string;
  issued: string;
  level: 'MAIN' | 'SUB';
  credentialId: string | null;
  credentialUrl: string | null;
  description: string | null;
  blobUrl: string | null;
  blobId: string | null;
  createdAt: string;
  updatedAt: string;
}
