const mongoose = require('mongoose');

const NhatKySchema = new mongoose.Schema({
    tieu_de: {
        type: String,
        required: [true, 'Cần phải nhập tiêu đề'],
        trim: true,
        maxlength: [50, 'Tiêu đề không được quá 50 ký tự']
    },
    noi_dung: {
        type: String,
        required: [true, 'Cần phải nhập nội dung'],
        trim: true,
        maxlength: [1000, 'Nội dung không được quá 1000 ký tự']
    },
    ngay_dang: {
        type: Date,
        default: new Date()
    },
    lan_sua_cuoi: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('NhatKy', NhatKySchema);