const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
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
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;
        const postsPerPage = 6;
        const numPages = Math.ceil(posts.length / postsPerPage);

        const listComponent = path.resolve("./src/templates/blogList.js");
        const postComponent = path.resolve(`./src/templates/blogPost.js`);
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
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: postComponent,
            context: {
              slug: node.fields.slug
            }
          });
        });
      })
    );
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

exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'global.GENTLY': false
      })
    ]
  })
};
