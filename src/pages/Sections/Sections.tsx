import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchGetSections } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import { SectionPaginatedData } from "@root/types/section";

import styles from "./styles.m.scss";

const SECTIONS_NAMES = ["første sektion", "anden sektion", "tredje sektion", "fjerde sektion", "femte sektion"];
const SECTIONS_NAMES_RU = ["ПЕРВОЙ", "ВТОРОЙ", "ТРЕТЬЕЙ", "ЧЕТВЕРТОЙ", "ПЯТОЙ"];

const Sections = () => {
  const [data, setData] = useState<SectionPaginatedData | "loading" | "error">("loading");
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const response = await fetchGetSections(1, 5);
        setData(response);
      } catch (error) {
        setData("error");
      }
    })();
  }, []);
  return (
    <Template backgroundImage="sections" header={true} footer={true} headerColor={true}>
      <div className={styles.title}>ROSAMUNDI</div>
      {data === "loading" && <Loader />}
      {data === "error" && <Error black={true} />}
      {data !== "error" && data !== "loading" && data.size === 0 && <Loader />}
      {data !== "error" && data !== "loading" && data.size !== 0 && (
        <div className={styles.sectionsContainer}>
          {data.sections
            .reverse()
            .map((section, index) => (
              <div key={section.id} className={styles.section}>
                <div className={styles.sectionItem}>
                  <div className={styles.sectionNumber}>
                    <div>0</div>
                    <div>{index + 1}</div>
                  </div>
                  <Link to={`/section/${section.id}`} className={styles.sectionLink} state={{ type: "section" }}>
                    {SECTIONS_NAMES[index]}
                  </Link>
                  <div className={styles.sectionArrow}>{">"}</div>
                </div>
                <div
                  className={styles.sectionDescription}
                >{`ЗДЕСЬ ВЫ МОЖЕТЕ ОЗНАКОМИТЬСЯ С МАТЕРИАЛАМИ ${SECTIONS_NAMES_RU[index]} СЕКЦИИ`}</div>
              </div>
            ))
            .reverse()}
        </div>
      )}
    </Template>
  );
};
export default Sections;
