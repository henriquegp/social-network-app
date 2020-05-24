import styled from 'styled-components';

export default styled.div`
  min-width: 200;
  min-height: 50px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0,0,0,0.1);
`;
