import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaEllipsisH, FaUser, FaMoon } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

import { ApplicationState } from '../../../store';
import { SystemState } from '../../../store/system/types';
import { logout, setTheme } from '../../../store/system/actions';
import MenuList from '../../MenuList';
import MenuItem from '../../MenuList/MenuItem';


function Options() {
  const { user, theme } = useSelector<ApplicationState, SystemState>((state) => state.system);
  const dispatch = useDispatch();

  const handleTheme = () => { dispatch(setTheme(theme === 'DARK' ? 'MAIN' : 'DARK')); };

  const handleLogout = () => dispatch(logout());

  return (
    <MenuList toggle={<FaEllipsisH size="18" title="Menu" />}>
      <Link to={`/${user.username}`}>
        <MenuItem
          text="My Profile"
          icon={<FaUser size={17} />}
        />
      </Link>
      <MenuItem
        text="Dark Theme"
        icon={<FaMoon size={17} />}
        onClick={handleTheme}
      />
      <MenuItem
        text="Logout"
        color="danger"
        icon={<FiLogOut size={17} />}
        onClick={handleLogout}
      />
    </MenuList>
  );
}

export default Options;
