import React from "react";

import card from "@assets/images/cardnotfound.png";

import styles from "./styles.m.scss";

const CardNotFound = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardLink}>
        <div className={styles.photo}>
          <img src={card} alt="cnf" />
        </div>
        <div className={styles.name}>Ничего не найдено</div>
        <div className={styles.content}>По вашему запросу ничего не найдено. попробуйте еще раз :) </div>
      </div>
    </div>
  );
};

export default CardNotFound;
