const mongoose = require("mongoose");

const OffreSpecialeSchema = new mongoose.Schema({
  Nom: Number,
  Service: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services"
    },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Client = mongoose.model("offres", OffreSpecialeSchema);

module.exports = Client;