const express = require('express');
const app = express();
const port = 3000;
const branchRoutes = require('./src/routes/branch');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API escuchando');
});

app.use('/branch', branchRoutes);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en el puerto ${port}`);
});
