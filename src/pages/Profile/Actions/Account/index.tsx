import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { showSnackBar } from '../../../../store/system/actions';
import useFetchApi from '../../../../hooks/useFetchApi';
import { authRepository, profileRepository } from '../../../../repositories';
import Button from '../../../../components/Button';
import { Input, TextArea, CheckBox } from '../../../../components/Form';

import {
  Container, ActionsButton, ErrorMessage, FromGroup, TabContainer, Tab, TabContent,
} from './styles';

const profileScheme = Yup.object().shape({
  name: Yup.string().max(60).required('Required'),
  about: Yup.string().max(1000),
  private: Yup.boolean(),
});

const changeScheme = Yup.object().shape({
  password: Yup.string().min(8).max(20).required('Required'),
  newPassword: Yup.string().min(8).max(20).required('Required'),
  confirmNewPassword: Yup
    .string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

interface Props {
  onClose(): void;
  userId: number;
  reload(): void;
}

function Account({ userId, onClose, reload }: Props) {
  const [tab, setTab] = useState<number>(1);
  const dispatch = useDispatch();

  const [{ data }, fetchProfile] = useFetchApi(profileRepository.getProfile);
  const [{
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    data: dataUpdate,
  }, fetchUpdate] = useFetchApi(profileRepository.update);

  const [{
    isLoading: isLoadingChange,
    isError: isErrorChange,
    data: dataChange,
  }, fetchChange] = useFetchApi(authRepository.changePassword);

  useEffect(() => { fetchProfile({ userId }); }, [fetchProfile, userId]);

  return (
    <Container>
      <TabContainer>
        <Tab
          current={tab}
          index={1}
          onClick={() => setTab(1)}
        >
          Edit Profile
        </Tab>
        <Tab
          current={tab}
          index={2}
          onClick={() => setTab(2)}
        >
          Change Password
        </Tab>
      </TabContainer>

      <TabContent current={tab} index={1}>
        <Formik
          enableReinitialize
          validationSchema={profileScheme}
          initialValues={{
            name: data?.name || '',
            about: data?.about || '',
            privated: !!data?.privated,
          }}
          onSubmit={async (values) => {
            const res = await fetchUpdate(values);
            if (res) {
              const message = res.message || '';
              dispatch(showSnackBar({ type: 'success', message }));
              reload();
              onClose();
            }
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input name="name" placeholder="Name" />
              <TextArea name="about" placeholder="About" />
              <FromGroup>
                Private: <CheckBox name="privated" />
              </FromGroup>

              <ActionsButton>
                <Button type="button" onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  color="success"
                  loading={isLoadingUpdate}
                >
                  Edit
                </Button>
              </ActionsButton>
            </form>
          )}
        </Formik>
        { isErrorUpdate && <ErrorMessage>{dataUpdate?.message}</ErrorMessage> }
      </TabContent>

      <TabContent current={tab} index={2}>
        <Formik
          initialValues={{
            password: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={changeScheme}
          onSubmit={async (values) => {
            const res = await fetchChange(values);
            if (res) {
              const message = res.message || '';
              dispatch(showSnackBar({ type: 'success', message }));
              onClose();
            }
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input type="password" name="password" placeholder="Password" />
              <Input type="password" name="newPassword" placeholder="New Password" />
              <Input type="password" name="confirmNewPassword" placeholder="Confirm New Password" />

              <ActionsButton>
                <Button type="button" onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  color="success"
                  loading={isLoadingChange}
                >
                  Change
                </Button>
              </ActionsButton>
            </form>
          )}
        </Formik>
        { isErrorChange && <ErrorMessage>{dataChange?.message}</ErrorMessage> }
      </TabContent>
    </Container>
  );
}

export default Account;
