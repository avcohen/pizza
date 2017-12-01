const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('../models/Client');
const Client = mongoose.model('Client');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const path = require('path');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: (req, file, next) => {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'File type not allowed' }, false);
    }
  },
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.image = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.image}`);
  next();
};

exports.createClient = async (req, res) => {
    console.log('creating client');
    const client = await new Client(req.body).save();
    res.json(client);
};

exports.getClients = async (req, res) => {
    const clients = await Client.find().sort({created : 'desc' });
    res.json(clients);
}

exports.getClient = async (req, res) => {
    const client = await Client.findById(req.params.id, (err, currClient) => {
        if (err){
            res.status(500).send(err)
        }
        if (currClient){
            res.status(200).json(currClient)
        } else {
            res.status(404).send('Client not found with that id');
        }
    })
}

exports.deleteClient = async (req, res) => {
    await Client.findByIdAndRemove(req.params.id, (err, client) => {
        if (err){
            console.error(err)
        }
        let response = {
            message : 'Client deleted succesfully',
        }
        res.status(200).send(response);
    })


}

exports.editClient = async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body).exec();
}
