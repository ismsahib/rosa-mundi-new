import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import { fetchGetSectionBySlug } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { SectionData } from "@root/types/section";

const Section: FC<{ typeSection: "thematicPublication" | "section" }> = ({ typeSection }) => {
  const [data, setData] = useState<SectionData | "init" | "error">("init");
  const [loader, setLoader] = useState(true);

  const { slug } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    if (slug) {
      (async () => {
        try {
          const response = await fetchGetSectionBySlug(slug);
          setData(response);
        } catch (error) {
          setData("error");
        }
      })();
    }
    return () => clearTimeout(timer);
  }, [slug]);
  return (
    <>
      {data === "error" && <NotFound />}
      {data !== "error" && data !== "init" && (
        <Template backgroundImage={"publication"} header={true} footer={true} headerColor={true}>
          {loader && <Loader />}
          {!loader && typeSection === "thematicPublication" && (
            <SectionTemplate type="thematicPublication" data={data} />
          )}
          {!loader && typeSection === "section" && <SectionTemplate type="section" data={data} />}
        </Template>
      )}
    </>
  );
};

export default Section;
