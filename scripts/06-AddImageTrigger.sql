CREATE OR ALTER TRIGGER dbo.AddImageTrigger
ON Imagen
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS(SELECT 1 FROM inserted WHERE Principal = 1)
	BEGIN
			UPDATE img SET img.Principal = 0 FROM Imagen img 
			JOIN inserted i ON img.ProductoId = i.ProductoId
			WHERE img.Principal = 1 AND img.Id <> i.Id;
	END
END;