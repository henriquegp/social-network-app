import styled, { keyframes } from 'styled-components';
import Card from '../../styles/Card';

const fadeIn = keyframes`
  from{ opacity: 0; }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background: rgb(0,0,0,.6);
  z-index: 5;
  animation: ${fadeIn} .3s ease-out;
`;

interface ContentProps {
  width?: number;
}

export const Content = styled(Card)<ContentProps>`
  max-width: ${({ width }) => (width || 450)}px;
  width: 95%;
  padding: 15px;
  z-index: 6;
`;
