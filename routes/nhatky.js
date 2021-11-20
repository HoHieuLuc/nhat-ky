const express = require('express');
const {
    getAllNhatKy,
    createNhatKy,
    getNhatKy
} = require('../controllers/nhatky');

const router = express.Router();

router.route('/')
    .get(getAllNhatKy)
    .post(createNhatKy);
router.route('/:id')
    .get(getNhatKy);

module.exports = router;