import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form'
import styles from './App.module.scss';
import Title from './components/Title/Title';
import Table from './components/Table/Table';

interface Product {
  name: string,
  price: number,
  id: number
}

function App() {
  const [products, setProducts] = useState<Product[] | undefined>()
  const [error, setError] = useState("");

  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent, data: any) => {
    e.preventDefault();
    try{
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
      getData()
    }catch(err){
      setError("Ocurrió un error, intenténtelo nuevamente")
    }
  };
  return (
    <>
      <div className={styles.App}>
        <Title hasMargin priority={1}>Productos</Title>
        <Form
          action={handleSubmit}
        />
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
        {error.length > 0 && <p>{error}</p>}
      </div>
    </>
  );
}

export default App;
