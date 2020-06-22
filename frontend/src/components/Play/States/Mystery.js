import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../forms";

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

export const handleMove = (setUser, setSelectedTile, setSub) => async () => {
  setSub(true);
  const mv = await (await fetch("/api/play/move", { method: "post" })).json();
  setUser(mv.user);
  setSelectedTile(mv.user.currentTileId - 1);
  console.log({ mv });
  setSub(false);
};

export default ({ setUser, setSelectedTile, mysteryTileOpen }) => {
  const [sub, setSub] = useState(false);

  return (
    <ButtonContainer>
      <Heading>
        {mysteryTileOpen
          ? "The Mystery Tile is open. Please contact an admin for more information."
          : "The mystery tile is closed! Please move forward"}
      </Heading>
      <Button
        onClick={handleMove(setUser, setSelectedTile, setSub)}
        disabled={sub}
      >
        Move
      </Button>
    </ButtonContainer>
  );
};
