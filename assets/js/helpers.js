// const mysql = require('mysql2/promise');

// // View All Roles

async function viewRoles() {
    try {
      const query = "SELECT roles.title, roles.id, departments.department_name, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id";
      const res = await new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
          if (err) reject(err);
          resolve(res);
        });
      });
      console.table(res);
    } catch (error) {
      console.error(error);
    }
  }


  module.exports = helpers;