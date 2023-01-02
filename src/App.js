import { useState } from "react";
import "./css/App.css"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NoteNavbar from './components/NoteNavbar';
import {Home}  from './components/Home';
import About from './components/About';
import NoteState from "./context/notes/NoteState"
import Login from './components/Login';
import AddNote from "./components/AddNote";
import Signup from "./components/Signup";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    },1500);
  }

  return (
    <>
        <NoteState>
          <Router>
            <NoteNavbar />
            <Alert alert = {alert}/>
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert} />}/>
              <Route exact path="/AddNote" element={<AddNote showAlert = {showAlert} />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/Login" element={<Login showAlert = {showAlert} />} />
              <Route exact path="/Signup" element={<Signup showAlert = {showAlert} />} />
            </Routes>
          </Router> 
        </NoteState>
    </>
  );
}

export default App;