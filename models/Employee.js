const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    trim: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String
  },
  salary: {
    type: Number
  }
});

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee;