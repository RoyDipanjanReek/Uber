import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name should be atleast 3 charecter long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [3, "last name should be atleast 3 charecter long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: [5, "Email should be atleast 5 charecter long"],
    match: [/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm, "Invalid email address"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicles: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color should be atleast 3 character long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate should be atleast 3 character long"],
    },
    capacity: {
      type: Number,
      required: true,
      minLength: [1, "Capacity should be atleast 1 character long"],
    },
    vechilesType: {
      type: String,
      required: true,
      enum: ["car", "motocycle", "auto"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
},{timestamps: true});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

captainSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

export default captainModel;
