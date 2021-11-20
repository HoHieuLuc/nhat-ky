const NhatKy = require("../model/nhatky");
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllNhatKy = asyncWrapper(async (req, res) => {
    const nhatKys = await NhatKy.find({});
    res.status(200).json({ nhatKys });
})

const createNhatKy = asyncWrapper(async (req, res) => {
    const nhatKy = await NhatKy.create(req.body);
    res.status(201).json({ nhatKy });
})

const getNhatKy = asyncWrapper(async (req, res, next) => {
    const { id: nhatKyID } = req.params;
    const nhatKy = await NhatKy.findOne({ _id: nhatKyID });
    if (!nhatKy) {
        return next(createCustomError(`Không tồn tại nhật ký có id: ${nhatKyID}`, 404));
    }
    res.status(200).json({ nhatKy });
});

const updateNhatKy = asyncWrapper(async (req, res, next) => {
    const { id: nhatKyID } = req.params;
    const update = req.body;
    const nhatKy = await NhatKy.findOneAndUpdate(
        { _id: nhatKyID },
        {
            tieu_de: update.tieu_de,
            noi_dung: update.noi_dung,
            lan_sua_cuoi: new Date()
        },
        {
            new: true, // trả về giá trị sau khi được cập nhật
            runValidators: true
        }
    )
    if (!nhatKy) {
        return next(createCustomError(`Không tồn tại nhật ký có id: ${nhatKyID}`, 404));
    }
    res.status(200).json({ nhatKy });
});

const deleteNhatKy = asyncWrapper(async (req, res, next) => {
    const { id: nhatKyID } = req.params;
    const nhatKy = await NhatKy.findOneAndDelete({ _id: nhatKyID });
    if (!nhatKy) {
        return next(createCustomError(`Không tồn tại nhật ký có id: ${nhatKyID}`, 404));
    }
    res.status(200).json({ nhatKy });
});




module.exports = {
    getAllNhatKy,
    createNhatKy,
    getNhatKy,
    updateNhatKy,
    deleteNhatKy
}