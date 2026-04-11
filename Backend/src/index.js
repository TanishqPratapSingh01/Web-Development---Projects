// server creation here
const express = require('express');
const app = express();
app.use(express.json()); // acts as middleware to parse incoming JSON data in request body  

/* -----------*/
const notes = [];
app.post('/notes', (req,res) => {
    //console.log(req.body);
    notes.push(req.body);
    res.status(201).json({ message:'Note created successfully'});  
});
app.get('/notes', (req,res) => {``
    res.status(200).json({
        message: "Notes retrieved successfully",
        notes: notes
    });
});
app.post('notes/:index', (req,res) => {
    const index = req.params.index;
    if(index >= 0 && index < notes.length){
        notes[index] = req.body;
        res.status(200).json({ message: "Note updated successfully" });
    } else {
        res.status(404).json({ message: "Note not found" });
    }
})
app.delete('/notes/:index',(req,res) => {
    const index = req.params.index; 
    delete notes[index];
    res.status(200).json({ message: "Note deleted successfully" });
});

/* -----------*/
app.get('/', (req,res) => {
    res.send("Tanishq Pratap Singh");
});

module.exports = app;