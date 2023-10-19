import React, { FC } from "react";
import { Link } from "react-router-dom";

import { SearchDataObject } from "@root/types/search";

import styles from "./styles.m.scss";

const Card: FC<{ data: SearchDataObject }> = ({ data }) => {
  return (
    <div className={styles.card}>
      <Link to={`/${data.type}/${data.slug}`} className={styles.cardLink}>
        {!!data.photo_link && (
          <div className={styles.photo}>
            <img src={data.photo_link} alt={data.name} />
          </div>
        )}
        <div className={styles.name}>{data.name}</div>
        {!!data.content && (
          <div
            dangerouslySetInnerHTML={{ __html: data.content.replaceAll("<br>", "") }}
            className={data.photo_link ? styles.content : styles.publication}
          />
        )}
      </Link>
    </div>
  );
};

export default Card;
