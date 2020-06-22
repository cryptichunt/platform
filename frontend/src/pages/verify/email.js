import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout/index";

const FlexContainer = styled.div`
  min-height: 90vh;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin: 20px 0;
`;

const Text = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

export default function EmailVerification() {
  const [loading, setLoading] = useState(false);
  const router = useHistory();

  useEffect(() => {
    async function f() {
      const { token } = router.query;

      const r = await (
        await fetch("/api/auth/verification/email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        })
      ).json();

      if (r.success) {
        setLoading(false);
      }
    }

    f();
  });

  return (
    <Layout
      title="Email Verification"
      allowAll={true}
      allowAuthenticated={true}
      fallback="/"
    >
      <FlexContainer>
        <div>
          <Heading>Email Verification</Heading>
          {loading && <Text>Your email has been verified</Text>}
          {!loading && <Text>Your email is being verified</Text>}
        </div>
      </FlexContainer>
    </Layout>
  );
}
