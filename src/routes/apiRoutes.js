/* eslint-disable */
import express from 'express';
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');
const clientController = require('../controllers/clientController');

//
//    CLIENT ENDPOINTS
// ————————————————————————————————————————————————————————————————————————————————

// get all clients
router.get('/clients', catchErrors(clientController.getAllClients));

// get single client by id
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



export default router;
