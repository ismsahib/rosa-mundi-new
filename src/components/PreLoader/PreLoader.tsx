import React, { FC, useEffect, useRef } from "react";

import styles from "./styles.m.scss";

const PreLoader: FC<{ backgroundColorWhite?: boolean }> = ({ backgroundColorWhite }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout;

    const onPageLoad = () => {
      return setTimeout(() => {
        if (ref.current) ref.current.style.display = "none";
      }, 1600);
    };

    if (document.readyState === "complete") {
      timeout = onPageLoad();
    } else {
      window.onload = () => (timeout = onPageLoad());
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.loading}
      style={{ backgroundColor: backgroundColorWhite ? "white" : undefined }}
    ></div>
  );
};

export default PreLoader;
