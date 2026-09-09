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
