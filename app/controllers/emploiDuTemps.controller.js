const emploiDuTemps = require('../models/emploiDuTemps.model');

exports.getEDT = async (req, res) => {
    try {
        const EDT = await emploiDuTemps.findOne({employe : req.params.id});
        res.status(200).json(EDT);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.create = async(req, res) => {
    const edt = new emploiDuTemps({
        employe: req.body.employe,
        matinDebut: req.body.matinDebut,
        matinFin: req.body.matinFin,
        soirDebut: req.body.soirDebut,
        soirFin: req.body.soirFin ,
    });
    
    await edt.save().then(data => {
        res.send({
            message:"edt created successfully!!",
            edt:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating service"
        });
    });
}

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await emploiDuTemps.findByIdAndUpdate(id, req.body, {new:true}).then(data => {
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