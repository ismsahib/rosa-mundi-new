import React, { FC } from "react";

import styles from "./styles.m.scss";

const Title: FC<{ title: string; subtitle: string; black: boolean }> = ({ title, subtitle, black }) => {
  return (
    <div className={styles.titleContainer}>
      <div className={`${styles.title} ${black ? styles.color : ""}`}>{title}</div>
      <div className={`${styles.subtitle} ${black ? styles.color : ""}`}>{subtitle}</div>
    </div>
  );
};

export default Title;
