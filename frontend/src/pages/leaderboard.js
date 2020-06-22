import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

const Container = styled.div`
  width: 100%;
  margin: 50px 0;
`;

const Table = styled.table`
  max-width: 1200px;
  width: 95%;
  border-collapse: collapse;
  margin: 0 auto;
`;
const Cell = styled.td`
  font-size: 1rem;
  padding: 15px 20px;
  text-align: center;
`;

const Header = styled.tr`
  background: #2977f5;
  * {
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

const HeaderCell = styled(Cell)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
`;

const Row = styled.tr`
  &:nth-child(odd) {
    background: #2977f520;
  }
`;

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function f() {
      const r = await (await fetch("/api/leaderboard/")).json();

      if (r.success) {
        setUsers(r.users);
      }
    }

    f();
  }, []);

  return (
    <Container>
      <Table>
        <Header>
          <HeaderCell>#</HeaderCell>
          <HeaderCell>Username</HeaderCell>
          <HeaderCell>Points</HeaderCell>
          <HeaderCell>Bounty</HeaderCell>
        </Header>
        {users.map((u, i) => (
          <Row>
            <Cell>{i + 1}</Cell>
            <Cell>{u.username}</Cell>
            <Cell>{u.points}</Cell>
            <Cell>{Math.floor(u.points / 10)}</Cell>
          </Row>
        ))}
      </Table>
    </Container>
  );
};

export default () => {
  return (
    <Layout
      title="Leaderboard"
      allowAll={true}
      allowAuthenticated={true}
      fallback="/"
    >
      <Leaderboard />
    </Layout>
  );
};
