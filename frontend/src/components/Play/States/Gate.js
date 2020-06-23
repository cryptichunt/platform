import React, { useState, useEffect } from "react";
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
  setUser,
  reload,
  setReload,
}) => {
  const [allowedIn, setAllowedIn] = useState(false);
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    async function f() {
      const r = await (await fetch("/api/play/gate/in")).json();

      console.log({ r });

      if (r.allowed) {
        setAllowedIn(true);
      }
    }

    f();
  }, []);

  const handleMove = (goIn, setSub) => async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/move", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goIn }),
      })
    ).json();

    if (mv.success) {
      addToast(mv.message, { appearance: "success" });
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
      <Heading>Gate</Heading>
      <ButtonContainer>
        <Button onClick={handleMove(true, setSub)} disabled={!allowedIn || sub}>
          Go Inside
        </Button>
        <Button onClick={handleMove(false, setSub)} disabled={sub}>
          Stay outside
        </Button>
      </ButtonContainer>
    </Container>
  );
};
