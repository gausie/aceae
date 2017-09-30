const R = require('ramda');
const p = require('path');
const paramCase = require('param-case');

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const pieceTemplate = p.resolve(`src/templates/piece.js`);
  const tagTemplate = p.resolve(`src/templates/tag.js`);

  const { errors, data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
  `);

  if (errors) return Promise.reject(errors);

  const { edges } = data.allMarkdownRemark;

  // Create page for each piece
  const piecePages = R.map(
    R.compose(
      slug => ({
        path: `/${slug}`,
        component: pieceTemplate,
        context: { slug },
      }),
      R.path(['node', 'frontmatter', 'slug'])
    ),
  )(edges);

  // Create page for each tag
  const tagPages = R.compose(
    R.map(tag => ({
      path: `/${tag}`,
      component: tagTemplate,
      context: { tag },
    })),
    R.uniq,
    R.reduce(R.concat, []),
    R.map(R.path(['node', 'frontmatter', 'tags']))
  )(edges);

  return R.forEach(createPage, [...piecePages, ...tagPages]);
};
