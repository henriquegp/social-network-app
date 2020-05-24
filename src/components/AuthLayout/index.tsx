import React, { ReactChild } from 'react';

import { Container, LoginCard } from './styles';

type Props = {
  children: ReactChild
}

function AppLayout({ children }: Props) {
  return (
    <Container>
      <LoginCard>
        { children }
      </LoginCard>
    </Container>
  );
}

export default AppLayout;
