import { useState, useEffect, useRef } from "react";
import { Activity, Calendar, MapPin, Rss } from "lucide-react";
import { fetchGempaAuto, fetchGempaDirasakan, fetchGempaTerkini } from "@/lib/api";

export default function GempaBumi() {
  const [gempa, setGempa] = useState<any>(null);
  const [dirasakan, setDirasakan] = useState<any[]>([]);
  const [besar, setBesar] = useState<any[]>([]);
  const [tab, setTab] = useState<'peta' | 'shakemap'>('peta');
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [auto, felt, big] = await Promise.all([
          fetchGempaAuto(),
          fetchGempaDirasakan(),
          fetchGempaTerkini(),
        ]);
        const g = auto.Infogempa.gempa;
        setGempa(g);
        setDirasakan(felt.Infogempa.gempa.slice(0, 15));
        setBesar(big.Infogempa.gempa.slice(0, 15));

        // Init map
        if (mapRef.current && !mapInstanceRef.current) {
          const L = await import('leaflet');
          await import('leaflet/dist/leaflet.css');
          const map = L.map(mapRef.current).setView([-2, 118], 5);
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap &copy; CARTO'
          }).addTo(map);
          mapInstanceRef.current = map;

          if (g.Coordinates) {
            const [lat, lon] = g.Coordinates.split(',').map(Number);
            const customIcon = L.divIcon({
              className: 'css-icon',
              html: '<div class="quake-ring"></div><div style="background-color: #ef4444; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>',
              iconSize: [20, 20], iconAnchor: [10, 10]
            });
            L.marker([lat, lon], { icon: customIcon }).addTo(map);
            map.setView([lat, lon], 7);
          }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    load();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Invalidate map size when switching back to peta tab
  useEffect(() => {
    if (tab === 'peta' && mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 100);
    }
  }, [tab]);

  const renderGempaItem = (g: any, type: string) => {
    const mag = parseFloat(g.Magnitude);
    const magColor = mag >= 6 ? 'bg-red-500' : mag >= 5 ? 'bg-orange-500' : 'bg-yellow-500';
    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-md transition-all flex gap-4 items-start">
        <div className={`${magColor} text-white w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 shadow-sm`}>
          <span className="text-lg font-black leading-none">{g.Magnitude}</span>
          <span className="text-[8px] font-bold">MAG</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="text-sm font-bold text-slate-800 leading-tight">{g.Wilayah}</h4>
            <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap ml-2">{g.Jam}</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">{g.Tanggal}</p>
          <div className="flex flex-wrap gap-2">
            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold border border-slate-200">Kedalaman: {g.Kedalaman}</span>
            {type === 'dirasakan' && g.Dirasakan && (
              <span className="text-[10px] bg-orange-50 px-2 py-0.5 rounded text-orange-700 font-bold border border-orange-100">
                {g.Dirasakan.substring(0, 50)}{g.Dirasakan.length > 50 ? '...' : ''}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Earthquake Information</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Informasi Gempa Bumi & Tsunami</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Pantauan terkini aktivitas seismik di seluruh wilayah Indonesia.</p>
        </div>
      </section>

      {/* Hero Gempa */}
      <section className="py-10 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-lg border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                  <span className="inline-block bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-6 animate-pulse">Gempa Terkini</span>
                  <div className="flex items-end gap-2 mb-2">
                    <h2 className="text-7xl font-black tracking-tighter">{gempa?.Magnitude || '--'}</h2>
                    <span className="text-xl font-bold text-slate-400 mb-4">M</span>
                  </div>
                  <div className="space-y-6 mt-4">
                    <InfoRow icon={<Calendar className="w-5 h-5 text-blue-300" />} label="Waktu Gempa" value={gempa ? `${gempa.Tanggal}, ${gempa.Jam}` : '--'} />
                    <InfoRow icon={<MapPin className="w-5 h-5 text-orange-300" />} label="Lokasi Pusat" value={gempa?.Wilayah || '--'} sub={gempa?.Coordinates} />
                    <InfoRow icon={<Activity className="w-5 h-5 text-green-300" />} label="Kedalaman" value={gempa?.Kedalaman || '--'} />
                    {gempa?.Potensi && <p className="text-sm font-medium text-blue-200 italic mt-6 pt-6 border-t border-white/10">{gempa.Potensi}</p>}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 p-4 bg-slate-100 flex flex-col">
                <div className="flex gap-2 mb-4 px-2">
                  <button onClick={() => setTab('peta')} className={`px-4 py-2 rounded-xl text-sm font-bold ${tab === 'peta' ? 'bg-white shadow-sm text-slate-900 ring-1 ring-slate-200' : 'bg-slate-200 text-slate-600'}`}>Peta Lokasi</button>
                  <button onClick={() => setTab('shakemap')} className={`px-4 py-2 rounded-xl text-sm font-bold ${tab === 'shakemap' ? 'bg-white shadow-sm text-slate-900 ring-1 ring-slate-200' : 'bg-slate-200 text-slate-600'}`}>Shakemap</button>
                </div>
                <div className="flex-1 bg-white rounded-3xl border border-slate-200 overflow-hidden relative min-h-[400px]">
                  {/* Map - always rendered but hidden when not active to preserve instance */}
                  <div
                    ref={mapRef}
                    className="w-full h-full min-h-[400px] absolute inset-0"
                    style={{ borderRadius: '24px', display: tab === 'peta' ? 'block' : 'none' }}
                  />
                  {/* Shakemap - only shown when tab is shakemap, rendered above map */}
                  {tab === 'shakemap' && (
                    <div className="w-full h-full flex items-center justify-center p-4 absolute inset-0 bg-white z-10">
                      {gempa?.Shakemap ? (
                        <img src={`https://static.bmkg.go.id/${gempa.Shakemap}`} alt="Shakemap" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-sm text-slate-400">Shakemap belum tersedia</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lists */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Rss className="text-orange-500" /> Gempa Dirasakan</h3>
              <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-md">15 Terakhir</span>
            </div>
            <div className="space-y-4">
              {loading ? <div className="text-center py-8"><div className="loader mx-auto" /></div> :
                dirasakan.map((g, i) => <div key={i}>{renderGempaItem(g, 'dirasakan')}</div>)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Activity className="text-red-500" /> Gempa M 5.0+</h3>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-md">15 Terakhir</span>
            </div>
            <div className="space-y-4">
              {loading ? <div className="text-center py-8"><div className="loader mx-auto" /></div> :
                besar.map((g, i) => <div key={i}>{renderGempaItem(g, 'besar')}</div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">{label}</p>
        <p className="text-lg font-bold leading-tight">{value}</p>
        {sub && <p className="text-sm text-slate-400 mt-1 font-mono">{sub}</p>}
      </div>
    </div>
  );
}
