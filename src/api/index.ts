import axios from "axios";

import { AuthorData } from "@root/types/author";
import { DigestData } from "@root/types/digest";
import { PublicationData } from "@root/types/publication";
import { SearchData } from "@root/types/search";
import { SectionData, SectionPaginatedData } from "@root/types/section";

const instance = axios.create({ baseURL: "https://api.rosa-mundi.ru" });

export const fetchGetAuthorByID = async (id: string): Promise<AuthorData> => {
  const { data } = await instance.get(`/v1/authors/${id}`);
  return data;
};

export const fetchGetPublicationByID = async (id: string): Promise<PublicationData> => {
  const { data } = await instance.get(`/v1/publications/${id}`);
  return data;
};

export const fetchGetSectionByID = async (id: string): Promise<SectionData> => {
  const { data } = await instance.get(`/v1/sections/${id}`);
  return data;
};

export const fetchGetSearch = async (search_type: number, query: string): Promise<SearchData> => {
  const { data } = await instance.get("/v1/search", {
    params: { search_type, query },
  });
  return data;
};

export const fetchGetDigest = async (): Promise<DigestData> => {
  const { data } = await instance.get(`/v1/digest`);
  return data;
};

export const fetchGetSections = async (page: number, size: number): Promise<SectionPaginatedData> => {
  const { data } = await instance.get("/v1/sections", {
    params: { page, size },
  });
  return data;
};
