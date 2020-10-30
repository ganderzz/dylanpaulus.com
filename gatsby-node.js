const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const redirects = [
  {
    fromPath: "2020-02-04-making-react-fast",
    toPath: "making-react-fast",
  },
  {
    fromPath: "2019-12-29-2020-albums-decade",
    toPath: "albums-2010-2020-decade",
  },
  {
    fromPath: "2019-12-01-lost-connections",
    toPath: "lost-connections",
  },
  {
    fromPath: "2019-11-24-how-fb-avoids-adblockers",
    toPath: "how-fb-avoids-adblockers",
  },
  {
    fromPath: "2015-11-17-intro-to-flight-js",
    toPath: "intro-to-flight-js",
  },
  {
    fromPath: "2019-07-21-clean-code",
    toPath: "clean-code",
  },
  {
    fromPath: "2019-06-17-level-terminal-navigation",
    toPath: "level-terminal-navigation",
  },
  {
    fromPath: "2019-03-31-functional-programming",
    toPath: "intro-functional-programming",
  },
  {
    fromPath: "2018-11-03-introducing-react-scroll-to-v2",
    toPath: "introducing-react-scroll-to-v2",
  },
  {
    fromPath: "2018-10-18-react-controlling-rendering-with-keys",
    toPath: "react-controlling-rendering-with-keys",
  },
  {
    fromPath: "2018-10-11-tips-on-improving-fabricjs-speed",
    toPath: "tips-on-improving-fabricjs-speed",
  },
];

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  const { data, errors } = await graphql(
    `
      {
        blog: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/posts/**/index.md" } }
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

  const listComponent = path.resolve("./src/templates/blogList.tsx");
  const postComponent = path.resolve(`./src/templates/blogPost.tsx`);
  const postsForTag = path.resolve(`./src/templates/postsForTag.tsx`);

  // Sitemap
  createPage({
    path: `/sitemap/`,
    component: path.resolve(`./src/templates/sitemap.tsx`),
  });

  const tags = posts.reduce((accu, post) => {
    const tags = post.node.frontmatter.tags;

    if (tags) {
      return [...accu, ...tags];
    }

    return accu;
  }, []);

  // Posts for Tag
  tags.forEach((tag) => {
    createPage({
      path: `/tags/${tag}/`,
      component: postsForTag,
      context: {
        tag,
      },
    });
  });

  // Blog Post Lists
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/${i + 1}/`,
      component: listComponent,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages: numPages,
        currentPage: i + 1,
      },
    });
  });

  // Post Pages
  data.blog.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: postComponent,
      context: {
        slug: node.fields.slug,
      },
    });
  });

  // Redirects
  redirects.forEach((redirect) =>
    createRedirect({
      ...redirect,
      isPermanent: true,
      redirectInBrowser: true,
    })
  );
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

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        "global.GENTLY": false,
      }),
    ],
  });
};
