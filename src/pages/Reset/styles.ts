import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px 15px;

  h3 {
    margin-bottom: 25px;
  }

  form button {
    margin-left: auto;
    display: block;
  }
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 1.4rem;
  text-align: center;
  margin: 10px 0px;
`;
