import React from "react";
import { Link } from "react-router-dom";

import Template from "@root/components/Template/Template";

import styles from "./styles.m.scss";

const NotFound = () => {
  return (
    <Template backgroundImage={"https://media.giphy.com/media/WVgOHto4Packo/giphy.gif"} header={false} footer={false}>
      <div className={styles.text}>
        <h1 className={styles.h1}>You&apos;re lost&hellip;</h1>
        <Link to="/">go back.</Link>
      </div>
    </Template>
  );
};

export default NotFound;
