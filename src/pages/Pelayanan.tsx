import { CloudRain, Thermometer, Wind, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Pelayanan() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Pelayanan Publik</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Permintaan Data MKG</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Layanan resmi permintaan data meteorologi, klimatologi, dan geofisika.</p>
        </div>
      </section>

      {/* Alur */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Alur Permintaan Data</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { step: 1, title: "Surat Permohonan", desc: "Kirim surat resmi ke Kepala Stasiun" },
              { step: 2, title: "Verifikasi", desc: "Tim PTSP memeriksa kelengkapan" },
              { step: 3, title: "Proses Data", desc: "Data disiapkan sesuai permintaan" },
              { step: 4, title: "Pengiriman", desc: "Data dikirim via Email atau Hardcopy" },
            ].map(item => (
              <div key={item.step} className="group">
                <div className="w-24 h-24 bg-white border-2 border-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-blue-400 transition-all relative">
                  <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors">{item.step}</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Katalog */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Katalog Layanan Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <CloudRain className="w-6 h-6" />, title: "Data Curah Hujan", desc: "Data harian, bulanan, atau tahunan curah hujan.", color: "blue" },
              { icon: <Thermometer className="w-6 h-6" />, title: "Data Suhu & Kelembapan", desc: "Suhu udara maksimum, minimum, rata-rata.", color: "orange" },
              { icon: <Wind className="w-6 h-6" />, title: "Data Angin Permukaan", desc: "Arah dan kecepatan angin untuk energi terbarukan.", color: "indigo" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <div className={`flex items-center justify-between mb-4`}>
                  <div className={`p-2 bg-${item.color}-50 text-${item.color}-600 rounded-lg`}>{item.icon}</div>
                  <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Tersedia</span>
                </div>
                <h4 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 mb-4">{item.desc}</p>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Format: Excel / PDF</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
            <span className="text-sm text-blue-800 font-bold">Tarif Nol Rupiah (Rp 0,-)</span>
            <span className="text-xs text-blue-700">untuk kegiatan pendidikan dan penelitian.</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Butuh Data Cuaca? Hubungi Kami.</h2>
          <p className="text-slate-300 mb-8 relative z-10">Tim PTSP siap membantu (Senin - Jumat, 08.00 - 16.00 WIT).</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10">
            <a href={siteConfig.contact.email.href} className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" /> Kirim Email
            </a>
            <a href={siteConfig.contact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-500 transition-colors flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
