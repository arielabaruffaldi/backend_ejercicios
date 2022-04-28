import React from "react";
import "./ItemCard.css";

const Item = ({ data }) => {
  return (
    <div className="Item">
      <h1 className="h1-Item">{data.name}</h1>
      <img className="img-Item" src={data.thumbnail} alt={data.id}></img>
      <h3>{`$ ${data.price}`}</h3>
      <p>{data.description}</p>
      <h4>Stock: {data.stock}</h4>
    </div>
  );
};

export default Item;
