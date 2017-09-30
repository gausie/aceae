import React from 'react';
import Helmet from 'react-helmet';

export default function Template({ data }) {
  const { frontmatter: fm, html } = data.markdownRemark;

  return (
    <div>
      <h2>{ fm.title }</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export const pageQuery = graphql`
  query PieceByPath($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        slug
      }
    }
  }
`;
