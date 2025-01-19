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
	db.run(`CREATE TABLE IF NOT EXISTS Customers (
    CustomerID INTEGER PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    PhoneNumber TEXT,
    Email TEXT,
    Address TEXT
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Devices (
    DeviceID INTEGER PRIMARY KEY,
    CustomerID INTEGER,
    DeviceType TEXT,
    Brand TEXT,
    Model TEXT,
    SerialNumber TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Orders (
    OrderID INTEGER PRIMARY KEY,
    DeviceID INTEGER,
    CustomerID INTEGER,
    OrderDate TEXT,
    Status TEXT,
    Description TEXT,
    FOREIGN KEY (DeviceID) REFERENCES Devices (DeviceID),
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Statuses (
    StatusID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Parts (
    PartID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Manufacturer TEXT NOT NULL,
    Price REAL,
    Stock INTEGER
)`);

	db.run(`CREATE TABLE IF NOT EXISTS OrderParts (
    OrderPartID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    PartID INTEGER,
    Quantity INTEGER,
    Price REAL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (PartID) REFERENCES Parts (PartID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS WorkLogs (
    WorkLogID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    EmployeeID INTEGER,
    StartTime TEXT,
    EndTime TEXT,
    Description TEXT,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees (EmployeeID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Invoices (
    InvoiceID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    IssueDate TEXT,
    TotalAmount REAL,
    PaymentStatus TEXT,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Payments (
    PaymentID INTEGER PRIMARY KEY,
    InvoiceID INTEGER,
    PaymentDate TEXT,
    Amount REAL,
    Method TEXT,
    FOREIGN KEY (InvoiceID) REFERENCES Invoices (InvoiceID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS RepairStages (
    RepairStageID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS OrderStages (
    OrderStageID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    RepairStageID INTEGER,
    StartDate TEXT,
    EndDate TEXT,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (RepairStageID) REFERENCES RepairStages (RepairStageID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS DeviceTypes (
    DeviceTypeID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Brands (
    BrandID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Models (
    ModelID INTEGER PRIMARY KEY,
    BrandID INTEGER,
    DeviceTypeID INTEGER,
    Name TEXT NOT NULL,
    FOREIGN KEY (BrandID) REFERENCES Brands (BrandID),
    FOREIGN KEY (DeviceTypeID) REFERENCES DeviceTypes (DeviceTypeID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Warehouses (
    WarehouseID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Location TEXT NOT NULL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS WarehouseStock (
    WarehouseStockID INTEGER PRIMARY KEY,
    WarehouseID INTEGER,
    PartID INTEGER,
    Quantity INTEGER,
    FOREIGN KEY (WarehouseID) REFERENCES Warehouses (WarehouseID),
    FOREIGN KEY (PartID) REFERENCES Parts (PartID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Suppliers (
    SupplierID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    ContactPerson TEXT,
    PhoneNumber TEXT,
    Email TEXT
)`);

	db.run(`CREATE TABLE IF NOT EXISTS OrdersToSuppliers (
    SupplierOrderID INTEGER PRIMARY KEY,
    SupplierID INTEGER,
    OrderDate TEXT,
    DeliveryDate TEXT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS SupplierOrderParts (
    SupplierOrderPartID INTEGER PRIMARY KEY,
    SupplierOrderID INTEGER,
    PartID INTEGER,
    Quantity INTEGER,
    Price REAL,
    FOREIGN KEY (SupplierOrderID) REFERENCES OrdersToSuppliers (SupplierOrderID),
    FOREIGN KEY (PartID) REFERENCES Parts (PartID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Feedbacks (
    FeedbackID INTEGER PRIMARY KEY,
    CustomerID INTEGER,
    OrderID INTEGER,
    Rating INTEGER,
    Comments TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS ServiceTypes (
    ServiceTypeID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    Description TEXT,
    BasePrice REAL
)`);

	db.run(`CREATE TABLE IF NOT EXISTS OrderServices (
    OrderServiceID INTEGER PRIMARY KEY,
    OrderID INTEGER,
    ServiceTypeID INTEGER,
    Price REAL,
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID),
    FOREIGN KEY (ServiceTypeID) REFERENCES ServiceTypes (ServiceTypeID)
)`);

	db.run(`CREATE TABLE IF NOT EXISTS Discounts (
    DiscountID INTEGER PRIMARY KEY,
    Name TEXT NOT NULL,
    DiscountValue REAL NOT NULL,
    StartDate TEXT,
    EndDate TEXT
)`);


	// 1. Insert into Customers (Klienci)
	db.run("INSERT INTO Customers (CustomerID, FirstName, LastName, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?, ?)", 
		[1, 'Anna', 'Kowalska', '123-456-789', 'anna.kowalska@example.com', 'ul. Pięciomorgowa 10, 01-234 Warszawa']);
	db.run("INSERT INTO Customers (CustomerID, FirstName, LastName, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?, ?)", 
		[2, 'Jan', 'Nowak', '987-654-321', 'jan.nowak@example.com', 'ul. Słoneczna 5, 02-345 Kraków']);
	db.run("INSERT INTO Customers (CustomerID, FirstName, LastName, PhoneNumber, Email, Address) VALUES (?, ?, ?, ?, ?, ?)", 
		[3, 'Marek', 'Wiśniewski', '555-123-456', 'marek.wisniewski@example.com', 'ul. Zielona 15, 03-456 Łódź']);

	// 2. Insert into Employees (Pracownicy)
	db.run("INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, HireDate, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[1, 'Karol', 'Kaczmarek', 'Mechanik', '2021-05-10', '555-678-901']);
	db.run("INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, HireDate, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[2, 'Ewa', 'Zielińska', 'Technik RTV', '2022-03-15', '555-234-567']);
	db.run("INSERT INTO Employees (EmployeeID, FirstName, LastName, Position, HireDate, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[3, 'Piotr', 'Wójcik', 'Kierownik', '2019-07-01', '555-876-543']);

	// 3. Insert into Devices (Urządzenia)
	db.run("INSERT INTO Devices (DeviceID, CustomerID, DeviceType, Brand, Model, SerialNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[1, 1, 'Samochód', 'Toyota', 'Corolla', 'TY123456789']);
	db.run("INSERT INTO Devices (DeviceID, CustomerID, DeviceType, Brand, Model, SerialNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[2, 2, 'TV', 'Samsung', 'QLED 55', 'SAMSQLED001']);
	db.run("INSERT INTO Devices (DeviceID, CustomerID, DeviceType, Brand, Model, SerialNumber) VALUES (?, ?, ?, ?, ?, ?)", 
		[3, 3, 'Laptop', 'Dell', 'XPS 13', 'DELXPS1301']);

	// 4. Insert into Orders (Zlecenia naprawy)
	db.run("INSERT INTO Orders (OrderID, DeviceID, CustomerID, OrderDate, Status, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[1, 1, 1, '2024-12-01', 'W trakcie', 'Wymiana rozrusznika w samochodzie']);
	db.run("INSERT INTO Orders (OrderID, DeviceID, CustomerID, OrderDate, Status, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[2, 2, 2, '2024-12-05', 'Zakończone', 'Naprawa obrazu w telewizorze']);
	db.run("INSERT INTO Orders (OrderID, DeviceID, CustomerID, OrderDate, Status, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[3, 3, 3, '2024-12-10', 'Przyjęte', 'Wymiana klawiatury w laptopie']);

	// 5. Insert into Statuses (Statusy)
	db.run("INSERT INTO Statuses (StatusID, Name) VALUES (?, ?)", 
		[1, 'Przyjęte']);
	db.run("INSERT INTO Statuses (StatusID, Name) VALUES (?, ?)", 
		[2, 'W trakcie']);
	db.run("INSERT INTO Statuses (StatusID, Name) VALUES (?, ?)", 
		[3, 'Zakończone']);

	// 6. Insert into Parts (Części zamienne)
	db.run("INSERT INTO Parts (PartID, Name, Manufacturer, Price, Stock) VALUES (?, ?, ?, ?, ?)", 
		[1, 'Rozrusznik', 'Bosch', 300.00, 10]);
	db.run("INSERT INTO Parts (PartID, Name, Manufacturer, Price, Stock) VALUES (?, ?, ?, ?, ?)", 
		[2, 'Panel LCD', 'Samsung', 120.00, 15]);
	db.run("INSERT INTO Parts (PartID, Name, Manufacturer, Price, Stock) VALUES (?, ?, ?, ?, ?)", 
		[3, 'Klawiatura', 'Dell', 150.00, 5]);

	// 7. Insert into OrderParts (Części w zleceniu)
	db.run("INSERT INTO OrderParts (OrderPartID, OrderID, PartID, Quantity, Price) VALUES (?, ?, ?, ?, ?)", 
		[1, 1, 1, 1, 300.00]);
	db.run("INSERT INTO OrderParts (OrderPartID, OrderID, PartID, Quantity, Price) VALUES (?, ?, ?, ?, ?)", 
		[2, 2, 2, 1, 120.00]);
	db.run("INSERT INTO OrderParts (OrderPartID, OrderID, PartID, Quantity, Price) VALUES (?, ?, ?, ?, ?)", 
		[3, 3, 3, 1, 150.00]);

	// 8. Insert into WorkLogs (Logi pracy)
	db.run("INSERT INTO WorkLogs (WorkLogID, OrderID, EmployeeID, StartTime, EndTime, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[1, 1, 1, '2024-12-01 08:00:00', '2024-12-01 12:00:00', 'Demontaż starego rozrusznika i montaż nowego']);
	db.run("INSERT INTO WorkLogs (WorkLogID, OrderID, EmployeeID, StartTime, EndTime, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[2, 2, 2, '2024-12-05 09:00:00', '2024-12-05 13:00:00', 'Wymiana panelu LCD w telewizorze']);
	db.run("INSERT INTO WorkLogs (WorkLogID, OrderID, EmployeeID, StartTime, EndTime, Description) VALUES (?, ?, ?, ?, ?, ?)", 
		[3, 3, 1, '2024-12-10 10:00:00', '2024-12-10 14:00:00', 'Wymiana klawiatury w laptopie']);

	// 9. Insert into Invoices (Faktury)
	db.run("INSERT INTO Invoices (InvoiceID, OrderID, IssueDate, TotalAmount, PaymentStatus) VALUES (?, ?, ?, ?, ?)", 
		[1, 1, '2024-12-01', 350.00, 'Nieopłacona']);
	db.run("INSERT INTO Invoices (InvoiceID, OrderID, IssueDate, TotalAmount, PaymentStatus) VALUES (?, ?, ?, ?, ?)", 
		[2, 2, '2024-12-05', 140.00, 'Opłacona']);
	db.run("INSERT INTO Invoices (InvoiceID, OrderID, IssueDate, TotalAmount, PaymentStatus) VALUES (?, ?, ?, ?, ?)", 
		[3, 3, '2024-12-10', 170.00, 'Nieopłacona']);

	// 10. Insert into Payments (Płatności)
	db.run("INSERT INTO Payments (PaymentID, InvoiceID, PaymentDate, Amount, Method) VALUES (?, ?, ?, ?, ?)", 
		[1, 2, '2024-12-06', 140.00, 'Karta']);

	// 11. Insert into RepairStages (Etapy naprawy)
	db.run("INSERT INTO RepairStages (RepairStageID, Name) VALUES (?, ?)", 
		[1, 'Diagnoza']);
	db.run("INSERT INTO RepairStages (RepairStageID, Name) VALUES (?, ?)", 
		[2, 'Naprawa']);
	db.run("INSERT INTO RepairStages (RepairStageID, Name) VALUES (?, ?)", 
		[3, 'Testowanie']);

	// 12. Insert into OrderStages (Etapy w zleceniu)
	db.run("INSERT INTO OrderStages (OrderStageID, OrderID, RepairStageID, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)", 
		[1, 1, 1, '2024-12-01', '2024-12-01']);
	db.run("INSERT INTO OrderStages (OrderStageID, OrderID, RepairStageID, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)", 
		[2, 2, 2, '2024-12-05', '2024-12-05']);
	db.run("INSERT INTO OrderStages (OrderStageID, OrderID, RepairStageID, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)", 
		[3, 3, 3, '2024-12-10', '2024-12-10']);

	// 13. Insert into DeviceTypes (Typy urządzeń)
	db.run("INSERT INTO DeviceTypes (DeviceTypeID, Name) VALUES (?, ?)", 
		[1, 'Samochód']);
	db.run("INSERT INTO DeviceTypes (DeviceTypeID, Name) VALUES (?, ?)", 
		[2, 'TV']);
	db.run("INSERT INTO DeviceTypes (DeviceTypeID, Name) VALUES (?, ?)", 
		[3, 'Laptop']);

	// 14. Insert into Brands (Marki urządzeń)
	db.run("INSERT INTO Brands (BrandID, Name) VALUES (?, ?)", 
		[1, 'Toyota']);
	db.run("INSERT INTO Brands (BrandID, Name) VALUES (?, ?)", 
		[2, 'Samsung']);
	db.run("INSERT INTO Brands (BrandID, Name) VALUES (?, ?)", 
		[3, 'Dell']);

	// 15. Insert into Models (Modele urządzeń)
	db.run("INSERT INTO Models (ModelID, BrandID, DeviceTypeID, Name) VALUES (?, ?, ?, ?)", 
		[1, 1, 1, 'Corolla']);
	db.run("INSERT INTO Models (ModelID, BrandID, DeviceTypeID, Name) VALUES (?, ?, ?, ?)", 
		[2, 2, 2, 'QLED 55']);
	db.run("INSERT INTO Models (ModelID, BrandID, DeviceTypeID, Name) VALUES (?, ?, ?, ?)", 
		[3, 3, 3, 'XPS 13']);

	// 16. Insert into Warehouses (Magazyny)
	db.run("INSERT INTO Warehouses (WarehouseID, Name, Location) VALUES (?, ?, ?)", 
		[1, 'Magazyn A', 'ul. Stalowa 10, 01-200 Warszawa']);
	db.run("INSERT INTO Warehouses (WarehouseID, Name, Location) VALUES (?, ?, ?)", 
		[2, 'Magazyn B', 'ul. Leśna 20, 02-300 Kraków']);

	// 17. Insert into WarehouseStock (Stan magazynowy)
	db.run("INSERT INTO WarehouseStock (WarehouseStockID, WarehouseID, PartID, Quantity) VALUES (?, ?, ?, ?)", 
		[1, 1, 1, 10]);
	db.run("INSERT INTO WarehouseStock (WarehouseStockID, WarehouseID, PartID, Quantity) VALUES (?, ?, ?, ?)", 
		[2, 2, 2, 15]);
	db.run("INSERT INTO WarehouseStock (WarehouseStockID, WarehouseID, PartID, Quantity) VALUES (?, ?, ?, ?)", 
		[3, 1, 3, 5]);

	// 18. Insert into Suppliers (Dostawcy)
	db.run("INSERT INTO Suppliers (SupplierID, Name, ContactPerson, PhoneNumber, Email) VALUES (?, ?, ?, ?, ?)", 
		[1, 'AutoParts Inc.', 'Michał Nowak', '600-123-456', 'auto.parts@example.com']);
	db.run("INSERT INTO Suppliers (SupplierID, Name, ContactPerson, PhoneNumber, Email) VALUES (?, ?, ?, ?, ?)", 
		[2, 'TechSupplies Ltd.', 'Anna Kwiatkowska', '600-234-567', 'tech.supplies@example.com']);

	// 19. Insert into OrdersToSuppliers (Zamówienia od dostawców)
	db.run("INSERT INTO OrdersToSuppliers (SupplierOrderID, SupplierID, OrderDate, DeliveryDate) VALUES (?, ?, ?, ?)", 
		[1, 1, '2024-12-01', '2024-12-10']);
	db.run("INSERT INTO OrdersToSuppliers (SupplierOrderID, SupplierID, OrderDate, DeliveryDate) VALUES (?, ?, ?, ?)", 
		[2, 2, '2024-12-05', '2024-12-15']);

	// 20. Insert into SupplierOrderParts (Części w zamówieniu od dostawcy)
	db.run("INSERT INTO SupplierOrderParts (SupplierOrderPartID, SupplierOrderID, PartID, Quantity, Price) VALUES (?, ?, ?, ?, ?)", 
		[1, 1, 1, 5, 280.00]);
	db.run("INSERT INTO SupplierOrderParts (SupplierOrderPartID, SupplierOrderID, PartID, Quantity, Price) VALUES (?, ?, ?, ?, ?)", 
		[2, 2, 2, 10, 110.00]);

	// 21. Insert into Feedbacks (Opinie klientów)
	db.run("INSERT INTO Feedbacks (FeedbackID, CustomerID, OrderID, Rating, Comments) VALUES (?, ?, ?, ?, ?)", 
		[1, 1, 1, 4, 'Naprawa przebiegła zgodnie z planem, rozrusznik działa prawidłowo']);
	db.run("INSERT INTO Feedbacks (FeedbackID, CustomerID, OrderID, Rating, Comments) VALUES (?, ?, ?, ?, ?)", 
		[2, 2, 2, 5, 'Naprawa TV zakończona sukcesem, bardzo zadowolony']);
	db.run("INSERT INTO Feedbacks (FeedbackID, CustomerID, OrderID, Rating, Comments) VALUES (?, ?, ?, ?, ?)", 
		[3, 3, 3, 3, 'Wymiana klawiatury zakończona, ale trwało to dłużej niż oczekiwałem']);

	// 22. Insert into ServiceTypes (Typy usług)
	db.run("INSERT INTO ServiceTypes (ServiceTypeID, Name, Description, BasePrice) VALUES (?, ?, ?, ?)", 
		[1, 'Diagnostyka', 'Diagnostyka techniczna urządzenia', 100.00]);
	db.run("INSERT INTO ServiceTypes (ServiceTypeID, Name, Description, BasePrice) VALUES (?, ?, ?, ?)", 
		[2, 'Naprawa', 'Naprawa urządzenia', 200.00]);

	// 23. Insert into OrderServices (Usługi w zleceniu)
	db.run("INSERT INTO OrderServices (OrderServiceID, OrderID, ServiceTypeID, Price) VALUES (?, ?, ?, ?)", 
		[1, 1, 1, 100.00]);
	db.run("INSERT INTO OrderServices (OrderServiceID, OrderID, ServiceTypeID, Price) VALUES (?, ?, ?, ?)", 
		[2, 2, 2, 200.00]);
	db.run("INSERT INTO OrderServices (OrderServiceID, OrderID, ServiceTypeID, Price) VALUES (?, ?, ?, ?)", 
		[3, 3, 2, 200.00]);

	// 24. Insert into Discounts (Rabaty)
	db.run("INSERT INTO Discounts (DiscountID, Name, DiscountValue, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)", 
		[1, 'Noworoczny rabat', 10, '2024-12-01', '2024-12-31']);
	db.run("INSERT INTO Discounts (DiscountID, Name, DiscountValue, StartDate, EndDate) VALUES (?, ?, ?, ?, ?)", 
		[2, 'Wielkanocny rabat', 5, '2025-04-01', '2025-04-15']);

})
