import mongoose from "mongoose";

const { Schema } = mongoose;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const driverSchema = new Schema({
  name: { type: String },
  age: { type: String },
  gender: { type: String },
  location: { type: String },
  drivingLicence: { type: String },
  address: { type: String },
  email: {
    type: String,
    // trim: true,
    // lowercase: true,
    // unique: true,
    // // required: "Email address is required",
    // validate: [validateEmail, "Please fill a valid email address"],
    // match: [
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //   "Please fill a valid email address",
    // ],
    mobile: { type: String },
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  mobile:{type:String}
  // password: {
  //   type: String,
  // },
  // isVerified: { type: Boolean },
});

export default mongoose.model("Driver", driverSchema);
