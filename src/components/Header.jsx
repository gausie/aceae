import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import logo from './logo.gif';

const Heading = styled.h1`
   margin: 0;
   text-align: center;
`;

export default () => (
  <header>
    <Heading>
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        <img src={logo} alt="aceae" />
      </Link>
    </Heading>
  </header>
);
