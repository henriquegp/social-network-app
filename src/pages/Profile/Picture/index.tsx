import React, { useRef, useState, ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';

import { ApplicationState } from '../../../store';
import { changePicture } from '../../../store/system/actions';
import useFetchApi from '../../../hooks/useFetchApi';
import { profileRepository } from '../../../repositories';
import UserPicture from '../../../components/UserPicture';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import getCroppedImage from './getCroppedImage';

import {
  Container, ButtonImage, ModalActions, ImageContainer,
} from './styles';
import 'react-image-crop/dist/ReactCrop.css';

interface FileImage {
  src: string;
  fileName: string;
  crop: Crop;
  cropped: File | null;
}

const initialState: FileImage = {
  src: '',
  fileName: '',
  crop: {
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  },
  cropped: null,
};

interface Props {
  src: string;
  userId: number;
  reload(): void;
}

function Picture({ src, userId, reload }: Props) {
  const dispatch = useDispatch();
  const loggedUserId = useSelector<ApplicationState, number>((state) => state.system.user.userId);
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<FileImage>(initialState);
  const [{ isLoading }, setFetchApi] = useFetchApi(profileRepository.setPicture);

  function handleInitial() {
    setImage(initialState);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (!target.files?.length) { return; }
    setImage({
      ...image,
      fileName: target.files[0].name,
      src: window.URL.createObjectURL(target.files[0]),
    });
  }

  async function handleComplete(crop: Crop, percentCrop: PercentCrop) {
    const cropped = await getCroppedImage(image.src, percentCrop, image.fileName);
    setImage({ ...image, cropped });
  }

  async function handleSubmit() {
    if (image.cropped) {
      const response = await setFetchApi({ picture: image.cropped });
      if (response) {
        dispatch(changePicture(response.src));
        reload();
        handleInitial();
      }
    }
  }

  return (
    <Container>
      <input
        type="file"
        accept="image/*"
        onClick={handleInitial}
        onChange={handleChange}
        ref={inputRef}
      />
      <UserPicture height={150} src={src} />

      {userId === loggedUserId && (
        <ButtonImage
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          <FaEdit size={35} />
        </ButtonImage>
      )}

      <Modal show={!!image.src} width={600}>
        <h3>Edit Picture</h3>

        <ImageContainer>
          <ReactCrop
            src={image.src}
            crop={image.crop}
            onChange={(crop) => setImage({ ...image, crop })}
            onComplete={handleComplete}
          />
        </ImageContainer>

        <ModalActions>
          <Button onClick={handleInitial}>Close</Button>
          <Button
            color="success"
            disabled={!image.cropped}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Edit
          </Button>
        </ModalActions>
      </Modal>
    </Container>
  );
}

export default Picture;
