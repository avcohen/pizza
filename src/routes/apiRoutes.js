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
router.get('/clients',
    catchErrors(clientController.getClients)
);
// get all clients
router.get('/client/:id',
    catchErrors(clientController.getClient)
);

// create new client
router.post('/clients',
  clientController.upload,
  catchErrors(clientController.resize),
  catchErrors(clientController.createClient),
);

// delete a client by id
router.delete('/clients/:id',
    catchErrors(clientController.deleteClient)
)
// edit a client by id
router.put('/client/:id',
    catchErrors(clientController.editClient)
)



export default router;
