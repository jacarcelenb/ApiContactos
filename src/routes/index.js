const {Router} = require('express');
const router = Router();
const {getContacts, getContactById, createContact, updateContacto, deleteContact} = require('../controllers/index.controllers')

router.get('/contactos',getContacts);
router.get('/contactos/:id', getContactById);
router.post('/contactos', createContact);
router.put('/contactos/:id', updateContacto)
router.delete('/contactos/:id', deleteContact);
module.exports = router;