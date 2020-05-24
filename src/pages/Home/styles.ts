import styled from 'styled-components';
import Card from '../../styles/Card';
import StyledTextArea from '../../styles/StyledTextArea';

export const Container = styled.div`
  padding-top: 35px;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
`;

export const NewPost = styled(Card)`
  width: 100%;
  margin-bottom: 20px;
  padding: 5px 15px;
`;

export const NewPostGroup = styled.div`
  padding: 3px;
  display: flex;
  align-items: center;
`;

export const TextArea = styled(StyledTextArea)`
  margin-left: 10px;
  padding: 8px 15px;
  height: 45px;
  min-height: 45px;
  font-size: 1.6rem;
`;


export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #d6d2d2;
  padding-top: 5px;
`;

export const ErrorMessage = styled.div`
  margin: 8px 15px;
  text-align: center;
  color: ${({ theme }) => theme.danger};
  font-size: 1.4rem;
`;
