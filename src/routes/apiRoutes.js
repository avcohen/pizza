/* eslint-disable */
import express from 'express';
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const clientController = require('../controllers/clientController');

router.get('/', (req, res) => {
  res.send(':)');
});

//
//    CLIENT ENDPOINTS
// ————————————————————————————————————————————————————————————————————————————————

// get all clients
router.get('/clients', catchErrors(clientController.getAllClients));
// get single clients
router.get('/clients/:id', catchErrors(clientController.getClient));

// create new client
router.post('/clients',
    clientController.upload,
    catchErrors(clientController.resize),
    catchErrors(clientController.createClient),
);

// edit a client by id
router.put('/clients/:id',
    clientController.upload,
    catchErrors(clientController.resize),
    catchErrors(clientController.editClient)
)

// delete a client by id
router.delete('/clients/:id',
    catchErrors(clientController.deleteClient)
);

//
//    Illustration ENDPOINTS
// ————————————————————————————————————————————————————————————————————————————————

// get illustrations by category
// router.get('/illustrations/:category',
//     catchErrors(illustrationController.getAllByCategory)
// );


export default router;
