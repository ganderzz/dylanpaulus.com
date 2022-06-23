import { Link } from "gatsby";
import React from "react";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import { ReactComponent as Logo } from "../../static/logo.svg";
import SEO from "../components/seo";
import { IResume } from "../interfaces/IResume";
import { SubHeading } from "../components/subheading";
import { Timeline, TimelineItem } from "../components/timeline";
import Layout from "../components/layout";

const pathToGist = "https://gist.githubusercontent.com/ganderzz/244451a55c288a5ee8606e7ab2e64c55/raw/resume.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 900 } },
});

const ResumeBody = () => {
  const { data, isError, isLoading } = useQuery<IResume, Error>(
    ["gistData"],
    () => fetch(pathToGist).then((p) => p.json()),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 0,
    }
  );

  return (
    <Layout>
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

      {isError ? (
        <div role="alert" className="p-4 bg-red-200 text-red-900">
          There was an error while loading Dylan's resume.
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="mx-auto text-center">Loading...</div>
          ) : (
            <main
              id="main-content"
              tabIndex={-1}
              className={`max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto text-base -mt-20`}
            >
              <h2>{data.basics?.label}</h2>
              <p className="mb-12">{data.basics?.summary}</p>

              <section className="flex gap-12 flex-row justify-between">
                <div className="flex-1">
                  <SubHeading>Education</SubHeading>

                  {data.education?.map((item) => (
                    <React.Fragment key={item.institution}>
                      <h6 className="font-bold text-lg">{item.institution}</h6>
                      <p>
                        {item.area} - {item.studyType}
                      </p>
                      <p className="mt-0 mb-4 text-gray-700">
                        {new Date(item.startDate).getFullYear()}-{new Date(item.endDate).getFullYear()}
                      </p>
                    </React.Fragment>
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
                          {new Date(item.startDate).getFullYear()}-{new Date(item.endDate).getFullYear()}
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
          )}
        </>
      )}
    </Layout>
  );
};

export default function Resume() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResumeBody />
    </QueryClientProvider>
  );
}
