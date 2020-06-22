import React from "react";
import styled from "styled-components";
import LoginForm from "../components/Login/form";
import Layout from "../components/Layout/index";

const FlexContainer = styled.div`
  min-height: 90vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
`;

export default function Login() {
  return (
    <Layout
      title="Sign In"
      allowAll={false}
      allowAuthenticated={false}
      fallback="/play"
    >
      <FlexContainer>
        <div>
          <Heading>Sign In</Heading>
          <LoginForm />
        </div>
      </FlexContainer>
    </Layout>
  );
}
