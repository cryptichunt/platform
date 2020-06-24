import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import api from "../lib/api";

const Terminal = styled.div`
  margin: auto;
  width: 60%;
  color: #eee;
  line-height: 32px;
  * {
    font-family: monospace;
  }
  @media screen and (max-width: 768px) {
    width: 75%;
  }
  div {
    display: inline-block;
    font-size: 18px;
  }
`;

const MainTerminal = styled.div`
  padding: 50px;
`;

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function f() {
      const r = await (await fetch(api("/api/logs/self"))).json();

      if (r.logs) {
        setLogs(r.logs);
      }
    }

    f();
  }, []);

  return (
    <MainTerminal>
      <Terminal>
        {logs.map(({ createdAt, log }, i) => (
          <div key={i} style={{ display: "block" }}>
            {new Date(createdAt).getTime() / 1000} {log}
          </div>
        ))}
      </Terminal>
    </MainTerminal>
  );
};

const FormatLayout = () => {
  return (
    <Layout
      title="Logs"
      allowAuthenticated={true}
      allowAll={false}
      fallback="/"
    >
      <Logs />
    </Layout>
  );
};

export default FormatLayout;
