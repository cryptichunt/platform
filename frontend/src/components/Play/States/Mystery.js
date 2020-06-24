import React, { useState } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { Button } from "../../forms";
import api from "../../../lib/api";

const ButtonContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 30px;
`;

export const handleMove = (
  setUser,
  setSelectedTile,
  setSub,
  addToast,
  reload,
  setReload
) => async () => {
  setSub(true);
  const mv = await (
    await fetch(api("/api/play/move"), { method: "post" })
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

export default ({
  setUser,
  setSelectedTile,
  mysteryTileOpen,
  reload,
  setReload,
}) => {
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  return (
    <ButtonContainer>
      <Heading>
        {mysteryTileOpen
          ? "The Mystery Tile is open. Please contact an admin for more information."
          : "The mystery tile is closed! Please move forward"}
      </Heading>
      <Button
        onClick={handleMove(
          setUser,
          setSelectedTile,
          setSub,
          addToast,
          reload,
          setReload
        )}
        disabled={sub}
      >
        Move
      </Button>
    </ButtonContainer>
  );
};
