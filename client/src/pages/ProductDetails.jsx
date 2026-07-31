import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.js";
const ProductDetails = () => {
  const {id}  = useParams()
  const[product,setProduct] = useState(null);
  
  useEffect(() => {
    fetchProduct()
  },[])

  const fetchProduct = async() => {
    try {
      const response = await api.get(`/products/${id}`);
      console.log(response.data);
      setProduct(response.data.product)
      
    } catch (error) {
      console.log(error);
      
    } 
  }
  if(!product)
  {
    return <h2>Loading...</h2>;
  }
  return(
    <div>
      <h2>{product.title}</h2>

      <p>{product.description}</p>

      <h3>₹ {product.price}</h3>

      <p>{product.brand}</p>

      <button>Add To Cart</button>
    </div>
  )
}

export default ProductDetails