const EmployeModel = require('../models/employe');

// Create and Save a new employe
exports.create = async (req, res) => {
    if (!req.body.Nom && !req.body.Prenom && !req.body.Mail && !req.body.Phone && !req.body.Password) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const employe = new EmployeModel({
        Nom : req.body.Nom,
        Prenom: req.body.Prenom,
        Mail: req.body.Mail ,
        Phone: req.body.Phone,
        Password: req.body.Password,
        Services: req.body.Services
    });
    
    await employe.save().then(data => {
        res.send({
            message:"Employe created successfully!!",
            employe:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating employe"
        });
    });
};

// Retrieve all employes from the database.
exports.findAll = async (req, res) => {
    try {
        const employe = await EmployeModel.find();
        res.status(200).json(employe);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single employe with an id
exports.findOne = async (req, res) => {
    try {
        const employe = await EmployeModel.findById(req.params.id);
        res.status(200).json(employe);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a employe by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await EmployeModel.findByIdAndUpdate(id, req.body, {new:true}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `employe not found.`
            });
        }else{
            res.send({ message: "employe updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a employe with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    try{
     const deleteemployes = await EmployeModel.findByIdAndDelete(id, { useFindAndModify: false })
    if(!deleteemployes)
    {
        return res.status(404).send();
    }  
   
        res.status(201).send(
            {
                "status" : true,
                "message" : "Employe Deletedd!!!!!!!!!!!!!!!!"
            });
    }
    catch(error)
    {
        res.status(400).send(error);

    }
};