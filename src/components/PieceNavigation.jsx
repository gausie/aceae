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
  const prevDestination = tag === '' ? previous : `${previous}?tag=${tag}`;
  const nextDestination = tag === '' ? next : `${next}?tag=${tag}`;
  return (
    <Row>
      <Column position="left">
        {buttonIfNotNull(prevDestination, '⇐ Previous')}
      </Column>
      <Column position="center">
        {buttonIfNotNull(tag, tag === '' ? 'Everything' : <span><span role="img" aria-label="Tag">🔖</span> {titleCase(tag)}</span>)}
      </Column>
      <Column position="right">
        {buttonIfNotNull(nextDestination, 'Next ⇒')}
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
