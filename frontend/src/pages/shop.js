import React, { useState, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../lib/auth-context";
import Layout from "../components/Layout";
import { Button } from "../components/forms";

const Heading = styled.div`
  margin-top: 50px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Shop = () => {
  const { user, setUser } = useContext(AuthContext);

  return (
    <>
      <Heading>Shop</Heading>
      <ButtonContainer>
        <Button disabled={user?.hasHintCard}>
          {user?.hasHintCard
            ? "You already have a hint card"
            : "Buy 1 Hint Card"}
        </Button>
      </ButtonContainer>
    </>
  );
};

const FormatLayout = () => {
  return (
    <Layout
      title="Shop"
      allowAuthenticated={true}
      allowAll={false}
      fallback="/signin"
    >
      <Shop />
    </Layout>
  );
};

export default FormatLayout;
