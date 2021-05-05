const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req,res) => {
  res.send('Express + TypeScript Server')
});

app.post('/login', (req,res) => {
  console.log("User is trying to log")
  res.send('Express + TypeScript Server')
  res.redirect("http://localhost:3000")
});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
