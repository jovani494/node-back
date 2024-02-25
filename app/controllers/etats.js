const EtatModel = require('../models/etat');

// Create and Save a new etat
exports.create = async (req, res) => {
    if (!req.body.Nom) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const etat = new EtatModel({
        Nom : req.body.Nom,
        Couleur : req.body.Couleur  
     });
    
    await etat.save().then(data => {
        res.send({
            message:"etat created successfully!!",
            etat:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating etat"
        });
    });
};

// Retrieve all etats from the database.
exports.findAll = async (req, res) => {
    try {
        const etat = await EtatModel.find();
        res.status(200).json(etat);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single etat with an id
exports.findOne = async (req, res) => {
    try {
        const etat = await EtatModel.findById(req.params.id);
        res.status(200).json(etat);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a etat by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await EtatModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `etat not found.`
            });
        }else{
            res.send({ message: "etat updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a etat with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    try{
     const deleteetats = await EtatModel.findByIdAndDelete(id, { useFindAndModify: false })
    if(!deleteetats)
    {
        return res.status(404).send();
    }  
   
        res.status(201).send(
            {
                "status" : true,
                "message" : "Etat Deletedd!!!!!!!!!!!!!!!!"
            });
    }
    catch(error)
    {
        res.status(400).send(error);

    }
};