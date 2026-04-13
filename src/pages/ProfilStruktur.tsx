import strukturImg from "../assets/struktur_organisasi.jpeg";

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
          <div className="flex justify-center items-center w-full">
            {/* 2. Panggil nama import-nya di sini tanpa tanda kutip */}
            <img 
              src={strukturImg} 
              alt="Struktur Organisasi" 
              className="w-full max-w-4xl rounded-2xl shadow-md object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
