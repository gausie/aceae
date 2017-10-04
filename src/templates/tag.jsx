import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { titleCase } from 'change-case';

import Pieces from '../components/Pieces';

const SubHeader = styled.h2`
  text-align: center;
`;

export default function Template(props) {
  const { data, pathContext } = props;
  const { tag } = pathContext;
  return (
    <div>
      <SubHeader>
        <span role="img" aria-label="Tag">🔖</span> { titleCase(tag) }
      </SubHeader>
      <Pieces pieces={data.allMarkdownRemark.edges} appendTag={tag} />
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
