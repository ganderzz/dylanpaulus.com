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

    <div className="md:flex sm:block leading-loose text-xl">
      <div className="p-6 md:w-1/2 sm:w-full">
        Hi, I'm Dylan <em>(yeah, the url doesn't already give it away!)</em>. A
        fullstack developer working primarily in React and C#(.Net).
      </div>

      <div className="p-6 md:w-1/2 sm:w-full">
        <h4 className="mt-0">Current</h4>

        <ul>
          <li>Lead Software Engineer @ Schweitzer Engineering Laboratories</li>
        </ul>

        <h4 className="mt-4">Previous</h4>

        <ul>
          <li>Software Engineer @ Schweitzer Engineering Laboratories</li>
          <li>
            Associate Software Engineer @ Schweitzer Engineering Laboratories
          </li>
          <li>
            <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
              Web Developer @ Sony Playstation
            </a>
          </li>
          <li>Student Web Developer @ Eastern Washington University</li>
        </ul>

        <h4 className="mt-4">Talks</h4>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://introduction-functional-programming-boise.netlify.com/#/"
            >
              Functional Programming Light (Boise Code Camp 2019)
            </a>
          </li>
        </ul>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
