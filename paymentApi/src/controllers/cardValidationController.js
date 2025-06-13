const fileParser = require("../services/fileParser");

function validate(req, res) {
  const payment = req.body;
  if (!ispaymentBodyValid(payment)) {
    return res.status(400).json({ message: "Error: Data missing" });
  }
  if (!IscardNumberLengthValid(payment.CardNumber)) {
    return res.status(200).json({
      valid: false,
      message: "Not valid: Card number has to be 16 digits long",
    });
  }
  if (!isExpDateValid(payment.ExpirationDate)) {
    return res.status(200).json({
      valid: false,
      message: "Not valid: Expiration date not accepted",
    });
  }
  const paymentBinInfo = findValidBin(payment.CardNumber);
  if (!paymentBinInfo) {
    return res.status(200).json({
      valid: false,
      message: "Not valid: No matches found for card Bin",
    });
  }
  if (!isCvvValid(payment.Cvv, paymentBinInfo.brand)) {
    return res
      .status(200)
      .json({ valid: false, message: "Not valid: Cvv length is not valid" });
  }
  if (!isCurrencyValid(payment.Currency)) {
    return res
      .status(200)
      .json({ valid: false, message: "Not valid: Currency not valid" });
  }
  return res.status(200).json({ valid: true });
}

function ispaymentBodyValid(payment) {
  return (
    typeof payment.CardNumber === "string" &&
    typeof payment.ExpirationDate === "string" &&
    typeof payment.Cvv === "string" &&
    typeof payment.Currency === "string"
  );
}

function IscardNumberLengthValid(cardNumber) {
  return cardNumber.length == 16;
}

function isExpDateValid(expDate) {
  let [monthStr, yearStr] = expDate.split("/");
  let month = parseInt(monthStr, 10);
  let year = parseInt(yearStr.length === 2 ? "20" + yearStr : yearStr, 10);

  const expiration = new Date(year, month, 0);
  const currentDate = new Date();
  const oneMonthsValidDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate()
  );

  return expiration >= oneMonthsValidDate;
}

function findValidBin(cardNumber) {
  const bins = fileParser.parseData();
  let search = cardNumber.slice(0, 6);

  const valid = bins.find((bin) => bin.bin === search);
  return valid || null;
}

function isCvvValid(Cvv, brand) {
  const normalizedBrand = brand.trim().toUpperCase();

  if (normalizedBrand.includes("VISA")) {
    return Cvv.length === 3;
  }

  if (normalizedBrand.includes("MASTERCARD")) {
    return Cvv.length === 3;
  }

  if (
    normalizedBrand.includes("AMERICAN EXPRESS") ||
    normalizedBrand.includes("AMEX")
  ) {
    return Cvv.length === 4;
  }

  return false;
}

function isCurrencyValid(currency) {
  if (currency == "Dolares" || currency == "Colones") {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  validate,
};
