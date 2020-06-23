import React, { useState } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
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

export default ({
  selectedTile,
  setSelectedTile,
  user,
  setUser,
  reload,
  setReload,
}) => {
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  const handleBribe = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/guard/bribe", {
        method: "post",
      })
    ).json();

    if (mv.success) {
      if (mv.message.match(/lost/)) {
        addToast(mv.message, { appearance: "error" });
      } else {
        addToast(mv.message, { appearance: "success" });
      }
    } else {
      addToast(mv.message, { appearance: "error" });
    }

    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);
    setReload(!reload);
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

    if (mv.success) {
      if (mv.message.match(/lost/)) {
        addToast(mv.message, { appearance: "error" });
      } else {
        addToast(mv.message, { appearance: "success" });
      }
    } else {
      addToast(mv.message, { appearance: "error" });
    }

    setUser(mv.user);
    setReload(!reload);
    setSelectedTile(mv.user.currentTileId - 1);
    console.log({ mv });
    setSub(false);
  };

  return (
    <Container>
      <Heading>Guard</Heading>
      <ButtonContainer>
        {/* TODO: add confirmation, this costs 125 points */}
        <Button disabled={sub || user.points < 126} onClick={handleBribe}>
          Bribe
        </Button>
        <Button disabled={sub} onClick={handleFight}>
          Fight
        </Button>
      </ButtonContainer>
    </Container>
  );
};
