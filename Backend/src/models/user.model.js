import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: [true, 'First name is required.'],
        minLength: [3, "First name should be atleast 3 charecter long"],
        maxLength: [50, "First name cannot exceed 50 charecter"],
        trim: true,
      },
      lastname: {
        type: String,
        required: true,
        minLength: [3, "last name should be atleast 3 charecter long"],
        maxLength: [50, "First name cannot exceed 50 charecter"],
        trim: true,
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      minLength: [5, "Email should be atleast 5 charecter long"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
      minLength: [8, 'Password must be atleast 8 charecter'],
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must have atleast one uppercase, one lowercase, one digit, one special character  '
      ]
    },
    role: {
      type: String,
      enum: {
        values: ["Customer", "Rider", "Admin"],
        message: 'Please select a valid role'
      },
      default: "Customer",
    },
    socketId: {
      type: String,
    },
  },
  { timestamps: true },
);


// Hashed password befour saving
userSchema.pre('save', async function(next){
  if(!this.isModified('password')) {
    return next
  };

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;


