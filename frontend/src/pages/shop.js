import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import AuthContext from "../lib/auth-context";
import api from "../lib/api";
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
  const { addToast } = useToasts();

  const handleShop = async () => {
    try {
      const r = await (
        await fetch(api("/api/shop/buy"), { method: "POST" })
      ).json();

      if (r.success) {
        addToast("You bought a hint card, contact an admin to use it.", {
          appearance: "success",
        });
        setUser(r.user);
      } else {
        addToast(r.message, { appearance: "error" });
      }
    } catch (e) {
      addToast(e.message, { appearance: "error" });
      console.error(e);
    }
  };

  return (
    <>
      <Heading>Shop</Heading>
      <ButtonContainer>
        <Button disabled={user?.hasHintCard} onClick={handleShop}>
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
