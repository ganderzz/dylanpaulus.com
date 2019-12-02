const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data, errors } = await graphql(
    `
      {
        blog: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/posts/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
        books: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/books/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
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
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);

  const listComponent = path.resolve("./src/templates/blogList.js");
  const postComponent = path.resolve(`./src/templates/blogPost.tsx`);
  const bookPostComponent = path.resolve("./src/templates/bookPost.tsx");
  const postsForTag = path.resolve(`./src/templates/postsForTag.js`);
  const siteMap = path.resolve(`./src/templates/sitemap.js`);

  // Sitemap
  createPage({
    path: `/sitemap`,
    component: siteMap
  });

  const tags = posts.reduce((accu, post) => {
    const tags = post.node.frontmatter.tags;

    if (tags) {
      return [...accu, ...tags];
    }

    return accu;
  }, []);

  // Posts for Tag
  tags.forEach(tag => {
    createPage({
      path: `/tags/${tag}`,
      component: postsForTag,
      context: {
        tag
      }
    });
  });

  // Blog Post Lists
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}`,
      component: listComponent,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1
      }
    });
  });

  // Post Pages
  data.blog.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: postComponent,
      context: {
        slug: node.fields.slug
      }
    });
  });

  data.books.edges.forEach(({ node }) => {
    createPage({
      path: "/books" + node.fields.slug,
      component: bookPostComponent,
      context: {
        slug: node.fields.slug
      }
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
      value
    });
  }
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "global.GENTLY": false
      })
    ]
  });
};
