export interface SatelitItem {
  judul: string;
  deskripsi: string;
  url_gambar: string;
  url_detail: string;
  url_gambar_thumbnail: string;
  caption: string;
}

export const satelitCuacaData: SatelitItem[] = [
  {
    judul: "Himawari-9 IR Enhanced",
    deskripsi: "Pada produk Himawari-9 EH menunjukkan suhu puncak awan yang didapat dari pengamatan radiasi pada panjang gelombang 10.4 mikrometer yang kemudian diklasifikasi dengan pewarnaan tertentu, dimana warna hitam atau biru menunjukkan tidak terdapat pembentukan awan yang banyak (cerah), sedangkan semakin dingin suhu puncak awan, dimana warna mendekati jingga hingga merah, menunjukan pertumbuhan awan yang signifikan dan berpotensi terbentuknya awan Cumulonimbus.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-ir-enhanced",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Indonesia.png",
    caption: "suhu puncak awan"
  },
  {
    judul: "Himawari-9 Natural Color",
    deskripsi: "Produk Himawari-9 NC menggunakan metode RGB (Red Green Blue) dimana beberapa band dari data satelit digabungkan sehingga diperoleh identifikasi warna yang lebih jelas. Produk ini digunakan untuk mengamati proses konvektifitas, ketebalan awan, serta mikrofisis awan. Produk ini menggunakan band visible yang dipancarkan oleh matahari, sehingga produk ini hanya tersedia pada saat pagi hingga sore hari.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_NC_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-natural-color",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_NC_Indonesia.png",
    caption: "konvektifitas, ketebalan, dan mikrofisis awan"
  },
  {
    judul: "Himawari-9 Water Vapor Enhanced",
    deskripsi: "Produk Himawari-9 WE menampilkan kondisi kelembaban atmosfer pada lapisan menengah hingga atas yang didapat dari radiasi infrared pada panjang gelombang 6.2 mikrometer. Produk ini dapat menunjukkan kondisi kelembapan udara sebagai bahan pembentukan awan, dimana wilayah yang berwarna coklat menunjukkan kondisi kering dan berwarna biru menunjukkan kondisi basah. Produk ini digunakan untuk mengamati pergerakan massa udara kering dari benua Australia pada musim kemarau.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_WE_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-water-vapor-enhanced",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_WE_Indonesia.png",
    caption: "kelembapan atmosfer"
  },
  {
    judul: "Himawari-9 Rainfall Potential",
    deskripsi: "Produk turunan Himawari-9 Potential Rainfall adalah produk yang dapat digunakan untuk mengestimasi potensi curah hujan, yang disajikan berdasarkan kategori ringan, sedang, lebat, hingga sangat lebat, dengan menggunakan hubungan antara suhu puncak awan dengan curah hujan yang berpotensi dihasilkan.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_RP_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-rainfall-potential",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_RP_Indonesia.png",
    caption: "potensi curah hujan"
  },
  {
    judul: "Himawari-9 Geohotspot",
    deskripsi: "Potensi terjadinya kebakaran hutan dan lahan dapat teramati dengan citra satelit Himawari-9 dengan menggunakan data suhu kecerahan kanal infrared untuk filtering awan, serta menentukan anomali suhu panas yang menunjukkan potensi terjadi kebakaran hutan (titik merah).Selain itu ditampilkan juga citra RGB pada kanal visibel dan near infrared untuk mendeteksi sebaran asap (warna coklat) untuk lebih memastikan didaerah tersebut terjadi kebakaran.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_GH_Indonesia.png",
    url_detail: "https://inderaja.bmkg.go.id/IMAGE/GEOHOTSPOT/H08_GH_Asean.png",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GEOHOTSPOT/H08_GH_Asean.png",
    caption: "potensi kebakaran hutan dan lahan"
  },
  {
    judul: "Himawari-9 Enhanced Jabodetabek",
    deskripsi: "Produk ini menampilkan citra satelit inframerah 10.4 mikrometer Enhanced khusus untuk wilayah Jabodetabek.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Jabodetabek.png",
    url_detail: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Jakarta.png",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_EH_Jakarta.png",
    caption: "suhu puncak awan (Jabodetabek)"
  },
  {
    judul: "Himawari-9 Visible",
    deskripsi: "Menunjukkan reflektivitas yang didapat dari pengamatan radiasi pada panjang gelombang 0.65 mikrometer. Panjang gelombang merupakan panjang gelombang yang sama dengan yang digunakan mata manusia. Sensor visible akan merekam besarnya radiasi matahari yang dipantulkan kembali oleh obyek. Oleh karena itu, citra satelit visibel tidak tersedia pada malam hari.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/MTS/VS/MTS_VS_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-visible",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/MTS/VS/MTS_VS_Indonesia.png",
    caption: "reflektivitas awan"
  },
  {
    judul: "Himawari-9 RDCA",
    deskripsi: "Produk ini adalah hasil kolaborasi penelitian dengan JMA untuk menentukan awan Cumulus yang berpotensi menjadi Cumulonimbus (tanda positif merah) dalam 1 jam ke depan.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_RD_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-rdca",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HIMA/H08_RD_Indonesia.png",
    caption: "potensi awan cumulonimbus"
  },
  {
    judul: "Vektor Angin",
    deskripsi: "Produk ini merupakan overlay citra satelit IR1 (Inframerah pada panjang gelombang 10.4 mikrometer) dan vektor angin lapisan 850mb dari data model GSM (kecepatan angin dinyatakan dalam satuan m/s).",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/MTS/IW/MTS_IW_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/vektor-angin",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/MTS/IW/MTS_IW_Indonesia.png",
    caption: "vektor angin"
  },
  {
    judul: "Himawari-9 Convective Cloud",
    deskripsi: "Produk ini adalah hasil kolaborasi penelitian dengan JMA untuk mengidentifikasi secara objektif jenis awan konvektif yang ditangkap oleh band infrared dan visibel dari satelit Himawari. Produk ini diupdate setiap 1 jam.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HCAI/CVC/HCAI_CVC_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-convective-cloud",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HCAI/CVC/HCAI_CVC_Indonesia.png",
    caption: "jenis awan konvektif"
  },
  {
    judul: "Himawari-9 Cloud Top Height",
    deskripsi: "Produk ini adalah hasil kolaborasi penelitian dengan JMA untuk mengidentifikasi secara objektif tinggi puncak awan yang ditangkap oleh band infrared dari satelit Himawari. Produk ini diupdate setiap 1 jam.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HCAI/HTC/HCAI_HTC_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-cloud-top-height",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HCAI/HTC/HCAI_HTC_Indonesia.png",
    caption: "tinggi puncak awan"
  },
  {
    judul: "Himawari-9 Cloud Type",
    deskripsi: "Produk ini adalah hasil kolaborasi penelitian dengan JMA untuk mengidentifikasi secara objektif jenis awan yang ditangkap oleh band infrared dan visibel dari satelit Himawari. Produk ini diupdate setiap 1 jam.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HCAI/CLC/HCAI_CLC_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/himawari-cloud-type",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HCAI/CLC/HCAI_CLC_Indonesia.png",
    caption: "jenis awan"
  },
  {
    judul: "GK2A Enhanced",
    deskripsi: "Produk GK2A EH menunjukan suhu puncak awan yang didapat dari pengamatan radiasi pada panjang gelombang 10.4 mikrometer yang kemudian diklasifikasi dengan pewarnaan tertentu, di mana warna hitam atau biru menunjukan tidak terdapat pembentukan awan yang banyak (cerah), sedangkan semakin dingin suhu puncak awan, di mana warna mendekati jingga hingga merah, menunjukan pertumbuhawan yang signifikan dan berpotensi terbentuknya awan Cumulonimbus.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/GK2/GK2_EH_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/gk2a-enhanced",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GK2/GK2_EH_Indonesia.png",
    caption: "suhu puncak awan"
  },
  {
    judul: "GK2A Water Vapor Enhanced",
    deskripsi: "Produk GK2A Water Vapor Enhancd menampilkan kondisi kelembaban atmosfer padal lapisan menengah hingga atas yang didapat dari radiasi infrared pada panjang gelombang 6.2 mikrometer. Produk ini dapat menunjukan kondisi kelembapan udara sebagai bahan pembentukan awan, dimana wilayah yang berwarna biru menunjukan kondisi basah. Produk ini digunakan untuk mngamati pergerakan massa udara kering dari benua Australia pada musim kemarau.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/GK2/GK2_WE_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/gk2a-water-vapor-enhanced",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GK2/GK2_WE_Indonesia.png",
    caption: "kelembapan atmosfer"
  },
  {
    judul: "GSMaP Rainrate Daily",
    deskripsi: "Estimasi curah hujan dapat diperoleh dengan memanfaatkan satelit geostasioner (sensor Infrared) dan satelit polar (sensor microwave). Produk ini menunjukan estimasi curah hujan (mm/jam) dalam 1 hari.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/GSMAP/GSMaP_Precipitation_24hr.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/gsmap-rainrate-daily",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GSMAP/GSMaP_Precipitation_24hr.png",
    caption: "potensi curah hujan"
  },
  {
    judul: "GSMaP Rainrate Hourly",
    deskripsi: "Estimasi curah hujan dapat diperoleh dengan memanfaatkan satelit geostasioner (sensor Infrared) dan satelit polar (sensor microwave). Produk ini menunjukan estimasi curah hujan (mm/jam).",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/GSMAP/Hourly_Prec.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/gsmap-rainrate-hourly",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GSMAP/Hourly_Prec.png",
    caption: "potensi curah hujan"
  },
  {
    judul: "GSMaP Consecutive Dry Days",
    deskripsi: "Perhitungan hari tanpa hujan (HTH) yang digunakan berdasarkan data GSMaP harian, sehingga diperoleh peta yang lebih detail untuk menentukan wilayah yang berpotensi terjadi kekeringan.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/GSMAP/GSMaP_HTH.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/gsmap-consecutive-dry-days",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/GSMAP/GSMaP_HTH.png",
    caption: "hari tanpa hujan"
  },
  {
    judul: "Polar Hotspot",
    deskripsi: "Deteksi Hotspot (titik api) menggunakan sensor VIIRS dan MODIS pada satelit polar (NOAA20, S-NPP, TERRA dan AQUA) memberikan gambaran lokasi wilayah yang mengalami kebakaran hutan. Satelit akan mendeteksi anomali suhu panas dibandingkan dengan sekitarnya. Observasi ini dilakukan pada siang dan malam hari untuk masing-masing satelit. Pada daerah yang tertutup awan atau blank zone, hotspot di wilayah tersebut tidak dapat terdeteksi.",
    url_gambar: "https://inderaja.bmkg.go.id/IMAGE/HOTSPOT/Hotspot_Indonesia.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/polar-hotspot",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/IMAGE/HOTSPOT/Hotspot_Indonesia.png",
    caption: "polar hotspot"
  },
  {
    judul: "Citra Sebaran Asap",
    deskripsi: "Citra sebaran asap merupakan hasil analisis sebaran asap berdasarkan metode RGB (Red Green Blue) yang di overlay dengan arah dan kecepatan angin lapisan 1000 mb, dan titik panas berdasarkan Geohotspot. Pada produk ini, wilayah sebaran asap di tandai dengan poligon berwarna merah. Oleh karena penggunaan kanal visibel pada kombinasi RGB, produk ini hanya tersedia pada siang hingga sore hari.",
    url_gambar: "https://inderaja.bmkg.go.id/Trajektori/Asap.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/citra-sebaran-asap",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/Trajektori/Asap.png",
    caption: "sebaran asap"
  },
  {
    judul: "Citra Sebaran Abu Vulkanik - Dukono",
    deskripsi: "Sebaran abu vulkanik menampilkan hasil analisis abu vulkanik yang ditunjukkan dengan warna merah ditandai dengan poligon berwarna kuning. Produk ini hanya dibuat sesuai dengan informasi aktivitas gunung berapi dari VAAC Darwin.",
    url_gambar: "https://inderaja.bmkg.go.id/Trajektori/Dukono.png",
    url_detail: "https://www.bmkg.go.id/cuaca/satelit/citra-sebaran-abu-vulkanik/4",
    url_gambar_thumbnail: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://inderaja.bmkg.go.id/Trajektori/Dukono.png",
    caption: "sebaran abu vulkanik"
  }
];
