import React, { FC, ReactNode } from "react";

import about from "../../assets/images/about.png";
import main from "../../assets/gifs/main_gif.gif";
import search from "../../assets/gifs/search_gif.gif";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

import styles from "./styles.m.scss";

interface TemplateProps {
  backgroundImage: "main" | "about" | "author" | "publication" | "search" | string;
  header: boolean;
  children: ReactNode;
  footer: boolean;
  headerColor?: boolean;
}
const getStyle = (imageURLParameter: string) => {
  if (imageURLParameter === "author") return undefined;
  else if (imageURLParameter === "publication") return { backgroundColor: "white" };
  else
    return {
      backgroundImage: `url(${imageURLParameter})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor: "black",
      width: "100%",
      height: "100%",
    };
};
const Template: FC<TemplateProps> = ({ backgroundImage, header, children, footer, headerColor }) => {
  let imageURL = about;
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
    case "publication":
      imageURL = "publication";
      break;
    case "search":
      imageURL = search;
      break;
    default:
      imageURL = backgroundImage;
      break;
  }

  return (
    <div className={styles.wrapper} style={getStyle(imageURL)}>
      <div className={styles.content}>
        {header && headerColor !== undefined && <Header black={headerColor} />}
        <div className={styles.children} style={footer ? undefined : { marginBottom: 0 }}>
          {children}
        </div>
        {footer && (
          <div className={styles.footer}>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
