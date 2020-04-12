import { Link } from 'gatsby';
import styled from 'styled-components';

import commonButton from './style-utils';

export default styled(Link)`
  ${commonButton}
  font-family: sans-serif;
  border: black 2px solid;
  font-weight: 600;
  padding: 0.2em 0.7em;
`;
