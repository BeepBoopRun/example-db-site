# SKLEP ELEKTRONICZNY O�WIECENIE

## Wprowadzenie

W ramach projektu zdecydowali�my si� zaprojektowa� baz� danych do zarz�dzania sklepem z elektronik� i jej serwisem.

### Za�o�enia

- Klient ma ten sam adres rozliczeniowy co zamieszkania.

- Pracownicy dostaj� wynagrodzenie zale�ne wy��cznie od przepracowanych godzin.

- Pracownik mo�e i�� na zwolnienie na nieznany w momencie zwolenienia okres czasu.

- Zam�wienie mo�e sk�ada� si� z wielu cz�ci, mo�e pracowa� przy nim wiele os�b, cena za poszczeg�lne us�ugi nie jest znana, w tabeli zapisana jest tylko kwota ca�kowita. W naszym do�wiadczeniu sklepy elektroniczne rzadko posiadaj� rozpis koszt�w ka�dej z us�ug z osobna.

- Zam�wienie cz�ci do sklepu mo�e sk�ada� si� z wielu element�w, ka�dy o podanej cenie i ilo�ci. Cz�ci dostarczane s� razem.

### Wybrany system zarz�dzania relacyjn� baz� danych

Zdecydowali�my si� wykorzysta� SQLite, poniewa� system jest lekki i sk�ada si� z jednego pliku, co u�atwia wsp�prac� mi�dzy cz�onkami projektu. Co ciekawe, jest to te� system zarz�dzania rekomendowany przez Bibliotek� Kongresu w Waszyngtonie.

### Interfejs graficzny

