USE PADELTADB

INSERT INTO Usuarios (Username, Nombre, Apellido1, Apellido2, Correo, Contrasena)
VALUES 
('juanp123', 'Juan', 'Pérez', 'Rodríguez', 'juan.perez@example.com', 'clave123'),
('anag92', 'Ana', 'Gómez', 'Solís', 'ana.gomez@example.com', 'gomez456'),
('lmvargas', 'Luis', 'Martínez', 'Vargas', 'luis.martinez@example.com', 'luis789'),
('crojas_a', 'Carla', 'Rojas', 'Alfaro', 'carla.rojas@example.com', 'carla000');

SELECT * FROM Usuarios;

INSERT INTO Productos (Name, Description, Price, Discount, Category, Active, Stock)
VALUES
('Wilson m23', 'Raqueta Wilson de tenis con excelente control y potencia. Ideal para principiantes y jugadores intermedios.', 89.99, 10, 'Palas', 1, 100),
('Babolat Viper Carbon', 'Raqueta de pádel de alta gama, diseñada para jugadores de nivel avanzado.', 170.99, 10, 'Palas', 1, 100),
('Head Graphene 360+ Alpha Pro', 'Raqueta profesional de pádel con tecnología Graphene 360+.', 197.99, 10, 'Palas', 1, 100),
('Adidas Adipower Control 3.0', 'Raqueta de pádel premium, ideal para jugadores que buscan control total y precisión en sus golpes.', 224.99, 10, 'Palas', 1, 100),
('Bullpadel Vertex 03', 'Raqueta de pádel de alto rendimiento, con un diseño espectacular.', 161.99, 10, 'Palas', 1, 100),
('Siux Diablo', 'Raqueta de pádel perfecta para jugadores agresivos que buscan potencia y durabilidad.', 143.99, 10, 'Palas', 1, 100),
('Nox ML10 Pro Cup', 'Raqueta de pádel de control con un diseño clásico, ideal para jugadores de nivel intermedio y avanzado.', 179.99, 10, 'Palas', 1, 100),
('Asics Gel Padel Pro 5', 'Zapatillas de pádel de alta comodidad y soporte, ideales para jugadores que buscan estabilidad.', 80.99, 10, 'Calzado', 1, 100),
('K-Swiss Hypercourt Express', 'Zapatillas de pádel ligeras y resistentes, con una suela que proporciona un excelente agarre en el campo de juego.', 89.99, 10, 'Calzado', 1, 100),
('Head Padel Pro S', 'Pelotas de pádel de alta calidad, ideales para competiciones. Su durabilidad las hacen perfectas para cualquier nivel.', 4.49, 10, 'Bolas', 1, 100);
SELECT * FROM Productos;

INSERT INTO Productos (Name, Description, Price, Discount, Category, Active, Stock)
VALUES
('Nike Air Zoom Vapor Pro', 'Zapatillas ligeras y transpirables para jugadores rápidos y agresivos.', 109.99, 8, 'Calzado', 1, 100),
('Adidas Barricade', 'Zapatillas de tenis resistentes con excelente estabilidad y durabilidad.', 99.99, 9, 'Calzado', 1, 100),
('Wilson Championship Extra Duty', 'Pelotas de tenis duraderas y de alta calidad, ideales para canchas duras.', 5.99, 0, 'Bolas', 1, 100),
('Penn Championship', 'Pelotas de tenis de gran rendimiento aprobadas por la USTA.', 4.99, 0, 'Bolas', 1, 100),
('Tourna Grip Original', 'Overgrip absorbente utilizado por profesionales. Ideal para condiciones de humedad.', 7.99, 0, 'Accesorios', 1, 100),
('Overgrip Babolat VS', 'Overgrip fino y adherente que proporciona gran sensación al jugar.', 6.99, 0, 'Accesorios', 1, 100),
('Babolat RPM Blast', 'Cuerda de poliéster para jugadores que buscan efecto y durabilidad.', 18.99, 0, 'Accesorios', 1, 100),
('Luxilon ALU Power', 'Cuerda de alto rendimiento usada por profesionales. Gran control y potencia.', 19.99, 0, 'Accesorios', 1, 100);
SELECT * FROM Productos order by CreatedAt desc;

INSERT INTO Imagen (ProductoId, Name) VALUES
((SELECT Id FROM Productos WHERE Name = 'Wilson m23'), 'palaPadel.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Babolat Viper Carbon'), 'babolatViperCarbon.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Head Graphene 360+ Alpha Pro'), 'headGraphene360.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Adidas Adipower Control 3.0'), 'adidasAdipowerControl.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Bullpadel Vertex 03'), 'bullpadelVertex.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Siux Diablo'), 'siuxDiablo.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Nox ML10 Pro Cup'), 'noxML10.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Asics Gel Padel Pro 5'), 'zapatillas.jpg'),
((SELECT Id FROM Productos WHERE Name = 'K-Swiss Hypercourt Express'), 'kswissHypercourt.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Head Padel Pro S'), 'pelotasPadel.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Nike Air Zoom Vapor Pro'), 'nikeAirZoomVapor.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Adidas Barricade'), 'adidasAirZoomVapor.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Wilson Championship Extra Duty'), 'pelotasPadel4.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Penn Championship'), 'pelotasPadel2.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Tourna Grip Original'), 'cintaGrip.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Overgrip Babolat VS'), 'overgrip.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Babolat RPM Blast'), 'fundaPala.jpg'),
((SELECT Id FROM Productos WHERE Name = 'Luxilon ALU Power'), 'overgrip.jpg');


Select * from Productos;