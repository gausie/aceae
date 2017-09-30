import React from 'react';
import Link from 'gatsby-link';

export default function Pieces({ pieces }) {

  const items = pieces.map(({ node: { frontmatter: fm } }) => {
    let thumb = null;
    if (fm.thumbnail) {
      const { src, srcSet, sizes } = fm.thumbnail.childImageSharp.responsiveSizes;
      thumb = <img
        src={src}
        srcset={srcSet}
        sizes={sizes}
        className="lazyload"
        alt={fm.title}
      />;
    }

    return (
      <li key={fm.slug}>
        <Link to={fm.slug}>{thumb} {fm.title}</Link>
      </li>
    );
  });

  return <ul>{ items }</ul>;
}
