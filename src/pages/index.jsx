import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Pieces from '../components/Pieces';

export default function IndexPage({ location }) {
  const data = useStaticQuery(graphql`
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
  `);

  const { allMarkdownRemark: { edges } } = data;
  return (
    <Layout location={location}>
      <Pieces pieces={edges} />
    </Layout>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape().isRequired,
};

