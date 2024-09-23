import { io } from 'socket.io-client';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"; // Fallback to localhost if env is not set

// const socket = io('http://localhost:4000', {
//   autoConnect: false, // Prevent automatic connection
// });

const socket = io(backendUrl, {
  autoConnect: false, // Prevent automatic connection
  secure: true,
  transports: ["websocket", "polling"],
});

export default socket;

