const { sql, connectionString } = require('../db');

function createUser(username, nombre, apellido1, apellido2, email, password, callback) {
  const query = `
    INSERT INTO Usuarios (Username, Nombre, Apellido1, Apellido2, Correo, Contrasena)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  sql.query(connectionString, query, [username, nombre, apellido1, apellido2, email, password], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

function findUserByEmail(email, callback) {
  const query = `SELECT * FROM Usuarios WHERE Correo = ?`;
  sql.query(connectionString, query, [email], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows && rows.length > 0 ? rows[0] : null);
  });
}

function findUserByUsername(username, callback) {
  const query = `SELECT * FROM Usuarios WHERE Username = ?`;
  sql.query(connectionString, query, [username], (err, rows) => {
    if (err) return callback(err);
    callback(null, rows && rows.length > 0 ? rows[0] : null);
  });
}

module.exports = { createUser, findUserByEmail, findUserByUsername };