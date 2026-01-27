import { body } from "express-validator";

export const captainRegisterValidator = [
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

  body('vehicles.color') 
    .isLength({ min: 3 })
    .withMessage("Vehiles color should be atleast 3 charecter long"),

  body('vehicles.plate') 
    .isLength({ min: 3 })
    .withMessage("Vehiles plate should be atleast 3 charecter long"),


  body('vehicles.capacity')
    .isLength({ min: 1 })
    .withMessage("Vehiles capacity must be atleast 1"),
  
    body('vehicles.vechilesType')
    .isLength({ min: 3 })
    .isIn(["car", "motocycle", "auto"])
    .withMessage("Invalid vechiles type"),
];


export const captainLoginValidator = [
  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 6 charecter long"),
];