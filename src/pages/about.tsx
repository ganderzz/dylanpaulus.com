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
      <section className="sm:p-8 p-4">
        <div className="md:flex sm:block leading-loose">
          <div className="p-4 md:w-1/2 w-full">
            <SubHeading style={{ marginTop: 0 }}>About</SubHeading>
            <em className="text-xl bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-teal-500 font-bold">
              Hi, I'm Dylan.
            </em>
            <p className="text-base">
              A fullstack developer working primarily in React and C#. In the past I was known for my PHP and Scala, but
              those days are long gone. I'm a fan of graphic design/UX, Postgres, Docker/Kubernetes, and teaching. The
              site you are currently looking at was designed to{" "}
              <a href="https://www.hanselman.com/blog/do-they-deserve-the-gift-of-your-keystrokes">save keystrokes</a>.
              <br />
              Let's learn something new together.
              <br />
              <br />
              For questions or inqueries: <a href="mailto:dylanpaulus@hey.com">📧</a>
            </p>
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

              <figcaption class="gatsby-resp-image-figcaption">That's me, the one in the middle!</figcaption>
            </div>
          </div>

          <div className="p-4 md:w-1/2 w-full sm:mt-8 xs:mt-8 md:mt-0">
            <SubHeading style={{ marginTop: 0 }}>Experience</SubHeading>

            <div class="relative ml-4">
              <div class="border-r-2 border-secondary-400 absolute h-full top-0 z-10" style={{ left: 7 }}></div>

              <ul class="list-none m-0 p-0">
                <li class="mb-2">
                  <div class="flex-1 ml-6 font-base text-secondary-400 italic">Now</div>
                </li>

                <li class="mb-8">
                  <div class="flex items-center mb-1">
                    <div class="rounded-full h-4 w-4 relative z-20 bg-gradient-to-r from-blue-500 to-teal-500" />
                    <div class="flex-1 ml-4 font-base">
                      <strong>Lead Software Engineer</strong>
                      <div className="text-gray-600 -mt-2">Schweitzer Engineering Laboratories</div>
                    </div>
                  </div>
                </li>

                <li class="mb-8">
                  <div class="flex items-center mb-1">
                    <div class="bg-secondary-500 rounded-full h-4 w-4 relative z-20" />
                    <div class="flex-1 ml-4 font-base">
                      <strong>Software Engineer</strong>
                      <div className="text-gray-600 -mt-2">Schweitzer Engineering Laboratories</div>
                    </div>
                  </div>
                </li>

                <li class="mb-8">
                  <div class="flex items-center mb-1">
                    <div class="bg-secondary-500 rounded-full h-4 w-4 relative z-20" />
                    <div class="flex-1 ml-4 font-base">
                      <strong>Associate Software Engineer</strong>
                      <div className="text-gray-600 -mt-2">Schweitzer Engineering Laboratories</div>
                    </div>
                  </div>
                </li>

                <li class="mb-8">
                  <div class="flex items-center mb-1">
                    <div class="bg-secondary-500 rounded-full h-4 w-4 relative z-20" />
                    <div class="flex-1 ml-4 font-base">
                      <a href="https://www.mobygames.com/developer/sheet/view/developerId,783203/">
                        <strong>Web Developer</strong> <div className="text-gray-600 -mt-2">Sony Playstation</div>
                      </a>
                    </div>
                  </div>
                </li>

                <li class="mb-2">
                  <div class="flex items-center mb-1">
                    <div class="bg-secondary-500 rounded-full h-4 w-4 relative z-20" />
                    <div class="flex-1 ml-4 font-base">
                      <strong>Student Web Developer</strong>{" "}
                      <div className="text-gray-600 -mt-2">Eastern Washington University</div>
                    </div>
                  </div>
                </li>

                <li>
                  <div class="flex-1 ml-6 font-base text-secondary-400 italic">2013</div>
                </li>
              </ul>
            </div>

            <SubHeading>Talks</SubHeading>
            <ul className="list-disc list-inside">
              <li>
                <a target="_blank" href="https://introduction-functional-programming-boise.netlify.com/#/">
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
