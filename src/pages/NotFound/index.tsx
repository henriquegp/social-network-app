import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

import Container from './styles';

function NotFound(): JSX.Element {
  return (
    <Container>
      <FaExclamationTriangle size="28" />
      <h3>404 - Page not found</h3>
    </Container>
  );
}

export default NotFound;
