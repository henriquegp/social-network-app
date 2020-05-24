import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  position: relative;
`;

export const Item = styled.li`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Text = styled.div`
  font-size: 1.4rem;
  width: 100%;
  margin: 0 15px;
`;

export const Unseen = styled.div`
  background: ${({ theme }) => theme.danger};
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

export const UnseenSign = styled.div`
  height: 11px;
  width: 11px;
  background: ${({ theme }) => theme.danger};
  border-radius: 50%;
  position: absolute;
  right: -6px;
  top: -5px;
`;
