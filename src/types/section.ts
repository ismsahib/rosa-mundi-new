import { PublicationData } from "./publication";

export type SectionData = {
  id: string;
  name: string;
  photo_link?: string;
  publications: PublicationData[];
};

export type SectionCompactData = {
  id: string;
  title: string;
  photo_link?: string;
  description?: string;
};

export type SectionPaginatedData = {
  total: number;
  page: number;
  size: number;
  sections: SectionCompactData[];
};
