import { validationResult } from "express-validator";
import {
  getAddressCoordinate,
  getAutoSuggestionService,
  getCaptainInTheRadius,
  getDistanceAndTime,
} from "../services/map.services.js";
import rideModel from "../models/ride.model.js";
import { 
  confirmRideService, 
  createRideService, 
  getFareService, 
  startRideService 
} from "../services/rides.services.js";
import { sendMessageToSocketId } from "../socket.js";

export const createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, pickup, destination, vechileType, couponCode } = req.body;

  try {
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vechileType,
      couponCode
    });

    res.status(201).json(ride);

    const pickUpCoordinates = await getAddressCoordinate(pickup);

    const captainsInRedius = await getCaptainInTheRadius(
      pickUpCoordinates.lat,
      pickUpCoordinates.lng,
      2,
    );

    ride.otp = "";

    const rediWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");

    captainsInRedius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rediWithUser,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Ride not found" });
  }
};

export const getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.body;

  try {
    const fare = await getFareService(pickup, destination);

    res.status(200).json(fare);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Fare not found" });
  }
};

export const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await confirmRideService({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "new-ride",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Ride not found" });
  }
};

export const startRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId, otp } = req.body;

  try {
    const startRide = await startRideService({ rideId, otp, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "new-ride",
      data: startRide,
    });

    return res.status(200).json(startRide);  //TODO
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Ride not started" });
  }
};

export const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const endRide = await endRideService({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: endRide,
    });

    return res.status(200).json(endRide);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Ride not started" });
  }
};
