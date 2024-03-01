const mongoose = require("mongoose");

const EmploiDuTempsSchema = new mongoose.Schema({
  employe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employes'
  },
  matinDebut: { type: String, required: true },
  matinFin: { type: String, required: true },
  soirDebut: { type: String, required: true },
    soirFin: { type: String, required: true },
});

const EmploiDuTemps = mongoose.model("EmploiDuTemps", EmploiDuTempsSchema);

module.exports = EmploiDuTemps;