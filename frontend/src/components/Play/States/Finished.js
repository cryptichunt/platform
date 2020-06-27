import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TableFlip = styled.div`
  font-size: 1.5rem;
  padding-bottom: 20px;
`;

const Line = styled.div`
  font-size: 1.2rem;
`;

export default () => (
  <Container>
    <TableFlip>(ノಠ益ಠ)ノ彡┻━┻</TableFlip>
    <Line>Fin</Line>
  </Container>
);
