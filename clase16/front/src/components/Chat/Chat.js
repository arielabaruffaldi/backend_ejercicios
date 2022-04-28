import React, { useEffect, useState } from "react";
import "./Chat.css";
import { socket } from "../services/sockets";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    email: "",
    message: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit("new-message", form);
  };
  useEffect(() => {
    socket.emit("askMessages");
    socket.on("updateChat", data => {
      setMessages(data);
    });
  }, []);

  return (
    <div>
      <div className="chat-window">
        {messages.length > 0 &&
          messages.map((msg, index) => {
            return (
              <div key={index}>
                {msg.email}: {msg.message} {msg.created_at}
              </div>
            );
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="mail"
          placeholder={"Mail"}
          onChange={e =>
            setForm(prevState => ({ ...prevState, email: e.target.value }))
          }
        ></input>
        <input
          name="message"
          placeholder={"Mensaje"}
          onChange={e =>
            setForm(prevState => ({ ...prevState, message: e.target.value }))
          }
        ></input>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
