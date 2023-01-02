import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextEditor, { modules, formats } from './TextEditor';
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"
import "../css/AddNote.css"
import { useNavigate } from 'react-router';

const Notes = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const context = useContext(noteContext);
    let history = useNavigate();
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      } else {
        history("/Login")
      }
    }, [])

    const ref = useRef(null)
    // const refClose = useRef(null)
    const [note, setNote] = useState({id: "", etitle: "", edescription: ""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description})
    }

    const handleClick = (e)=>{ 
      editNote(note.id, note.etitle, note.edescription)
      // refClose.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const onChangetext = (value)=>{
      setNote({...note, edescription: value})
  }

  return (

    <>
    <Button ref = {ref} className='addnotecss d-none' variant="primary" onClick={handleShow}>
      <p className='symbol'>+</p>
    </Button>

    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="App">
            <div className="md-3">
              <div className="row"> 
                <form onSubmit={handleClick} className="update__forms">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label className="font-weight-bold"> Title </label>
                      <input type="text" name="etitle" id='etitle' onChange={onChange} value = {note.etitle} className="form-control" placeholder="Title" required />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group col-md-12 editor">
                      <label className="font-weight-bold"> Description</label>
                    <TextEditor toolbarId={'t1'}/>
                    <ReactQuill
                      theme="snow"
                      id='edescription'
                      name = "edescription"
                      value={note.edescription}
                      onChange={onChangetext}
                      placeholder={"Write something awesome..."}
                      modules={modules('t1')}
                      formats={formats}
                    />
                    </div>
                  </div> 
                </form>
              </div>
            </div>
          </div>        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type='Submit' onClick={handleClick}>Update Note</Button>
      </Modal.Footer>
    </Modal>

    <div>
        <AddNote />
        <div className="row my-3">
                <h2>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote = {updateNote} note={note} />
                })}
            </div>
    </div>
    </>
  )
}

export default Notes