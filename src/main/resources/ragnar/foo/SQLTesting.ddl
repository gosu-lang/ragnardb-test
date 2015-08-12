CREATE TABLE Customers (
    CustomerID int auto_increment PRIMARY KEY,
    CustomerName nchar(50),
    Address nchar(50)
);

CREATE TABLE Orders (
    OrderID int auto_increment PRIMARY KEY,
    CustomerID int,
    OrderDate int,
    OrderVolume int,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);
