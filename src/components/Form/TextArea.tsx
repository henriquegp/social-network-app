import React from 'react';
import { useField } from 'formik';

import { Container, ErrorMessage } from './styles';

interface OwnProps {
  name: string;
}

type Props = OwnProps & JSX.IntrinsicElements['textarea'];

function TextArea({ name, ...props }: Props) {
  const [field, meta] = useField(name);
  const invalid: boolean = (meta.error && meta.touched) || false;

  return (
    <Container error={invalid}>
      <textarea autoComplete="on" {...field} {...props} />
      <ErrorMessage>{invalid && meta.error}</ErrorMessage>
    </Container>
  );
}

export default TextArea;
