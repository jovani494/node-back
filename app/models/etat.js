const mongoose = require("mongoose");

const EtatSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
  },
  Couleur:{
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Etat = mongoose.model("etats", EtatSchema);

module.exports = Etat;