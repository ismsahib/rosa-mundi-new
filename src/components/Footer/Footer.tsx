import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Icon } from "../Icon/Icon";

import styles from "./styles.m.scss";

const FOOTER_CONTENT: {
  iconName: string;
  href: string;
  image: string;
  image_hover: string;
}[] = [
  {
    iconName: "youtube",
    href: "https://www.youtube.com/@ROSA_MUNDI_REDACTION",
    image: "youtube",
    image_hover: "youtube_hover",
  },
  {
    iconName: "gmail",
    href: "mailto:rosa.mundi.redaction@gmail.com",
    image: "gmail",
    image_hover: "gmail_hover",
  },
  {
    iconName: "logo",
    href: "/",
    image: "logo",
    image_hover: "logo_hover",
  },
  {
    iconName: "vk",
    href: "https://vk.com/rosamundi",
    image: "vk",
    image_hover: "vk_hover",
  },
  {
    iconName: "tg",
    href: "https://t.me/rosa_mundi_tg",
    image: "tg",
    image_hover: "tg_hover",
  },
];
const INITIAL_STATE = { gmail: false, logo: false, tg: false, vk: false, youtube: false };

const Footer = () => {
  const [iconsHover, setIconsHover] = useState<{
    youtube: boolean;
    gmail: boolean;
    logo: boolean;
    vk: boolean;
    tg: boolean;
  }>(INITIAL_STATE);
  return (
    <footer className={styles.footer}>
      {FOOTER_CONTENT.map((item) => (
        <div key={item.iconName} className={styles.logo}>
          {item.iconName === "logo" && (
            <Link
              to={item.href}
              onTouchStart={() => {
                setIconsHover({ ...INITIAL_STATE, [item.iconName]: true });
              }}
              onTouchEnd={() => {
                setIconsHover(INITIAL_STATE);
              }}
              onMouseEnter={() => {
                setIconsHover({ ...INITIAL_STATE, [item.iconName]: true });
              }}
              onMouseLeave={() => {
                setIconsHover(INITIAL_STATE);
              }}
            >
              {iconsHover[item.iconName] ? (
                <Icon name="logo_hover" className={styles.image} key="logo" />
              ) : (
                <Icon name="logo" className={styles.image} key="logo" />
              )}
            </Link>
          )}
          {item.iconName !== "logo" && (
            <a
              href={item.href}
              target="_blank"
              onTouchStart={() => {
                setIconsHover({ ...INITIAL_STATE, [item.iconName]: true });
              }}
              onTouchEnd={() => {
                setIconsHover(INITIAL_STATE);
              }}
              onMouseEnter={() => {
                setIconsHover({ ...INITIAL_STATE, [item.iconName]: true });
              }}
              onMouseLeave={() => {
                setIconsHover(INITIAL_STATE);
              }}
              rel="noreferrer"
            >
              {iconsHover[item.iconName] ? (
                <Icon name={item.image_hover} className={styles.image} key={item.iconName} />
              ) : (
                <Icon name={item.image} className={styles.image} key={item.iconName} />
              )}
            </a>
          )}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
