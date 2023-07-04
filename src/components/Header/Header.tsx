import React from "react";

import styles from "./styles.m.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <a href="/#">SEA_RCH</a>
      </div>
      <div className={styles.sections}>
        <a href="/#">Секции</a>
      </div>
    </header>
  );
};

export default Header;
