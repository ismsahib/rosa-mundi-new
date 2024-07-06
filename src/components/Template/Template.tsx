import React, { FC, ReactNode } from "react";

import about from "../../assets/images/about.png";
import main from "../../assets/gifs/main.webm";
import search from "../../assets/gifs/search.webm";
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
  if (isVideo(imageURLParameter) === true) return undefined;
  else if (imageURLParameter === "author") return undefined;
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

const isVideo = (file) => {
  const videoExtensions = ["mp4", "mkv", "mov", "avi", "webm"];
  const extension = file.split(".").pop().toLowerCase();
  return videoExtensions.includes(extension);
};

const Template: FC<TemplateProps> = ({ backgroundImage, header, children, footer, headerColor }) => {
  let mediaURL = about;
  switch (backgroundImage) {
    case "main":
      mediaURL = main;
      break;
    case "about":
      mediaURL = about;
      break;
    case "author":
      mediaURL = "author";
      break;
    case "publication":
      mediaURL = "publication";
      break;
    case "search":
      mediaURL = search;
      break;
    default:
      mediaURL = backgroundImage;
      break;
  }
  const mediaType = isVideo(mediaURL);
  return (
    <div className={styles.wrapper} style={getStyle(mediaURL)}>
      {mediaType && (
        <video className={styles.video} autoPlay muted loop>
          <source src={mediaURL} />
        </video>
      )}
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
