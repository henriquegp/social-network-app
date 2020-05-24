import React, { ReactChild } from 'react';

import MenuListContext from './MenuListContext';
import useShowMenu from '../../hooks/useShowMenu';
import {
  Container, Menu, Toggle,
} from './styles';

interface Props {
  toggle: JSX.Element;
  width?: number;
  children: ReactChild | ReactChild[];
}

function MenuList({ toggle, children, width }: Props) {
  const [blockRef, show, setShow] = useShowMenu();

  const toggleClick = () => setShow(!show);

  return (
    <Container ref={blockRef}>
      <Toggle
        clicked={show}
        role="button"
        tabIndex={0}
        onClick={toggleClick}
        onKeyDown={toggleClick}
      >
        {toggle}
      </Toggle>
      <MenuListContext.Provider value={{ toggleClick }}>
        {show && (
        <Menu width={width}>
          { children }
        </Menu>
        )}
      </MenuListContext.Provider>
    </Container>
  );
}

export default MenuList;
