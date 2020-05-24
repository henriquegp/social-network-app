import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 35px;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
`;

export const InfoProfile = styled.div`
  width: 100%;
  margin-bottom: 35px;
  padding: 5px;
  display: flex;
  position: relative;

  > div:nth-child(2) {
    padding-left: 35px;
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;

    > div:first-child {
      text-align: center;
    }

    > div:nth-child(2) {
      padding: 0 15px;
    }
  }
`;

export const Titles = styled.div`
  margin: 15px 0;
  > h1 {
    font-size: 1.8rem;
    font-weight: 500;
  }

  > h2 {
    font-size: 1.5rem;
    font-weight: normal;
  }
`;

export const Infos = styled.div`
  display: flex;
  margin: 15px 0;

  > div {
    flex: 1;
  }

  span {
    font-weight: 500;
  }

  @media screen and (max-width: 450px) {
    text-align: center;
    span {
      display: block;
    }
  }
`;
