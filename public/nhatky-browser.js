const nhatkysDOM = document.querySelector('.nhatkys');
const loadingDOM = document.querySelector('.loading-text');

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