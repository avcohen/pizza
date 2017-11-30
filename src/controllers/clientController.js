const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
require('../models/Client');

const Client = mongoose.model('Client');
delete mongoose.connection.models.Cat;
const Cat = mongoose.model('Cat', { name: String });
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
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  next();
};

exports.createClient = async (req, res) => {
  console.log('creating client');
  const client = await new Client(req.body).save();
  res.json(client);
};
