import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.color};
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40%;
  
  svg {
    margin-right: 15px;
  }
`;

export default Container;
