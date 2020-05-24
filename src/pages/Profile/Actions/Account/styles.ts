import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  textarea {
    min-height: 145px;
    height: 145px;
  }
`;

export const ActionsButton = styled.div`
  text-align: right;
`;

export const ErrorMessage = styled.div`
  margin-top: 5px;
  text-align: center;
  color: ${({ theme }) => theme.danger};
`;

export const FromGroup = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-left: 10px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #dee2e6;
`;

interface TabProps {
  current: number;
  index: number;
}

export const Tab = styled.div<TabProps>`
  margin-right: 5px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  padding: 8px 10px;
  font-size: 1.6rem;
  cursor: pointer;
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-color: ${({ current, index, theme }) => current === index && `#dee2e6 #dee2e6 ${theme.cardBackground}`};

  :hover {
    background: ${({ theme }) => theme.primary}47;
  }
`;

const show = keyframes`
  from { opacity: 0; }
`;

export const TabContent = styled.div<TabProps>`
  padding: 15px 0;
  display: ${({ current, index }) => (current === index ? 'block' : 'none')};
  animation: ${show} .4s;
`;
