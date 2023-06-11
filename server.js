require('dotenv').config();
const express = require('express');
const { connect } = require('http2');
const cTable = require('console.table');
const mysql = require('mysql2');
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

  // Close connection?

  function quit() {
    connection.end();
  }


// Prompt user for new employee details
function promptNewEmployee() {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'input',
        name: 'role_id',
        message: "Enter the employee's role ID:",
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "Enter the employee's manager ID (if any):",
      },
    ])
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
          promptNewEmployee();
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