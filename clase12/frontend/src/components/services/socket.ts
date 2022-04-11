import socketClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";
export const socket = socketClient(ENDPOINT, { transports: ['websocket'] });