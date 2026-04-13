import { useState } from "react";
import { Share2, Globe, Newspaper, PlayCircle, ExternalLink } from "lucide-react";
import SidePanelLayout from "@/components/SidePanelLayout";

const mediaTabs = [
  { id: 'sosial', label: 'Media Sosial', icon: <Share2 className="w-4 h-4" /> },
  { id: 'website', label: 'Website & Portal', icon: <Globe className="w-4 h-4" /> },
  { id: 'publikasi', label: 'Publikasi & Laporan', icon: <Newspaper className="w-4 h-4" /> },
  { id: 'video', label: 'Video & Multimedia', icon: <PlayCircle className="w-4 h-4" /> },
];

export default function MediaPublikasi() {
  const [tab, setTab] = useState('sosial');

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Media Komunikasi</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Media Publikasi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Informasi Meteorologi & Klimatologi melalui Berbagai Platform Media.</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={mediaTabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Kategori">
            {tab === 'sosial' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Instagram', handle: '@stamet_ternate', followers: '15.2K', color: 'from-yellow-400 via-pink-500 to-red-500' },
                  { name: 'Facebook', handle: 'Stasiun Meteorologi Ternate', followers: '8.7K', color: 'bg-blue-600' },
                  { name: 'Twitter / X', handle: '@BMKG_Ternate', followers: '5.1K', color: 'bg-blue-400' },
                  { name: 'YouTube', handle: 'BMKG Ternate', followers: '12.4K', color: 'bg-red-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-full ${s.color.includes('from') ? `bg-gradient-to-br ${s.color}` : s.color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {s.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">{s.name}</h4>
                        <p className="text-slate-500 text-sm">{s.handle}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{s.followers} followers</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'website' && (
              <div className="space-y-4">
                {[
                  { name: 'Website Resmi BMKG Ternate', url: 'ternate.bmkg.go.id' },
                  { name: 'BMKG Pusat', url: 'bmkg.go.id' },
                ].map((w, i) => (
                  <a key={i} href={`https://${w.url}`} target="_blank" rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all group flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 mb-1">{w.name}</h4>
                      <p className="text-slate-500 text-sm">{w.url}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                  </a>
                ))}
              </div>
            )}
            {tab === 'publikasi' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800">Publikasi & Laporan Terbaru</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {[
                    { type: 'PDF', title: 'Laporan Cuaca Bulanan Januari 2026', desc: 'Analisis kondisi cuaca bulan Januari' },
                    { type: 'XLS', title: 'Data Klimatologi 2025 Tahunan', desc: 'Data cuaca harian sepanjang 2025' },
                  ].map((p, i) => (
                    <div key={i} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div className={`w-12 h-12 rounded-lg ${p.type === 'PDF' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'} flex items-center justify-center font-bold text-sm`}>{p.type}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 text-sm">{p.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                      </div>
                      <button className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">Unduh</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === 'video' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <p className="text-slate-500 text-center">Konten video akan segera tersedia.</p>
              </div>
            )}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}
