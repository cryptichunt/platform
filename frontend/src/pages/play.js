import React from "react";
import Layout from "../components/Layout/index";

import Grid from "../components/Play/Grid";

export default function Play() {
  return (
    <Layout
      title="Play"
      allowAuthenticated={true}
      allowAll={false}
      fallback="/signin"
    >
      <Grid />
    </Layout>
  );
}
