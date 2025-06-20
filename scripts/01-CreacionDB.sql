USE master;

GO
ALTER DATABASE PADELTADB
SET
	SINGLE_USER
WITH
	ROLLBACK IMMEDIATE;

GO
DROP DATABASE PADELTADB;

CREATE DATABASE PADELTADB
GO

USE PADELTADB

CREATE TABLE Usuarios(
Id uniqueidentifier PRIMARY KEY not null DEFAULT NEWID(),
Username VARCHAR(30) UNIQUE NOT NULL,
Nombre NVARCHAR(30),
Apellido1 NVARCHAR(30),
Apellido2 NVARCHAR(30),
Correo VARCHAR(80) UNIQUE NOT NULL,
Contrasena NVARCHAR(70)
);

CREATE TABLE Productos(
Id uniqueidentifier PRIMARY KEY not null DEFAULT NEWID(),
Name NVARCHAR(50) NOT NULL,
Description VARCHAR(255),
Price DECIMAL(10, 2) NOT NULL,
Discount INT,
Category VARCHAR(30),
Active BIT NOT NULL,
Stock INT NOT NULL,
CreatedAt DATETIME DEFAULT GETDATE(),
);

CREATE TABLE Imagen(
Id UNIQUEIDENTIFIER PRIMARY KEY not null DEFAULT NEWID(),
ProductoId UNIQUEIDENTIFIER NOT NULL,
Name VARCHAR(100) NOT NULL,
FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);

CREATE TABLE Carrito(
Id UNIQUEIDENTIFIER PRIMARY KEY not null DEFAULT NEWID(),
UserId UNIQUEIDENTIFIER NOT NULL,
Estado VARCHAR(15) DEFAULT 'Pendiente' CHECK (Estado in ('Pendiente', 'Pagado', 'Deseos')),
FOREIGN KEY (UserId) REFERENCES Usuarios(Id)
);

CREATE TABLE ProductosPorCarrito(
CarritoId UNIQUEIDENTIFIER NOT NULL,
ProductoId UNIQUEIDENTIFIER NOT NULL,
Cantidad INT NOT NULL,
FOREIGN KEY (CarritoId) REFERENCES Carrito(Id),
FOREIGN KEY (ProductoId) REFERENCES Productos(Id)
);

CREATE TABLE InformacionPago (
	Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
	Provincia VARCHAR(20) NOT NULL,
	Canton VARCHAR(20) NOT NULL,
	InformacionUbicacion VARCHAR(200) NOT NULL,
	NumeroTarjeta NVARCHAR(256) NOT NULL,      -- Encriptado como texto
    FechaVencimiento NVARCHAR(100) NOT NULL,   -- Encriptado
    NumeroSeguridad NVARCHAR(100) NOT NULL,    -- Encriptado
);

CREATE TABLE Ordenes(
Id UNIQUEIDENTIFIER PRIMARY KEY NOT NULL DEFAULT NEWID(),
NumeroOrden INT IDENTITY(1000, 2) NOT NULL, 
CarritoId UNIQUEIDENTIFIER NOT NULL,
Estado VARCHAR(15) DEFAULT 'Pendiente',
Fecha DATETIME DEFAULT GETDATE(),
FechaEstimadaLlegada DATETIME DEFAULT DATEADD(DAY, 5, GETDATE()), 
PrecioBruto DECIMAL(10, 2) NOT NULL,
PrecioNeto DECIMAL(10, 2) NOT NULL,
InformacionPagoId UNIQUEIDENTIFIER NOT NULL,
CHECK (Estado in ('Pendiente', 'Entregado', 'Cancelado')),
FOREIGN KEY (CarritoId) REFERENCES Carrito(Id),
FOREIGN KEY (InformacionPagoId) REFERENCES InformacionPago(Id)
);


