import React, { useState } from 'react';
import styles from "./Search.module.scss";
import Button from "./../Button/Button";
import Table from '../Table/Table';


interface EventInterface {
  target: {
    value: string,
    name: string
  }
}

const Search = () => {
  const [product, setProduct] = useState()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  };

  const handleSearchTyping = async (e: EventInterface) => {
    const res = await fetch(`http://localhost:8080/productos/listar/${e.target.value}`)
    const prod = await res.json()
    setProduct(prod)
  }

  console.log(product)

  return (
    <>
      <form className={styles.Search}>
        <input
          onChange={(e: EventInterface) => handleSearchTyping(e)}
          type="text"
          placeholder="Buscar..."
        />
        <Button
          noBorder
          onClick={handleSubmit}>
        </Button>
      </form>
     
    </>
  );
}

export default Search;