USE PADELTADB

INSERT INTO Usuarios (Username, Nombre, Apellido1, Apellido2, Correo, Contrasena)
VALUES 
('juanp123', 'Juan', 'Pérez', 'Rodríguez', 'juan.perez@example.com', 'clave123'),
('anag92', 'Ana', 'Gómez', 'Solís', 'ana.gomez@example.com', 'gomez456'),
('lmvargas', 'Luis', 'Martínez', 'Vargas', 'luis.martinez@example.com', 'luis789'),
('crojas_a', 'Carla', 'Rojas', 'Alfaro', 'carla.rojas@example.com', 'carla000');

SELECT * FROM Usuarios;
