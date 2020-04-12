import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Pieces from '../components/Pieces';

export default function Template({ data, location, pathContext }) {
  const { tag } = pathContext;
  return (
    <Layout location={location}>
      <Pieces pieces={data.allMarkdownRemark.edges} appendTag={tag} />
    </Layout>
  );
}

Template.propTypes = {
  data: PropTypes.shape().isRequired,
  pathContext: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
};

export const query = graphql`
query TagPage($tag: String) {
  allMarkdownRemark(
    sort: { fields: [frontmatter___order], order: DESC }
    filter: {
      frontmatter: { tags: { in: [$tag] } }
      html: { ne: "" }
    }
  ) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          thumbnail {
            childImageSharp {
              fixed(width: 200, height: 200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  }
}
`;