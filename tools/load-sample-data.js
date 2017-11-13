require('dotenv').config({ path: __dirname + '/../variables.env' });
const fs = require('fs');

const mongoose = require('mongoose');
console.log(process.env.DATABASE)
mongoose.connect(process.env.DATABSE);
mongoose.Promise = global.Promise;


const Illustration = require('../src/models/Illustration.js');

const illustrations = JSON.parse(fs.readFileSync(__dirname + '/illustrations.json', 'utf-8'));


async function deleteData(){
  console.log('bai bai data');
  await Illustration.remove();
  console.log('its gone!');
  process.exit();
}

async function loadData(){
  try {
    await Illustration.insertMany(illustrations);
    console.log('data inserted!');
    process.exit();
  } catch(e){
      console.log('error!')
      console.log(e);
      process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
