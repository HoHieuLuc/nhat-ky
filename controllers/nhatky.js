const NhatKy = require("../model/nhatky")
const asyncWrapper = require('../middlewares/async');

getAllNhatKy = asyncWrapper(async (req, res) => {
    const nhatKys = await NhatKy.find({});
    res.status(200).json({ nhatKys });
})

createNhatKy = asyncWrapper(async (req, res) => {
    const nhatKy = NhatKy.create(req.body);
    res.status(200).json({ nhatKy });
})










module.exports = {
    getAllNhatKy,
    createNhatKy
}