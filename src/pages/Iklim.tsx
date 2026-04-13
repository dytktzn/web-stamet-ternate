import { useState } from "react";
import SidePanelLayout from "@/components/SidePanelLayout";
import { FileText, Calendar } from "lucide-react";

const klimatData = [
  { bulan: 'Januari', suhu: '27.5', hujan: '356', lembap: '85' },
  { bulan: 'Februari', suhu: '27.6', hujan: '315', lembap: '84' },
  { bulan: 'Maret', suhu: '27.9', hujan: '287', lembap: '83' },
  { bulan: 'April', suhu: '28.2', hujan: '201', lembap: '81' },
  { bulan: 'Mei', suhu: '28.1', hujan: '142', lembap: '79' },
  { bulan: 'Juni', suhu: '27.6', hujan: '118', lembap: '78' },
  { bulan: 'Juli', suhu: '27.0', hujan: '95', lembap: '77' },
  { bulan: 'Agustus', suhu: '27.2', hujan: '72', lembap: '76' },
  { bulan: 'September', suhu: '27.8', hujan: '89', lembap: '77' },
  { bulan: 'Oktober', suhu: '28.3', hujan: '156', lembap: '79' },
  { bulan: 'November', suhu: '28.5', hujan: '285', lembap: '82' },
  { bulan: 'Desember', suhu: '28.0', hujan: '398', lembap: '85' },
];

interface BuletinItem {
  title: string;
  date: string;
  cover: string;
  description: string;
}

