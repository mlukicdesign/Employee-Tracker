-- Insert data into department table
-- Reminder to run with "./database/seeds.sql;"

INSERT INTO department (id, name)
VALUES
(1, "Marketing"),
(2, "Finance"),
(3, "Sales");

-- Insert data into te role table
-- (id, title, salary, department_id)

INSERT INTO role (id, title, salary, department_id)
VALUES
  (1, "Marketing Manager", 80000.00, 1),
  (2, "Marketing Specialist", 60000.00, 1),
  (3, "Financial Analyst", 90000.00, 2),
  (4, "Sales Manager", 97000.00, 3),
  (5, "Sales Representative", 65000.00, 3);

-- Insert data into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, "John", "Doe", 1, NULL),
  (2, "Jane", "Smith", 2, 1),
  (3, "Mike", "Johnson", 3, NULL),
  (4, "Sarah", "Williams", 4, NULL),
  (5, "David", "Brown", 5, 4);

