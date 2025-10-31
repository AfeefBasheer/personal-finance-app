import { body, validationResult } from "express-validator";

function rawDataValidationRules() {
  return [
    body("companyName").notEmpty().withMessage("Company name is required"),
    body("companyID").notEmpty().withMessage("Company ID is required"),
    body("sector").notEmpty().withMessage("Sector is required"),
    body("financialYear")
      .isInt({ min: 1980, max: 2025 })
      .withMessage("Financial year must be valid year between 1980 and 2025"),
    body("marketCapital")
      .isFloat({ min: 0 })
      .withMessage("Market capital cannot be a negative number."),
    body("stockPrice")
      .isFloat({ min: 0 })
      .withMessage("Stock price cannot be a negative number"),
    body("profit").isFloat(),
    body("EPS").isFloat(),
    body("equity").isFloat(),
    body("outstandingShares")
      .isFloat({ min: 0 })
      .withMessage("Outstanding shares must be a positive number"),
    body("interestIncome")
      .isFloat()
      .withMessage("interestIncome must be a positive number"),
    body("tax").isFloat({ min: 0 }).withMessage("It must be a positive number"),
    body("interestExpense")
      .isFloat({ min: 0 })
      .withMessage("interestExpense must be a positive number"),
    body("currentLeasePayable")
      .isFloat({ min: 0 })
      .withMessage("currentLeasePayable must be a positive number"),
    body("currentOtherFinancialLiabilities")
      .isFloat({ min: 0 })
      .withMessage("currentOtherFinancialLiabilities must be a positive number"),
    body("nonCurrentLeasePayable")
      .isFloat({ min: 0 })
      .withMessage("nonCurrentLeasePayable must be a positive number"),
    body("nonCurrentOtherFinancialLiabilities")
      .isFloat({ min: 0 })
      .withMessage(
        "nonCurrentOtherFinancialLiabilities must be a positive number"
      ),
  ];
}

function validateRawData(req, res, next) {
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return res.status(422).json({ error: validationErrors.array() });
  next();
}

export default { validateRawData, rawDataValidationRules };
