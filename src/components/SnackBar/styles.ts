import styled, { keyframes } from 'styled-components';
import { Colors } from '../../config/themes';

interface ContainerProps {
  color: Colors;
}

const showOp = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div<ContainerProps>`
  background: ${({ color, theme }) => theme[color]};
  display: inline-flex;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  color: white;
  border-radius: 6px;
  position: fixed;
  bottom: 40px;
  right: 20px;
  z-index: 5;
  box-shadow: 0px 1px 2px rgb(0,0,0,.1);
  overflow: hidden;
  animation: ${showOp} .8s;

  svg {
    cursor: pointer;
    margin-left: 2rem;
  }

  @media screen and (max-width: 500px){
    bottom: 0;
    right: 0;
    left: 0%;
    border-radius: 0;
    width: 100%;
    padding: 20px;
  }
`;

export const Text = styled.div`
  font-size: 1.8rem;
`;
