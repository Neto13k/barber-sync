const express = require('express');
const axios = require('axios')

express.use(express.json())

express.get('/api/cadastro', (req, res) => {
  console.log('Server funcionando'); 
  res.json({ message: 'Server funcionando' });
});