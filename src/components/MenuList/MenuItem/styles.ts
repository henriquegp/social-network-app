import styled from 'styled-components';
import { Colors } from '../../../config/themes';

interface MenuItemProps {
  color?: Colors;
}

const Container = styled.div<MenuItemProps>`
  color: ${({ color, theme }) => (color ? theme[color] : 'inherit')};
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.primary}47;
    color: ${({ theme }) => theme.primary};
  }
`;

export default Container;
