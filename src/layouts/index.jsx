import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import './index.css';
import Header from '../components/Header';

const Container = styled.main`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

export default function TemplateWrapper({ children }) {
  return (
    <div>
      <Helmet
        defaultTitle="aceae"
        titleTemplate="%s | aceae"
        meta={[
          { name: 'description', content: 'Portfolio website for the artist, designer and illustrator Aceae' },
          { name: 'keywords', content: 'art, design, illustration' },
        ]}
      />
      <Header />
      <Container>
        {children()}
      </Container>
    </div>
  );
}

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};
