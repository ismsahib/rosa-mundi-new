import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { fetchGetSectionByID } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { SectionData } from "@root/types/section";

import styles from "./styles.m.scss";

const Section = () => {
  const [data, setData] = useState<SectionData | "loading" | "error">("loading");
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      (async () => {
        try {
          const response = await fetchGetSectionByID(id);
          setData(response);
        } catch (error) {
          setData("error");
        }
      })();
    }
  }, [id]);
  return (
    <Template backgroundImage={"publication"} header={true} footer={true} headerColor={true}>
      {data === "loading" && <Loader />}
      {data === "error" && <Error black={true} />}
      {data !== "error" && data !== "loading" && state.type === "tematicPublication" && (
        <SectionTemplate type="tematicPublication" data={data} />
      )}
      {data !== "error" && data !== "loading" && state.type === "section" && (
        <SectionTemplate type="section" data={data} />
      )}
    </Template>
  );
};

export default Section;
