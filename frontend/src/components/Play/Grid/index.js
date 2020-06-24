import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";

import { RenderTiles } from "./tile";
import AuthContext from "../../../lib/auth-context";
import UserStates from "../States";

const XScrollable = styled.div`
  overflow-x: auto;
  padding: 0 50px;
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #2977f520;
  }
`;

const Container = styled.div`
  --max-dim: 1100px;
  --min-dim: 700px;
  --dim: calc(100vw - 100px);
  height: var(--dim);
  width: var(--dim);
  max-height: var(--max-dim);
  max-width: var(--max-dim);
  min-height: var(--min-dim);
  min-width: var(--min-dim);
  display: grid;
  margin: 50px auto;
  grid-template-columns: repeat(14, 1fr);
  grid-template-rows: repeat(14, 1fr);
  gap: 2px;
  grid-template-areas:
    "random3 random3 cell21 cell22 cell23 cell24 cell25 cell26 cell27 cell28 cell29 cell30 random4 random4"
    "random3 random3 . . . . . . . . . . random4 random4"
    "cell20 . cell41 cell42 cell43 cell44 cell45 cell46 cell47 cell48 cell49 cell50 . cell31"
    "cell19 . cell76 middle middle middle middle middle middle middle middle cell51 . cell32"
    "cell18 . cell75 middle middle middle middle middle middle middle middle cell52 . cell33"
    "cell17 . cell74 middle middle middle middle middle middle middle middle cell53 . cell34"
    "cell16 . cell73 middle middle middle middle middle middle middle middle cell54 . cell35"
    "cell15 . cell72 middle middle middle middle middle middle middle middle cell55 . cell36"
    "cell14 . cell71 middle middle middle middle middle middle middle middle cell56 . cell37"
    "cell13 . cell70 middle middle middle middle middle middle middle middle cell57 . cell38"
    "cell12 . cell69 middle middle middle middle middle middle middle middle cell58 . cell39"
    "cell11 . cell68 cell67 cell66 cell65 cell64 cell63 cell62 cell61 cell60 cell59 . cell40"
    "random2 random2 . . . . . . . . . . random1 random1"
    "random2 random2 cell10 cell9 cell8 cell7 cell6 cell5 cell4 cell3 cell2 cell1 random1 random1";
`;

const Points = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
`;

export default () => {
  const { user, setUser } = useContext(AuthContext);

  const [selectedTile, setSelectedTile] = useState(
    user ? user.currentTileId - 1 : 0
  );
  const [userState, setUserState] = useState("");
  const [mysteryTileOpen, setMysteryTileOpen] = useState(false);
  const [vTiles, setVTiles] = useState([]);
  const [reload, setReload] = useState(false);

  React.useEffect(() => {
    async function ftch() {
      const r = await (await fetch("/api/play/ping")).json();

      console.log({ r });

      setUserState(r.userState);
      setSelectedTile(r.user.currentTileId - 1);
      setVTiles(r.vTiles);
    }

    ftch();
  }, [reload]);

  const Component = UserStates[userState];

  return (
    <>
      <Points>Points: {user?.points}</Points>
      <XScrollable>
        <Container>
          <RenderTiles
            {...{ selectedTile, setSelectedTile, vTiles, reload, setReload }}
          />
        </Container>
      </XScrollable>
      <Component
        user={user}
        setUser={setUser}
        setSelectedTile={setSelectedTile}
        selectedTile={selectedTile}
        mysteryTileOpen={mysteryTileOpen}
        setMysteryTileOpen={setMysteryTileOpen}
        reload={reload}
        setReload={setReload}
      />
    </>
  );
};
