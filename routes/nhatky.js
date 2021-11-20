const express = require('express');
const {
    getAllNhatKy,
    createNhatKy,
    getNhatKy,
    updateNhatKy
} = require('../controllers/nhatky');

const router = express.Router();

router.route('/')
    .get(getAllNhatKy)
    .post(createNhatKy);
router.route('/:id')
    .get(getNhatKy)
    .patch(updateNhatKy);

module.exports = router;