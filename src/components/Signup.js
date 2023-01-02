import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Signup.css";

const Signup = (props) => {

  const [credentials, setcredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })

  let history = useNavigate()

  const handleSumbit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({firstname:credentials.firstname, lastname:credentials.lastname, email:credentials.email, password:credentials.password})
    })
    const json = await response.json()
    console.log(json) 
    if (json.success){
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Account Created Successfully", "success")
      history("/Login")
    } else {
      props.showAlert("Invalid Credentials", "danger")
    }
  }

  const onChange = (e) => {
    setcredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className="Signupcontainer">
      <Form onSubmit={handleSumbit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name='firstname' id='firstname' value={credentials.firstname} placeholder="Enter email" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name='lastname' id='lastname' value={credentials.lastname} placeholder="Enter email" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' id='email' value={credentials.email} placeholder="Enter email" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' id='password'value={credentials.password} placeholder="Password" onChange={onChange} />
        </Form.Group>
        <Form.Group className="mb-3">
            <Link type="button" className="btn btn-link" to="/Login">Have an account? Login</Link>              
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Signup