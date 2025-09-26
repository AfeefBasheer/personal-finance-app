import validator from "express-validator";

function rawDataValidationRules() {
  return [
    validator
      .body("companyName")
      .notEmpty()
      .withMessage("Company name is required"),
    validator
      .body("companyID")
      .notEmpty()
      .withMessage("Company ID is required"),
    validator.body("sector").notEmpty().withMessage("Sector is required"),
    validator
      .body("financialYear")
      .isInt({ min: 1980, max: 2025 })
      .withMessage("Financial year must be valid year between 1980 and 2025"),
    validator
      .body("marketCapital")
      .isFloat({ min: 0 })
      .withMessage("Market capital cannot be a negative number."),
    validator
      .body("stockPrice")
      .isFloat({ min: 0 })
      .withMessage("Stock price cannot be a negative number"),
    validator.body("profit").isFloat(),
    validator.body("EPS").isFloat(),
    validator.body("equity").isFloat(),
    validator
      .body("outstandingShares")
      .isFloat({ min: 0 })
      .withMessage("Outstanding shares must be a positive number"),
    validator
      .body("interestIncome")
      .isFloat()
      .withMessage("interestIncome must be a positive number"),
    validator
      .body("tax")
      .isFloat({ min: 0 })
      .withMessage("Out must be a positive number"),
    validator
      .body("interestExpense")
      .isFloat({ min: 0 })
      .withMessage("interestExpense must be a positive number"),
    validator
      .body("currentLeasePayable")
      .isFloat({ min: 0 })
      .withMessage("currentLeasePayable must be a positive number"),
    validator
      .body("currentOtherFinancialLiabilities")
      .isFloat({ min: 0 })
      .withMessage(
        "currentOtherFinancialLiabilities must be a positive number"
      ),
    validator
      .body("nonCurrentLeasePayable")
      .isFloat({ min: 0 })
      .withMessage("nonCurrentLeasePayable must be a positive number"),
    validator
      .body("nonCurrentOtherFinancialLiabilities")
      .isFloat({ min: 0 })
      .withMessage(
        "nonCurrentOtherFinancialLiabilities  shares must be a positive number"
      ),
  ];
}

function validateRawData(req, res, next) {
  let validationErrors = validator.validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(422).json({ error: validationErrors.array() });
  next();
}

export default { validateRawData, rawDataValidationRules };
