module.exports = {
  siteMetadata: {
    title: 'Fabian Stiehle',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              showCaptions: true,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true
            },
          },
          'gatsby-remark-copy-linked-files',
          `gatsby-remark-responsive-iframe`  
        ],
      },
    },
  ],
}
