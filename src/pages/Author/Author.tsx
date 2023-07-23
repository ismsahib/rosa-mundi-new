import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import NotFound from "../NotFound/NotFound";
import { fetchGetAuthorBySlug } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import { AuthorData } from "@root/types/author";

import styles from "./styles.m.scss";

const Author = () => {
  const [data, setData] = useState<AuthorData | "init" | "error">("init");
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
          const response = await fetchGetAuthorBySlug(slug);
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
        <Template backgroundImage="author" footer={true} header={true} headerColor={false}>
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
              {data.links.length > 0 && (
                <div className={styles.links}>
                  <div className={styles.linksTitle}>Работы автора:</div>
                  {data.links.map((link) => (
                    <Link
                      to={link.type === "section" ? `/section/thematic/${link.slug}` : `/publication/${link.slug}`}
                      key={link.id}
                      className={styles.link}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </Template>
      )}
    </>
  );
};

export default Author;
