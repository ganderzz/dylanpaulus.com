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
      <div className="pr-6 md:w-1/2 sm:w-full">
        <h4 className="mt-0 pt-0">About</h4>
        Hi, I'm Dylan. <br />A fullstack developer working primarily in React
        and C#. This is a place where I ramble about anything.
        <br />
        <br />
        <strong>Hobbies:</strong> Programming, Brazilian Jiu-Jitsu, Drumming &
        Music, Hiking/Backpacking/Camping, Reading
        <div className="text-center">
          <img
            src={require("../images/about-image.jpg")}
            alt="Image of Dylan playing drums"
            className="shadow mt-6"
            style={{
              width: "90%",
              maxWidth: 600
            }}
          />
        </div>
      </div>

      <div className="pl-6 md:w-1/2 sm:w-full">
        <h4 className="mt-0 pt-0">Current</h4>

        <ul className="list-disc list-inside">
          <li>Lead Software Engineer @ Schweitzer Engineering Laboratories</li>
        </ul>

        <h4 className="mt-4">Previous</h4>

        <ul className="list-disc list-inside">
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
        <ul className="list-disc list-inside">
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
