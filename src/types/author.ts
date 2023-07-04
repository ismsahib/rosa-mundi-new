export type AuthorData = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
  photo_link?: string;
  bio?: string;
  links: [
    {
      id: string;
      type: string;
      name: string;
    }
  ];
};

export type AuthorCompactData = {
  id: string;
  last_name: string;
  first_name: string;
  middle_name?: string;
};
