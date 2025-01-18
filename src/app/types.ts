export interface Profile {
  id: string;
  name: string;
  avatar?: string;
  description: string;
  location: string;
  email: string;
  phone: string;
}

export interface SearchFilters {
  query: string;
  location?: string;
} 