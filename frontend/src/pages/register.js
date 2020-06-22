import React from "react";
import styled from "styled-components";
import RegisterForm from "../components/Register/form";
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

export default function Register() {
  return (
    <Layout
      title="Register"
      allowAll={false}
      allowAuthenticated={false}
      fallback="/play"
    >
      <FlexContainer>
        <div>
          <Heading>Register</Heading>
          <RegisterForm />
        </div>
      </FlexContainer>
    </Layout>
  );
}
