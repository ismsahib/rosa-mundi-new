export type SearchDataObject = {
  id: string;
  slug: string;
  type: string;
  name: string;
  photo_link?: string;
  content?: string;
};
export type SearchData = SearchDataObject[];
