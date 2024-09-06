const mongoose = require("mongoose");

const adminCredentialSchema = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("AdminCredential", adminCredentialSchema);