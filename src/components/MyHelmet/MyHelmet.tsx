import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface MyHelmetProps {
  title: string;
  description: string;
  image: string;
}
const MyHelmet: FC<MyHelmetProps> = ({ description, image, title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Helmet>
  );
};

export default MyHelmet;
