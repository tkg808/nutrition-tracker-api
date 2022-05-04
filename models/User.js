const mongoose = require("../db/connection");

const UserSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    toJSON:
    {
      virtuals: true,
      // ret is the returned Mongoose doccument.
      transform: (_doc, ret) =>
      {
        delete ret.passward;
        return ret;
      }
    }
  }
);

module.exports = mongoose.model('User', UserSchema);