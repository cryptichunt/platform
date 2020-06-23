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

export default ({ setSelectedTile, setUser, reload, setReload }) => {
  const [sub, setSub] = useState(false);
  const { addToast } = useToasts();

  const handleBribe = async () => {
    setSub(true);
    const mv = await (
      await fetch("/api/play/jail/bribe", {
        method: "post",
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
      <Heading>You are in Jail</Heading>
      {/* TODO: add confirmation, this costs 50 points */}
      <Button onClick={handleBribe} disabled={sub}>
        Bribe and Escape
      </Button>
    </Container>
  );
};