// Placeholder data for each category - hero + list layout
const buletinData: Record<string, { hero: BuletinItem; list: BuletinItem[] }> = {
  'prakiraan-bulanan': {
    hero: {
      title: 'Prakiraan Hujan Bulanan April 2026',
      date: 'April 2026',
      cover: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Prakiraan+Hujan+Bulanan',
      description: 'Prakiraan distribusi curah hujan bulanan untuk wilayah Maluku Utara berdasarkan analisis model numerik dan data klimatologi.',
    },
    list: [
      { title: 'Prakiraan Hujan Bulanan Maret 2026', date: 'Maret 2026', cover: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Maret+2026', description: '' },
      { title: 'Prakiraan Hujan Bulanan Februari 2026', date: 'Februari 2026', cover: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Februari+2026', description: '' },
      { title: 'Prakiraan Hujan Bulanan Januari 2026', date: 'Januari 2026', cover: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=Januari+2026', description: '' },
    ],
  },
  'prakiraan-dasarian': {
    hero: {
      title: 'Prakiraan Hujan Dasarian III April 2026',
      date: 'Dasarian III April 2026',
      cover: 'https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Prakiraan+Dasarian',
      description: 'Prakiraan curah hujan per dasarian (10 harian) untuk mendukung sektor pertanian dan pengelolaan sumber daya air.',
    },
    list: [
      { title: 'Prakiraan Hujan Dasarian II April 2026', date: 'Dasarian II April 2026', cover: 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Dasarian+II', description: '' },
      { title: 'Prakiraan Hujan Dasarian I April 2026', date: 'Dasarian I April 2026', cover: 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Dasarian+I', description: '' },
      { title: 'Prakiraan Hujan Dasarian III Maret 2026', date: 'Dasarian III Maret 2026', cover: 'https://via.placeholder.com/400x200/0ea5e9/ffffff?text=Maret+III', description: '' },
    ],
  },
  'analisis-bulanan': {
    hero: {
      title: 'Analisis Iklim Bulanan Maret 2026',
      date: 'Maret 2026',
      cover: 'https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Analisis+Bulanan',
      description: 'Analisis kondisi cuaca dan iklim bulanan termasuk anomali suhu, curah hujan, dan parameter iklim lainnya.',
    },
    list: [
      { title: 'Analisis Iklim Bulanan Februari 2026', date: 'Februari 2026', cover: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Februari+2026', description: '' },
      { title: 'Analisis Iklim Bulanan Januari 2026', date: 'Januari 2026', cover: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Januari+2026', description: '' },
      { title: 'Analisis Iklim Bulanan Desember 2025', date: 'Desember 2025', cover: 'https://via.placeholder.com/400x200/8b5cf6/ffffff?text=Desember+2025', description: '' },
    ],
  },
  'analisis-dasarian': {
    hero: {
      title: 'Analisis Curah Hujan Dasarian III Maret 2026',
      date: 'Dasarian III Maret 2026',
      cover: 'https://via.placeholder.com/800x400/06b6d4/ffffff?text=Analisis+Dasarian',
      description: 'Analisis curah hujan per dasarian dibandingkan dengan rata-rata normal 30 tahun terakhir.',
    },
    list: [
      { title: 'Analisis Dasarian II Maret 2026', date: 'Dasarian II Maret 2026', cover: 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Dasarian+II', description: '' },
      { title: 'Analisis Dasarian I Maret 2026', date: 'Dasarian I Maret 2026', cover: 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Dasarian+I', description: '' },
    ],
  },
  'hth-spi': {
    hero: {
      title: 'Monitoring HTH & SPI April 2026',
      date: 'April 2026',
      cover: 'https://via.placeholder.com/800x400/f59e0b/ffffff?text=HTH+dan+SPI',
      description: 'Hari Tanpa Hujan (HTH) berturut-turut dan Standardized Precipitation Index (SPI) untuk monitoring kekeringan meteorologis.',
    },
    list: [
      { title: 'HTH & SPI Maret 2026', date: 'Maret 2026', cover: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Maret+2026', description: '' },
      { title: 'HTH & SPI Februari 2026', date: 'Februari 2026', cover: 'https://via.placeholder.com/400x200/f59e0b/ffffff?text=Februari+2026', description: '' },
    ],
  },
  'kaleidoskop': {
    hero: {
      title: 'Kaleidoskop Iklim Maret 2026',
      date: 'Maret 2026',
      cover: 'https://via.placeholder.com/800x400/ec4899/ffffff?text=Kaleidoskop+Bulanan',
      description: 'Ringkasan peristiwa cuaca dan iklim penting setiap bulan di wilayah Maluku Utara.',
    },
    list: [
      { title: 'Kaleidoskop Iklim Februari 2026', date: 'Februari 2026', cover: 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Februari+2026', description: '' },
      { title: 'Kaleidoskop Iklim Januari 2026', date: 'Januari 2026', cover: 'https://via.placeholder.com/400x200/ec4899/ffffff?text=Januari+2026', description: '' },
    ],
  },
};

const iklimTabs = [
  { id: 'statistik', label: 'Statistik Iklim' },
  { id: 'prakiraan-bulanan', label: 'Prakiraan Hujan Bulanan' },
  { id: 'prakiraan-dasarian', label: 'Prakiraan Hujan Dasarian' },
  { id: 'analisis-bulanan', label: 'Analisis Bulanan' },
  { id: 'analisis-dasarian', label: 'Analisis Dasarian' },
  { id: 'hth-spi', label: 'HTH dan SPI' },
  { id: 'kaleidoskop', label: 'Kaleidoskop Bulanan' },
];

function BuletinHeroList({ data }: { data: { hero: BuletinItem; list: BuletinItem[] } }) {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative h-[220px] md:h-[300px] overflow-hidden">
          <img src={data.hero.cover} alt={data.hero.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3 h-3" /> {data.hero.date}
            </span>
            <h3 className="text-xl md:text-2xl font-bold leading-tight">{data.hero.title}</h3>
          </div>
        </div>
        {data.hero.description && (
          <div className="p-5">
            <p className="text-sm text-slate-600 leading-relaxed">{data.hero.description}</p>
          </div>
        )}
      </div>

      {/* History list */}
      {data.list.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Arsip Sebelumnya
          </h4>
          <div className="space-y-3">
            {data.list.map((item, i) => (
              <div key={i} className="flex gap-4 bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-shadow cursor-pointer group">
                <div className="w-28 h-20 flex-shrink-0 overflow-hidden">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center py-3 pr-4">
                  <span className="text-[10px] text-blue-600 font-bold uppercase mb-1">{item.date}</span>
                  <h5 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Iklim() {
  const [tab, setTab] = useState('statistik');

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Analisis Iklim</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Informasi Iklim</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Data Iklim Historis, Analisis Musiman, dan Proyeksi Tren Iklim Ternate.</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={iklimTabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Kategori Data">
            {tab === 'statistik' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Suhu Rata-rata Tahunan</p>
                    <p className="text-3xl font-bold text-amber-600 mt-2">27.8°C</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Curah Hujan Tahunan</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">3.214 mm</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase">Kelembaban Udara</p>
                    <p className="text-3xl font-bold text-cyan-600 mt-2">82.5%</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-4">Data Iklim Rerata Normal (1991-2020)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="text-left px-4 py-2 font-bold text-slate-700">Bulan</th>
                          <th className="text-center px-2 py-2 font-bold text-slate-700">Suhu (°C)</th>
                          <th className="text-center px-2 py-2 font-bold text-slate-700">Hujan (mm)</th>
                          <th className="text-center px-2 py-2 font-bold text-slate-700">Kelembaban (%)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {klimatData.map(row => (
                          <tr key={row.bulan} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium">{row.bulan}</td>
                            <td className="text-center px-2">{row.suhu}</td>
                            <td className="text-center px-2">{row.hujan}</td>
                            <td className="text-center px-2">{row.lembap}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {tab !== 'statistik' && buletinData[tab] && (
              <BuletinHeroList data={buletinData[tab]} />
            )}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}
