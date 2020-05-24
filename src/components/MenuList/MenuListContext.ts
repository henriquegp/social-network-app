/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

interface MenuListContextProps {
  toggleClick: () => void;
}

const MenuListContext = createContext<MenuListContextProps>({
  toggleClick: () => {},
});

export default MenuListContext;
