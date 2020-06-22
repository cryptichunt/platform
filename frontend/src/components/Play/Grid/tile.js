import React from "react";
import styled from "styled-components";
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
  --color: ${(props) => (props.selected ? "#2977f5" : "#545454")};

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
};

export const RenderTiles = ({ selectedTile }) => {
  return (
    <>
      {tiles.map((t, i) =>
        t.gridArea.startsWith("cell") ? (
          <Tile
            style={{ gridArea: t.gridArea }}
            key={i}
            selected={selectedTile === i}
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
          >
            {t.type.substring(0, 4)}
          </Random>
        )
      )}
    </>
  );
};
