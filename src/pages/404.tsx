import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { ReactComponent as Missing } from "../icons/missing.svg";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="404: Not found" description="Not Found" />

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignitems: "center",
        }}
      >
        <Missing style={{ maxWidth: 600 }} />
        <h1 style={{ margin: 0 }}>404</h1>
        <p style={{ margin: 0 }}>You hit a route that doesn&#39;t exist..</p>
      </section>
    </Layout>
  );
}
