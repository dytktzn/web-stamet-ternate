import { useState } from "react";
import { Cloud, Thermometer, Wind, Eye, Gauge } from "lucide-react";
import { useEffect } from "react";
import { fetchAviationWeather, fetchMetarData } from "@/lib/api";
import SidePanelLayout from "@/components/SidePanelLayout";

const aviationTabs = [
  { id: 'current', label: 'Cuaca Saat Ini', icon: <Cloud className="w-4 h-4" /> },
  { id: 'metar', label: 'Data METAR', icon: <Gauge className="w-4 h-4" /> },
  { id: 'info', label: 'Info Stasiun', icon: <Eye className="w-4 h-4" /> },
];

export default function CuacaPenerbangan() {
  const [tab, setTab] = useState("current");
  const [weather, setWeather] = useState<any>(null);
  const [metarList, setMetarList] = useState<any[]>([]);
  const [metarLoaded, setMetarLoaded] = useState(false);

  useEffect(() => {
    fetchAviationWeather().then(data => {
      if (data?.length > 0) setWeather(data[0]);
    }).catch(console.error);
  }, []);

  const loadMetar = async () => {
    if (metarLoaded) return;
    try {
      const data = await fetchMetarData();
      if (data.WAEE) setMetarList(data.WAEE);
      setMetarLoaded(true);
    } catch (e) { console.error(e); }
  };

  const switchTab = (t: string) => {
    setTab(t);
    if (t === 'metar') loadMetar();
  };

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Aviation Weather</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Cuaca Penerbangan</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Data METAR real-time dan informasi cuaca untuk operasional penerbangan di Bandara Ternate.</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={aviationTabs} activeTab={tab} onTabChange={switchTab} sidebarTitle="Kategori">
            {tab === 'current' && weather && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Kondisi Terkini - WAEE</h2>
                  <span className="text-xs text-slate-500">
                    Update: {new Date(weather.observed_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <AviationCard icon={<Thermometer />} label="Suhu Udara" value={`${weather.temp}°C`} />
                  <AviationCard icon={<Thermometer />} label="Dew Point" value={`${weather.dew_point}°C`} />
                  <AviationCard icon={<Wind />} label="Kecepatan Angin" value={`${weather.wind_speed} kt`} sub={`Arah: ${weather.wind_direction}`} />
                  <AviationCard icon={<Eye />} label="Visibilitas" value={`${weather.visibility} km`} />
                  <AviationCard icon={<Gauge />} label="Tekanan Udara" value={`${weather.pressure} mb`} />
                  <AviationCard icon={<Cloud />} label="Cuaca" value={weather.weather} />
                </div>
              </div>
            )}

            {tab === 'metar' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Data METAR Terbaru - WAEE</h2>
                {metarList.length === 0 ? (
                  <div className="text-center py-8"><div className="loader mx-auto" /></div>
                ) : metarList.map((metar, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-600">METAR Report #{i + 1}</p>
                        <p className="text-xs text-slate-500">{new Date(metar.observed_time).toLocaleString('id-ID')}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">{metar.type_code}</span>
                    </div>
                    <div className="bg-slate-50 rounded border border-slate-200 p-3">
                      <p className="font-mono text-xs text-slate-900 break-words">{metar.data_text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'info' && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Informasi Stasiun</h2>
                {[
                  ['Kode ICAO', 'WAEE'],
                  ['Lokasi', 'Ternate, Provinsi Maluku Utara'],
                  ['Koordinat', '0.8328°N, 127.3797°E'],
                  ['Elevasi', '15 m'],
                  ['Zona Waktu', 'WIT (UTC+9)'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-start border-b border-slate-100 pb-3">
                    <span className="text-slate-600 font-semibold">{label}</span>
                    <span className="text-slate-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}

function AviationCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="flex items-center gap-2 mb-2 text-blue-600">{icon}<span className="text-xs font-bold text-slate-500 uppercase">{label}</span></div>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}
