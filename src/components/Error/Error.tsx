import React, { FC } from "react";

import styles from "./styles.m.scss";

const Error: FC<{ black: boolean }> = ({ black }) => {
  return <div className={`${styles.error} ${black ? styles.color : ""}`}>НЕ УДАЛОСЬ ЗАГРУЗИТЬ ДАННЫЕ</div>;
};

export default Error;
