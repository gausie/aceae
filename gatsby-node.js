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
            fields {
              slug
            }
            frontmatter {
              order
              tags
            }
          }
        }
      }
    }
  `);

  if (errors) return Promise.reject(errors);

  const selectOrder = R.path(['frontmatter', 'order']);
  const selectSlug = R.path(['fields', 'slug']);
  const selectTags = R.path(['frontmatter', 'tags']);

  const pieces = data.allMarkdownRemark.edges.map(R.prop('node'));
  const piecesByOrder = R.sort(R.descend(selectOrder), pieces);

  const findNextByTag = (tag, current) => R.find(R.compose(
    R.contains(tag),
    selectTags,
  ), R.drop(current + 1, piecesByOrder));

  const lastByTag = {};
  const allTags = new Set();

  const piecePages = piecesByOrder.map((piece, i) => {
    const tags = selectTags(piece);
    const slug = selectSlug(piece);

    const directions = tags.reduce(
      (acc, tag) => ({
        ...acc,
        [tag]: [lastByTag[tag], selectSlug(findNextByTag(tag, i))],
      }),
      { '*': [
        selectSlug(piecesByOrder[i - 1]),
        selectSlug(piecesByOrder[i + 1]),
      ] },
    );

    tags.forEach((tag) => {
      allTags.add(tag);
      lastByTag[tag] = slug;
    });

    return {
      path: `/${slug}`,
      component: pieceTemplate,
      context: { slug, directions },
    };
  });

  // Create page for each tag
  const tagPages = [...allTags].map(tag => ({
    path: `/${tag}`,
    component: tagTemplate,
    context: { tag },
  }));

  return [...piecePages, ...tagPages].forEach((obj) => {
    createPage(obj);
  });
};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'File') {
    const parsedFilePath = p.parse(node.absolutePath);
    const [directoryName] = parsedFilePath.dir.split(p.sep).slice(-1);
    createNodeField({ node, name: 'directoryName', value: directoryName });
  } else if (
    node.internal.type === 'MarkdownRemark'
  ) {
    const fileNode = getNode(node.parent);
    const slug = node.frontmatter.slug || fileNode.fields.directoryName;
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
