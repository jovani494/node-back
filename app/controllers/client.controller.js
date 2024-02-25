const ClientModel = require('../models/client.model');

// Create and Save a new service

// Retrieve all services from the database.
exports.findAll = async (req, res) => {
    try {
        const service = await ClientModel.find();
        res.status(200).json(service);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

// Find a single service with an id
exports.findOne = async (req, res) => {
    try {
        const service = await ClientModel.findById(req.params.id);
        res.status(200).json(service);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

// Update a service by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await ClientModel.findByIdAndUpdate(id, req.body, {new:true}).then(data => {
        if (!data) {
            res.status(404).send({
                message: `service not found.`
            });
        }else{
            res.send({ message: "service updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a service with the specified id in the request
exports.destroy = async (req, res) => {
    const id = req.params.id;
    try{
     const deleteservices = await ClientModel.findByIdAndDelete(id, { useFindAndModify: false })
    if(!deleteservices)
    {
        return res.status(404).send();
    }  
   
        res.status(201).send(
            {
                "status" : true,
                "message" : "Service Deletedd!!!!!!!!!!!!!!!!"
            });
    }
    catch(error)
    {
        res.status(400).send(error);

    }
};