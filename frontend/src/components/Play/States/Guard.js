import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../forms";

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

export default ({ selectedTile, setSelectedTile, setUser }) => {
  const [sub, setSub] = useState(false);

  const handleBribe = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/guard/bribe", {
        method: "post",
      })
    ).json();
    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);
    console.log({ mv });
    setSub(false);
  };

  const handleFight = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/guard/fight", {
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
      <Heading>Guard</Heading>
      <ButtonContainer>
        <Button disabled={sub} onClick={handleBribe}>
          Bribe
        </Button>
        <Button disabled={sub} onClick={handleFight}>
          Fight
        </Button>
      </ButtonContainer>
    </Container>
  );
};
