const express = require('express');
const { 
    getAllNhatKy,
    createNhatKy
} = require('../controllers/nhatky');

const router = express.Router();

router.route('/').get(getAllNhatKy).post(createNhatKy);

module.exports = router;