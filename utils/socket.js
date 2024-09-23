import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000', {
//   autoConnect: false, // Prevent automatic connection
// });

const socket = io('http://142.93.253.67:4000', {
  autoConnect: false, // Prevent automatic connection
});

export default socket;

