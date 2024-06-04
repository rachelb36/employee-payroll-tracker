// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  const employeesArray = [];
  let addAnother = true;
  //run the while loop while user wants to continue to add employees
  while (addAnother) {
    let firstName = prompt("Enter the employee's first name:");
    while (!firstName || firstName.trim() === "") {
      alert(
        "First name cannot be empty. Please enter the employee's first name."
      );
      firstName = prompt("Enter the employee's first name:");
    }
    //trims trailing spaces
    let lastName = prompt("Enter the employee's last name:");
    while (!lastName || lastName.trim() === "") {
      alert(
        "Last name cannot be empty. Please enter the employee's last name."
      );
      lastName = prompt("Enter the employee's last name:");
    }
    //converts salary to a number
    let salary = parseFloat(prompt("Enter the employee's salary:"));
    if (isNaN(salary)) {
      salary = 0;
    }

    // Capitalize first letter of first name and last name
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    lastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

    // Add the employee to the array
    employeesArray.push({ firstName, lastName, salary });

    addAnother = confirm("Add another employee?");
  }

  return employeesArray;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  let totalSalary = 0;
  for (let employee of employeesArray) {
    totalSalary += employee.salary;
  }
  const averageSalary = (totalSalary / employeesArray.length).toFixed(2);
  console.log(
    `The average Salary between our ${employeesArray.length} employee(s) is $${averageSalary}`
  );
};

// Function to get a random employee for drawing
const getRandomEmployee = function (employeesArray) {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const randomEmployee = employeesArray[randomIndex];
  console.log(
    `Congratulations to ${randomEmployee.firstName} ${randomEmployee.lastName}, our random drawing winner!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
