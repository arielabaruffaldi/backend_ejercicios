import React, { useState, useEffect } from 'react';
import styles from "./Form.module.scss";
import Input from "../Input/Input"
import Title from '../Title/Title';
import Button from '../Button/Button';
import { socket } from './../services/socket';


interface EventInterface {
    target: {
        value: string,
        name: string
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Form = () => {
    const [data, setData] = useState({
        name: "",
        price: "",
        imgUrl: "",
        id: 0
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
            
        socket.emit('new-product', data);
        const rawResponse = await fetch('http://localhost:8080/products/guardar', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
                'Access-Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(data)
        });
        await rawResponse.json();
    };

    return (
        <>
            <Title hasMargin priority={3}>Agregar</Title>
            <form className={styles.Form} onSubmit={handleSubmit}
            >
                <div className={styles.InputContainer}>
                    <Input
                        name="message"
                        placeholder={"Remera"}
                        onChange={(e: EventInterface) => setData(state => ({ ...state, name: e.target.value }))} />
                    <Input
                        name="message"
                        placeholder={"200"}
                        onChange={(e: EventInterface) => setData(state => ({ ...state, price: e.target.value }))} />
                    <Input
                        name="message"
                        placeholder={"url imagen"}
                        onChange={(e: EventInterface) => setData(state => ({ ...state, imgUrl: e.target.value }))} />
                </div>
                <Button size={"10rem"}>
                    Agregar
                </Button>
            </form>


        </>
    )
}

export default Form;