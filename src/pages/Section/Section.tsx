import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import { fetchGetSectionBySlug } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import MyHelmet from "@root/components/MyHelmet/MyHelmet";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { SectionData } from "@root/types/section";

const Section = () => {
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
        <>
          <MyHelmet
            title={`ROSAMUNDI | ${data.name}`}
            description={`${data.name} — ваш персональный вход в мир поэзии, опубликованной rosamundi.`}
            image="https://rosa-mundi.ru/og.jpg"
          />
          <Template backgroundImage={"publication"} header={true} footer={true} headerColor={true}>
            {loader ? <Loader /> :
             data.publications.length <= 1  ? (
              <SectionTemplate type="noContents" data={data} />
            ) : (
              <SectionTemplate type="Contents" data={data} />
            )}
          </Template>
        </>
      )}
    </>
  );
};

export default Section;
