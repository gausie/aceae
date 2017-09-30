import React from 'react';
import Helmet from 'react-helmet';
import { titleCase } from 'change-case';

import Pieces from '../components/pieces';

export default function IndexPage(props) {
  const { data, pathContext } = props;
  return (
    <div>
      <Pieces pieces={data.allMarkdownRemark.edges} />
    </div>
  );
}

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
