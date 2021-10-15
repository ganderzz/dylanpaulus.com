import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

interface IProps {
  pageContext: Record<"to" | "from", string>[];
}

export default function ExternalLinks({ pageContext }: IProps) {
  return (
    <Layout>
      <SEO description="External Links" title="External Links" keywords={["external links"]} />

      <section className="p-10">
        <h1 className="mt-0 mb-8 border-b pb-4 font-bold">External Links</h1>

        <div className="flex flex-row flex-wrap">
          {Object.values(pageContext)?.map(({ from, to }) => (
            <div key={from} className="my-2 mx-4 p-4 shadow-md border border-gray-200 rounded-md">
              <a href={to} className="block m-0 p-0">
                {from}
              </a>
              <p className="block dark:text-gray-200 text-gray-700 italic text-sm">{to}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
