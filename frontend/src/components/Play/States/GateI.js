import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { Button } from "../../forms";
import api from "../../../lib/api";

const Container = styled.div`
  margin: 50px auto;
  max-width: 350px;
  min-width: 250px;
  width: 100%;
`;

const Heading = styled.div`
  font-size: 3rem;
  font-weight: bolder;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ({
  selectedTile,
  setSelectedTile,
  setUser,
  reload,
  setReload,
}) => {
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  const handleMove = (goOut, setSub) => async () => {
    try {
      setSub(true);
      const mv = await (
        await fetch(api("/api/play/move"), {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ goOut }),
        })
      ).json();

      if (mv.success) {
        addToast(mv.message, { appearance: "success" });
      } else {
        addToast(mv.message, { appearance: "error" });
      }

      setUser(mv.user);
      setReload(!reload);
      setSelectedTile(mv.user.currentTileId - 1);
      console.log({ mv });
      setSub(false);
    } catch (e) {
      addToast(e.message, { appearance: "error" });
      setSub(false);
    }
  };

  return (
    <Container>
      <Heading>Gate</Heading>
      <ButtonContainer>
        <Button onClick={handleMove(true, setSub)} disabled={sub}>
          Go outside
        </Button>
        <Button onClick={handleMove(false, setSub)} disabled={sub}>
          Stay inside
        </Button>
      </ButtonContainer>
    </Container>
  );
};
