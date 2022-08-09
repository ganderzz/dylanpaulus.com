const path = require("path");
const fs = require("fs");
const elasticlunr = require("elasticlunr");

const { createFilePath } = require("gatsby-source-filesystem");

const listComponent = path.resolve("./src/templates/blogList.tsx");
const postComponent = path.resolve(`./src/templates/blogPost.tsx`);
const postsForTag = path.resolve(`./src/templates/postsForTag.tsx`);

/**
 * Generates a `search.json` file for a given list of posts to be queried by elasticlunr.
 */
function createSearchPages(posts) {
  const idx = elasticlunr(() => {
    this.setRef("slug");

    this.addField("title");
    this.addField("tags");
  });

  posts.forEach(({ node }) => {
    idx.addDoc({
      slug: node.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags.join(" "),
    });
  });

  fs.writeFile("search.json", JSON.stringify(idx), function (err) {
    if (err) {
      throw err;
    }

    console.log("Search index is created successfully.");
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data, errors } = await graphql(
    `
      {
        blog: allMdx(
          filter: { fileAbsolutePath: { glob: "**/posts/**/index.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              slug
              frontmatter {
                title
                tags
              }
            }
          }
        }
      }
    `
  );

  if (errors) {
    throw errors;
  }

  const posts = data.blog.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  // create search index json file.
  createSearchPages(posts);

  // Sitemap
  createPage({
    path: `/sitemap/`,
    component: path.resolve(`./src/templates/sitemap.tsx`),
  });

  // Tag pages for looking up similar blog posts
  posts
    .reduce((accu, post) => {
      const tags = post.node.frontmatter.tags;

      if (tags) {
        return [...accu, ...tags];
      }

      return accu;
    }, [])
    .forEach((tag) => {
      createPage({
        path: `/tags/${tag}/`,
        key: tag,
        component: postsForTag,
        context: {
          tag,
        },
      });
    });

  // Paginated list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}/`,
      component: listComponent,
      key: i,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1,
      },
    });
  });

  // Blog post pages
  data.blog.edges.forEach(({ node }) => {
    createPage({
      path: node.slug,
      component: postComponent,
      key: node.slug,
      context: {
        slug: node.slug,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
