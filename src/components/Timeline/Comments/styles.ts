import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  margin: 5px 15px;
  padding-top: 5px;
  border-top: 1px solid #d6d2d2;

  ul {
    list-style: none;
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
  text-align: center;
  margin: 3px auto;

  svg {
    animation: ${spin} 2s infinite linear;
  }
`;

export const ButtonMore = styled.button`
  color: ${({ theme }) => theme.primary};
  border: none;
  background: transparent;
  font-size: 1.5rem;
  display: block;
  margin: 5px auto;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;
