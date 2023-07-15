import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import { fetchGetAuthorByID } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import Title from "@root/components/Title/Title";
import { AuthorData } from "@root/types/author";

import styles from "./styles.m.scss";

const Author = () => {
  const [data, setData] = useState<AuthorData | "init" | "error">("init");
  const [loader, setLoader] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    if (id) {
      (async () => {
        try {
          const response = await fetchGetAuthorByID(id);
          setData(response);
        } catch (error) {
          setData("error");
        }
      })();
    }
    return () => clearTimeout(timer);
  }, [id]);
  return (
    <>
      {data === "error" && <NotFound />}
      {data !== "error" && data !== "init" && (
        <Template backgroundImage="author" footer={true} header={true} headerColor={false}>
          <Title title="ROSAMUNDI" subtitle="AU_teur" black={false} />
          {loader ? (
            <Loader />
          ) : (
            <div className={styles.info}>
              <div className={styles.lfname}>{data.last_name + " " + data.first_name}</div>
              {!!data.middle_name && <div className={styles.mname}>{data.middle_name}</div>}
              {(!!data.bio || !!data.photo_link) && (
                <div className={styles.bio}>
                  {!!data.photo_link && (
                    <div className={styles.photo}>
                      <img src={data.photo_link} alt={`${data.first_name} ${data.last_name}`} />
                    </div>
                  )}
                  {!!data.bio && <div className={styles.description}>{data.bio}</div>}
                </div>
              )}
              <div className={styles.links}>
                <div className={styles.linksTitle}>Работы автора:</div>
                {data.links.map((link) => (
                  <Link
                    to={link.type === "section" ? `/section/tematic/${link.id}` : `/publication/${link.id}`}
                    key={link.id}
                    className={styles.link}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Template>
      )}
    </>
  );
};

export default Author;
