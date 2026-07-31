import{ useState } from 'react'
import api from "../src/api/axios.js"

const Login = () => {
  const[formData,setFormData] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login",formData);
      console.log(response.data);
      alert("Login Successful");
    } catch (error) {
      alert(error.message);
    }

    
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter username or email"
          value={formData.email}
          onChange={handleChange}
        />
        <br/>
        <br/>
         <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br/>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login