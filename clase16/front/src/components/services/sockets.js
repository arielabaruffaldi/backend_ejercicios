import socketClient from "socket.io-client";
const ENDPOINT = "http://localhost:8080";
export const socket = socketClient(ENDPOINT, { transports: ["websocket"] });
