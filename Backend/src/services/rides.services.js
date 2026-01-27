import rideModel from "../models/ride.model.js";
import {
  getAddressCoordinate,
  getAutoSuggestionService,
  getCaptainInTheRadius,
  getDistanceAndTime,
} from "../services/map.services.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const getFare = async(pickup, destination) => {}

export const getOtp = async(num) => {

}

export const createRide = async()