import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../forms";

const Container = styled.div`
  margin: 50px auto;
  max-width: 450px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export default ({ setUser, setSelectedTile }) => {
  const [sub, setSub] = useState(false);

  const handleMove = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/move", {
        method: "post",
        body: JSON.stringify({ skip: true }),
      })
    ).json();
    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);
    console.log({ mv });
    setSub(false);
  };

  const handleAccept = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/riddle/accept", {
        method: "post",
      })
    ).json();
    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);
    console.log({ mv });
    setSub(false);
  };

  return (
    <Container>
      <ButtonContainer>
        {/* TODO: add confirmation */}
        <Button disabled={sub} onClick={handleMove}>
          Skip Riddle
        </Button>
        <Button disabled={sub} onClick={handleAccept}>
          Solve Riddle
        </Button>
      </ButtonContainer>
    </Container>
  );
};
