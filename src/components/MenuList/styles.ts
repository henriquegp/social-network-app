import styled, { keyframes } from 'styled-components';

import Card from '../../styles/Card';

export const Container = styled.div`
  position: relative;
  display: inline-block;
`;

interface ToggleProp {
  clicked: boolean;
}

export const Toggle = styled.div<ToggleProp>`
  color: ${({ theme, clicked }) => (clicked ? theme.primary : 'inherit')};
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const animation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface MenuProps {
  width?: number;
}

export const Menu = styled(Card)<MenuProps>`
  width: ${({ width }) => width || 200}px;
  position: absolute;
  box-shadow: 0px 0px 5px rgb(0,0,0,.3);
  right: 0;
  margin-top: 3px;
  overflow: auto;
  animation: ${animation} .3s;
  z-index: 3;

  ul li {
    list-style: none;
    font-size: 1.6rem;
    font-weight: 400;
  }

  a {
    text-decoration: none;
  }
`;
