import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../../../styles/Card';

const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled(Card)`
  padding: 1px 0;
  animation: ${show} .5s linear;

  > p {
    font-size: 1.7rem;
    margin: 10px 15px;
  }

  > img {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 15px 5px;

  > div {
    margin-right: 10px;

    div:nth-child(2) {
      font-size: 1.2rem;
    }
  }
`;

export const LinkName = styled(Link)`
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: .3px;
  margin-bottom: 2px;
  text-decoration: none;
  cursor: pointer;
  vertical-align: middle;
  line-height: 1.5;
  color: inherit;

  :hover {
    text-decoration: underline;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;
  border-top: 1px solid #d6d2d2;
  padding-top: 5px;
`;

interface ButtonIconProps {
  actived: boolean;
}

export const ButtonIcon = styled.button<ButtonIconProps>`
  border: none;
  background: transparent;
  margin: 0 8px;
  cursor: pointer;
  color: ${({ theme, actived }) => (actived ? theme.primary : 'inherit')};
  transition: color .3s;

  :hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ButtonLink = styled.button`
  border: none;
  background: transparent;
  margin: 0 10px;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
  color: #65676b;

  :hover {
    text-decoration: underline;
  }
`;
