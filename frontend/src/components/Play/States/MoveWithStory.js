import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../forms";
import Story from "../Widgets/story";

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

export default ({ setUser, setSelectedTile, selectedTile }) => {
  const [story, setStory] = useState("");
  const [sub, setSub] = useState(false);

  useEffect(() => {
    async function f() {
      const r = await (
        await fetch("/api/play/story/" + (selectedTile + 1))
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
          onClick={handleMove(setUser, setSelectedTile, setSub)}
          disabled={sub}
        >
          Move
        </Button>
      </ButtonContainer>
      <Story story={story} />
    </>
  );
};
