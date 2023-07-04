import type { AuthorCompactData } from "./author";

export type PublicationData = {
  id: string;
  name: string;
  type: number;
  content?: string;
  author: AuthorCompactData;
};
