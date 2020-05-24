import React, { useRef, useMemo } from 'react';
import { FaImage } from 'react-icons/fa';

import { Container, Image, ButtonImage } from './styles';

interface OwnProps {
  file: File | null;
  onRemove: () => void;
}

type Props = OwnProps & JSX.IntrinsicElements['input'];

function InputFile({ file, onRemove, ...props }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const srcImage = useMemo(() => {
    if (!file) { return ''; }
    return window.URL.createObjectURL(file);
  }, [file]);

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.click();
    }
  }

  return (
    <Container>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        {...props}
      />
      <ButtonImage
        type="button"
        title="Image"
        onClick={handleClick}
      >
        <FaImage size={20} />
      </ButtonImage>
      { srcImage && (
      <Image type="button" onClick={onRemove}>
        <img src={srcImage} alt="postImage" />
      </Image>
      ) }
    </Container>
  );
}

export default InputFile;
