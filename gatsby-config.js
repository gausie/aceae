module.exports = {
  siteMetadata: {
    title: 'aceae',
    pathPrefx: '/',
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
    'gatsby-plugin-sharp',
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
