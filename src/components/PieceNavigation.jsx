import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';
import { navigateTo } from 'gatsby-link';
import styled from 'styled-components';

const Row = styled.nav`
  display: flex;
`;

const Column = styled.div`
  width: ${({ position }) => (['left', 'right'].includes(position) ? 20 : 60)}%;
  text-align: ${({ position }) => position};
`;

const buttonIfNotNull = (destination, label) => (
  destination !== null ?
    <button onClick={() => navigateTo(destination)}>{label}</button> :
    '\u00A0'
);

export default function PieceNavigation({ next, previous, tag }) {
  return (
    <Row>
      <Column position="left">
        {buttonIfNotNull(previous, '⇐ Previous')}
      </Column>
      <Column position="center">
        {buttonIfNotNull(tag, tag === '' ? 'Everything' : titleCase(tag))}
      </Column>
      <Column position="right">
        {buttonIfNotNull(next, 'Next ⇒')}
      </Column>
    </Row>
  );
}

PieceNavigation.propTypes = {
  next: PropTypes.string,
  previous: PropTypes.string,
  tag: PropTypes.string,
};

PieceNavigation.defaultProps = {
  next: null,
  previous: null,
  tag: '',
};
