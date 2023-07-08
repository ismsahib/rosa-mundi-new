import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { fetchGetAuthorByID } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import Title from "@root/components/Title/Title";
import { AuthorData } from "@root/types/author";

import styles from "./styles.m.scss";

const Author = () => {
  const [data, setData] = useState<AuthorData | "loading" | "error">("loading");
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, [id]);
  return (
    <Template backgroundImage="author" footer={true} header={true} headerColor={false}>
      <Title title="ROSAMUNDI" subtitle="AU_teur" black={false} />
      {data === "loading" && <Loader />}
      {data === "error" && <Error black={false} />}
      {data !== "error" && data !== "loading" && (
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
  );
};

export default Author;
