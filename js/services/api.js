
const ApiService = {
    dataUrl: './data/dataBahanAjar.json',

    async getData() {
        try {
            const response = await fetch(this.dataUrl, {
                cache: 'no-store'
            });

            if (!response.ok) {
                throw new Error(
                    `Gagal mengambil data. Status: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error('Kesalahan mengambil data:', error);
            throw error;
        }
    },

    async getStok() {
        const data = await this.getData();
        return data.stok || [];
    },

    async getUpbjjList() {
        const data = await this.getData();
        return data.upbjjList || [];
    },

    async getKategoriList() {
        const data = await this.getData();
        return data.kategoriList || [];
    },

    async getPaket() {
        const data = await this.getData();
        return data.paket || [];
    },

    async getTracking() {
        const data = await this.getData();
        return data.tracking || [];
    },

    async getEkspedisi() {
        const data = await this.getData();
        return data.ekspedisiList || [];
    }
};

window.ApiService = ApiService;
