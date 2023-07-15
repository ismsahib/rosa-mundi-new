import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import { fetchGetPublicationBySlug } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { PublicationData } from "@root/types/publication";

import styles from "./styles.m.scss";

const Publication = () => {
  const [data, setData] = useState<PublicationData | "init" | "error">("init");
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
          const response = await fetchGetPublicationBySlug(slug);
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
          <Link to="/" className={styles.title}>
            ROSAMUNDI
          </Link>
          {loader ? <Loader /> : <SectionTemplate type="publication" data={data} />}
        </Template>
      )}
    </>
  );
};

export default Publication;
