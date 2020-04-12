import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaTag, FaCircle } from 'react-icons/lib/fa';

import commonButton from './style-utils';
import Button from './Button';

const Row = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.45rem;
`;

const IconLink = styled.a`
  ${commonButton}
  margin: 0 0.5rem;
`;

const TagLink = styled(Link)`
  ${commonButton}
  margin: 0 0.5rem;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
`;

export default function TopNavigation({ tags, currentTag }) {
  return (
    <div>
      <Row>
        <Button to="/about">About</Button>
        <IconLink target="_blank" href="https://instagram.com/nat.aceae"><FaInstagram width={30} height={30} /></IconLink>
        <IconLink target="_blank" href="https://twitter.com/nataceae"><FaTwitter width={30} height={30} /></IconLink>
        <IconLink target="_blank" href="https://facebook.com/nat.aceae"><FaFacebook width={30} height={30} /></IconLink>
        <IconLink target="_blank" href="mailto://hello@aceae.co.uk"><FaEnvelope width={30} height={30} /></IconLink>
      </Row>
      <Row>
        <FaTag />
        <TagLink active={!currentTag} to="/">Everything</TagLink>
        {tags.map(({ fieldValue: tag }) => [
          <FaCircle width={7} height={7} />,
          <TagLink active={currentTag === tag} to={tag}>{titleCase(tag)}</TagLink>,
        ])}
      </Row>
    </div>
  );
}

TopNavigation.propTypes = {
  currentTag: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    fieldValue: PropTypes.string,
    totalCount: PropTypes.number,
  })),
};

TopNavigation.defaultProps = {
  currentTag: null,
  tags: [],
};
