const User = require('../models/userModel');

const registerUser = (req, res) => {
  const { username, nombre, apellido1, apellido2, email, password } = req.body;
  if (!username || !nombre || !apellido1 || !apellido2 || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }
  User.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
    if (user) return res.status(409).json({ message: 'El usuario ya existe.' });

    User.createUser(username, nombre, apellido1, apellido2, email, password, (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al registrar usuario.' });
      res.status(201).json({ message: 'Usuario registrado correctamente.' });
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email y contraseña son obligatorios.' });
  }
  User.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos.' });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    if (user.Contrasena !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta.' });
    }
    res.status(200).json({ message: 'Inicio de sesión exitoso.', user });
  });
};

module.exports = { registerUser, loginUser };