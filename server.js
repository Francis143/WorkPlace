const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS

const app = express();
const port = 3000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Function to ensure employees.json exists and is properly initialized
function ensureEmployeesFileExists() {
  const filePath = './data/employees.json';
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([])); // Create empty JSON array if file doesn't exist
  }
  return filePath;
}

// Endpoint to get all employees
app.get('/api/employees', (req, res) => {
  const filePath = ensureEmployeesFileExists();

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading employees data');
    }

    try {
      const employees = JSON.parse(data);
      res.send(employees);
    } catch (err) {
      res.status(500).send('Error parsing employees data');
    }
  });
});

// Endpoint to add a new employee
app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;
  const filePath = ensureEmployeesFileExists();

  // Read the existing data
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading employees data');
    }

    try {
      const employees = JSON.parse(data);
      employees.push(newEmployee);

      // Save the updated data
      fs.writeFile(filePath, JSON.stringify(employees, null, 2), (err) => {
        if (err) {
          return res.status(500).send('Error saving employees data');
        }
        res.status(201).send('Employee added successfully');
      });
    } catch (err) {
      res.status(500).send('Error parsing employees data');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
