const express = require('express');
const axios = require('axios')

app.use(express.json())

app.get('/api/cadastro', (req, res) => {
  console.log('Server funcionando'); 
  res.json({ message: 'Server funcionando' });
});