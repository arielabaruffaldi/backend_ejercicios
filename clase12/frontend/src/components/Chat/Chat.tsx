import React, { useState, useEffect } from 'react';
import { socket } from './../services/socket';
import Input from "../Input/Input"
import Button from '../Button/Button';
import styles from "./Chat.module.scss";
import { FiX } from "react-icons/fi";
interface Message {
    email: string,
    message: string,
    date: string
}

interface EventInterface {
    target: {
        value: string,
        name: string
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface ChatProps {
    onClose: () => void
}

const Chat = ({ onClose }: ChatProps) => {
    const [form, setForm] = useState({
        email: "",
        message: ""
    })
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.on('messages', data => {
            setMessages(data)
        });
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch(`http://localhost:8080/messages/get`)
        const data = await res.json()
        console.log("data------", data)
        setMessages(data)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        socket.emit('new-message', form);
       /*  const rawResponse = await fetch('http://localhost:8080/messages/new', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(form)
        });
        await rawResponse.json(); */
    }

    return (
        <>
            <form className={styles.Chat} onSubmit={handleSubmit}>
                <FiX size={"1.5rem"} color={'var(--azul)'} className={styles.closeModal} onClick={onClose}>x</FiX>
                <Input
                    customClass={styles.Input}
                    name="mail"
                    placeholder={"Email"}
                    onChange={(e: EventInterface) => setForm(prevState => ({ ...prevState, email: e.target.value }))}
                />
                <div className={styles.MessagesContainer}>
                    {messages.length > 0 && messages.map((msg, index) => {
                        return (
                            <div key={index}>
                                <p><span className={'red'}>{msg.email}</span> <span className={'green'}> ({msg.date}) </span> <span className={'white'}>{msg.message}</span></p>
                            </div>
                        )
                    })}
                </div>
                <Input
                    customClass={styles.Input}
                    name="message"
                    placeholder={"Mensaje"}
                    onChange={(e: EventInterface) => setForm(prevState => ({ ...prevState, message: e.target.value }))} />
                <Button disabled={!form.email} size={"10rem"}>
                    Enviar
                </Button>
            </form>
        </>
    )
}

export default Chat;