import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 10,
        trim: true
    },
    originalPrice: {
        type: Number
    },
    finalPrice: {
        type: Number
    },
    couponDiscountPercentage: {
        type: Number,
        required: true,
        max: 100,
        min: 0
    },
    couponExpiryTime: {
        type: Date,
        required: true,
        default: ''
    },
    isCouponActivate: {
        type: Boolean,
        default: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
}, {timestamps: true})

const CouponModel = mongoose.model("coupon", couponSchema)

export default CouponModel