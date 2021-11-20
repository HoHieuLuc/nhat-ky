const asyncWrapper = require('../middlewares/async');

getAllNhatKy = asyncWrapper((req, res) => {
    
    res.send('get all nhat ky');
})












module.exports = {
    getAllNhatKy
}