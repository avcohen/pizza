require('dotenv').config({ path: `${__dirname}/../variables.env` });
const fs = require('fs');

const mongoose = require('mongoose');

mongoose.connect(process.env.DATABSE);
mongoose.Promise = global.Promise;

const Illustration = require('../src/models/Illustration.js');

const illustrations = JSON.parse(
  fs.readFileSync(`${__dirname}/illustrations.json`, 'utf-8'),
);

async function deleteData() {
  await Illustration.remove();
  process.exit();
}

async function loadData() {
  try {
    await Illustration.insertMany(illustrations);
    process.exit();
  } catch (e) {
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
