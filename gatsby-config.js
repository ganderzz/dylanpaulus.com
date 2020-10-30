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
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: true,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: "header-link",
              maintainCase: true,
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
        ],
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
    `gatsby-plugin-netlify-cms`,
  ],
};
