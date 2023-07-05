import React, { useState } from "react";
import { Link } from "react-router-dom";

import gmail from "@assets/images/gmail.png";
import gmail_hover from "@assets/images/gmail_hover.png";
import logo from "@assets/images/logo.png";
import logo_hover from "@assets/images/logo_hover.png";
import tg from "@assets/images/tg.png";
import tg_hover from "@assets/images/tg_hover.png";
import vk from "@assets/images/vk.png";
import vk_hover from "@assets/images/vk_hover.png";
import youtube from "@assets/images/youtube.png";
import youtube_hover from "@assets/images/youtube_hover.png";

import styles from "./styles.m.scss";

const FOOTER_CONTENT: {
  iconName: string;
  href: string;
  image: string;
  image_hover: string;
}[] = [
  {
    iconName: "youtube",
    href: "/#",
    image: youtube,
    image_hover: youtube_hover,
  },
  {
    iconName: "gmail",
    href: "/#",
    image: gmail,
    image_hover: gmail_hover,
  },
  {
    iconName: "logo",
    href: "/",
    image: logo,
    image_hover: logo_hover,
  },
  {
    iconName: "vk",
    href: "/#",
    image: vk,
    image_hover: vk_hover,
  },
  {
    iconName: "tg",
    href: "/#",
    image: tg,
    image_hover: tg_hover,
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
            <img className={styles.image} src={`${iconsHover[item.iconName] ? item.image_hover : item.image}`} alt="" />
          </Link>
        </div>
      ))}
    </footer>
  );
};

export default Footer;
