export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  lastModified: string; // ISO timestamp
};