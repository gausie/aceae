module.exports = {
  siteMetadata: {
    title: 'aceae',
  },
  plugins: [
    // Plugins
    'gatsby-plugin-react-helmet',
    // Sources
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pieces`,
        name: 'pieces',
      },
    },
    // Transformers
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
  ],
};
