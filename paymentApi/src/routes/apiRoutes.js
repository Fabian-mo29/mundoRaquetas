const express = require("express");
const router = express.Router();
const cardValidationContoller = require("../controllers/cardValidationController");

router.post("/validate", cardValidationContoller.validate);

module.exports = router;
