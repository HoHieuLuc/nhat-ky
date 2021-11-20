const express = require('express');
const { getAllNhatKy } = require('../controllers/nhatky');

const router = express.Router();

router.route('/').get(getAllNhatKy);


module.exports = router;