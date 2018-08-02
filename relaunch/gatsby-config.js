module.exports = {
  siteMetadata: {
    title: 'Fabian Stiehle',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp', 
    `gatsby-transformer-sharp`,    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/data`,
        name: "data",
      },
    },    
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920,
              showCaptions: true,
              linkImagesToOriginal: false,
              sizeByPixelDensity: true
            },
          },
          'gatsby-remark-copy-linked-files',
          `gatsby-remark-responsive-iframe`,          
        ],
      },
    },
  ],
}
