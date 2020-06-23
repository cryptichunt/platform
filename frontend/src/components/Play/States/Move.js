import React from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { Button } from "../../forms";

const ButtonContainer = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  const mv = await (await fetch("/api/play/move", { method: "post" })).json();
  setUser(mv.user);
  setSelectedTile(mv.user.currentTileId - 1);

  if (mv.success) {
    addToast(mv.message, { appearance: "success" });
  } else {
    addToast(mv.message, { appearance: "error" });
  }

  setSub(false);
  setReload(!reload);
};

export default ({ setUser, setSelectedTile, reload, setReload }) => {
  const [sub, setSub] = React.useState(false);
  const { addToast } = useToasts();

  return (
    <ButtonContainer>
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
