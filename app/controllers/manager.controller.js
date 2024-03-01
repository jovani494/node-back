const ManagerModel = require('../models/manager.model');

// Create and Save a new manager

// Retrieve all managers from the database.
exports.findAll = async (req, res) => {
    try {
        const manager = await ManagerModel.find();
        res.status(200).json(manager);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single manager with an id
exports.getClient = async (req, res) => {
    try {
        const manager = await ManagerModel.find({User: req.params.id});
        res.status(200).json(manager);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a manager by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await ManagerModel.findByIdAndUpdate(id, req.body, {new:true}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `manager not found.`
            });
        }else{
            res.send({ message: "manager updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a manager with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    try{
     const deletemanagers = await ManagerModel.findByIdAndDelete(id, { useFindAndModify: false })
    if(!deletemanagers)
    {
        return res.status(404).send();
    }  
   
        res.status(201).send(
            {
                "status" : true,
                "message" : "Client Deletedd!!!!!!!!!!!!!!!!"
            });
    }
    catch(error)
    {
        res.status(400).send(error);

    }
};