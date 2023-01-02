import React from 'react';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/NoteNavbar.css"

const NoteNavbar = () => {

    let location = useLocation();

    let history = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        history("/Login")
    }

   return (
    <div>
    
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">NextNote</Navbar.Brand>
                    <Nav className="me-auto">
                    <Link className={`nav-link ${location.pathname === "/About" ? "active":""}`} to="/About">About</Link>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-light" type="submit" to={"/Login"}>Login</Link>
                    </form>: <Link className="btn btn-light" type="submit" onClick={handleLogout}>Logout</Link>}    

                    </Nav>
            </Container>
        </Navbar>
    </div>
  )
}

export default NoteNavbar