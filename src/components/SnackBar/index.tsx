import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import { ApplicationState } from '../../store';
import { SnackBarState } from '../../store/system/types';
import { hideSnackBar } from '../../store/system/actions';

import { Container, Text } from './styles';

function SnackBar() {
  const {
    message,
    show,
    type,
  } = useSelector<ApplicationState, SnackBarState>((state) => state.system.snackBar);
  const dispatch = useDispatch();

  return (
    <>
      { show && (
      <Container color={type}>
        <Text>{message}</Text>
        <FaTimes size="20" onClick={() => dispatch(hideSnackBar())} />
      </Container>
      ) }
    </>
  );
}

export default SnackBar;
