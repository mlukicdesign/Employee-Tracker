require('dotenv').config();
const express = require('express');
const cTable = require('console.table');
const mysql = require('mysql2');
const inquirer = require("inquirer");

// Import Employee Logic

const {
  viewAllEmployees,
  updateUserRole,
  addEmployeeToDatabase,
} = require("./js/employees.js");



const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// function restart() {
// inquirer
//   .prompt([
//     {
//       type: 'list',
//       name: 'action',
//       message: 'What would you like to do next?',
//       choices: ['Go Back', 'Exit']
//     }
//   ])
//   .then((answers) => {
//     if (answers.action === 'Go Back') {
//       start();
//     } else if (answers.action === 'Exit') {
//       console.log('Program Ended');
//       return;
//     }
//   });
// }


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

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});


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
      restart();
    });
  }

  function viewAllRolesOnly() {
    const sql = 'SELECT * FROM role;';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(result);
    });
  }

  // function viewAllEmployees() {
  //   const sql = 'SELECT * FROM employee;';
  //   db.query(sql, (err, result) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.table(result);
  //     restart();
  //   });
  // }
  

  function viewAllDepartments() {
    const sql = 'SELECT * FROM department;';
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.table(result);
        restart();
    });
  }


// Add new employee

// async function addEmployeeToDatabase() {
//     try {
//       const connection = await mysql.createConnection({
//         host: process.env.DB_HOST,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         database: 'employee_tracker',
//         namedPlaceholders: true,
//       });
  
//       const prompts = [
//         {
//           type: 'input',
//           name: 'firstName',
//           message: 'Enter the first name of the employee:',
//         },
//         {
//           type: 'input',
//           name: 'lastName',
//           message: 'Enter the last name of the employee:',
//         },
//         {
//           type: 'input',
//           name: 'roleId',
//           message: 'Enter the role ID of the employee:',
//         },
//         {
//           type: 'input',
//           name: 'managerId',
//           message: 'Enter the manager ID of the employee (leave empty if none):',
//         },
//       ];
  
//       const answers = await inquirer.prompt(prompts);
  
//       const insertQuery =
//         'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
  
//       await connection.execute(insertQuery, [
//         answers.firstName,
//         answers.lastName,
//         answers.roleId,
//         answers.managerId || null,
//       ]);
  
//       console.log('New employee added successfully');
//       connection.end();
//     } catch (error) {
//       console.error('Error adding new employee:', error);
//     }
//     restart();
//   }

  // Add new department

  async function addDepartment() {
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
          name: 'departmentName',
          message: 'What is the name of the new department?',
        },
      ];
  
      const answers = await inquirer.prompt(prompts);
  
      const insertQuery =
        'INSERT INTO department (name) VALUES (?)';
  
      await connection.execute(insertQuery, [
        answers.departmentName
      ]);
  
      console.log('Department added successfully');
      connection.end();
    } catch (error) {
      console.error('Error adding new department', error);
    }
    restart();
  }

// Add New Role

async function addNewRole() {
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
        name: 'roleTitle',
        message: 'What is the new role title?',
      },
      {
        type: 'input',
        name: 'roleSalary',
        message: 'What is the salary of the new role?',
      },
      {
        type: 'input',
        name: 'roleDepartment',
        message: 'Which existing department does this new role belong to?',
      },
    ];

    const answers = await inquirer.prompt(prompts);

    const insertQuery =
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

    await connection.execute(insertQuery, [
      answers.roleTitle,
      answers.roleSalary,
      answers.roleDepartment,
    ]);

    console.log('New role added successfully');
    connection.end();
  } catch (error) {
    console.error('Error adding new role', error);
  }
  restart();
}


  
// Update Employee (this is bogos code)

// function updateUserRole() {
//   // Prompt the user for the employee and role details
//   viewAllEmployees();
//   inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'employeeId',
//         message: 'Enter the ID of the employee whose role you want to update:',
//         validate: (value) => {
//           if (value && !isNaN(value)) {
//             return true;
//           }
//           return 'Please enter a valid employee ID.';
//         }
//       },
//       {
//         type: 'input',
//         name: 'roleId',
//         message: 'Enter the new role ID for the employee:',
//         validate: (value) => {
//           if (value && !isNaN(value)) {
//             return true;
//           }
//           return 'Please enter a valid role ID.';
//         }
//       }
//     ])
//     .then((answers) => {
//       // Update the employee's role in the database
//       const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
//       const params = [answers.roleId, answers.employeeId];

//     db.query(query, params, (error, results) => {
//         if (error) {
//           console.error('Error updating the user role: ' + error.stack);
//           return;
//         }
//         console.log(`Successfully updated the role for employee with ID ${answers.employeeId}.`);
//       });
//     });
//     restart();
// }





 

// Create a list of options
const options = [
  
    'View All Existing Employees',
    'Add New Employee',
    'Update Existing Employee Role',
    'View All Existing Roles',
    'Add New Role',
    'View All Existing Departments',
    'Add New Department',
    'Quit'
  ];
  
  // Create the inquirer prompt
  function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Welcome to your Employee Management Database, What would you like to do?',
        choices: options
      }
    ])
    .then((answers) => {
      // Handle the selected option
      switch (answers.action) {
        case 'View All Employees':
        viewAllEmployees();
          console.log('Display All Employees...');
          break;
        case 'Add an Employee':
        addEmployeeToDatabase();
          console.log('Adding Employee...');
          break;
        case 'Update Employee Role':
          updateUserRole();
          console.log('Updating Employee Role...');
          break;
        case 'View All Roles':
        viewAllRoles();
          console.log('Viewing All Roles...');
          break;
        case 'Add Roles':
          addNewRole();
          console.log('Adding Roles...');
          break;
        case 'View All Departments':
          viewAllDepartments();
          console.log('Viewing All Departments...');
          break;
        case 'Add Department':
          addDepartment();
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