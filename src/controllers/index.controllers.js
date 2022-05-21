const { Pool } = require('pg');

const pool = new Pool({
    user: 'um519qglymib4kibuk9l',
    host: 'b6xdffnbn30sjvod8qad-postgresql.services.clever-cloud.com',
    password: 'osKOfp8H7hU771cUoQH2',
    database: 'b6xdffnbn30sjvod8qad',
    port: '5432'
});

const getContacts = async (req ,res)=>{
    const response = await pool.query('SELECT * FROM contacto ORDER BY nombres ASC');
    res.status(200).json(response.rows);
}
const getContactById = async (req, res) => {
    const id = parseInt(req.params.id);
    const response = await pool.query('SELECT * FROM contacto WHERE id = $1', [id]);
    res.json(response.rows);
};

const createContact = async (req, res) => {
    const { nombres,telefono,correo } = req.body;
    const response = await pool.query('INSERT INTO contacto (nombres, telefono, correo) VALUES ($1, $2 ,$3)', [nombres, telefono,correo]);
    res.json({
        message: 'Contact Added successfully',
        body: {
            user: {nombres, telefono ,correo}
        }
    })
};

const updateContacto = async (req, res) => {
    const id = parseInt(req.params.id);
    const {nombres,telefono,correo } = req.body;

    const response =await pool.query('UPDATE contacto SET nombres=$1, telefono=$2 , correo=$3 WHERE id=$4', [
        nombres,
        telefono,
        correo,
        id
    ]);
    res.json('Contact Updated Successfully');
};

const deleteContact = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM contacto where id = $1', [
        id
    ]);
    res.json(`Contact ${id} deleted Successfully`);
};

module.exports ={
    getContacts,
    getContactById,
    createContact,
    updateContacto,
    deleteContact
}