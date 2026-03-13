const express = require('express');
const app = express(); 

app.post('/api/data',(req,res) => {
    res.json({message: 'Data received successfully'});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});