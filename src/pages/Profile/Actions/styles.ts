import styled from 'styled-components';

export default styled.div`
  position: absolute;
  top: 15px;
  right: 0;

  @media screen and (max-width: 500px) {
    position: initial;
    margin-top: 15px;

    > button {
      width: 100%;
      display: block;
      margin: 0;
    }
  }
`;
