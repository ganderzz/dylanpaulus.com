import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SubHeading } from "../components/subheading";

export default function About() {
  return (
    <Layout>
      <SEO
        title="About"
        keywords={[`software`, `code`, `programming`, `blog`, `portfolio`, `react`, `typescript`, `javascript`]}
      />
      <section
        id="main-content"
        tabIndex={-1}
        className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-8"
      >
        <div className="flex flex-col gap-4 leading-loose">
          <div className="flex flex-col md:flex-row w-full">
            <div className="text-center w-full md:w-1/2">
              <img
                src="/images/about-image.jpg"
                alt="Image of Dylan playing drums"
                className="shadow rounded-md m-auto w-full aspect-video"
              />

              <figcaption className="text-sm mt-2">That's me, the one in the middle!</figcaption>
            </div>

            <section className="w-full md:w-1/2 mt-8 md:mt-0 ml-0 md:ml-12">
              <SubHeading className="hidden md:block" style={{ marginTop: 0 }}>
                About
              </SubHeading>
              <em className="text-3xl bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-purple-800 dark:from-blue-100 dark:to-orange-300 font-bold">
                Hi, I'm Dylan.
              </em>

              <p className="text-base">
                I'm an Engineering Manager II at Schweitzer Engineering Laboratories (SEL) working primarily in React,
                C#, Postgres, Docker, Kubernetes, and Redis. Before SEL I was a{" "}
                <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
                  web developer at Sony PlayStation
                </a>
                , and student web developer at Eastern Washington University.
              </p>

              <p className="text-base">
                I play drums in an ok emo/math rock band, <a href="https://griffeymusic.bandcamp.com/">Griffey</a>.
              </p>

              <div className="w-full mt-12">
                <SubHeading>Talks</SubHeading>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <a target="_blank" href="https://introduction-functional-programming-boise.netlify.com/#/">
                      Functional Programming Light (Boise Code Camp 2019)
                    </a>
                  </li>
                  <li>Making React Fast (Internal Presentation 2019)</li>
                  <li>NPM, Dependencies, and JS Modules (Internal Presentation 2021)</li>
                </ul>

                <SubHeading className="my-0">Courses</SubHeading>
                <ul className="list-disc list-inside ml-4">
                  <li className="list-none">
                    <a
                      href="https://www.newline.co/courses/creating-react-libraries-from-scratch"
                      className="block w-2/3 shadow hover:shadow-xl transition transform hover:scale-105 ease-in-out"
                    >
                      <img
                        src={"/images/Course_Card_5_1.png"}
                        alt="Image of Dylan playing drums"
                        className="rounded-md m-auto"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
