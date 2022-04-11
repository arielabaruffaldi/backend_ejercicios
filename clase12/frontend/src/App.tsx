import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form'
import styles from './App.module.scss';
import Title from './components/Title/Title';
import Table from './components/Table/Table';
import { socket } from './components/services/socket';
import Chat from './components/Chat/Chat';
import Button from './components/Button/Button';

interface Product {
  name: string,
  price: number,
  id: number
}

function App() {
  const [products, setProducts] = useState<Product[] | undefined>()
  const [chatOpen, setChatOpen] = useState<Boolean>(true)
  useEffect(() => {
    socket.on('products', (data) => {
      setProducts(data)
    });

    getData()

  }, [])

  const getData = async () => {
    const response = await fetch(`http://localhost:8080/products/listar`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true'
      }
    })
    const data = await response.json()
    setProducts(data)
  }
  return (
    <>
      <div className={styles.ChatContainer}>
        {!chatOpen ?
          <Button size={"100%"} customClass={styles.chatTrigger} onClick={() => setChatOpen(!chatOpen)} secondary>
            abrir chat
          </Button> :
          chatOpen && <Chat onClose={() => { setChatOpen(!chatOpen) }} />}
      </div>
      <div className={styles.App}>
        <Title hasMargin priority={1}>Productos</Title>
        <Form />
        {products &&
          <Table
            items={products}
            totalItems={products.length}
            fieldAndHeaders={{
              Nombre: "name",
              Precio: "price",
              Url: "imgUrl"
            }}
          />
        }
      </div>
    </>
  );
}

export default App;
