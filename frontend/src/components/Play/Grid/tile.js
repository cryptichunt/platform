import React from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import tiles from "./tile-data";
import Middle from "./middle";

export const Random = styled.div`
  --color: ${(props) => (props.selected ? "#2977f5" : "#545454")};

  border: 2px solid var(--color);
  color: var(--color);
  font-size: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 10px;

  @media screen and (max-width: 930px) {
    font-size: 1.5rem;
  }
`;

export const Tile = styled.div`
  --color: ${(props) =>
    props.selected ? "#2977f5" : props.visited ? "#3a3a3a" : "#545454"};

  border: 2px solid var(--color);
  color: var(--color);
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 5px;
  cursor: ${(props) => (props.pointer ? "pointer" : "default")};

  @media screen and (max-width: 930px) {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const shorten = {
  LEVEL: "LVL",
  RAND_PERSON: "RP",
  RAND_CHANCE: "RC",
  STORY: "ST",
  GATEI: "GT",
};

export const RenderTiles = ({ selectedTile, vTiles }) => {
  const { addToast } = useToasts();

  const handleClick = (t, visited, i) => async () => {
    try {
      if (t.type !== "STORY" || !visited) return;

      const r = await (await fetch(`/api/play/story/${i + 1}`)).json();

      if (r.tile?.story) {
        // TODO: show in modal
      }

      console.log({ tile: r });
    } catch (e) {
      addToast(e.message, { appearance: "error" });
    }
  };

  return (
    <>
      {tiles.map((t, i) =>
        t.gridArea.startsWith("cell") ? (
          <Tile
            style={{ gridArea: t.gridArea }}
            key={i}
            selected={selectedTile === i}
            visited={vTiles.indexOf(i + 1) !== -1}
            pointer={vTiles.indexOf(i + 1) !== -1 && t.type === "STORY"}
            onClick={handleClick(t, vTiles.indexOf(i + 1) !== -1, i)}
          >
            {/* TODO: add icon based on type */}
            {t.number} {shorten[t.type]}
          </Tile>
        ) : t.gridArea === "middle" ? (
          <Middle key={i} selected={selectedTile === i} />
        ) : (
          <Random
            style={{ gridArea: t.gridArea }}
            key={i}
            selected={selectedTile === i}
            visited={vTiles.indexOf(i + 1) !== -1}
          >
            {t.type.substring(0, 4)}
          </Random>
        )
      )}
    </>
  );
};
