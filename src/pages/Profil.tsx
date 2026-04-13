import { History, Target, Compass, CheckCircle, User, BarChart2, Wrench } from "lucide-react";

export default function Profil() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Tentang Kami</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Profil Stasiun</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Mengenal lebih dekat Stasiun Meteorologi Sultan Babullah Ternate.</p>
        </div>
      </section>

      {/* Sejarah */}
      <section id="sejarah" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <History className="text-blue-600" /> Sejarah Stasiun
          </h2>
          <div className="relative border-l-2 border-blue-100 ml-3 space-y-12">
            {[
              { year: "Tahun 1970-an", title: "Awal Pendirian", desc: "Stasiun Meteorologi Ternate mulai beroperasi untuk mendukung penerbangan perintis di wilayah Maluku Utara." },
              { year: "Tahun 2000-an", title: "Modernisasi Peralatan", desc: "Dilengkapi dengan AWS dan sistem komunikasi satelit untuk diseminasi data yang lebih cepat." },
              { year: "Masa Kini", title: "Pusat Informasi Cuaca Maluku Utara", desc: "Menjadi koordinator wilayah untuk informasi cuaca publik dan penerbangan di Provinsi Maluku Utara." },
            ].map((item, i) => (
              <div key={i} className="relative pl-8">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100" />
                <span className="text-sm font-bold text-blue-600 mb-1 block">{item.year}</span>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section id="visi-misi" className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Visi & Misi</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi</h3>
              <p className="text-lg text-slate-600 font-medium italic">"Mewujudkan BMKG yang Handal, Tanggap dan Mampu dalam rangka mendukung Keselamatan Masyarakat dan Keberhasilan Pembangunan Nasional."</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi</h3>
              <ul className="space-y-4">
                {["Mengamati dan memahami fenomena MKG.", "Menyediakan data dan informasi MKG yang handal.", "Berpartisipasi aktif dalam kegiatan internasional."].map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur */}
      <section id="struktur" className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Struktur Organisasi</h2>
          
          <div className="flex justify-center items-center w-full">
            <img 
              src="https://miniapps.my.id/project012/assets/sruktur_organisasi.jpeg" 
              alt="Struktur Organisasi" 
              className="w-full max-w-4xl rounded-2xl shadow-md object-contain"
            />
          </div>
          
        </div>
      </section>
    </div>
  );
}
