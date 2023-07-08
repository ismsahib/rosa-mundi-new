import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchGetSectionByID } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { SectionData } from "@root/types/section";

const Section: FC<{ typeSection: "tematicPublication" | "section" }> = ({ typeSection }) => {
  const [data, setData] = useState<SectionData | "loading" | "error">("loading");
  const { id } = useParams();

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
      {data !== "error" && data !== "loading" && typeSection === "tematicPublication" && (
        <SectionTemplate type="tematicPublication" data={data} />
      )}
      {data !== "error" && data !== "loading" && typeSection === "section" && (
        <SectionTemplate type="section" data={data} />
      )}
    </Template>
  );
};

export default Section;
