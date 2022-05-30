const mongoose = require("../db/connection");

const UserSchema = new mongoose.Schema(
  {
    username:
    {
      type: String,
      required: true,
      unique: true
    },
    email:
    {
      type: String,
      required: true,
      unique: true
    },
    password:
    {
      type: String,
      required: true
    },
    metrics:
    {
      type:
      {
        gender: String,
        age: Number,
        height: Number,
        weight: Number,
        activityLevel: mongoose.Decimal128
      },
      default: null
    },
    macros:
    {
      type:
      {
        fatsPercent: Number,
        carbsPercent: Number,
        proteinsPercent: Number
      },
      default: null
    }
  },
  {
    timestamps: true,
    // Prevents passwords from being sent to the client.
    toJSON:
    {
      // Used to transform data outside of the database.
      virtuals: true,
      // "ret" is the returned Mongoose doccument.
      transform: (_doc, ret) =>
      {
        delete ret.passward;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('User', UserSchema);