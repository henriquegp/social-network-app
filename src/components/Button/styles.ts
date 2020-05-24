import styled, { keyframes } from 'styled-components';
import { Colors } from '../../config/themes';

export interface ButtonOwnProps {
  color?: Colors;
  spin?: boolean;
}

export const StyledButton = styled.button<ButtonOwnProps>`
  margin: 4px 2px;
  display: inline-flex;
  font-weight: 400;
  color: ${({ color }) => (color ? '#FFF' : '#212529')};
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: ${({ color, theme }) => (color ? theme[color] : '#dad8d8')};
  border: 1px solid ${({ color, theme }) => (color ? theme[color] : 'transparent')};
  padding: 6px 12px;
  font-size: 1.6rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  position: relative;

  &:hover {
    filter: brightness(90%);
    text-decoration: none;
  }

  &:disabled {
    filter: grayscale(.9);
  }

  span {
    opacity: ${({ spin }) => (spin ? '0' : '1')};
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

export const IconContainer = styled.div`
  position: absolute;
  top: 8px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  svg {
    animation: ${spin} 2s infinite linear;
  }
`;
