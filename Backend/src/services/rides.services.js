import rideModel from "../models/ride.model.js";
import {
  getAddressCoordinate,
  getAutoSuggestionService,
  getCaptainInTheRadius,
  getDistanceAndTime,
} from "../services/map.services.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import CouponModel from "../models/coupon.model.js";

export const getFareService = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTimeCalculate = await getDistanceAndTime(pickup, destination);

  const setBaseFare = {
    auto: 30,
    car: 50,
    motocycle: 20,
  };

  const perKilometerRates = {
    auto: 10,
    car: 15,
    motocycle: 8,
  };

  const fare = {
    auto: Math.random(
      setBaseFare.auto +
        distanceTimeCalculate.distance_km * perKilometerRates.auto +
        distanceTimeCalculate.duration_min * perKilometerRates.auto,
    ),
    car: Math.random(
      setBaseFare.auto +
        distanceTimeCalculate.distance_km * perKilometerRates.auto +
        distanceTimeCalculate.duration_min * perKilometerRates.auto,
    ),
    motocycle: Math.random(
      setBaseFare.auto +
        distanceTimeCalculate.distance_km * perKilometerRates.auto +
        distanceTimeCalculate.duration_min * perKilometerRates.auto,
    ),
  };

  return fare
};

export const getOtp = (num) => {
  function generateOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()

    return otp
  }

  return generateOtp(num)
};

export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
  couponCode
}) => {

  let appliedCoupon = null
  let discountPercentage = 0

  //validate coupon
  if (couponCode) {
    const coupon = await CouponModel.findOne({
      couponCode: couponCode,
      isCouponActivate: true,
      couponExpiryTime: {
        $gt: new Date()
      }
    })

    if (!coupon) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired coupon"
      })
    }

    appliedCoupon = coupon
    discountPercentage = coupon.couponDiscountPercentage;
  }

  const originalfare = await getFareService(pickup, destination)

  const discountAmount = (fare * discountPercentage) / 100

  const finalFare = fare - discountAmount

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    vehicleType, 
    fare: originalfare[vehicleType],
    discountedAmount: finalFare,
    otp:getOtp(4),
    coupon: appliedCoupon ? {
      couponId: appliedCoupon._id,
      discountPercentage,
      code: appliedCoupon.couponCode
    } : null
  })

  return ride
};

export const startRideService = async ({ rideId, captain, otp }) => {

  await rideModel.findOneAndUpdate(
    {_id: rideId},
    {
      status: "accepted",
      captain: captain._id
    }
  )

  const ride = await rideModel.findOne(
    {_id: rideId})
    .populate("user")
    .populate("captain")
    .select("+otp")

  return ride
};


export const confirmRideService = async ({ rideId, captain, otp }) => {
  const ride = await rideModel.findOne(
    {_id: rideId})
    .populate("user")
    .populate("captain")
    .select("+otp")

    if (ride.otp !== otp) {
      throw new Error("Invalid OTP")
    }

    if (!ride.status === "accepted") {
      throw new Error("Ride not accepted")
    }

    await rideModel.findOne({
      _id: rideId
    }, {
      status: "ongoing"
    })

    return ride
};



export const endRideService = async ({ rideId, captain }) => {
  const searchtoEndRide = await rideModel.findOne(
    {_id: rideId})
    .populate("user")
    .populate("captain")
    .select("+otp")

    if (!searchtoEndRide) {
       throw new Error("Ride not found")
    }

    if (searchtoEndRide.status !== 'ongoing') {
       throw new Error("Ride not ongoin")
    }

    await rideModel.findOne({
      _id: rideId
    }, {
      status: "completed"
    })

    return searchtoEndRide
};
