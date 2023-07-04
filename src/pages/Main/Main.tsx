import React from "react";
import { Link } from "react-router-dom";

import Template from "@root/components/Template/Template";

import styles from "./styles.m.scss";

const Main = () => {
  return (
    <Template backgroundImage="main" footer={true} header={true}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>ROSAMUNDI</div>
        <div className={styles.subtitle}>ГЛАВНАЯ</div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.menuItem}>
          <Link to="/search" className={styles.menuTitle}>
            SEA_RCH
          </Link>
          <div className={styles.menuDescription}>
            The Search tab will help you to find the specific piece of writing, author, or literally collection.
          </div>
        </div>
        <div className={styles.menuItem}>
          <Link to="/digest" className={styles.menuTitle}>
            DIG-est
          </Link>
          <div className={styles.menuDescription}>
            The Digest tab is a curated collection of the most recent and interesting news, articles, and reviews.
          </div>
        </div>
        <div className={styles.menuItem}>
          <Link to="/about" className={styles.menuTitle}>
            [Π]ληροφορIες
          </Link>
          <div className={styles.menuDescription}>
            The Information tab contains general information about the site, its purpose, and contact information.
          </div>
        </div>
        <div className={styles.menuItem}>
          <Link to="/section" className={styles.menuTitle}>
            Секции
          </Link>
          <div className={styles.menuDescription}>
            The Sections tab contains digital versions of the magazine&apos;s issues.
          </div>
        </div>
      </div>
    </Template>
  );
};

export default Main;
