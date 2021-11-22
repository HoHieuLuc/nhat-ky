const nhatkysDOM = document.querySelector('.nhatkys');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.nhatky-form');
const formAlertDOM = document.querySelector('.form-alert');
const tieuDeDOM = document.querySelector('#tieu_de');
const noiDungDOM = document.querySelector('#noi_dung');

const sortNgayDangDOM = document.querySelector('#sort-ngay-dang');
const sortLanSuaCuoiDOM = document.querySelector('#sort-lan-sua-cuoi');
const formTimKiemDOM = document.querySelector('#tim-kiem-form');
const timKiemDOM = document.querySelector('#tim-kiem');

// hiển thị nhật ký
const showNhatKys = async () => {
    loadingDOM.style.visibility = 'visible';
    const sortString = 'sort=' +
        (sortNgayDangDOM.checked ? '-ngay_dang' : '') +
        (sortLanSuaCuoiDOM.checked ? '-lan_sua_cuoi' : '');
    const searchString = `search=${timKiemDOM.value}`;
    const queryString = [searchString, sortString].join('&');
    //alert(sortString);
    try {
        const {
            data: { nhatKys }
        } = await axios.get(`/api/v1/nhatky?${queryString}`);
        if (nhatKys.length < 1) {
            nhatkysDOM.textContent = `Không tìm thấy dữ liệu`;
            loadingDOM.style.visibility = 'hidden';
            return;
        }
        //moment(now).format('YYYY-MM-DD HH:MM:SS')
        const allNhatKys = nhatKys.map((nhatKy) => {
            const { _id: nhatKyID, tieu_de, noi_dung, ngay_dang, lan_sua_cuoi } = nhatKy;
            return `
            <div class="container border border-1 rounded mb-3">
                <h3>${tieu_de}</h3>
                <div>
                    <div class="d-flex justify-content-between">
                        <p class="text-muted">Ngày đăng: ${new Date(ngay_dang).toLocaleString('vi-VN')}</p>
                        ${
                            lan_sua_cuoi !== null ?
                            `<p class="text-muted">
                                Lần sửa cuối: ${new Date(lan_sua_cuoi).toLocaleString('vi-VN')}
                            </p>` :
                            ``
                        }
                    </div>
                    <textarea style="height: 120px" disabled class="form-control bg-dark text-white">${noi_dung}</textarea>
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
        //nhatkysDOM.innerHTML = error;
        nhatkysDOM.innerHTML = `<h5 class="d-flex justify-content-center">${error.response.data.msg}</h5>`;
    }
    loadingDOM.style.visibility = 'hidden';
}

showNhatKys();

sortNgayDangDOM.addEventListener('click', showNhatKys);
sortLanSuaCuoiDOM.addEventListener('click', showNhatKys);

formTimKiemDOM.addEventListener('submit', (e) => {
    e.preventDefault();
    showNhatKys();
});

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
        formAlertDOM.textContent = `${error.response.data.msg}`;
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success', 'text-danger');
    }, 3000);
});