import React from "react";
import styled from "styled-components";

const Big = styled.div`
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  max-width: 450px;
  min-width: 300px;
  width: 95%;
  padding: 30px;
  border-radius: 5px;
  background: #484f54;

  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    width: 90vw;
  }
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 30px;
`;

const Number = styled.div`
  font-size: 25px;
  opacity: 0.5;
`;

const Text = styled.div`
  font-size: 18px;
`;

export default ({ story }) => (
  <Big>
    <Container>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Title>Story</Title>
      </div>
      <Text dangerouslySetInnerHTML={{ __html: story }} />
    </Container>
  </Big>
);
