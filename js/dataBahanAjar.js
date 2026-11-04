window.DATA_BAHAN_AJAR = {
  upbjjList: ['Jakarta','Bandung','Surabaya','Yogyakarta','Medan','Makassar'],
  kategoriList: ['MK Wajib','MK Pilihan','Praktikum'],
  ekspedisiList: ['JNE Regular','JNE Express'],
  stok: [
    {id:1,kode:'STSI4209',judul:'Pemrograman Berbasis Web',kategori:'MK Wajib',upbjj:'Bandung',lokasiRak:'A-01',harga:85000,qty:18,safety:10,catatanHTML:'<strong>Stok tersedia</strong> untuk pengiriman.'},
    {id:2,kode:'MSIM4201',judul:'Pengantar Sistem Informasi',kategori:'MK Wajib',upbjj:'Jakarta',lokasiRak:'B-02',harga:72000,qty:4,safety:12,catatanHTML:'Perlu <em>re-order</em> segera.'},
    {id:3,kode:'STSI4302',judul:'Basis Data',kategori:'Praktikum',upbjj:'Bandung',lokasiRak:'C-03',harga:95000,qty:0,safety:8,catatanHTML:'Stok kosong, menunggu distribusi.'},
    {id:4,kode:'EKMA4111',judul:'Pengantar Bisnis',kategori:'MK Pilihan',upbjj:'Surabaya',lokasiRak:'D-04',harga:68000,qty:15,safety:8,catatanHTML:'Persediaan cukup.'},
    {id:5,kode:'STSI4208',judul:'Algoritma dan Pemrograman',kategori:'Praktikum',upbjj:'Yogyakarta',lokasiRak:'A-05',harga:110000,qty:3,safety:9,catatanHTML:'Segera lakukan pengadaan.'},
    {id:6,kode:'MKDU4110',judul:'Bahasa Indonesia',kategori:'MK Wajib',upbjj:'Medan',lokasiRak:'B-06',harga:54000,qty:20,safety:10,catatanHTML:'Stok aman.'},
    {id:7,kode:'STSI4210',judul:'Jaringan Komputer',kategori:'MK Pilihan',upbjj:'Makassar',lokasiRak:'C-07',harga:88000,qty:7,safety:7,catatanHTML:'Stok tepat pada batas minimum.'},
    {id:8,kode:'STSI4305',judul:'Interaksi Manusia dan Komputer',kategori:'MK Wajib',upbjj:'Jakarta',lokasiRak:'D-08',harga:79000,qty:0,safety:6,catatanHTML:'Kosong; prioritas pengadaan.'}
  ],
  paket: [
    {kode:'PKT-001',nama:'Paket Sistem Informasi Dasar',harga:157000,isi:['MSIM4201 - Pengantar Sistem Informasi','STSI4209 - Pemrograman Berbasis Web']},
    {kode:'PKT-002',nama:'Paket Praktikum Teknologi',harga:205000,isi:['STSI4302 - Basis Data','STSI4208 - Algoritma dan Pemrograman']},
    {kode:'PKT-003',nama:'Paket Pengembangan Kompetensi',harga:167000,isi:['STSI4210 - Jaringan Komputer','STSI4305 - Interaksi Manusia dan Komputer']}
  ],
  tracking: [
    {nomorDO:'DO2026-001',nim:'043210001',nama:'Nadia Putri',ekspedisi:'JNE Regular',kodePaket:'PKT-001',tanggalKirim:'2026-10-28',totalHarga:157000,status:'Dalam pengiriman'},
    {nomorDO:'DO2026-002',nim:'043210002',nama:'Raka Pratama',ekspedisi:'JNE Express',kodePaket:'PKT-002',tanggalKirim:'2026-10-30',totalHarga:205000,status:'Diproses'}
  ]
};
