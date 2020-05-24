import React, { RefObject } from 'react';
import { FaSpinner } from 'react-icons/fa';

import { StyledButton, ButtonOwnProps, IconContainer } from './styles';

interface OwnProps {
  ref?:
    ((instance: HTMLButtonElement | null) => void) |
    RefObject<HTMLButtonElement> | null | undefined;
  loading?: boolean;
}

type Props = ButtonOwnProps & JSX.IntrinsicElements['button'] & OwnProps;

function Button({
  children, loading, disabled, ...props
}: Props) {
  return (
    <StyledButton {...props} spin={loading} disabled={disabled || loading}>
      {loading && <IconContainer> <FaSpinner size="20" /> </IconContainer>}
      <span>{children}</span>
    </StyledButton>
  );
}

export default Button;