Zaimplementowali�my go w postaci strony internetowej dost�pnej obecnie pod domen� [zetamouse.xyz](http://zetamouse.xyz). Posiada ona wersj� HTML tego dokumentu i 3 dodatkowe zak�adki: szef, pracownik, klient. W zak�adce szef mo�na wy�wietli� wszystkie dost�pne tabele i usuwa� zam�wienia, w zak�adce pracownik mo�na doda� nowe zam�wienie i w zak�adce klient mo�na sprawdzi� wszystkie zam�wienia przypisane do swojego konta.

Link do repozytorium z kodem serwera znajduje si� na ko�cu dokumentu.

## Nasz kod

```sql
CREATE TABLE Customers (
    CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    PhoneNumber TEXT,
    Email TEXT UNIQUE,
    AdressID INTEGER,
    FOREIGN KEY (AdressID) REFERENCES Adresses(AdressID)
)
CREATE TABLE Adresses (
    AdressID INTEGER PRIMARY KEY AUTOINCREMENT,
    City TEXT NOT NULL,
    Street TEXT,
    StreetNumber TEXT NOT NULL,
    FlatNumber TEXT,
    PostalCode TEXT NOT NULL
)
CREATE TABLE Employees (
    EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    ContractID INTEGER NOT NULL,
    EmploymentDate NUMERIC NOT NULL,
    AdressID INTEGER NOT NULL,
    FOREIGN KEY (AdressID) REFERENCES Adresses(AdressID)
    FOREIGN KEY (ContractID) REFERENCES Contracts(ContractID)
)
CREATE TABLE Positions (
    PositionID INTEGER PRIMARY KEY AUTOINCREMENT,
    PositionName TEXT NOT NULL
)
CREATE TABLE Contracts (
    ContractID INTEGER PRIMARY KEY AUTOINCREMENT,
    PositionID INTEGER NOT NULL,
    ContractStart NUMERIC NOT NULL,
    ContractEnd NUMERIC,
    HourlyPay REAL NOT NULL,
    WorkingTime REAL NOT NULL,
    FOREIGN KEY (PositionID) REFERENCES Positions(PositionID)
)
CREATE TABLE WorkEquipment (
    EmployeeID INTEGER NOT NULL,
    EquipmentID INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    PRIMARY KEY(EmployeeID, EquipmentID),
    FOREIGN KEY (EquipmentID) REFERENCES Equipment(EquipmentID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
)
CREATE TABLE Equipment (
    EquipmentID INTEGER PRIMARY KEY AUTOINCREMENT,
    EquipmentName TEXT NOT NULL UNIQUE
)
CREATE TABLE WorkLeave (
    EmployeeID INTEGER PRIMARY KEY,
    LeaveDate NUMERIC NOT NULL,
    ReturnDate NUMERIC,
    LeaveTypeID INT NOT NULL,
    FOREIGN KEY(EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY(LeaveTypeID) REFERENCES LeaveTypes(LeaveTypeID)
)
CREATE TABLE LeaveTypes (
    LeaveTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    LeaveTypeName TEXT
)
CREATE TABLE Orders (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerID INTEGER NOT NULL,
    OrderDate NUMERIC NOT NULL,
    OrderStatusID INTEGER NOT NULL,
    Price NUMERIC,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (OrderStatusID) REFERENCES OrderStatuses(OrderStatusID)
)
CREATE TABLE OrderStatuses(
    OrderStatusID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderStatusName TEXT NOT NULL
)
CREATE TABLE Payments (
    OrderID INTEGER PRIMARY KEY,
    PaymentMethodID INT,
    PaymentStatusID INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethods(PaymentMethodID),
    FOREIGN KEY (PaymentStatusID) REFERENCES PaymentStatuses(PaymentStatusID)
)
CREATE TABLE PaymentMethods (
    PaymentMethodID INTEGER PRIMARY KEY AUTOINCREMENT,
    PaymentMethodName TEXT NOT NULL
)
CREATE TABLE PaymentStatuses (
    PaymentStatusID INTEGER PRIMARY KEY AUTOINCREMENT,
    PaymentStatusName TEXT NOT NULL
)
CREATE TABLE OrderDetails (
    OrderID INTEGER NOT NULL,
    DeviceID INTEGER NOT NULL,
    PartID INTEGER,
    RepairStatusID INTEGER,
    Quantity INTEGER NOT NULL,
    EmployeeID INTEGER,
    RepairTypeID INTEGER,
    Description TEXT,
    PRIMARY KEY (OrderID, DeviceID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID),
    FOREIGN KEY (PartID) REFERENCES Parts(PartID),
    FOREIGN KEY (RepairStatusID) REFERENCES RepairStatuses(RepairStatusID),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (RepairTypeID) REFERENCES RepairTypes(RepairTypeID)
)
CREATE TABLE Devices (
    DeviceID INTEGER PRIMARY KEY AUTOINCREMENT,
    DeviceName TEXT NOT NULL,
    DeviceTypeID INTEGER NOT NULL,
    FOREIGN KEY (DeviceTypeID) REFERENCES DeviceTypes(DeviceTypeID)
)
CREATE TABLE DeviceTypes (
    DeviceTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    DeviceTypeName TEXT NOT NULL
)
CREATE TABLE RepairTypes (
    RepairTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    RepairTypeName TEXT NOT NULL
)
CREATE TABLE RepairStatuses (
    RepairStatusID INTEGER PRIMARY KEY AUTOINCREMENT,
    RepairStatusName TEXT NOT NULL
)
CREATE TABLE Parts (
    PartID INTEGER PRIMARY KEY AUTOINCREMENT,
    PartTypeID INTEGER,
    DeviceID INTEGER,
    Quantity INTEGER,
    SupplierID INTEGER,
    FOREIGN KEY (PartTypeID) REFERENCES PartTypes(PartTypeID),
    FOREIGN KEY (DeviceID) REFERENCES Devices(DeviceID),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers
)
CREATE TABLE PartTypes (
    PartTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
    PartTypeName TEXT
)
CREATE TABLE Suppliers (
    SupplierID INTEGER PRIMARY KEY AUTOINCREMENT,
    SupplierName TEXT
)
CREATE TABLE SuppliesOrders (
    SuppliesOrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    PartID INTEGER,
    SupplierID INTEGER,
    DeliveryStatusID INT,
    FOREIGN KEY (PartID) REFERENCES Parts(PartID),
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID),
    FOREIGN KEY (DeliveryStatusID) REFERENCES DeliveryStatuses(DeliveryStatusID)
)
CREATE TABLE DeliveryStatuses(
    DeliveryStatusID INTEGER PRIMARY KEY AUTOINCREMENT,
    DeliveryStatusNAme TEXT
)
```
