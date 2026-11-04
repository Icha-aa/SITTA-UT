
Vue.component('ba-stock-table', {
    template: '#tpl-stock',

    props: {
        items: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            hoveredItem: null
        };
    },

    computed: {
        jumlahData() {
            return this.items.length;
        }
    },

    filters: {
        rupiah(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0
            }).format(value);
        },

        satuan(value) {
            return `${value} buah`;
        }
    },

    methods: {
        editItem(item) {
            this.$emit('edit', item);
        },

        hapusItem(item) {
            this.$emit('hapus', item);
        },

        tampilkanCatatan(item) {
            this.hoveredItem = item.id;
        },

        sembunyikanCatatan() {
            this.hoveredItem = null;
        },

        statusStok(item) {
            if (item.qty === 0) {
                return 'Kosong';
            }

            if (item.qty < item.safety) {
                return 'Menipis';
            }

            return 'Aman';
        }
    }
});
