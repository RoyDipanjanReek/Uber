import { validationResult } from "express-validator";
import {
    getAddressCoordinate,
  getAutoSuggestionService,
  getDistanceAndTime,
} from "../services/map.services";

export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinate(address);

    res.status(200).json(coordinates);
  } catch (error) {
    res.status(404).json({ error: "Coordinates not found" });
  }
};

export const getDistanceTime = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    const destinationTime = await getDistanceAndTime(origin, destination);
    res.status(200).json(destinationTime);
  } catch (error) {
    res.status(404).json({ error: "Distance and time not found" });
  }
};

export const getAutoCompleteSuggestion = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {input} = req.query

    const suggestions = await getAutoSuggestionService(input)

    res.status(200).json(suggestions)
  } catch (error) {
     res.status(404).json({ error: "Suggestion not found" });
  }
};
