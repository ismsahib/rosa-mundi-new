import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchGetPublicationByID } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import SectionTemplate from "@root/components/SectionTemplate/SectionTemplate";
import Template from "@root/components/Template/Template";
import { PublicationData } from "@root/types/publication";

import styles from "./styles.m.scss";

const Publication = () => {
  const [data, setData] = useState<PublicationData | "loading" | "error">("loading");
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      (async () => {
        try {
          const response = await fetchGetPublicationByID(id);
          setData(response);
        } catch (error) {
          setData("error");
        }
      })();
    }
  }, [id]);
  return (
    <Template backgroundImage={"publication"} header={true} footer={true} headerColor={true}>
      <div className={styles.title}>ROSAMUNDI</div>
      {data === "loading" && <Loader />}
      {data === "error" && <Error black={true} />}
      {data !== "error" && data !== "loading" && <SectionTemplate type="publication" data={data} />}
    </Template>
  );
};

export default Publication;
