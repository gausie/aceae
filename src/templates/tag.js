import React from 'react';
import Helmet from 'react-helmet';
import { titleCase } from 'change-case';

import Pieces from '../components/pieces';

export default function Template(props) {
  const { data, pathContext } = props;
  return (
    <div>
      <h2>{ titleCase(pathContext.tag) }</h2>
      <Pieces pieces={data.allMarkdownRemark.edges} />
    </div>
  );
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
