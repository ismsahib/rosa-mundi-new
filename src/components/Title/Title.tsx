import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./styles.m.scss";

const Title: FC<{ title: string; subtitle: string; black: boolean }> = ({ title, subtitle, black }) => {
  const { pathname } = useLocation();
  return (
    <div className={styles.titleContainer}>
      {pathname === "/" ? (
        <div className={`${styles.title} ${black ? styles.color : ""}`}>{title}</div>
      ) : (
        <Link to="/" className={`${styles.title} ${styles.link} ${black ? styles.color : ""}`}>
          {title}
        </Link>
      )}
      <div className={`${styles.subtitle} ${black ? styles.color : ""}`}>{subtitle}</div>
    </div>
  );
};

export default Title;
