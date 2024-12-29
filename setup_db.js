const sqlite3 = require('sqlite3').verbose()
global.db = new sqlite3.Database(':memory:')
db.serialize(() => {
    db.run(`CREATE TABLE Employees (
        EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        Position TEXT,
        HireDate TEXT,
        PhoneNumber TEXT)`
    )

  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('John', 'Doe', 'Software Engineer', '2021-05-15', '555-1234');");

  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Jane', 'Smith', 'Project Manager', '2019-08-20', '555-5678');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Michael', 'Johnson', 'Data Analyst', '2020-02-10', '555-8765');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Emily', 'Davis', 'UX Designer', '2018-11-30', '555-4321');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('David', 'Martinez', 'Product Manager', '2022-03-25', '555-3456');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Olivia', 'Garcia', 'HR Specialist', '2017-06-05', '555-6543');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('James', 'Miller', 'Network Engineer', '2020-09-12', '555-7890');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Sophia', 'Wilson', 'Marketing Coordinator', '2021-04-18', '555-2345');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Benjamin', 'Moore', 'Sales Representative', '2023-01-10', '555-9876');");
  
  db.run("INSERT INTO Employees (FirstName, LastName, Position, HireDate, PhoneNumber) VALUES ('Isabella', 'Taylor', 'Customer Support', '2016-12-22', '555-1122');");
  
})
