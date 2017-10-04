import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  list-style: none;
  justify-content: center;
  flex-wrap: wrap;
`;

const Item = styled.li`
  margin: 0.5em;
`;

const ThumbnailImage = styled.img`
  height: 200px;
  margin: 0;
  width: 200px;
`;

const ThumbnailCaption = styled.figcaption`
  background-color: black;
  bottom: -30px;
  color: white;
  font-size: 0.8rem;
  height: 30px;
  position: absolute;
  text-align: center;
  width: 100%;
  transition: all 300ms ease-out;
`;

const ThumbnailContainer = styled.figure`
  height: 200px;
  position: relative;
  width: 200px;
  overflow: hidden;

  &:hover > ${ThumbnailCaption} {
    bottom: 0px;
  }
`;

export default function Pieces({ pieces, appendTag }) {
  const items = pieces.map(({ node: { frontmatter: fm } }) => {
    let thumb = null;
    if (fm.thumbnail) {
      const { src } = fm.thumbnail.childImageSharp.responsiveSizes;
      thumb = <ThumbnailImage src={src} alt={fm.title} />;
    }

    const destination = appendTag ? `${fm.slug}?tag=${appendTag}` : fm.slug;

    return (
      <Item key={fm.slug}>
        <Link to={destination}>
          <ThumbnailContainer>
            { thumb }
            <ThumbnailCaption>{fm.title}</ThumbnailCaption>
          </ThumbnailContainer>
        </Link>
      </Item>
    );
  });

  return <List>{ items }</List>;
}

Pieces.propTypes = {
  pieces: PropTypes.shape().isRequired,
  appendTag: PropTypes.string,
};

Pieces.defaultProps = {
  appendTag: null,
};
