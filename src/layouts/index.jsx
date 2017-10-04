import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import qs from 'qs';

import favicon from './favicon.png';
import './index.css';
import Header from '../components/Header';

const Container = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

export default function TemplateWrapper({ data, children, location }) {
  const { allTags } = data.allMarkdownRemark;
  const { tag } = qs.parse(location.search.substring(1));
  const currentSlug = tag || location.pathname.split('/').slice(-1)[0];

  return (
    <div>
      <Helmet
        defaultTitle="aceae"
        titleTemplate="%s | aceae"
        meta={[
          { name: 'description', content: 'Portfolio website for the artist, designer and illustrator Aceae' },
          { name: 'keywords', content: 'art, design, illustration' },
        ]}
        link={[
          { rel: 'icon', href: favicon, type: 'image/png' },
        ]}
      />
      <Header tags={allTags} currentTag={currentSlug} />
      <Container>
        {children()}
      </Container>
    </div>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape().isRequired,
  location: PropTypes.shape().isRequired,
};

export const pageQuery = graphql`
  query AllTags {
    allMarkdownRemark {
      allTags: group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
