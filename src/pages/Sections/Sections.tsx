import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchGetSections } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import { SectionPaginatedData } from "@root/types/section";

import styles from "./styles.m.scss";

const Sections = () => {
  const [data, setData] = useState<SectionPaginatedData | "loading" | "error">("loading");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    (async () => {
      try {
        const response = await fetchGetSections(1, 5);
        setData(response);
      } catch (error) {
        setData("error");
      }
    })();
    return () => clearTimeout(timer);
  }, []);
  return (
    <Template backgroundImage="sections" header={true} footer={true} headerColor={true}>
      <div className={styles.title}>ROSAMUNDI</div>
      {(data === "loading" || loader) && <Loader />}
      {data === "error" && !loader && <Error black={true} />}
      {data !== "error" && data !== "loading" && data.size === 0 && <Loader />}
      {data !== "error" && data !== "loading" && !loader && data.size !== 0 && (
        <div className={styles.sectionsContainer}>
          {data.sections.map((section, index) => (
            <div key={section.id} className={styles.section}>
              <div className={styles.sectionItem}>
                <div className={styles.sectionNumber}>
                  <div>0</div>
                  <div>{5 - index}</div>
                </div>
                <Link to={`/section/${section.id}`} className={styles.sectionLink} state={{ type: "section" }}>
                  {section.title ? section.title : ""}
                </Link>
                <div className={styles.sectionArrow}>{">"}</div>
              </div>
              <div className={styles.sectionDescription}>{section.description ? section.description : ""}</div>
            </div>
          ))}
        </div>
      )}
    </Template>
  );
};
export default Sections;
