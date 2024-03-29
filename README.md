<!-- ABOUT THE PROJECT -->
## About The Project
A lightweight node.js app which maintains an employee database using REST APIs only. Supports bulk insertion of data and pagination with search functionality. 

Repo is currently hosted at : <https://github.com/akulgod/PaginatedSearchAPI> with sample data.

You can check it out :)

### Built With

This project is completely built in 
<a>
    Node.js
</a>
with 
<a>
    Express
</a>
<a>
    Mongoose (MongoDB)
</a>

### Features

- Can easily be launched on any machine with minimal dependencies
- Supports insertion of bulk data efficiently 
- Supports customisable pagination
- Can give partial search results also

<!-- GETTING STARTED -->
## Getting Started

This is a short guide which instructs on how you can set up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* Node.js
* MongoDB
* Express

### Installation

* First clone the repository from Github :
  ```sh
  git clone https://github.com/akulgod/PaginatedSearchAPI.git
  ```

* Make necessary changes in /config/config.js as per your MongoDB settins

* Open a CMD Client at \PaginatedSearchAPI
    * Windows (using cmd):
    ```sh
    node app.js
    ```
* The server will start at on <localhost:3000>. You should see a welcome screen. 

* Congrats!!! You have successfully installed the project

* You can now either add your employee data using the given POST API or use the given test data file
    * Windows (using cmd):
    ```sh
    curl -X POST -H "Content-Type: application/json" -d  @EmpTestData.json http://localhost:3000/insert/employee
    ```

<!-- USAGE EXAMPLES -->
## Usage

### 1. View All Employee Data

**Endpoint:** `/get/Allemployees`

**Method:** `GET`

**Example** http://localhost:3000/get/Allemployees


### 2. Ingest Bulk Employee Data

**Endpoint:** `/insert/employee'`

**Method:** `POST`

**Request Body:**

```json
[
    {
    "_id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "position": "Software Engineer",
    "department": "Engineering",
    "salary": 80000
    },
    {
    "_id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "position": "HR Head",
    "department": "HR",
    "salary": 50000
    }
]
```

**Example** curl -X POST -H "Content-Type: application/json" -d "{\"_id\": \"1\", \"firstName\": \"Alex\", \"lastName\": \"Ming\", \"position\": \"Director\", \"department\": \"HR\", \"salary\" : \"20000\"}" http://localhost:3000/insert/employee

Alternatively, you can create a .json file containing all the employee records and pass it in above call.


### 3. Pagination & Search

**Endpoint:** `/get/employee'

**Method:** `GET`

**Request Parameters**

- Page
- Limit
- Field
- SearchText

**Example**
To call above GET API for all employees with (field) position = (searchText) Design, page 1, limit 5: http://localhost:3000/get/employee?page=1&limit=5&field=position&searchText=Design

This can also be called without any searchText and firld. In this case, it will work as normal pagination does.
To get all possible fields on which you can search,  go to /models/Employee.js


## Challenges faced
- While trying to insert bulk data, the app was initially making a DB call for every single Employee. So, If you were trying to insert 30 employees at once, it would make 30 DB calls. 
- This was very inefficient and a waste of resources> After a couple of tries, I was able to optimise it to make a single DB call only, no mater number of records.
- Earlier, search was only working for complete words. For eg. If you searched 'Design', it was unable to retrieve records like 'Head Designer'
- After tweaking the code, I was able to implement partial search using regex. So now the above example will works as expected.
- This task was given in the middle of a work week with close deadline, so had to manage time very efficiently.


<!-- CONTACT -->
## Contact

* Name: Aditya Kulgod
* Email: akulgod@gmail.com
* Linkedin : <https://www.linkedin.com/in/aditya-k-30386a113/>


