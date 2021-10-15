import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SubHeading } from "../components/subheading";
import { Timeline, TimelineContent, TimelineItem } from "../components/timeline";

export default function About() {
  return (
    <Layout>
      <SEO
        title="About"
        keywords={[`software`, `code`, `programming`, `blog`, `portfolio`, `react`, `typescript`, `javascript`]}
      />
      <section className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto mt-8">
        <div className="flex flex-col gap-4 leading-loose">
          <div className="flex flex-col md:flex-row w-full">
            <div className="text-center w-full md:w-1/2">
              <img
                src={"/images/about-image.jpg"}
                alt="Image of Dylan playing drums"
                className="shadow rounded-md m-auto"
                style={{
                  width: "100%",
                }}
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
                A fullstack developer working primarily in React and C#. In the past I was known for my PHP and Scala,
                but those days are long gone. I'm a fan of graphic design/UX, Postgres, Docker/Kubernetes, and teaching.
                The site you are currently looking at was designed to{" "}
                <a
                  title="A link to Scott Hanselman's blog post about 'Do they deserve the gift of your keystrokes'"
                  href="https://www.hanselman.com/blog/do-they-deserve-the-gift-of-your-keystrokes"
                >
                  save keystrokes
                </a>
                .
              </p>

              <p aria-hidden className="text-base">
                For questions or inqueries: <a href="mailto:dylanpaulus@hey.com">📧</a>
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
              {/* 
              <SubHeading className="mt-12">Experience</SubHeading>

              <Timeline>
                <li className="mb-2">
                  <div className="flex-1 ml-6 font-base text-gray-300 dark:text-gray-700 italic">Now</div>
                </li>

                <TimelineItem isActive>
                  <TimelineContent title="Lead Software Engineer">Schweitzer Engineering Laboratories</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineContent title="Software Engineer">Schweitzer Engineering Laboratories</TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineContent title="Associate Software Engineer">
                    Schweitzer Engineering Laboratories
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineContent
                    title={
                      <a
                        title="A link to a list of games Dylan has worked on"
                        href="https://www.mobygames.com/developer/sheet/view/developerId,783203/"
                      >
                        Web Developer
                      </a>
                    }
                  >
                    Sony Playstation
                  </TimelineContent>
                </TimelineItem>

                <TimelineItem>
                  <TimelineContent title="Student Web Developer">Eastern Washington University</TimelineContent>
                </TimelineItem>

                <li>
                  <div className="flex-1 ml-6 font-base text-gray-300 dark:text-gray-700 italic">2013</div>
                </li>
              </Timeline> */}
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
}
