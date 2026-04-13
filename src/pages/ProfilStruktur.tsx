import { User, BarChart2, Wrench } from "lucide-react";

export default function ProfilStruktur() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Profil Stasiun</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Struktur Organisasi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Struktur organisasi Stasiun Meteorologi Sultan Babullah Ternate.</p>
        </div>
      </section>
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center space-y-8">
            <div className="bg-slate-900 text-white p-6 rounded-2xl w-64 text-center shadow-lg relative">
              <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-3 flex items-center justify-center border-4 border-slate-600">
                <User className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg">Kepala Stasiun</h4>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Pimpinan</p>
              <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2" />
            </div>
            <div className="bg-white border border-slate-200 p-4 rounded-xl w-48 text-center shadow-sm relative">
              <h4 className="font-bold text-slate-800">Tata Usaha</h4>
              <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2" />
              <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              {[
                { icon: <BarChart2 />, title: "Observasi", sub: "Pengamatan & Data" },
                { icon: <BarChart2 />, title: "Data & Informasi", sub: "Prakiraan & Pelayanan" },
                { icon: <Wrench />, title: "Instrumentasi", sub: "Perawatan & Kalibrasi" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl text-center shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="text-sm text-slate-500 mt-2">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
