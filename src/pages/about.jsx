import React from 'react';

import Layout from '../components/Layout';
import portrait from './portrait.png';

export default ({ location }) => (
  <Layout location={location}>
    <p>
      Aceae (pronounced ay-see-ee) is a queer and non-binary artist based in Edinburgh,
      Scotland, with ties to Los Angeles and London.
    </p>

    <p>
      They specialise in creating bold illustrations, comics, and photographs of people and plants,
      and explore complex subjects like survivorhood, gender, and sexuality.
      For commissions, collaborations, or questions, get in touch via email: <a href="mailto://nataceae@gmail.com">nataceae@gmail.com</a>.
    </p>

    <p>
      <img src={portrait} alt="Portrait of Aceae" />
    </p>
  </Layout>
);
