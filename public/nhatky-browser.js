const nhatkysDOM = document.querySelector('.nhatkys');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.nhatky-form');
const formAlertDOM = document.querySelector('.form-alert');
const tieuDeDOM = document.querySelector('#tieu_de');
const noiDungDOM = document.querySelector('#noi_dung');

// hiển thị nhật ký
const showNhatKys = async () => {
    loadingDOM.style.visibility = 'visible';
    try {
        const {
            data: { nhatKys }
        } = await axios.get('/api/v1/nhatky');
        if (nhatKys.length < 1) {
            nhatkysDOM.innerHTML = `Nhật ký của bạn đang trống`;
            loadingDOM.style.visibility = 'hidden';
            return;
        }
        const allNhatKys = nhatKys.map((nhatKy) => {
            const { _id: nhatKyID, tieu_de, noi_dung, ngay_dang, lan_sua_cuoi } = nhatKy;
            return `
            <div class="container border border-1 rounded mb-3">
                <h3>${tieu_de}</h3>
                <div>
                    <div class="d-flex justify-content-between">
                        <p class="text-muted">Ngày đăng: ${ngay_dang}</p>
                        ${lan_sua_cuoi !== null ?
                    `<p class="text-muted">Lần sửa cuối: ${lan_sua_cuoi}</p>` :
                    ``
                }
                    </div>
                    <p>${noi_dung}</p>
                </div>
                <div class="d-flex justify-content-end gap-2">
                    <a class="btn btn-link" href="nhatky.html?id=${nhatKyID}">Sửa</a>
                    <button type="button" class="btn btn-link delete-nhatky" data-id="${nhatKyID}">Xóa</button>
                </div>
            </div>
            `;
        }).join('');
        nhatkysDOM.innerHTML = allNhatKys;
    } catch (error) {
        nhatkysDOM.innerHTML = error;
    }
    loadingDOM.style.visibility = 'hidden';
}

showNhatKys();

// xóa
nhatkysDOM.addEventListener('click', async (e) => {
    const el = e.target;
    if (el.classList.contains('delete-nhatky')){
        //console.log(el.dataset.id);
        loadingDOM.style.visibility = 'visible';
        const id = el.dataset.id;
        try {
            await axios.delete(`/api/v1/nhatky/${id}`);
            showNhatKys();
        } catch (error) {
            console.log(error);
        }
    }
    loadingDOM.style.visibility = 'hidden';
});

// form thêm

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tieu_de = tieuDeDOM.value;
    const noi_dung = noiDungDOM.value;
    //alert(tieu_de + ', ' + noi_dung);
    try {
        await axios.post('/api/v1/nhatky', { tieu_de, noi_dung });
        showNhatKys();
        tieuDeDOM.value = '';
        noiDungDOM.value = '';
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = `Thêm nhật ký thành công`;
        formAlertDOM.classList.add('text-success');
    } catch (error) {
        formAlertDOM.classList.add('text-danger');
        formAlertDOM.style.display = 'block';
        formAlertDOM.innerHTML = `Có lỗi xảy ra`;
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success', 'text-danger');
    }, 3000);
});