import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  text-decoration: none;
  margin: 4px 2px;
  display: inline-block;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 1.6rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

  &:hover {
    filter: brightness(80%);
    text-decoration: underline;
  } 
`;

export default StyledLink;
