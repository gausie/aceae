import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';

import Pieces from '../components/Pieces';

export default function Template(props) {
  const { data, pathContext } = props;
  return (
    <div>
      <h2>{ titleCase(pathContext.tag) }</h2>
      <Pieces pieces={data.allMarkdownRemark.edges} />
    </div>
  );
}

Template.propTypes = {
  data: PropTypes.shape().isRequired,
  pathContext: PropTypes.shape({
    slug: PropTypes.string,
  }).isRequired,
};

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
