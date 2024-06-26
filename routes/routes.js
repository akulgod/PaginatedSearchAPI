// routes/items.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


//POST API for inserting a new Employee record
router.post('/insert/employee', async (req, res) => {
    try {
        const employees = Array.isArray(req.body) ? req.body : [req.body]; //This will ensure that the code will work for a single JSON as well as an array. User can add multiple entries quickly by passing an array of multiple employees

        // Validating all employees before insertion
        const validationPromises = employees.map(empData => {
            const newEmployee = new Employee(empData);
            return newEmployee.validate(); // Returns a promise
        });
        await Promise.all(validationPromises);

        // Inserting all employees in a single call to the database
        const createdEmployees = await Employee.insertMany(employees);

        res.status(201).json({
            success: "Records created successfully",
            createdEmployees
        });   //Returning success message
    } catch (error) {
        console.error('Error creating Employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//Sample POST request using curl for above API: curl -X POST -H "Content-Type: application/json" -d "{\"_id\": \"1\", \"firstName\": \"Alex\", \"lastName\": \"Ming\", \"position\": \"Director\", \"department\": \"HR\", \"salary\" : \"20000\"}" http://localhost:3000/insert/employee


//GET request for getting paginated data of employees and search on given field
router.get('/get/employee', async (req, res) => {
    try {
        const { page = 1, limit = 5, field = null, searchText = null } = req.query; //Default values for page and limit

        const skip = (page - 1) * limit;
        const totalEmp = await Employee.countDocuments();
        let query = (field != null && searchText != null) ? { [field]: { $regex: searchText, $options: 'i' } } : null;
        const emp = await Employee.find(query, { __v: 0 }).skip(skip).limit(limit); //Fetching data as per the page required and given limit

        res.status(200).json({
            emp,
            totalEmployees: totalEmp,
            currentPage: parseInt(page)
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//Example URL to call above GET API for all employees with position as design, page 1, limit 5: http://localhost:3000/get/employee?page=1&limit=5&field=position&searchText=Design
//Above URL can also be called without any search parameters

//GET request to fetch all employee data
router.get('/get/Allemployees', async (req, res) => {
    const allEmp = await Employee.find({}, "-__v");
    return res.status(200).json(allEmp);
});

module.exports = router;
