import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO
      description=""
      title="About"
      keywords={[
        `software`,
        `code`,
        `programming`,
        `blog`,
        `portfolio`,
        `react`,
        `typescript`,
        `javascript`
      ]}
    />

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 2fr",
        lineHeight: "2.4rem"
      }}
    >
      <div style={{ padding: 20 }}>
        Hi, I'm Dylan. A fullstack developer working primarily in React and
        C#(.Net).
      </div>

      <div style={{ padding: 20 }}>
        <h4 style={{ fontSize: "2rem", margin: 0 }}>Current</h4>

        <ul>
          <li>Software Engineer @ Schweitzer Engineering Laboratories</li>
        </ul>

        <h4 style={{ fontSize: "2rem", margin: 0 }}>Previous</h4>

        <ul>
          <li><a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">Web Developer @ Sony Playstation</a></li>
          <li>Student Web Developer @ Eastern Washington University</li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
