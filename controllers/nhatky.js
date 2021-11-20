const NhatKy = require("../model/nhatky");
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

getAllNhatKy = asyncWrapper(async (req, res) => {
    const nhatKys = await NhatKy.find({});
    res.status(200).json({ nhatKys });
})

createNhatKy = asyncWrapper(async (req, res) => {
    const nhatKy = NhatKy.create(req.body);
    res.status(200).json({ nhatKy });
})

getNhatKy = asyncWrapper(async (req, res, next) => {
    const { id: nhatKyID } = req.params;
    const nhatKy = await NhatKy.findOne({ _id: nhatKyID });
    if (!nhatKy) {
        return next(createCustomError(`Không tồn tại nhật ký có id: ${nhatKyID}`, 404));
    }
    res.status(200).json({ nhatKy });
});








module.exports = {
    getAllNhatKy,
    createNhatKy,
    getNhatKy
}