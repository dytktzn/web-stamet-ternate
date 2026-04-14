import { Target, Compass, CheckCircle } from "lucide-react";

export default function ProfilVisiMisi() {
  const misiList = [
    "Mengamati dan memahami fenomena meteorologi di Stasiun Meteorologi Sultan Baabullah Ternate",
    "Menyediakan data dan pelayanan informasi meteorologi Penerbangan yang handal dan terpercaya di Bandar Udara Sultan Baabullah Ternate",
    "Meningkatkan pemahaman informasi cuaca penerbangan untuk kepentingan keselamatan penerbangan di Bandar Udara Sultan Baabullah Ternate",
    "Meningkatnya Layanan Informasi Meteorologi Maritim yang berkualitas",
    "Meningkatnya Layanan Informasi Klimatologi yang berkualitas"
  ];

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Profil Stasiun</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Visi & Misi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Arah dan tujuan Stasiun Meteorologi Sultan Babullah Ternate.</p>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Visi Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visi</h3>
              <p className="text-lg text-slate-600 font-medium italic">
                "Terwujudnya pelayanan Jasa dan Informasi Meteorologi Penerbangan, Meteorologi Maritim serta pelayanan Klimatologi yang Cepat, Tepat, Akurat, berjangkauan luas dan dapat dipahami di Stasiun Meteorologi Kelas I Sultan Baabullah Ternate Provinsi Maluku Utara."
              </p>
            </div>

            {/* Misi Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Misi</h3>
              <ul className="space-y-4">
                {misiList.map((m, i) => (
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
    </div>
  );
}
