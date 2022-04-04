import React, { useState, useEffect } from 'react';
import styles from "./Form.module.scss";
import Input from "../Input/Input"
import Title from '../Title/Title';
import Button from '../Button/Button';


interface EventInterface {
    target: {
        value: string,
        name: string
    },
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Form = ({ action }: { action: (e: React.FormEvent, data: any) => void }) => {
    const [data, setData] = useState({
        name: "",
        price: "",
        imgUrl: "",
        id: 0
    })



    return (
        <>
            <Title hasMargin priority={3}>Agregar</Title>
            <form className={styles.Form} onSubmit={(e: React.FormEvent) => action(e, data)}
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