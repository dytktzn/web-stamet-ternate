import { History } from "lucide-react";

export default function ProfilSejarah() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Profil Stasiun</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Sejarah Stasiun</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Perjalanan panjang Stasiun Meteorologi Sultan Babullah Ternate.</p>
        </div>
      </section>
      <section className="py-16 px-6">
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
    </div>
  );
}
