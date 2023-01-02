import React, {useContext, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import noteContext from "../context/notes/NoteContext"
import "../css/AddNote.css"
// import { Col, Row } from 'react-bootstrap';
import TextEditor, { modules, formats } from './TextEditor';
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"

const AddNote = () => {

  // const [quill, setQuill] = useState()

  // const wrapperRef = useCallback((wrapper) =>{
  //   if(wrapper == null) return

  //   wrapper.innerHTML = ""
  //   const editor = document.createElement("div")
  //   wrapper.append(editor)
  //   const quill = new Quill(editor, {
  //     theme: "snow",
  //     modules: { toolbar: TOOLBAR_OPTIONS },
  //   })
  //   setQuill(quill)
  //   console.log(quill)
  // },[])


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const context = useContext(noteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: ""})

  const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description);
        console.log(note)
        // setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    const onChangetext = (value)=>{
      setNote({...note, description: value})
  }

  return (
    <div>
      <Button className='addnotecss' variant="primary" onClick={handleShow}>
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
          <Modal.Title>Create Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="App">
              <div className="md-3">
                <div className="row"> 
                  <form onSubmit={handleClick} className="update__forms">
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label className="font-weight-bold"> Title </label>
                        <input type="text" name="title" onChange={onChange}  className="form-control" placeholder="Title" required />
                      </div>
                      <div className="clearfix"></div>
                      <div className="form-group col-md-12 editor">
                        <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                      <TextEditor toolbarId={'t1'}/>
                      <ReactQuill
                        theme="snow"
                        name = "description"
                        // value={note.description}
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
          <Button variant="primary" type='Submit' onClick={handleClick}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNote