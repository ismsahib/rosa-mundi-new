import React from "react";
import { useLocation } from "react-router-dom";

import styles from "./styles.m.scss";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={`${styles.search} ${pathname === "/sections" ? styles.color : ""}`}>
        <a href="/#">SEA_RCH</a>
      </div>
      <div className={`${styles.sections} ${pathname === "/sections" ? styles.color : ""}`}>
        <a href="/#">Секции</a>
      </div>
    </header>
  );
};

export default Header;
