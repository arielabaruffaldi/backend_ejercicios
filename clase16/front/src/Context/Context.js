import React, { useState } from 'react';


export const DataContext = React.createContext()


export const DataProvider = ({ children }) => {
    const [nombreProducto, setNombreProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [fotoProducto, setFotoProducto] = useState("")
    const [products, setProducts] = useState(0)

    

  return (
    <DataContext.Provider value={{
        nombreProducto,
        setNombreProducto,
        precioProducto,
        setPrecioProducto,
        fotoProducto,
        setFotoProducto,
        products,
        setProducts
        }}>
        { children }
    </DataContext.Provider>
  )
}
