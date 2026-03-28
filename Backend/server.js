const express = require('express');
const app = express(); 

const notes = [] 

app.use(express.json());

app.post('/notes',(req,res) => {
    notes.push(req.body);
    res.status(201).send('Note added successfully');
})

app.get('/notes',(req,res) => {
    res.status(201).json( {
        message: "notes retrieved successfully",
        notes: notes
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});