const express = require("express");
const ManagerController = require('../controllers/manager.controller')
const ManagerModel = require('../models/manager.model');
const bodyParser = require('body-parser');
const app = express();

const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', ManagerController.findAll);
app.get('/get/:id', ManagerController.getManager);
app.put('/update/:id', ManagerController.update);
app.delete('/delete/:id', ManagerController.destroy);

const DIR = "./app/public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, fileName);
  },
});

// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}); 

app.put("/createimg/:id", upload.single("avatar"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Aucun fichier n\'a été téléchargé.' });
    }

    const url = req.protocol + "://" + req.get("host");
    const avatar = url + "/public/" + req.file.filename;
   
    const updatedManager = await ManagerModel.findByIdAndUpdate(
      req.params.id,
      { avatar: avatar },
      { new: true }
    );

    if (!updatedManager) {
      return res.status(404).json({ message: 'Manager non trouvé.' });
    }

      res.status(200).json({ message: 'Image du manager mise à jour avec succès.', updatedManager });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de l\'image du manager.' });
    }
});

module.exports = app;