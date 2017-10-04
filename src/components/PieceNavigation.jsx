import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';

const Row = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const buttonIfDest = (destination, label) => (destination ?
  <Button to={destination}>{label}</Button> :
  '\u00A0'
);

export default function PieceNavigation({ next, previous, tag }) {
  const prevDestination = tag && previous ? `${previous}?tag=${tag}` : previous;
  const nextDestination = tag && next ? `${next}?tag=${tag}` : next;

  return (
    <Row>
      <div>
        {buttonIfDest(prevDestination, '⇐ Previous')}
      </div>
      <div />
      <div>
        {buttonIfDest(nextDestination, 'Next ⇒')}
      </div>
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
