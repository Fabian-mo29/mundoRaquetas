USE PADELTADB

INSERT INTO Usuarios (Username, Nombre, Apellido1, Apellido2, Correo, Contrasena)
VALUES 
('juanp123', 'Juan', 'P�rez', 'Rodr�guez', 'juan.perez@example.com', 'clave123'),
('anag92', 'Ana', 'G�mez', 'Sol�s', 'ana.gomez@example.com', 'gomez456'),
('lmvargas', 'Luis', 'Mart�nez', 'Vargas', 'luis.martinez@example.com', 'luis789'),
('crojas_a', 'Carla', 'Rojas', 'Alfaro', 'carla.rojas@example.com', 'carla000');

SELECT * FROM Usuarios;
