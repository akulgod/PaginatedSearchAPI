const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const empRouter = require('./routes/routes');  //Importing all the routes aka APIs
const { port, mongoURI } = require('./config/config');

app.use(bodyParser.json());
app.use('/', empRouter);

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


//Connecting to Mongoose. Modify connection string as per your mongo installation
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", function (req, res) {
  res.send("Employee App Running!");
});

app.listen(port, function () {
  console.log(`Employee app listening on port ${port}!`);
});
