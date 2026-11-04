
Vue.component('status-badge', {
    template: '#tpl-status-badge',

    props: {
        qty: {
            type: Number,
            required: true
        },
        safety: {
            type: Number,
            required: true
        }
    },

    computed: {
        status() {
            if (this.qty === 0) {
                return 'Kosong';
            }

            if (this.qty < this.safety) {
                return 'Menipis';
            }

            return 'Aman';
        },

        statusClass() {
            if (this.status === 'Kosong') {
                return 'status-kosong';
            }

            if (this.status === 'Menipis') {
                return 'status-menipis';
            }

            return 'status-aman';
        },

        statusDescription() {
            if (this.status === 'Kosong') {
                return 'Stok bahan ajar kosong';
            }

            if (this.status === 'Menipis') {
                return 'Stok berada di bawah batas safety';
            }

            return 'Stok bahan ajar dalam kondisi aman';
        }
    }
});
