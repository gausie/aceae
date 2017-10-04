/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import qs from 'qs';

import PieceNavigation from '../components/PieceNavigation';

const SubHeader = styled.h2`
  text-align: center;
`;

const Content = styled.article`
  margin-top: 2rem;
`;

export default function Template({ data, pathContext, location }) {
  const { frontmatter: fm, html } = data.markdownRemark;
  const { tag } = qs.parse(location.search.substring(1));
  const [prev, next] = pathContext.directions[tag || '*'];

  return (
    <div>
      <Helmet title={fm.title} />
      <SubHeader>{ fm.title }</SubHeader>
      <PieceNavigation previous={prev} next={next} tag={tag} />
      <Content dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

Template.propTypes = {
  data: PropTypes.shape().isRequired,
  pathContext: PropTypes.shape({
    directions: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export const pageQuery = graphql`
  query PieceByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
