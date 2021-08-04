import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { SubHeading } from "../components/subheading";
import {
  Timeline,
  TimelineContent,
  TimelineItem,
} from "../components/timeline";

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
      <section>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "50%", padding: "1rem" }}>
            <SubHeading style={{ marginTop: 0 }}>About</SubHeading>
            <em>Hi, I'm Dylan.</em>
            <p>
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
            <div>
              <img
                src={"/images/about-image.jpg"}
                alt="Image of Dylan playing drums"
                style={{
                  width: "100%",
                  maxWidth: 500,
                  margin: "0 auto",
                }}
              />

              <figcaption>That's me, the one in the middle!</figcaption>
            </div>
          </div>

          <div style={{ width: "50%", padding: "1rem" }}>
            <SubHeading style={{ marginTop: 0 }}>Experience</SubHeading>

            <Timeline>
              <TimelineItem isActive>
                <TimelineContent title="Lead Software Engineer">
                  Schweitzer Engineering Laboratories
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent title="Software Engineer">
                  Schweitzer Engineering Laboratories
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent title="Associate Software Engineer">
                  Schweitzer Engineering Laboratories
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent
                  title={
                    <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
                      Web Developer
                    </a>
                  }
                >
                  Sony Playstation
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineContent title="Student Web Developer">
                  Eastern Washington University
                </TimelineContent>
              </TimelineItem>
            </Timeline>

            <SubHeading>Talks</SubHeading>
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
      </section>
    </Layout>
  );
}
