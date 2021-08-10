const remarkPlugins = [
  {
    resolve: `gatsby-remark-katex`,
    options: {
      // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
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
  `gatsby-remark-copy-linked-files`,
];

module.exports = {
  siteMetadata: {
    title: `Dylan Paulus`,
    description: `Ramblings on software engineering`,
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: remarkPlugins,
      },
    },
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
        path: `${__dirname}/posts`,
        name: "posts",
        ignore: [`**/\.*`],
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const { frontmatter, fields, html, excerpt } = edge.node;

                return Object.assign({}, frontmatter, {
                  description: excerpt,
                  date: frontmatter.date,
                  url: site.siteMetadata.siteUrl + fields.slug,
                  guid: site.siteMetadata.siteUrl + fields.slug,
                  enclosure: frontmatter.image && {
                    url: `${site.siteMetadata.siteUrl}/${frontmatter.image.relativePath}`,
                    length: `${frontmatter.image.size}`,
                    type: `image/${frontmatter.image.extension}`,
                  },
                  custom_elements: [{ "content:encoded": html }],
                });
              });
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        image {
                          relativePath
                          size
                          extension
                        }
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
