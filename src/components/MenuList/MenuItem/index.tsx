import React, { useContext } from 'react';
import MenuListContext from '../MenuListContext';
import { Colors } from '../../../config/themes';

import Container from './styles';

interface Props {
  text: string;
  icon?: JSX.Element;
  onClick?: () => void;
  color?: Colors;
}

function MenuItem({
  icon, color, text, onClick,
}: Props) {
  const { toggleClick } = useContext(MenuListContext);

  const handleClick = () => {
    if (onClick) { onClick(); }
    toggleClick();
  };

  return (
    <Container
      role="button"
      tabIndex={0}
      color={color}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <span>{text}</span>
      { !!icon && icon }
    </Container>
  );
}

export default MenuItem;
