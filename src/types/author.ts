export type AuthorData = {
  id: string;
  slug: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  photo_link?: string;
  bio?: string;
  links: [
    {
      id: string;
      slug: string;
      type: string;
      name: string;
    }
  ];
};

export type AuthorCompactData = {
  id: string;
  slug: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  is_public: boolean;
};
