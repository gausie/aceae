const R = require('ramda');
const p = require('path');

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const pieceTemplate = p.resolve('src/templates/piece.jsx');
  const tagTemplate = p.resolve('src/templates/tag.jsx');

  const { errors, data } = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            frontmatter {
              order
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
  const slugsByOrder = R.compose(
    R.map(R.path(['node', 'frontmatter', 'slug'])),
    R.sortBy(R.path(['node', 'frontmatter', 'order'])),
  )(edges);

  const piecePages = slugsByOrder.map((slug, i) => ({
    path: `/${slug}`,
    component: pieceTemplate,
    context: { slug, next: slugsByOrder[i - 1], prev: slugsByOrder[i + 1] },
  }));

  // Create page for each tag
  const tagPages = R.compose(
    R.map(tag => ({
      path: `/${tag}`,
      component: tagTemplate,
      context: { tag },
    })),
    R.uniq,
    R.reduce(R.concat, []),
    R.map(R.path(['node', 'frontmatter', 'tags'])),
  )(edges);

  return R.forEach(createPage, [...piecePages, ...tagPages]);
};
