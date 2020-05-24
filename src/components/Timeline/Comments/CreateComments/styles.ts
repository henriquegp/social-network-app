import styled from 'styled-components';
import { CommentLine } from '../ListComments/styles';
import StyledTextArea from '../../../../styles/StyledTextArea';

export const Container = styled(CommentLine)`
  align-items: center;
  border: none;
`;

export const TextArea = styled(StyledTextArea)`
  min-height: 36px;
  height: 36px;
`;
