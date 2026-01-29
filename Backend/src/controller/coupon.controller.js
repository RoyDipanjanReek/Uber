
import CouponModel from "../models/coupon.model.js"
import rideModel from "../models/ride.model.js"


export const addCouponCode = async(req, res) => {
    const {
        couponCode,
        couponDiscountPercentage,
        isCouponActivate,
        couponExpiryTime,
        rideId
    } = req.body


    
}