import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import styles from "./styles.m.scss";

const Header: FC<{ black: boolean }> = ({ black }) => {
  const { pathname } = useLocation();
  return (
    <header className={styles.header}>
      <div className={`${styles.search} ${black ? styles.color : ""}`}>
        <Link to="/search">SEA_RCH</Link>
      </div>
      <div className={`${styles.sections} ${black ? styles.color : ""}`}>
        <Link to={pathname === "/sections" ? "/digest" : "/sections"}>
          {pathname === "/sections" ? "DIG-est" : "Секции"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
