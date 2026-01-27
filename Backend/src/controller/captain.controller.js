import captainModel from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.services.js";

export const registerCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicles } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });

    if (isCaptainAlreadyExists) {
      return res.status(400).json({ message: "Captain already exists" });
    }

    const hashedPassword = captainModel.hashedPassword(password);

    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicles.color,
      plate: vehicles.plate,
      capacity: vehicles.capacity,
      vechilesType: vehicles.vechilesType,
    });

    const token = captain.generateAuthToken();

    return res.status(201).json(token, captain);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email })

    if (!captain) {
      return res.status(400).json({ message: "captain not found" });
    }

    const isMatched = await captain.comparePassword(password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid creadential" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getCaptainProfile = async(req, res, next) => {
   res.status(200).json({captain: req.captain});
}

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
