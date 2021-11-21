const NhatKy = require("../model/nhatky");
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

const getAllNhatKy = asyncWrapper(async (req, res) => {
    const { sort, search } = req.query;
    const queryObject = {};
    if (search) {
        // tìm trên tiêu đề và nội dung
        queryObject.search = { $or: [
            { tieu_de: { $regex: search, $options: 'i' } },
            { noi_dung: { $regex: search, $options: 'i' } }
        ]};
    }
    //console.log(queryObject.search);

    let result = NhatKy.find( queryObject.search );

    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }
    else {
        result = result.sort('-ngay_dang');
    }
    //
    /* const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);  */
    const nhatKys = await result;
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
    const { tieu_de, noi_dung } = req.body;
    if (tieu_de && noi_dung) {
        const nhatKy = await NhatKy.findOneAndUpdate(
            { _id: nhatKyID },
            {
                tieu_de: tieu_de,
                noi_dung: noi_dung,
                lan_sua_cuoi: new Date()
            },
            {
                new: true, // trả về giá trị sau khi được cập nhật
                runValidators: true
            }
        );
        if (!nhatKy) {
            return next(createCustomError(`Không tồn tại nhật ký có id: ${nhatKyID}`, 404));
        }
        return res.status(200).json({ nhatKy });
    }
    next(createCustomError(`Có lỗi xảy ra`, 400));
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