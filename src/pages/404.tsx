import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" description="Not Found" />
    <section className="sm:p-16 p-6 pt-10">
      <h1>NOT FOUND 😥</h1>
      <p>You just hit a route that doesn&#39;t exist..</p>
    </section>
  </Layout>
);

export default NotFoundPage;
