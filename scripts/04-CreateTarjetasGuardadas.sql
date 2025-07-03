USE PADELTADB;
GO

-- Crear tabla TarjetasGuardadas con UNIQUEIDENTIFIER en lugar de INT
CREATE TABLE TarjetasGuardadas (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    InformacionPagoId UNIQUEIDENTIFIER NOT NULL,
    FechaCreacion DATETIME DEFAULT GETDATE(),
    Activa BIT DEFAULT 1,
    FOREIGN KEY (UserId) REFERENCES Usuarios(Id),
    FOREIGN KEY (InformacionPagoId) REFERENCES InformacionPago(Id)
);

-- Añadir columna Alias a InformacionPago si no existe
IF NOT EXISTS (SELECT * FROM sys.columns 
               WHERE object_id = OBJECT_ID('InformacionPago') 
               AND name = 'Alias')
BEGIN
    ALTER TABLE InformacionPago ADD Alias NVARCHAR(100);
    PRINT 'Columna Alias añadida a InformacionPago';
END
ELSE
BEGIN
    PRINT 'La columna Alias ya existe en InformacionPago';
END

-- Añadir columna NombreTitular a InformacionPago si no existe
IF NOT EXISTS (SELECT * FROM sys.columns 
               WHERE object_id = OBJECT_ID('InformacionPago') 
               AND name = 'NombreTitular')
BEGIN
    ALTER TABLE InformacionPago ADD NombreTitular NVARCHAR(100);
    PRINT 'Columna NombreTitular añadida a InformacionPago';
END
ELSE
BEGIN
    PRINT 'La columna NombreTitular ya existe en InformacionPago';
END
GO