import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),
  body("fullname.firstname")
    .isLength({ min: 3 })
    .withMessage("First name should be atleast 3 charecter long"),
  body("fullname.lastname")
    .isLength({ min: 3 })
    .withMessage("last name should be atleast 3 charecter long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 charecter long"),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 charecter long"),
];
