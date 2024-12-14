const express = require('express');
const router = express.Router();
const fetchUser = require('../Middleware/fetchUser');
const Note = require('../models/Notes');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const JWT_SECRET="thisisakshay";
router.get('/fetchallnotes',fetchUser, async (req, res) => {
    const userId = req.user.id;
    const notes = await Note.find({UserId: userId});
    res.send(notes);
});

router.get('/fetchonenote',fetchUser, async (req, res) => {
    const userId = req.user.id;
    const noteId = req.header('noteId');
    const notes = await Note.findById(noteId);
    res.send(notes);
});

router.post('/createnote',fetchUser,[
    body('title').isLength({min: 3})
    
], async (req, res)=>{
    const userId = req.user.id;

    const errors = validationResult(req);       //validationResult(req) returns array od
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }
    const user = await Note.create({
        UserId: userId,
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag
    })
    res.send(user);
   
});
router.put('/updatenote/:id',fetchUser, async (req, res) => {
    const noteId = req.params.id;
    console.log(req.user.title);
    let {title, description, tag} = req.body;
    console.log("title : "+title);
    let newNote = {};
    if(title) newNote.title = title;
    if(description) newNote.description = description;
    if(tag) newNote.tag = tag;

    let note = await Note.findById(noteId);

    if(!note){
        return res.status(404).send("Not Found");
    }
    if(req.user.id !== note.UserId.toString()){
        return res.status(404).send("Not Found");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
    console.log("newNote: "+ newNote.title);
    console.log("Note : "+note);
    res.json(note);

});
router.delete('/deletenote/:id',fetchUser, async (req, res) => {
    const noteId = req.params.id;

    let note = await Note.findById(noteId);

    if(!note){
        return res.status(404).send("Not Found");
    }
    if(req.user.id !== note.UserId.toString()){
        return res.status(404).send("Not Found");
    }
    note = await Note.findByIdAndDelete(noteId);

    res.json(note);

});

module.exports = router;