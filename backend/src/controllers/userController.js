const User = require("../models/userModel");
const auth = require("../middleware/auth");

function isValidUsername(username) {
  // 4-30 caracteres, solo letras, números y guion bajo
  return /^[a-zA-Z0-9_]{4,30}$/.test(username);
}

function isValidName(name) {
  // Solo letras y espacios, 2-30 caracteres
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{2,30}$/.test(name);
}

function isValidEmail(email) {
  // Email básico
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  // Al menos 6 caracteres
  return typeof password === "string" && password.length >= 6;
}

const registerUser = (req, res) => {
  const { username, nombre, apellido1, apellido2, email, password } = req.body;

  // Validaciones
  if (!username || !nombre || !apellido1 || !apellido2 || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios." });
  }
  if (!isValidUsername(username)) {
    return res.status(400).json({
      message:
        "El nombre de usuario debe tener entre 4 y 30 caracteres y solo puede contener letras, números y guion bajo.",
    });
  }
  if (
    !isValidName(nombre) ||
    !isValidName(apellido1) ||
    !isValidName(apellido2)
  ) {
    return res.status(400).json({
      message:
        "Nombre y apellidos solo pueden contener letras y espacios (2-30 caracteres).",
    });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "El email no es válido." });
  }
  if (!isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres." });
  }

  User.findUserByEmail(email, (err, user) => {
    if (err)
      return res.status(500).json({ message: "Error en la base de datos." });
    if (user) return res.status(409).json({ message: "El usuario ya existe." });

    User.createUser(
      username,
      nombre,
      apellido1,
      apellido2,
      email,
      password,
      (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Error al registrar usuario." });
        res.status(201).json({ message: "Usuario registrado correctamente." });
      }
    );
  });
};

const loginUser = (req, res) => {
  const { identificador, password } = req.body;
  if (!identificador || !password) {
    return res
      .status(400)
      .json({ message: "Email/usuario y contraseña son obligatorios." });
  }

  // Si contiene '@' busca por email, si no por username
  if (identificador.includes("@")) {
    User.findUserByEmail(identificador, (err, user) => {
      if (err)
        return res.status(500).json({ message: "Error en la base de datos." });
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });
      if (user.Contrasena !== password) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }
      const token = auth.generateToken(user);
      res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    });
  } else {
    User.findUserByUsername(identificador, (err, user) => {
      if (err)
        return res.status(500).json({ message: "Error en la base de datos." });
      if (!user)
        return res.status(404).json({ message: "Usuario no encontrado." });
      if (user.Contrasena !== password) {
        return res.status(401).json({ message: "Contraseña incorrecta." });
      }
      const token = auth.generateToken(user);
      res.status(200).json({ message: "Inicio de sesión exitoso.", token });
    });
  }
};

const getUserData = (req, res) => {
  const username = req.params.username;
  User.findUserByUsername(username, (err, user) => {
    if (err) {
      console.error("Error fetching user data: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    console.log(user);
    res.status(200).json(user);
  });
};

module.exports = { registerUser, loginUser, getUserData };
