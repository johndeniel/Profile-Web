export interface PersonalInformation {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  headline: string;
  blobUrl: string;
  blobId: string;
  bannerUrl?: string;
  emailAddress: string;
  phoneNumber: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  size: number;
}
