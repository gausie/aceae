import React from 'react';
import PropTypes from 'prop-types';

import Pieces from '../components/Pieces';

export default function IndexPage(props) {
  const { data } = props;
  return (
    <div>
      <Pieces pieces={data.allMarkdownRemark.edges} />
    </div>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape().isRequired,
};

export const pageQuery = graphql`
  query AllPiecesPage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
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
