import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SubHeading } from "../components/subheading";

export default function About() {
  return (
    <Layout>
      <SEO
        title="About"
        keywords={[
          `software`,
          `code`,
          `programming`,
          `blog`,
          `portfolio`,
          `react`,
          `typescript`,
          `javascript`,
        ]}
      />
      <section className="sm:p-16 p-6">
        <div className="md:flex sm:block leading-loose">
          <div className="pr-6 md:w-1/2 sm:w-full">
            <SubHeading style={{ marginTop: 0 }}>About</SubHeading>
            Hi, I'm Dylan. <br />A fullstack developer working primarily in
            React and C#. This is a place where I ramble about anything.
            <br />
            <br />
            <em>Hobbies include:</em> Programming, Brazilian Jiu-Jitsu, Drumming
            & Music, Hiking/Backpacking/Camping, Reading
            <div className="text-center mt-8">
              <img
                src={require("../../static/images/about-image.jpg")}
                alt="Image of Dylan playing drums"
                className="shadow"
                style={{
                  width: "100%",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              />
            </div>
          </div>

          <div className="pl-4 md:w-1/2 sm:w-full">
            <SubHeading style={{ marginTop: 0 }}>Current</SubHeading>

            <ul className="list-disc list-inside">
              <li>
                Lead Software Engineer @ Schweitzer Engineering Laboratories
              </li>
            </ul>

            <SubHeading>Past</SubHeading>

            <ul className="list-disc list-inside">
              <li>Software Engineer @ Schweitzer Engineering Laboratories</li>
              <li>
                Associate Software Engineer @ Schweitzer Engineering
                Laboratories
              </li>
              <li>
                <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
                  Web Developer @ Sony Playstation
                </a>
              </li>
              <li>Student Web Developer @ Eastern Washington University</li>
            </ul>

            <SubHeading>Talks</SubHeading>
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
      </section>
    </Layout>
  );
}
