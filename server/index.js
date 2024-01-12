const express = require('express');
const router = require('./routes/todoRoutes');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const Todo = require('./models/todo');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('connected to db');
  })
  .catch(() => {
    console.log("could'nt connect to db");
  });

app.use('/todos', router);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
