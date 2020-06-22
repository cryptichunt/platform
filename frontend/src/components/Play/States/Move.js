import React from "react";
import styled from "styled-components";
import { Button } from "../../forms";

const ButtonContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const handleMove = (setUser, setSelectedTile, setSub) => async () => {
  setSub(true);
  const mv = await (await fetch("/api/play/move", { method: "post" })).json();
  setUser(mv.user);
  setSelectedTile(mv.user.currentTileId - 1);
  console.log({ mv });
  setSub(false);
};

export default ({ setUser, setSelectedTile }) => {
  const [sub, setSub] = React.useState(false);

  return (
    <ButtonContainer>
      <Button
        onClick={handleMove(setUser, setSelectedTile, setSub)}
        disabled={sub}
      >
        Move
      </Button>
    </ButtonContainer>
  );
};
