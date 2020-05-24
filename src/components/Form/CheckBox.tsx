import React from 'react';
import { Field } from 'formik';

import { StyledCheckBox } from './styles';

interface OwnProps {
  name: string;
}

type Props = OwnProps & JSX.IntrinsicElements['input'];

function CheckBox({ name, ...props }: Props) {
  return (
    <StyledCheckBox>
      <Field type="checkbox" name={name} {...props} />
    </StyledCheckBox>
  );
}

export default CheckBox;
