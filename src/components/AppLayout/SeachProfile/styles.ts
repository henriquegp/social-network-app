import styled, { keyframes } from 'styled-components';
import Card from '../../../styles/Card';

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin: 0 5px;
  position: relative;
  padding: 5px;
`;

export const StyledInput = styled.div`
  display: flex;
  
  div {
    width: 15%;
    background: ${({ theme }) => theme.searchColors.icon};
    display: flex;
    align-items: center;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;

    svg {
      margin: 0 auto;
      display: block;
      color: inherit;
    }
  }

  input {
    width: 85%;
    background: ${({ theme }) => theme.searchColors.input};
    font-size: 1.4rem;
    padding: 6px 15px;
    outline: none;
    -webkit-appearance: none;
    border: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    color: inherit;
  }
`;

const cardProfileAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

interface CardProfilesProps {
  show?: boolean;
}

export const CardProfiles = styled(Card)<CardProfilesProps>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  box-shadow: 0px 0px 5px rgb(0,0,0,.3);
  animation: ${cardProfileAnimation} .2s;

  ul {
    margin-top: 35px;
    li {
      list-style: none;
      :hover {
        background: ${({ theme }) => theme.primary}47;
      }
      > a {
        display: flex;
        padding: 10px;
        text-decoration: none;
        color: inherit;
        background: transparent;        
      }
    }
  }
`;

export const Picture = styled.div`
  width: 20%;
  overflow: hidden;
  height: 36px;
  display: flex;
  justify-content: center;
`;

export const Info = styled.div`
  width: 80%;
  padding: 2px 5px;
  overflow: hidden;

  .nm {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .un {
    font-size: 1rem;
  }
`;
