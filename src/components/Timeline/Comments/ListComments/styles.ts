import styled from 'styled-components';
import { LinkName as Link } from '../../Post/styles';
import StyledTextArea from '../../../../styles/StyledTextArea';

export const CommentLine = styled.div`
  padding: 3px;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  border-bottom: 1px solid #00000008;

  button {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.primary};
    cursor: pointer;
  }
`;

export const Text = styled.div`
  margin: 0 15px;
  width: 100%;

  > div {
    font-size: 1.4rem;
  }
`;

export const LinkName = styled(Link)`
  font-size: 1.4rem;
  line-height: .5px;
`;

export const MenuContainer = styled.div`
  margin-top: 12px;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
`;

export const ModalActions = styled.div`
  text-align: right;
`;

export const TextArea = styled(StyledTextArea)`
  min-height: 130px;
  height: 130px;
`;
