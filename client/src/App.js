import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "http://localhost:3001/items/"
    );
    const products = data;
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <p key={product.name}>{product.name}</p>
      ))}
    </div>
  );
}

export default App;
