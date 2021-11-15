const remarkPlugins = [
  {
    resolve: `gatsby-remark-katex`,
    options: {
      strict: `ignore`,
    },
  },
  {
    resolve: `gatsby-remark-images`,
    options: {
      showCaptions: true,
      withWebp: true,
      quality: 60,
      linkImagesToOriginal: false,
      srcSetBreakpoints: [340, 520, 890],
    },
  },
  {
    resolve: `gatsby-remark-autolink-headers`,
    options: {
      className: "header-link",
      maintainCase: false,
    },
  },
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      classPrefix: "language-",
      inlineCodeMarker: null,
      aliases: {},
      showLineNumbers: false,
    },
  },
  {
    resolve: `gatsby-remark-twitter-cards`,
    options: {
      title: "", // website title
      separator: "", // default
      author: "",
      background: require.resolve("./static/card.png"),
      fontColor: "#FFFFFF", // defaults to white (#ffffff)
      titleFontSize: 96, // default
      subtitleFontSize: 60, // default
      fontStyle: "sans-serif",
      useFrontmatterSlug: false,
    },
  },
  { resolve: `gatsby-remark-copy-linked-files` },
];

module.exports = {
  siteMetadata: {
    title: `Dylan Paulus`,
    description: `Ramblings on software.`,
    author: `@ganderzz`,
    siteUrl: "https://dylanpaulus.com",
    keywords: [
      `software`,
      `code`,
      `programming`,
      `blog`,
      `portfolio`,
      `react`,
      `typescript`,
      `javascript`,
      `webdev`,
      `frontend`,
      `backend`,
      `project management`,
    ],
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    "gatsby-plugin-svgr",
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "posts",
        path: `${__dirname}/posts`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: remarkPlugins,
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `dylan-paulus`,
        short_name: `dp`,
        start_url: `/`,
        background_color: `#5755c9`,
        theme_color: `#5755c9`,
        display: `minimal-ui`,
        icon: `static/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map((edge) => {
                const { frontmatter, slug, html, excerpt } = edge.node;

                return Object.assign({}, frontmatter, {
                  description: excerpt,
                  url: `${site.siteMetadata.siteUrl}/${slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${slug}`,
                  enclosure: {
                    url: `${site.siteMetadata.siteUrl}/twitter-card.jpg`,
                    type: `image/jpg`,
                  },
                  custom_elements: [{ "content:encoded": html }],
                  categories: frontmatter.tags,
                });
              });
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      slug
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Dylan Paulus",
          },
        ],
      },
    },
  ],
};
