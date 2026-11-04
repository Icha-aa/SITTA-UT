
(function () {
    'use strict';

    const clone = value => JSON.parse(JSON.stringify(value));

    function load() {
        try {
            const saved = JSON.parse(localStorage.getItem('sitta-stok'));

            return Array.isArray(saved)
                ? saved
                : clone(DATA_BAHAN_AJAR.stok);
        } catch (error) {
            return clone(DATA_BAHAN_AJAR.stok);
        }
    }

    const emptyForm = () => ({
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
    });

    new Vue({
        el: '#app',

        data: {
            stok: load(),
            upbjjList: DATA_BAHAN_AJAR.upbjjList,
            kategoriList: DATA_BAHAN_AJAR.kategoriList,
            filterUpbjj: '',
            filterKategori: '',
            sortBy: 'judul',
            pencarian: '',
            hanyaRendah: false,
            formTerbuka: false,
            modeEdit: false,
            form: emptyForm(),
            editingId: null,
            pesan: '',
            pesanError: false
        },

        computed: {
            totalUnit() {
                return this.stok.reduce(
                    (sum, item) => sum + Number(item.qty), 0
                );
            },

            jumlahMenipis() {
                return this.stok.filter(
                    item => item.qty > 0 && item.qty < item.safety
                ).length;
            },

            jumlahKosong() {
                return this.stok.filter(
                    item => item.qty === 0
                ).length;
            },

            kategoriTersedia() {
                return [...new Set(
                    this.stok
                        .filter(item => item.upbjj === this.filterUpbjj)
                        .map(item => item.kategori)
                )].sort();
            },

            hasilFilter() {
                let rows = this.stok.filter(item => {
                    const cocokDaerah =
                        !this.filterUpbjj ||
                        item.upbjj === this.filterUpbjj;

                    const cocokKategori =
                        !this.filterKategori ||
                        item.kategori === this.filterKategori;

                    const cocokStok =
                        !this.hanyaRendah ||
                        Number(item.qty) < Number(item.safety);

                    const cocokPencarian =
                        (item.kode + ' ' + item.judul)
                            .toLowerCase()
                            .includes(this.pencarian.toLowerCase());

                    return cocokDaerah &&
                        cocokKategori &&
                        cocokStok &&
                        cocokPencarian;
                });

                return rows.sort((a, b) => {
                    if (this.sortBy === 'qty-asc') {
                        return a.qty - b.qty;
                    }

                    if (this.sortBy === 'qty-desc') {
                        return b.qty - a.qty;
                    }

                    if (this.sortBy === 'harga-asc') {
                        return a.harga - b.harga;
                    }

                    if (this.sortBy === 'harga-desc') {
                        return b.harga - a.harga;
                    }

                    return a.judul.localeCompare(b.judul, 'id');
                });
            }
        },

        watch: {
            filterUpbjj() {
                this.filterKategori = '';
            },

            filterKategori(value) {
                if (
                    value &&
                    !this.kategoriTersedia.includes(value)
                ) {
                    this.filterKategori = '';
                }
            },

            stok: {
                deep: true,
                handler(value) {
                    localStorage.setItem(
                        'sitta-stok',
                        JSON.stringify(value)
                    );
                }
            }
        },

        methods: {
            resetFilter() {
                this.filterUpbjj = '';
                this.filterKategori = '';
                this.sortBy = 'judul';
                this.pencarian = '';
                this.hanyaRendah = false;
            },

            mulaiTambah() {
                this.form = emptyForm();
                this.modeEdit = false;
                this.editingId = null;
                this.formTerbuka = true;
                this.pesan = '';
                this.scrollForm();
            },

            mulaiEdit(item) {
                this.form = clone(item);
                this.modeEdit = true;
                this.editingId = item.id;
                this.formTerbuka = true;
                this.pesan = '';
                this.scrollForm();
            },

            scrollForm() {
                this.$nextTick(() => {
                    document.getElementById('form-stok')
                        .scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                });
            },

            simpan() {
                const f = this.form;

                const angkaValid = [
                    f.harga,
                    f.qty,
                    f.safety
                ].every(value =>
                    Number.isFinite(value) && value >= 0
                );

                if (
                    !f.kode ||
                    !f.judul ||
                    !f.kategori ||
                    !f.upbjj ||
                    !f.lokasiRak ||
                    !f.catatanHTML ||
                    !angkaValid ||
                    !Number.isInteger(f.qty) ||
                    !Number.isInteger(f.safety)
                ) {
                    this.pesan = 'Mohon isi seluruh data dengan benar.';
                    this.pesanError = true;
                    return;
                }

                const duplikat = this.stok.some(item =>
                    item.kode.toUpperCase() === f.kode.toUpperCase() &&
                    item.upbjj === f.upbjj &&
                    item.id !== this.editingId
                );

                if (duplikat) {
                    this.pesan = 'Kode mata kuliah sudah ada pada UT Daerah ini.';
                    this.pesanError = true;
                    return;
                }

                const clean = clone(f);
                clean.catatanHTML = this.escapeHTML(
                    clean.catatanHTML
                );

                if (this.modeEdit) {
                    const index = this.stok.findIndex(
                        item => item.id === this.editingId
                    );

                    if (index !== -1) {
                        this.$set(this.stok, index, {
                            ...clean,
                            id: this.editingId
                        });
                    }
                } else {
                    clean.id = Math.max(
                        0,
                        ...this.stok.map(item => item.id)
                    ) + 1;

                    this.stok.push(clean);
                }

                this.formTerbuka = false;

                this.pesan = this.modeEdit
                    ? 'Data bahan ajar berhasil diperbarui.'
                    : 'Bahan ajar baru berhasil ditambahkan.';

                this.pesanError = false;

                this.$nextTick(() => {
                    window.scrollTo({
                        top: 330,
                        behavior: 'smooth'
                    });
                });
            },

            konfirmasiHapus(item) {
                const yakin = window.confirm(
                    `Apakah Anda yakin ingin menghapus ${item.judul}?`
                );

                if (!yakin) {
                    return;
                }

                const index = this.stok.findIndex(
                    data => data.id === item.id
                );

                if (index !== -1) {
                    this.stok.splice(index, 1);
                    this.pesan = 'Data bahan ajar berhasil dihapus.';
                    this.pesanError = false;

                    if (this.editingId === item.id) {
                        this.formTerbuka = false;
                        this.editingId = null;
                        this.modeEdit = false;
                    }
                }
            },

            escapeHTML(value) {
                return String(value).replace(
                    /[&<>"']/g,
                    character => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#39;'
                    }[character])
                );
            }
        }
    });
})();
