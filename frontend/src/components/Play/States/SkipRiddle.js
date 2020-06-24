import React, { useState } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { Button } from "../../forms";
import api from "../../../lib/api";

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

export default ({ setUser, setSelectedTile, setReload, reload }) => {
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  const handleMove = async () => {
    setSub(true);
    const mv = await (
      await fetch(api("/api/play/move"), {
        method: "post",
        body: JSON.stringify({ skip: true }),
      })
    ).json();
    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);

    if (mv.success) {
      addToast(mv.message, { appearance: "success" });
    } else {
      addToast(mv.message, { appearance: "error" });
    }

    setReload(!reload);
    setSub(false);
  };

  const handleAccept = async () => {
    setSub(true);
    const mv = await (
      await fetch(api("/api/play/riddle/accept"), {
        method: "post",
      })
    ).json();
    setUser(mv.user);
    setSelectedTile(mv.user.currentTileId - 1);

    if (mv.success) {
      addToast(mv.message, { appearance: "success" });
    } else {
      addToast(mv.message, { appearance: "error" });
    }

    setReload(!reload);
    setSub(false);
  };

  return (
    <Container>
      <ButtonContainer>
        {/* TODO: add confirmation, "you will not see this riddle again and will not be able to gain extra points" */}
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
