import React, { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";

import "./ProductList.css";
import { socket } from "../services/sockets";

const ProductList = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    socket.emit("askProducts");
    socket.on("updateProducts", data => {
      setResponseData(data);
    });
  }, []);

  return (
    <div className="ProducList-div">
      {responseData.length > 0 &&
        responseData.map((product, index) => {
          return <ItemCard key={index} data={product}></ItemCard>;
        })}
    </div>
  );
};

export default ProductList;
