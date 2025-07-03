use PADELTADB;
GO

CREATE OR ALTER TRIGGER dbo.CreateOrderTrigger
ON Ordenes
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Carrito set Estado = 'Pagado' FROM Carrito c JOIN inserted i
	ON i.CarritoId = c.Id;
END;