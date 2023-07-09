import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchGetDigest } from "@root/api";
import Error from "@root/components/Error/Error";
import Loader from "@root/components/Loader/Loader";
import Template from "@root/components/Template/Template";
import { DigestData } from "@root/types/digest";

import { menuItems } from "./config";
import styles from "./styles.m.scss";

const Digest = () => {
  const [data, setData] = useState<DigestData | "loading" | "error">("loading");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);
    (async () => {
      try {
        const response = await fetchGetDigest();
        setData(response);
      } catch (error) {
        setData("error");
      }
    })();
    return () => clearTimeout(timer);
  }, []);
  return (
    <Template backgroundImage="digest" footer={false} header={false}>
      <header className={styles.header}>
        {menuItems.map((item) => (
          <div key={item.name} className={styles.headerItem}>
            {item.name === "ГЛАВНАЯ" || item.name === "СЕКЦИИ" || item.name === "ПОИСК" ? (
              <Link to={item.href}>{item.name}</Link>
            ) : (
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            )}
          </div>
        ))}
      </header>
      <div className={styles.linetop} />
      <div className={styles.title}>
        {"ROSAMUNDI".split("").map((ch, i) => (
          <div key={i} className={styles.ch}>
            {ch}
          </div>
        ))}
      </div>
      <div className={styles.linebot} />
      <div className={styles.digestContent}>
        {(data === "loading" || loader) && <Loader />}
        {data === "error" && !loader && <Error black={false} />}
        {data !== "error" &&
          data !== "loading" &&
          !loader &&
          data.map((digestItem) => (
            <div key={digestItem.id}>
              <Link to={`/section/tematic/${digestItem.id}`} className={styles.digestItem}>
                <div className={styles.digestContentText} dangerouslySetInnerHTML={{ __html: digestItem.content }} />
                <div className={styles.info}>
                  <div className={styles.author}>{digestItem.authors}</div>
                  <div className={styles.name}>{digestItem.name}</div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className={styles.linebottom} />
      <footer className={styles.footer}>
        <div className={styles.footerLink}>
          <a href="mailto:rosa.mundi.redaction@gmail.com" target="_blank" rel="noreferrer">
            contact us any line
          </a>
        </div>
        <div className={styles.footerDescription}>
          если вы считаете, что ваша подборка должна быть опубликована редакцией: <Link to="/about">о нас</Link>
        </div>
      </footer>
    </Template>
  );
};

export default Digest;
