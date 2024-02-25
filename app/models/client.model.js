const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Prenom: String,
  Gender : {
    type: String,
    required: true,
  },
  Phone: Number,
  avatar: {
    type: String,
  },
  User: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Client = mongoose.model("clients", ClientSchema);

module.exports = Client;