import {useEffect,useState} from 'react';
import api from "../api/axios.js";
import { Link } from "react-router-dom";

const Home = () => {
  const [products,setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
  },[])


  const fetchProducts = async() => {
    try {
      
      const response = await api.get("/products");
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
              console.log(error);
    } 
  }

  return (
   <div>
    <h1>All Products</h1>
     {products.map((product) => (
        <div key={product._id}>
        <Link to={`/product/${product._id}`}>
          <h3>{product.title}</h3>
        </Link>

          <p>₹ {product.price}</p>

          <p>{product.brand}</p>
        </div>
      ))}
   </div>
  )
}

export default Home