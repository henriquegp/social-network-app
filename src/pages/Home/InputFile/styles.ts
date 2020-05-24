import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 30%;

  input {
    width: 0;
    height: 0;
  }
`;

export const ButtonImage = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 50%;
  height: 40px;
  width: 40px;
  color: ${({ theme }) => theme.primary};
  transition: background .3s;

  :hover{
    background: ${({ theme }) => theme.primary}2e;
  }
`;

export const Image = styled.button`
  margin-left: 15px;
  cursor: pointer;
  position: relative;
  border: none;
  background: transparent;
  line-height: 0;

  :before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgb(0,0,0,.6);
    transition: opacity .5s;
    opacity: 0;
  }
  
  :after {
    position: absolute;
    left:0;
    right:0;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    content: 'X';
    color: #fff;
    border-radius: 50%;
    font-weight: 600;
    transition: opacity .5s;
    opacity: 0;
  }

  :hover::before, :hover::after {
    opacity: 1;
  }

  img {
    height: 35px;
    width: 35px;
  }
`;
