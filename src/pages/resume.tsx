import { Link, Image } from "gatsby";
import React from "react";
import { ReactComponent as Logo } from "../../static/logo.svg";
import SEO from "../components/seo";
import { IResume } from "../interfaces/IResume";
import { SubHeading } from "../components/subheading";
import { Timeline, TimelineItem } from "../components/timeline";

const pathToGist =
  "https://gist.githubusercontent.com/ganderzz/244451a55c288a5ee8606e7ab2e64c55/raw/resume.json";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
});

export default function Resume() {
  const [data, setData] = React.useState<Partial<IResume>>({});

  React.useEffect(() => {
    fetch(pathToGist)
      .then((result) => result.json())
      .then(setData);
  }, []);

  console.log(data);

  return (
    <>
      <SEO
        title="Resume"
        description="Dylan's resume"
        keywords={[
          `software`,
          `code`,
          `programming`,
          `blog`,
          `portfolio`,
          `react`,
          `typescript`,
          `javascript`,
          `resume`,
          `csharp`,
          `postgres`,
          `redis`,
          `docker`,
          `kubernetes`,
        ]}
      />

      <header className="pt-2 sm:pt-10 pl-2 pr-2 h-64 max-w-screen-xl mx-auto">
        <div className="z-10 relative container md:max-w-none mx-auto md:w-full lg:mx-auto h-12 flex justify-between sm:items-center">
          <Link
            to="/"
            className="block relative text-5xl mx-0 font-bold lg:w-1/2 w-full sm:w-1/4 text-white no-underline"
          >
            <Logo style={{ maxWidth: 350, minWidth: 120, width: "100%" }} />
          </Link>

          <aside className="text-white text-right">
            {data.basics?.location && (
              <p className="my-0">
                {data.basics?.location.city}, {data.basics?.location.region}{" "}
                {data.basics?.location.countryCode}
              </p>
            )}

            {data.basics?.email && (
              <a
                className="text-gray-300 hover:text-white hover:underline"
                href={`mailto:${data.basics?.email}`}
              >
                {data.basics?.email}
              </a>
            )}
          </aside>
        </div>

        <div
          aria-hidden="true"
          className="skewed bg-gray-900"
          style={{
            backgroundImage:
              "linear-gradient(524deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 30%,rgba(130, 130, 130,0.04) 30%, rgba(130, 130, 130,0.04) 49%,rgba(31, 31, 31,0.04) 49%, rgba(31, 31, 31,0.04) 100%),linear-gradient(538deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 20%,rgba(130, 130, 130,0.04) 20%, rgba(130, 130, 130,0.04) 60%,rgba(31, 31, 31,0.04) 60%, rgba(31, 31, 31,0.04) 100%),linear-gradient(483deg, rgba(228, 228, 228,0.04) 0%, rgba(228, 228, 228,0.04) 29%,rgba(130, 130, 130,0.04) 29%, rgba(130, 130, 130,0.04) 48%,rgba(31, 31, 31,0.04) 48%, rgba(31, 31, 31,0.04) 100%),linear-gradient(331deg, rgb(17,24,39),rgb(17,24,39))",
          }}
        />
      </header>

      <main
        className={`max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-base -mt-20`}
      >
        <h2>{data.basics?.label}</h2>
        <p className="mb-12">{data.basics?.summary}</p>
        <Image />

        <section className="flex gap-12 flex-row justify-between">
          <div className="flex-1">
            <SubHeading>Education</SubHeading>

            {data.education?.map((item) => (
              <>
                <h6 className="font-bold text-lg">{item.institution}</h6>
                <p>
                  {item.area} - {item.studyType}
                </p>
                <p className="mt-0 mb-4 text-gray-700">
                  {dateFormat.format(new Date(item.startDate))}-
                  {dateFormat.format(new Date(item.endDate))}
                </p>
              </>
            ))}
          </div>

          <div className="flex-1">
            <SubHeading>Experience</SubHeading>

            <Timeline>
              {data.work?.map((item) => (
                <TimelineItem>
                  <h6 className="font-bold text-lg">{item.name}</h6>
                  <p className="mt-0 mb-4 text-gray-700">
                    {item.position}
                    <br />
                    {dateFormat.format(new Date(item.startDate))}-
                    {dateFormat.format(new Date(item.endDate))}
                  </p>

                  <p>{item.summary}</p>

                  {item.highlights && (
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </section>
      </main>
    </>
  );
}
