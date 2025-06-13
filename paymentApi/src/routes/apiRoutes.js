const express = require("express");
const router = express.Router();
const cardValidationContoller = require("../controllers/cardValidationController");
const parseFile = require("../services/fileParser");

router.post("/validate", cardValidationContoller.validate);

module.exports = router;
