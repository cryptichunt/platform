import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  max-width: 840px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;

const Heading = styled.div`
  margin-top: 50px;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NotFound = () => {
  return (
    <>
      <Container>
        <Heading>Not Found</Heading>
        <p>The page you requested could not be found.</p>
      </Container>
    </>
  );
};

const FormatLayout = () => {
  return (
    <Layout
      title="Not Found"
      allowAuthenticated={true}
      allowAll={true}
      fallback="/"
    >
      <NotFound />
    </Layout>
  );
};

export default FormatLayout;
