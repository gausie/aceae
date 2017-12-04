import React from 'react';
import PropTypes from 'prop-types';

import Pieces from '../components/Pieces';

export default function IndexPage(props) {
  const { data: { allMarkdownRemark: { edges } } } = props;
  return <Pieces pieces={edges} />;
}

IndexPage.propTypes = {
  data: PropTypes.shape().isRequired,
};

export const pageQuery = graphql`
  query AllPiecesPage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: DESC }
      filter: { html: { ne: "" } }
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
                responsiveSizes(maxWidth: 400) {
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
