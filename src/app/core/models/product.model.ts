export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  sourceUrl: string | null;
  createdAt: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  imageUrl?: string;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface ImportRequest {
  url: string;
}

export interface ImportResult {
  totalLinksFound: number;
  added: number;
  skippedDuplicates: number;
  skippedInvalid: number;
}