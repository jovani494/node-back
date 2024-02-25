const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Description: String,
  Duree: Number,
  Prix: Number,
  Commission: Number,
  CommissionEmploye: Number,
  avatar: {
    type: String,
  },
  Employes : [
    {
      type : mongoose.Schema.Types.ObjectId, ref: 'employes'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Service = mongoose.model("services", ServiceSchema);

module.exports = Service;