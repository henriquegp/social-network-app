import styled from 'styled-components';

export const Header = styled.header`
  color: #fff;
  font-size: 5.2rem;
  text-align: center;
  background-color: #006db3;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 15px;
  font-weight: 400;
`;

export const Content = styled.section`
  form:first-child {
    margin-top: 12px;
  }

  padding: 10px 15px;

  form button {
    margin-left: auto;
    display: block;
  }
`;

export const ActionLinks = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 1.4rem;
  text-align: center;
  margin: 10px 0px;
`;
