import * as socketio from 'socket.io';
import {messages} from '../controllers/Messages';
import {products} from './Products'





export const initWsServer = (server) => {
  const io = new socketio.Server();
  io.attach(server);

  io.on('connection', (socket) => {
    socket.on("askProducts", async () =>{
        const allProducts = await products.getAll()
      socket.emit("updateProducts", allProducts)
    })
    socket.on("askMessages", async () => {
      const allMessages = await messages.getMessages()
      socket.emit("updateChat", allMessages)
    })
    socket.on('new-message', async (data) => {
      const res = await messages.addMessage(data)
      const allMessages = await messages.getMessages()
      io.emit("updateChat", allMessages);
    });

  });
};
