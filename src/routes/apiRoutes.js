import express from 'express';

const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const clientController = require('../controllers/clientController');

router.get('/', (req, res) => {
  res.send(':)');
});

router.get('/clients', (req, res) => {});

router.post(
  '/clients',
  clientController.upload,
  catchErrors(clientController.resize),
  catchErrors(clientController.createClient),
);

export default router;
