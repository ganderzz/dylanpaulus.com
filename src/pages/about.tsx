import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SubHeading } from "../components/subheading";
import { Timeline, TimelineItem } from "../components/timeline";

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
      <section className="flex max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto">
        <div className="md:flex sm:block leading-loose">
          <div className="px-8 md:w-1/2 w-full">
            <SubHeading style={{ marginTop: 0 }}>About</SubHeading>
            <em className="text-xl bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-teal-500 font-bold">
              Hi, I'm Dylan.
            </em>
            <p className="text-base">
              A fullstack developer working primarily in React and C#. In the
              past I was known for my PHP and Scala, but those days are long
              gone. I'm a fan of graphic design/UX, Postgres, Docker/Kubernetes,
              and teaching. The site you are currently looking at was designed
              to{" "}
              <a href="https://www.hanselman.com/blog/do-they-deserve-the-gift-of-your-keystrokes">
                save keystrokes
              </a>
              .
              <br />
              Let's learn something new together.
              <br />
              <br />
              For questions or inqueries:{" "}
              <a href="mailto:dylanpaulus@hey.com">📧</a>
            </p>
            <div className="text-center mt-8">
              <img
                src={"/images/about-image.jpg"}
                alt="Image of Dylan playing drums"
                className="shadow"
                style={{
                  width: "100%",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              />

              <figcaption className="gatsby-resp-image-figcaption">
                That's me, the one in the middle!
              </figcaption>
            </div>
          </div>

          <div className="px-8 md:w-1/2 w-full sm:mt-8 xs:mt-8 md:mt-0">
            <SubHeading style={{ marginTop: 0 }}>Experience</SubHeading>

            <Timeline>
              <li class="mb-2">
                <div class="flex-1 ml-6 font-base text-gray-200 dark:text-gray-800 italic">
                  Now
                </div>
              </li>

              <TimelineItem isActive>
                <strong>Lead Software Engineer</strong>
                <div className="text-gray-600 -mt-2">
                  Schweitzer Engineering Laboratories
                </div>
              </TimelineItem>

              <TimelineItem>
                <strong>Software Engineer</strong>
                <div className="text-gray-600 -mt-2">
                  Schweitzer Engineering Laboratories
                </div>
              </TimelineItem>

              <TimelineItem>
                <strong>Associate Software Engineer</strong>
                <div className="text-gray-600 -mt-2">
                  Schweitzer Engineering Laboratories
                </div>
              </TimelineItem>

              <TimelineItem>
                <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
                  <strong>Web Developer</strong>{" "}
                  <div className="text-gray-600 -mt-2">Sony Playstation</div>
                </a>
              </TimelineItem>

              <TimelineItem>
                <strong>Student Web Developer</strong>{" "}
                <div className="text-gray-600 -mt-2">
                  Eastern Washington University
                </div>
              </TimelineItem>

              <li>
                <div class="flex-1 ml-6 font-base text-gray-200 dark:text-gray-800 italic">
                  2013
                </div>
              </li>
            </Timeline>

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
