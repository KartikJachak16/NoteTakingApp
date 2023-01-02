import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Login.css";



const Login = (props) => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  })

  let history = useNavigate()

  const handleSumbit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password})
    })
    const json = await response.json()
    console.log(json) 
    if (json.success){
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Loged in Successfully", "success")
      history("/")
    } else {
        props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
        <div className="Logincontainer">
          <Form onSubmit={handleSumbit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' id='email' value={credentials.email} placeholder="Enter email" onChange={onChange} />
            </Form.Group>
      
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password' id='password'value={credentials.password} placeholder="Password" onChange={onChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Link type="button" className="btn btn-link" to="/Signup">Don't have an account? Sign Up</Link>              
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      );
    }
    
export default Login