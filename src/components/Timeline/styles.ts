import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const List = styled.ul`
  width: 100%;
  list-style: none;

  > li {
    margin-bottom: 30px;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  z-index: -1;

  ~ svg {
    display: flex;
    margin: 0 auto;
    animation: ${spin} 2s infinite linear;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 2.0rem;
  font-weight: 500;
`;
