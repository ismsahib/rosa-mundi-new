import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import NotFound from "../NotFound/NotFound";
import { fetchGetDigest } from "@root/api";
import Loader from "@root/components/Loader/Loader";
import MyHelmet from "@root/components/MyHelmet/MyHelmet";
import PreLoader from "@root/components/PreLoader/PreLoader";
import Template from "@root/components/Template/Template";
import { DigestData } from "@root/types/digest";

import { menuItems } from "./config";
import styles from "./styles.m.scss";

const Digest = () => {
  const [data, setData] = useState<DigestData | "init" | "error">("init");
  const [loader, setLoader] = useState(true);

  const title = useRef<HTMLAnchorElement>(null);
  const span = useRef<HTMLSpanElement>(null);
  const authorContainer = useRef<HTMLDivElement>(null);

  const [letterSpacing, setLetterSpacing] = useState("");
  const [digestContainerWidth, setDigestContainerWidth] = useState(1000);

  useEffect(() => {
    if (data !== "init") {
      if (title.current && span.current && authorContainer.current) {
        const containerWidth = title.current.offsetWidth;
        const currentLength = span.current.innerText.length;
        const currentCharWidth = span.current.offsetWidth / currentLength;
        const spaceForChar = containerWidth / currentLength;
        const charWidth = spaceForChar - currentCharWidth + (spaceForChar - currentCharWidth) / currentLength;
        setLetterSpacing(charWidth + "px");
        setDigestContainerWidth(authorContainer.current.offsetWidth);
      }
    }
  }, [data]);

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
    <>
      {data === "error" && <NotFound />}
      {data !== "error" && data !== "init" && (
        <>
          <PreLoader />
          <MyHelmet
            description="Ознакомьтесь со свежими материалами, выходящими на платформе rosamundi, в разделе дайджеста."
            image="https://rosa-mundi.ru/og.jpg"
            title="ROSAMUNDI | Дайджест"
          />
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
            <Link className={styles.title} ref={title} to="/">
              <span ref={span} style={{ letterSpacing: letterSpacing }}>
                ROSAMUNDI
              </span>
            </Link>
            <div className={styles.linebot} />
            <div className={styles.digestContent} ref={authorContainer}>
              {loader ? (
                <Loader />
              ) : (
                data.map((digestItem) => (
                  <div key={digestItem.id}>
                    <Link to={`/section/${digestItem.slug}`} className={styles.digestItem}>
                      <div
                        className={styles.digestContentText}
                        dangerouslySetInnerHTML={{
                          __html: digestItem.content
                            .split("<br /><br>")
                            .filter((item) => item.trim())
                            .join("<br />"),
                        }}
                      />
                      <div className={styles.info}>
                        <div className={styles.author}>
                          {digestContainerWidth > 500
                            ? digestItem.authors.split(", ").length <= 3
                              ? digestItem.authors
                              : digestItem.authors.split(", ").slice(0, 3).join(", ") + " и др."
                            : digestItem.authors.split(", ").length <= 2
                            ? digestItem.authors
                            : digestItem.authors.split(", ").slice(0, 2).join(", ") + " и др."}
                        </div>
                        <div className={styles.name}>{digestItem.name}</div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
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
        </>
      )}
    </>
  );
};

export default Digest;
