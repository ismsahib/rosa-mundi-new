import React, { FC } from "react";
import { Link } from "react-router-dom";

import Title from "../Title/Title";
import { PublicationData } from "@root/types/publication";
import { SectionData } from "@root/types/section";

import styles from "./styles.m.scss";

interface SectionTemplate {
  type: "publication" | "section" | "tematicPublication";
  data: PublicationData | SectionData;
}
const SectionTemplate: FC<SectionTemplate> = ({ data, type }) => {
  return (
    <>
      {type === "publication" && (
        <div className={styles.publication}>
          <Link to={`/author/${(data as PublicationData).author.slug}`} className={styles.author}>
            {`${(data as PublicationData).author.last_name} ${(data as PublicationData).author.first_name}` +
              ((data as PublicationData).author.middle_name ? ` ${(data as PublicationData).author.middle_name}` : "")}
          </Link>
          <div className={styles.contentName}>{(data as PublicationData).name}</div>
          {!!(data as PublicationData).content && (
            <div
              className={`${styles.content} ${(data as PublicationData).type ? styles.center : ""}`}
              dangerouslySetInnerHTML={{ __html: (data as PublicationData).content as string }}
            />
          )}
        </div>
      )}
      {type === "tematicPublication" && (
        <>
          <Title title="ROSAMUNDI" subtitle={(data as SectionData).name as string} black={true} />
          <div className={styles.publicationContainer}>
            {(data as SectionData).publications.map((publication) => (
              <div key={publication.id} className={styles.publication}>
                <Link to={`/author/${publication.author.slug}`} className={styles.author}>
                  {`${publication.author.last_name} ${publication.author.first_name}` +
                    (publication.author.middle_name ? ` ${publication.author.middle_name}` : "")}
                </Link>
                <div className={styles.contentName}>{publication.name}</div>
                {!!publication.content && (
                  <div
                    className={`${styles.content} ${publication.type ? styles.center : ""}`}
                    dangerouslySetInnerHTML={{ __html: publication.content as string }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {type === "section" && (
        <>
          <Title title="ROSAMUNDI" subtitle={(data as SectionData).name} black={true} />
          <div className={styles.sectionContents}>
            <div className={styles.sectionContentsTitle}>Содержание:</div>
            {(data as SectionData).publications.map((publication) => (
              <a
                href={`#${publication.slug}`}
                key={`${publication.id}_sectionContents`}
                className={styles.sectionContentsItem}
              >
                <div className={styles.sectionContentsAuthor}>
                  {`${publication.author.last_name} ${publication.author.first_name}` +
                    (publication.author.middle_name ? ` ${publication.author.middle_name}` : "") +
                    " — " +
                    publication.name}
                </div>
              </a>
            ))}
          </div>
          <div className={styles.publicationContainer}>
            {(data as SectionData).publications.map((publication) => (
              <div key={publication.id} className={styles.publication} id={publication.slug}>
                <Link to={`/author/${publication.author.slug}`} className={styles.author}>
                  {`${publication.author.last_name} ${publication.author.first_name}` +
                    (publication.author.middle_name ? ` ${publication.author.middle_name}` : "")}
                </Link>
                <div className={styles.contentName}>{publication.name}</div>
                {!!publication.content && (
                  <div
                    className={`${styles.content} ${publication.type ? styles.center : ""}`}
                    dangerouslySetInnerHTML={{ __html: publication.content as string }}
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SectionTemplate;
