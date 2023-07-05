import React, { FC } from "react";

import styles from "./styles.m.scss";

const Title: FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

export default Title;
