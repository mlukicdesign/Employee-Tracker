require('dotenv').config();
const express = require('express');
const { connect } = require('http2');
const cTable = require('console.table');
const mysql = require('mysql2/promise');
const inquirer = require("inquirer");


const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use('helpers.js')



// Connect to Database
const db = mysql.createConnection (
    {
        database: 'employee_tracker',
        host: 'localhost',
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },  
    console.log(`Connected to the employee_tracker database.`)
);


// Read data functions
// Don't forget to add Routing later

function viewAllRoles() {
    const sql = 'SELECT * FROM role;';
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(result);
      start();
    });
  }
  

  function viewAllDepartments() {
    const sql = 'SELECT * FROM department;';

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
        start();
    });
  }


// Add new employee

async function addEmployeeToDatabase() {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'employee_tracker',
        namedPlaceholders: true,
      });
  
      const prompts = [
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the role ID of the employee:',
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the manager ID of the employee (leave empty if none):',
        },
      ];
  
      const answers = await inquirer.prompt(prompts);
  
      const insertQuery =
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  
      await connection.execute(insertQuery, [
        answers.firstName,
        answers.lastName,
        answers.roleId,
        answers.managerId || null,
      ]);
  
      console.log('New employee added successfully');
      connection.end();
    } catch (error) {
      console.error('Error adding new employee:', error);
    }
    start();
  }

  
  
  
  
 

// Create a list of options
const options = [
    'Add Employee',
    'Update Employee Role',
    'View All Roles',
    'Add Roles',
    'View All Departments',
    'Add Department',
    'Quit'
  ];
  
  // Create the inquirer prompt
  function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: options
      }
    ])
    .then((answers) => {
      // Handle the selected option
      switch (answers.action) {
        case 'Add Employee':
        addEmployeeToDatabase();
          console.log('Adding Employee...');
          break;
        case 'Update Employee Role':
          // Update Employee Role logic
          console.log('Updating Employee Role...');
          break;
        case 'View All Roles':
        viewAllRoles();
          console.log('Viewing All Roles...');
          break;
        case 'Add Roles':
          // Add Roles logic
          console.log('Adding Roles...');
          break;
        case 'View All Departments':
          viewAllDepartments();
          console.log('Viewing All Departments...');
          break;
        case 'Add Department':
          // Add Department logic
          console.log('Adding Department...');
          break;
        case 'Quit':
          // Quit logic
          console.log('Quitting...');
          break;
        default:
          console.log('Invalid option selected.');
          break;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };



// Server Start
app.listen(PORT, function() {
    console.log(`running on http://localhost:${PORT}`)
});

start();