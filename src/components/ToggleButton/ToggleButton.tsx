/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from "react";

import styles from "./styles.m.scss";

const ToggleButton: FC<{ checked: boolean; id: string; cb: (...args: any) => any }> = ({ checked, id, cb }) => {
  return (
    <>
      <input type="checkbox" id={`${id}`} className={styles.toggleInput} checked={checked} onChange={cb} />
      <label htmlFor={`${id}`} className={styles.toggle}></label>
    </>
  );
};

export default ToggleButton;
