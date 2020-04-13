import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import qs from 'qs';
import { useStaticQuery, graphql } from 'gatsby';

import favicon from './favicon.png';
import './layout.css';
import Header from './Header';

const Container = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

export default function TemplateWrapper({ children, location }) {
  const data = useStaticQuery(graphql`
    query AllTags {
      allMarkdownRemark {
        allTags: group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `);

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
        {children}
      </Container>
    </div>
  );
}


