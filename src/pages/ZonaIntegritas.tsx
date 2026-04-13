import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import SidePanelLayout from "@/components/SidePanelLayout";

const ziTabs = [
  { id: 'komitmen', label: '1. Komitmen & Deklarasi' },
  { id: 'budaya', label: '2. Budaya Anti-Korupsi' },
  { id: 'transparansi', label: '3. Transparansi' },
  { id: 'pelayanan', label: '4. Standar Pelayanan' },
  { id: 'pengaduan', label: '5. Saluran Pengaduan' },
  { id: 'inovasi', label: '6. Inovasi Layanan' },
];

export default function ZonaIntegritas() {
  const params = new URLSearchParams(window.location.search);
  const [tab, setTab] = useState(params.get('tab') || 'komitmen');

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Integritas</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Zona Integritas</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih dan Melayani (WBBM).</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={ziTabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Area Perubahan">
            {tab === 'komitmen' && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-6">Deklarasi Zona Integritas</h3>
                <blockquote className="text-lg italic leading-relaxed text-slate-300 border-l-4 border-yellow-400 pl-6 mb-8">
                  "Kami, seluruh jajaran Stasiun Meteorologi Sultan Babullah Ternate, menyatakan komitmen untuk mewujudkan Wilayah Bebas dari Korupsi (WBK) dengan menjunjung tinggi integritas, transparansi, dan akuntabilitas dalam setiap pelaksanaan tugas."
                </blockquote>
                <p className="font-bold uppercase tracking-widest text-xs text-slate-300">Kepala Stasiun Meteorologi Sultan Babullah</p>
              </div>
            )}
            {tab === 'budaya' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border-2 border-red-50 p-6 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Komitmen Tanpa Gratifikasi</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">Seluruh jajaran dilarang menerima pemberian dalam bentuk apapun dari pengguna layanan.</p>
                  <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                    <p className="text-[10px] font-bold text-red-700 uppercase mb-1">Capaian UPG 2025:</p>
                    <p className="text-lg font-black text-red-600">0 Laporan Penerimaan</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border-2 border-blue-50 p-6 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-3">Sosialisasi Budaya Kerja</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Kami aktif melakukan kampanye anti-korupsi secara internal maupun kepada masyarakat luas.</p>
                </div>
              </div>
            )}
            {tab === 'transparansi' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total DIPA 2026</p>
                    <p className="text-xl font-bold text-slate-800">Rp 4.2 Miliar</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Realisasi Anggaran</p>
                    <p className="text-xl font-bold text-green-600">12.5%</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Opini BPK</p>
                    <p className="text-xl font-bold text-blue-600">WTP</p>
                  </div>
                </div>
              </div>
            )}
            {tab === 'pelayanan' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Standar Pelayanan</h3>
                <p className="text-sm text-slate-600">Informasi standar pelayanan dan Indeks Kepuasan Masyarakat (IKM) Stasiun Meteorologi Sultan Babullah.</p>
              </div>
            )}
            {tab === 'pengaduan' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Saluran Pengaduan (Whistleblowing System)</h3>
                <p className="text-sm text-slate-600 mb-4">Laporkan dugaan pelanggaran, penyimpangan, atau tindakan korupsi secara anonim.</p>
                <a href="https://wbs.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                  Buka Portal WBS BMKG
                </a>
              </div>
            )}
            {tab === 'inovasi' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-32 bg-blue-50 flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-800 mb-1">Aplikasi E-Ticketing Data</h4>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Efisiensi 200%</span>
                    <p className="text-sm text-slate-500 mt-3">Transformasi digital permohonan data meteorologi.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="h-32 bg-indigo-50 flex items-center justify-center">
                    <span className="text-4xl">🖥️</span>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-slate-800 mb-1">Display Cuaca Bandara</h4>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Transparansi Publik</span>
                    <p className="text-sm text-slate-500 mt-3">Integrasi data AWS langsung ke layar publik bandara.</p>
                  </div>
                </div>
              </div>
            )}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}
