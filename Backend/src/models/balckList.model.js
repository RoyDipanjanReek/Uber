import mongoose from "mongoose";


const balckListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default:Date.now,
        expires: 86400 // 24 hours in seconds
    }
}, {timestamps: true})


const blackListModel = mongoose.model("ride", balckListTokenSchema)

export default blackListModel