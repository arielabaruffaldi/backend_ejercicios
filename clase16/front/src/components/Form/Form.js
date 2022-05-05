import React, { useContext } from "react";
import { DataContext } from "../../Context/Context";
import { socket } from "../services/sockets";

const Form = () => {
  const {
    nombreProducto,
    setNombreProducto,
    precioProducto,
    setPrecioProducto,
    fotoProducto,
    setFotoProducto
  } = useContext(DataContext);
  const cambiarNombreProducto = e => {
    const value = e.target.value;
    setNombreProducto(value);
  };
  const cambiarPrecioProducto = e => {
    const value = e.target.value;
    setPrecioProducto(value);
  };
  const cambiarFotoProducto = e => {
    const value = e.target.value;
    setFotoProducto(value);
  };

  const guardarProducto = event => {
    event.preventDefault();
    const data = {
      title: nombreProducto,
      price: precioProducto,
      thumbnail: fotoProducto
    };
    socket.emit("new-product", data);
    setNombreProducto("");
    setPrecioProducto("");
    setFotoProducto("");
  };

  return (
    <div className="Form-Div">
      <form onSubmit={guardarProducto}>
        <input
          id="Nombre"
          placeholder="Producto"
          type="text"
          name="nombre"
          value={nombreProducto}
          onChange={cambiarNombreProducto}
        />
        <input
          id="Precio"
          placeholder="Precio"
          type="number"
          name="precio"
          value={precioProducto}
          onChange={cambiarPrecioProducto}
        />
        <input
          id="Foto"
          placeholder="Foto"
          type="text"
          name="foto"
          value={fotoProducto}
          onChange={cambiarFotoProducto}
        />
        <button type="Submit">Guardar</button>
      </form>
    </div>
  );
};

export default Form;
