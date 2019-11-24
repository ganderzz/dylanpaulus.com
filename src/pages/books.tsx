import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO
      description="Different books I've read, or are reading."
      title="Books"
      keywords={["books", "report", "post", "reading"]}
    />

    <div className="md:flex sm:block leading-loose">
      <div className="p-0 md:w-full sm:w-full">
        <h3 className="m-0">Books</h3>

        <article className="text-gray-700 text-lg">
          The goal here is to not only highlight books I've enjoyed (or not),
          but as a machanism to solidify my knowlege of a book! The topics will
          be scattered. I enjoy philosophy, psychology, and software-related
          books.
        </article>

        <div className="text-center mt-6">
          <em>Coming soon!</em>
        </div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
