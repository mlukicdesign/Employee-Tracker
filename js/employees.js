require("dotenv").config();
const express = require("express");
const cTable = require("console.table");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const { restart } = require("nodemon");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// const {
//   start,
// } = require("../server.js")


// function restart() {
//   inquirer
//     .prompt([
//       {
//         type: 'list',
//         name: 'action',
//         message: 'What would you like to do next?',
//         choices: ['Go Back', 'Exit']
//       }
//     ])
//     .then((answers) => {
//       if (answers.action === 'Go Back') {
//         start();
//       } else if (answers.action === 'Exit') {
//         console.log('Program Ended');
//         return;
//       }
//     });
//   }


// Connect to Database
const db = mysql.createConnection(
  {
    database: "employee_tracker",
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  console.log(`Connected to the employee_tracker database.`)
);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});



// View All Employees


function viewAllEmployees() {
  const sql = "SELECT * FROM employee;";
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(result);
  });
}



// Add new employee

async function addEmployeeToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "employee_tracker",
      namedPlaceholders: true,
    });

    const prompts = [
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID of the employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID of the employee (leave empty if none):",
      },
    ];

    const answers = await inquirer.prompt(prompts);

    const insertQuery =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";

    await connection.execute(insertQuery, [
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId || null,
    ]);

    console.log("New employee added successfully");
    connection.end();
  } catch (error) {
    console.error("Error adding new employee:", error);
  }
  restart();
}



// Update Employee (this is bogos code)

function updateUserRole() {
  // Prompt the user for the employee and role details
  viewAllEmployees();
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee whose role you want to update:",
        validate: (value) => {
          if (value && !isNaN(value)) {
            return true;
          }
          return "Please enter a valid employee ID.";
        },
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the new role ID for the employee:",
        validate: (value) => {
          if (value && !isNaN(value)) {
            return true;
          }
          return "Please enter a valid role ID.";
        },
      },
    ])
    .then((answers) => {
      // Update the employee's role in the database
      const query = "UPDATE employee SET role_id = ? WHERE id = ?";
      const params = [answers.roleId, answers.employeeId];

      db.query(query, params, (error, results) => {
        if (error) {
          console.error("Error updating the user role: " + error.stack);
          return;
        }
        console.log(
          `Successfully updated the role for employee with ID ${answers.employeeId}.`
        );
      });
    });
  restart();
}

module.exports = {
  addEmployeeToDatabase,
  viewAllEmployees,
  updateUserRole,
};
