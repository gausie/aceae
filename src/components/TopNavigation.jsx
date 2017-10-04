import React from 'react';
import PropTypes from 'prop-types';
import { titleCase } from 'change-case';
import Link from 'gatsby-link';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaTag, FaCircle } from 'react-icons/lib/fa';

import Button from './Button';

const Row = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.45rem;
`;

const IconLink = styled.a`
  color: black;
  margin: 0 0.5rem;
`;

const TagLink = styled(Link)`
  margin: 0 0.5rem;
  color: black;
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  outline: 0;
`;

export default function TopNavigation({ tags, currentTag }) {
  return (
    <div>
      <Row>
        <Button to="/about">About</Button>
        <IconLink href="http://facebook.com/notnat"><FaFacebook width={30} height={30} /></IconLink>
        <IconLink href="http://twitter.com/nataceae"><FaTwitter width={30} height={30} /></IconLink>
        <IconLink href="http://instagram.com/nataceae"><FaInstagram width={30} height={30} /></IconLink>
        <IconLink href="mailto://hi@notn.at"><FaEnvelope width={30} height={30} /></IconLink>
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
