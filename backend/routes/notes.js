const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../model/Notes');
const { body, validationResult } = require('express-validator');

// Route 1: Get all notes for a user
// This route retrieves all notes for the authenticated user
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
}); 

// Route 2: Add a new note
// This route allows the authenticated user to add a new note
router.post('/addnote', fetchuser, [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    try {
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});

// Route 3: Update an existing note
// This route allows the authenticated user to update an existing note
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long').isLength({ min: 5 }),
], async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    try {
        // Find the note by ID and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});

// Route 4: Delete a note
// This route allows the authenticated user to delete a note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note by ID
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Check if the user is authorized to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        // Delete the note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error.message);
    }
});
module.exports = router;

