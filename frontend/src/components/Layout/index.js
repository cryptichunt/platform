import React from "react";
import styled from "styled-components";
import { Helmet as Head } from "react-helmet";

import AuthCheck from "./AuthCheck";

const ContentContainer = styled.div`
  min-height: 90vh;
  width: 100%;
  position: relative;
  z-index: 1000;
`;

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
