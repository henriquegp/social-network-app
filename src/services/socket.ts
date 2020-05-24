import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

socket.on('connect', () => {
  console.log('Socket Online');
});

socket.on('disconnect', () => {
  console.log('Socket Offile');
});

export default socket;
