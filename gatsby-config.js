module.exports = {
  siteMetadata: {
    title: `Harness v2 Demo`,
    description: `Harness`,
    author: `Harness Software`,
  },
  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        // This type will contain remote schema Query type
        typeName: `WPGraphQL`,
        // This is field under which it's accessible
        fieldName: `wpgraphql`,
        // Url to query from
        url: `https://3a350127.ngrok.io/graphql`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Harness`,
        short_name: `Harness`,
        start_url: `/`,
        background_color: `#efefef`,
        theme_color: `#3dc133`,
        display: `standalone`,
        icon: `src/images/harness-logo-512.png`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/entry/*`] },
    },
  ],
}
