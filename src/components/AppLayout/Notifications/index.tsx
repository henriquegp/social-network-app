import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { FaBell } from 'react-icons/fa';

import socket from '../../../services/socket';
import { ApplicationState } from '../../../store';
import { notificationRepository } from '../../../repositories';
import { Notification } from '../../../repositories/notificationRepository';
import UserPicture from '../../UserPicture';

import MenuList from '../../MenuList';

import {
  Container, Item, Text, Unseen, UnseenSign,
} from './styles';

function Notifications() {
  const userId = useSelector<ApplicationState, number>((state) => state.system.user.userId);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await notificationRepository.get();
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    socket.on(`notification:${userId}`, (notification: Notification) => {
      setNotifications((n) => ([notification, ...n]));
    });

    return () => { socket.off(`notification:${userId}`); };
  }, [fetchNotifications, userId]);

  const isUnseen = useMemo(() => notifications.some((n) => !n.seen), [notifications]);

  async function handleSeen() {
    await notificationRepository.seen();
    setTimeout(() => {
      setNotifications((notification) => notification.map((n) => ({
        ...n,
        seen: 1,
      })));
    }, 5000);
  }

  return (
    <Container>
      <MenuList
        toggle={<FaBell size="17" title="Notification" onClick={handleSeen} />}
        width={400}
      >
        <ul>
          { notifications.length
            ? notifications.map(({ user, ...notification }) => (
              <Item key={notification.notificationId}>
                <UserPicture
                  height={40}
                  username={user.username}
                  src={user.profile.picture}
                />
                <Text>
                  <strong>{user.username}</strong> {notification.text}
                </Text>
                { !notification.seen && <Unseen /> }
              </Item>
            ))
            : <Item>No notifications</Item>}
        </ul>
      </MenuList>
      { isUnseen && <UnseenSign /> }
    </Container>
  );
}

export default Notifications;
