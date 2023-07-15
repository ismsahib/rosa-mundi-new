import React, { FC, ReactNode } from "react";

import about from "../../assets/images/about.png";
import digest from "../../assets/images/digest.png";
import main from "../../assets/images/main.png";
import search from "../../assets/images/search.png";
import sections from "../../assets/images/sections.png";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import styles from "./styles.m.scss";

interface TemplateProps {
  backgroundImage: "main" | "about" | "author" | "digest" | "publication" | "search" | "sections" | string;
  header: boolean;
  children: ReactNode;
  footer: boolean;
  headerColor?: boolean;
}
const Template: FC<TemplateProps> = ({ backgroundImage, header, children, footer, headerColor }) => {
  let imageURL = main;
  switch (backgroundImage) {
    case "main":
      imageURL = main;
      break;
    case "about":
      imageURL = about;
      break;
    case "author":
      imageURL = "author";
      break;
    case "digest":
      imageURL = digest;
      break;
    case "publication":
      imageURL = "publication";
      break;
    case "search":
      imageURL = search;
      break;
    case "sections":
      imageURL = sections;
      break;
    default:
      imageURL = backgroundImage;
      break;
  }
  return (
    <div
      className={styles.wrapper}
      style={
        imageURL !== "author"
          ? imageURL !== "publication"
            ? {
                backgroundImage: `url(${imageURL})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
              }
            : { backgroundColor: "white" }
          : undefined
      }
    >
      <div className={styles.content}>
        {header && headerColor !== undefined && <Header black={headerColor} />}
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};

export default Template;
