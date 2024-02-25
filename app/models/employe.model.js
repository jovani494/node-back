const mongoose = require("mongoose");

const EmployeSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Prenom : {
    type: String,
    required: true,
  },
  Gender : {
    type: String,
    required: true,
  },
  availability: [{ start: String, end: String }],
  avatar: {
    type: String,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Services : 
    {
      type : mongoose.Schema.Types.ObjectId, ref: 'services'
    },
  created_at: {
    type: Date,
    default: Date.now
  }
});


const Employe = mongoose.model("employes", EmployeSchema);

module.exports = Employe;