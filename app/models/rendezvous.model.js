const mongoose = require("mongoose");

const RendezVousSchema = new mongoose.Schema({
  DateRdv : {
        type : Date
  },
  Client : {
        type : mongoose.Schema.Types.ObjectId, ref: 'clients'
  },
  Service :
    {
        type : mongoose.Schema.Types.ObjectId, ref: 'services'
    },
  Employe : 
    {
        type : mongoose.Schema.Types.ObjectId, ref: 'employes'
    },
  Etat : {
        type : mongoose.Schema.Types.ObjectId, ref: 'etats'
    },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const RendezVous = mongoose.model("rendezvous", RendezVousSchema);

module.exports = RendezVous;