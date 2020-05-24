import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  text-decoration: none;
  border: none;
  background: ${({ theme }) => theme.textareaBackground};
  color: inherit;
  border-radius: 6px;
  overflow: hidden;
  padding: 8px 10px;
  font-size: 1.4rem;
  resize: vertical;
`;

export default StyledTextArea;
