import express from 'express';
const router = express.Router();
import * as firebase from "firebase";
require('dotenv').config();

const fbConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(fbConfig);

const rootRef = firebase.database().ref();
const clientsRef = rootRef.child('clients');

router.get('/', (req,res) => {
  res.send(":)")
});

router.get('/clients', (req,res) => {
  clientsRef.once('value')
    .then((snap) => {
      res.send(snap)
    })
});


export default router;
