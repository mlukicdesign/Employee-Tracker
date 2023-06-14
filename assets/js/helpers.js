// const mysql = require('mysql2');


// // Connect to Database
// const db = mysql.createConnection (
//     {
//         database: 'employee_tracker',
//         host: 'localhost',
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//     },  
//     console.log(`Connected to the employee_tracker database.`)
// );


// function viewAllRoles() {
//     const sql = 'SELECT * FROM role;';
  
//     db.query(sql, (err, result) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.table(result);
//       start();
//     });
//   }
  

//   function viewAllDepartments() {
//     const sql = 'SELECT * FROM department;';

//     db.query(sql, (err, result) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.table(result);
//         start();
//     });
//   }


//   module.exports = helpers;