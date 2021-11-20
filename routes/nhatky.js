const express = require('express');
const {
    getAllNhatKy,
    createNhatKy,
    getNhatKy,
    updateNhatKy,
    deleteNhatKy
} = require('../controllers/nhatky');

const router = express.Router();

router.route('/')
    .get(getAllNhatKy)
    .post(createNhatKy);
router.route('/:id')
    .get(getNhatKy)
    .patch(updateNhatKy)
    .delete(deleteNhatKy);

module.exports = router;