import { useState } from "react"
import api from "../api/axios.js"

const Register = () => {
    const[formData,setFormData] = useState({
      name:"",
      email:"",
      password:"",
    })

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await api.post("/auth/register",formData);
        console.log(response.data);
        alert("Registration Successfully")
        setFormData({
          name:"",
          email:"",
          password:"",
        });
      } catch (error) {
        console.log(error.response?.data);

       alert(error.response?.data?.message || "Something went wrong");
      }
    }

  return (
    <>
    <div>Register</div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder='Enter Name'
        value={formData.name}
        onChange={handleChange}
      />
      <br/>
      <br/>
      <input
        type="email"
        name="email"
        placeholder='Enter email'
        value={formData.email}
        onChange={handleChange}
      />
      <br/>
      <br/>
      <input
        type="password"
        name="password"
        placeholder='Enter Password'
        value={formData.password}
        onChange={handleChange}
      />
      <br/>
      <br/>
      <button type="submit">
        Register
      </button>
    </form>

    </>
  )
}

export default Register