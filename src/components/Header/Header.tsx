import React, { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.m.scss";

const Header: FC<{ black: boolean }> = ({ black }) => {
  return (
    <header className={styles.header}>
      <div className={`${styles.search} ${black ? styles.color : ""}`}>
        <a href="/#">SEA_RCH</a>
      </div>
      <div className={`${styles.sections} ${black ? styles.color : ""}`}>
        <Link to="/sections">Секции</Link>
      </div>
    </header>
  );
};

export default Header;
