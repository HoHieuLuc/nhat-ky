const ngayDangDOM = document.querySelector('#ngay_dang');
const tieuDeDOM = document.querySelector('#tieu_de');
const noiDungDOM = document.querySelector('#noi_dung');

const editFormDOM = document.querySelector('.edit-form');
const editBtnDOM = document.querySelector('#edit-button');
const formAlertDOM = document.querySelector('.form-alert');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');
//console.log(params);

const showNhatKy = async () => {
    try {
        const {
            data: { nhatKy }
        } = await axios.get(`/api/v1/nhatky/${id}`);
        const { ngay_dang, tieu_de, noi_dung } = nhatKy;
        ngayDangDOM.textContent = new Date(ngay_dang).toLocaleString('vi-VN');
        tieuDeDOM.value = tieu_de;
        noiDungDOM.value = noi_dung;
    } catch (error) {
        console.log(error);
    }
}
showNhatKy();

editFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    editBtnDOM.textContent = 'Đang xử lý...';
    try {
        const tieuDe = tieuDeDOM.value;
        const noiDung = noiDungDOM.value;
        await axios.patch(`/api/v1/nhatky/${id}`, {
            tieu_de: tieuDe,
            noi_dung: noiDung
        });
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Sửa nhật ký thành công`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        console.log(error);
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Có lỗi xảy ra, hãy thử lại`;
        formAlertDOM.classList.add('text-danger');
    }
    editBtnDOM.textContent = 'Sửa';
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success', 'text-danger');
    }, 3000);
})