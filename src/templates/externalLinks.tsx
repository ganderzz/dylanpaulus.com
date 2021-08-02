import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

export default function ExternalLinks({ pageContext }) {
  return (
    <Layout>
      <SEO
        description="External Links"
        title="External Links"
        keywords={["external links"]}
      />

      <section>
        <h1>External Links</h1>

        <div>
          {Object.values(pageContext)?.map(({ from, to }) => (
            <div key={from}>
              <a href={to}>{from}</a>
              <p>{to}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
