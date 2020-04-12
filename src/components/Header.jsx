import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TopNavigation from '../components/TopNavigation';
import logo from './logo.gif';

const Heading = styled.h1`
   margin: 0;
   text-align: center;
`;

export default function Header({ tags, currentTag }) {
  return (
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
      <TopNavigation tags={tags} currentTag={currentTag} />
    </header>
  );
}

Header.propTypes = {
  currentTag: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    fieldValue: PropTypes.string,
    totalCount: PropTypes.number,
  })),
};

Header.defaultProps = {
  currentTag: null,
  tags: [],
};
