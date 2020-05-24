import styled from 'styled-components';

export const Container = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  display: inline-block;
  line-height: 0;

  > input {
    height: 0;
    width: 0;
  }

  :hover > button {
    opacity: 1;
  }
`;

export const ButtonImage = styled.button`
  border: none;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: rgb(0,0,0,.6);
  color: #FFF;
  padding-left: 11px;
  cursor: pointer;
  opacity: 0;
  transition: opacity .3s;
`;

export const ImageContainer = styled.div`
  margin: 5px 0;
  text-align: center;
  background: rgb(0,0,0,.4);
  line-height: 0;

  img {
    height: 450px;
  }
`;

export const ModalActions = styled.div`
  text-align: right;
`;
