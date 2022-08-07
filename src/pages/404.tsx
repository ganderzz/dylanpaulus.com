import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { ReactComponent as Missing } from "../icons/missing.svg";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="404: Not found" description="Not Found" />
      <section className="text-center">
        <Missing className="mx-auto" style={{ maxWidth: 600 }} />
        <h1 className="-mt-8">404</h1>
        <p>Howdy there partner. This trail is a dead end.</p>
      </section>
    </Layout>
  );
}
