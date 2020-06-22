import React from "react";
import { Helmet as Head } from "react-helmet";

import AuthCheck from "./AuthCheck";

export default ({
  title,
  children,
  allowAuthenticated,
  allowAll,
  fallback,
}) => {
  return (
    <>
      <Head>
        <title>{title && `${title} | `}Cryptocracy 2020</title>
      </Head>

      <AuthCheck {...{ allowAuthenticated, allowAll, fallback }}>
        <ContentContainer>{children}</ContentContainer>
      </AuthCheck>
    </>
  );
};
