import io from 'socket.io-client';

const { REACT_APP_API_URL } = process.env;

const socket = io.connect(REACT_APP_API_URL);

socket.on('connect', () => {
  console.log('Socket Online');
});

socket.on('disconnect', () => {
  console.log('Socket Offile');
});

export default socket;
