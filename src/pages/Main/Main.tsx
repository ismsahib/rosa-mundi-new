import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import MyHelmet from "@root/components/MyHelmet/MyHelmet";
import PreLoader from "@root/components/PreLoader/PreLoader";
import Template from "@root/components/Template/Template";
import Title from "@root/components/Title/Title";

import styles from "./styles.m.scss";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <PreLoader />
      <MyHelmet
        title="ROSAMUNDI"
        description="rosamundi — поэтический проект, вдохновленный философией Д. Андреева."
        image="https://rosa-mundi.ru/og.jpg"
      />
      <Template backgroundImage="main" footer={true} header={true} headerColor={false}>
        <Title title="ROSAMUNDI" subtitle="ГЛАВНАЯ" black={false} />
        <div className={styles.menuContainer}>
          <div className={styles.menuItem}>
            <Link to="/search" className={styles.menuTitle}>
              SEA_RCH
            </Link>
            <div className={styles.menuDescription}>
              The Search tab will help you to find the specific piece of writing, author, or literary collection.
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
            <Link to="/sections" className={styles.menuTitle}>
              Секции
            </Link>
            <div className={styles.menuDescription}>
              The Sections tab contains digital versions of the magazine&apos;s issues.
            </div>
          </div>
        </div>
      </Template>
    </>
  );
};

export default Main;
