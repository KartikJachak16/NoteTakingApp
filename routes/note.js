const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const jwt = require('jsonwebtoken');
const { body, validationResult} = require('express-validator');

const JWT_I_SECRET = "whattttttt";


// fetch all Notes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// add Note
router.post('/addnotes', fetchuser, async (req, res) => {
        try {
            const { title, description } = req.body;

            const note = new Note({
                title: req.body.title,
                description: req.body.description,
                user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


// Update Note    
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Delete Note

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
   
    const { title } = req.body;
    const { description } = req.body;
    try {
    // find the post to be deleted and delete it 
    let note = await Note.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")    
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("Not Allowed")
    }
    
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note deleted successfully"})    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }   
})

module.exports = router