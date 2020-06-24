import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import { Button } from "../../forms";
import Story from "../Widgets/story";
import api from "../../../lib/api";

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
  selectedTile,
  reload,
  setReload,
}) => {
  const [story, setStory] = useState("");
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    async function f() {
      const r = await (
        await fetch(api("/api/play/story/") + (selectedTile + 1))
      ).json();

      if (r.tile) {
        setStory(r.tile.story);
      }
    }

    f();
  });

  return (
    <>
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
      <Story story={story} />
    </>
  );
};
