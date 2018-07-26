module.exports = {
  siteMetadata: {
    title: 'Fabian Stiehle',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: "posts",
      },
    },
    'gatsby-transformer-remark'
  ],
}
