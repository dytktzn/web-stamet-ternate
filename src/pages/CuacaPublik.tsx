import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Loader2, CloudRain, AlertTriangle, Monitor, FileText, Download, Image, ChevronLeft, ChevronRight, Maximize2, Minimize2, ExternalLink, AlertCircle } from "lucide-react";
import { fetchPublicSearch, fetchWeatherData, fetchRealtimeWeather, parseToUTC, fetchAlertRSS, fetchAlertDetail, formatTglBMKG, PROXY_BASE, DEFAULT_LOCATION_ID } from "@/lib/api";
import IframeFallback from "@/components/IframeFallback";
import SidePanelLayout from "@/components/SidePanelLayout";

const cuacaTabs = [
  { id: 'prakiraan', label: 'Prakiraan Cuaca Kelurahan', icon: <CloudRain className="w-4 h-4" /> },
  { id: 'peringatan', label: 'Peringatan Dini Cuaca Ekstreme', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'dwt', label: 'Digital Weather for Traffic', icon: <Monitor className="w-4 h-4" /> },
];

export default function CuacaPublik() {
  const [searchParams] = useSearchParams();
  const initialTab = cuacaTabs.find(t => t.id === searchParams.get('tab'))?.id || 'prakiraan';
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t && cuacaTabs.find(x => x.id === t)) setTab(t);
  }, [searchParams]);

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Public Weather</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Prakiraan Cuaca Publik</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Informasi prakiraan cuaca, peringatan dini, dan cuaca lalu lintas.</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={cuacaTabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Kategori">
            {tab === 'prakiraan' && <PrakiraanTab />}
            {tab === 'peringatan' && <PeringatanTab />}
            {tab === 'dwt' && <DWTTab />}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}

/* ====== Prakiraan Cuaca Kelurahan ====== */
function PrakiraanTab() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const [weatherDisplay, setWeatherDisplay] = useState<any>(null);
  const [weatherGroups, setWeatherGroups] = useState<Record<string, any[]>>({});
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  let debounceTimer: any;

  // Auto-load default location
  useEffect(() => {
    loadByAdm4(DEFAULT_LOCATION_ID);
  }, []);

  const loadByAdm4 = async (admCode: string) => {
    setLoading(true);
    try {
      const json = await fetchWeatherData(admCode);
      const data = json.data[0];
      const weatherList = data.cuaca.flat();
      const lat = parseFloat(data.lokasi.lat);
      const lon = parseFloat(data.lokasi.lon);

      let cd = weatherList[0];
      try {
        const rt = await fetchRealtimeWeather(lat, lon);
        if (rt.status === 200 && rt.data?.cuaca) cd = rt.data.cuaca;
      } catch {}

      setLocationInfo(data.lokasi);
      setWeatherDisplay(cd);
      setQuery(`${data.lokasi.desa}, ${data.lokasi.kotkab}`);

      const cutoff = parseToUTC(cd.datetime || cd.utc_datetime || weatherList[0].utc_datetime);
      const active = weatherList.filter((item: any) => {
        if (!item.utc_datetime) return true;
        return parseToUTC(item.utc_datetime).getTime() >= cutoff.getTime();
      });

      const groups: Record<string, any[]> = {};
      active.forEach((item: any) => {
        const key = item.local_datetime.split(' ')[0];
        if (!groups[key]) groups[key] = [];
        groups[key].push(item);
      });
      setWeatherGroups(groups);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleSearch = (keyword: string) => {
    setQuery(keyword);
    if (keyword.length < 3) { setShowResults(false); return; }
    setSearching(true);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      try {
        const data = await fetchPublicSearch(keyword);
        setResults(data || []);
        setShowResults(true);
      } catch { setShowResults(false); }
      finally { setSearching(false); }
    }, 500);
  };

  const selectLocation = (item: any) => {
    setQuery(`${item.desa}, ${item.kotkab}`);
    setShowResults(false);
    loadByAdm4(item.adm4);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        {searching && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />}
        <input
          type="text" value={query} onChange={e => handleSearch(e.target.value)}
          placeholder="Ketik nama desa/kelurahan (min. 3 huruf)..."
          className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
            {results.length > 0 ? results.map((item: any, i: number) => (
              <button key={i} onClick={() => selectLocation(item)}
                className="w-full text-left px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-100 last:border-none transition-colors">
                <p className="font-bold text-slate-800 text-sm">{item.desa}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.kecamatan}, {item.kotkab}, {item.provinsi}</p>
              </button>
            )) : (
              <div className="p-4 text-slate-500 text-sm">Lokasi tidak ditemukan.</div>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="loader mx-auto mb-4" />
          <p className="text-slate-500">Memuat data cuaca...</p>
        </div>
      )}

      {weatherDisplay && locationInfo && !loading && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-[2rem] p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {weatherDisplay.image && <img src={weatherDisplay.image} alt="" className="w-24 h-24 drop-shadow-xl" />}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-bold">{locationInfo.desa}</h3>
                <p className="text-slate-400 text-sm">{locationInfo.kecamatan}, {locationInfo.kotkab}, {locationInfo.provinsi}</p>
                <div className="flex items-end gap-2 mt-4">
                  <span className="text-6xl font-black">{weatherDisplay.t}°</span>
                </div>
                <p className="text-xl font-semibold mt-1">{weatherDisplay.weather_desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Angin" value={`${weatherDisplay.ws} km/j`} />
                <StatBox label="Lembap" value={`${weatherDisplay.hu}%`} />
                <StatBox label="Jarak" value={weatherDisplay.vs_text || '--'} />
                <StatBox label="Hujan" value={`${weatherDisplay.tp || 0} mm`} />
              </div>
            </div>
          </div>

          {Object.entries(weatherGroups).map(([dateKey, items], index) => {
            const dateObj = new Date(dateKey);
            const dayLabel = dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
            const badges = ['HARI INI', 'BESOK', 'LUSA'];
            return (
              <div key={dateKey} className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center mb-6 px-2">
                  <h3 className="font-bold text-slate-800 text-xl">{dayLabel}</h3>
                  {index < 3 && (
                    <span className={`ml-3 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm ${index === 0 ? 'bg-blue-600' : index === 1 ? 'bg-emerald-500' : 'bg-purple-500'}`}>
                      {badges[index]}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                  {(items as any[]).map((item: any, j: number) => {
                    const time = new Date(item.local_datetime.replace(' ', 'T'));
                    const jam = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                    return (
                      <div key={j} className="snap-start flex-shrink-0 min-w-[120px] bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center hover:shadow-md transition-all">
                        <span className="text-xs font-bold text-slate-400">{jam}</span>
                        {item.image && <img src={item.image} className="w-10 h-10 mx-auto my-2" alt="" />}
                        <span className="text-lg font-black text-slate-800 block">{item.t}°</span>
                        <span className="text-[9px] font-bold text-blue-600">{item.weather_desc}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ====== Peringatan Dini ====== */
function PeringatanTab() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const text = await fetchAlertRSS();
      const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
      const items = xmlDoc.querySelectorAll("item");
      const list: any[] = [];
      items.forEach(item => {
        list.push({
          title: item.querySelector("title")?.textContent || "",
          link: item.querySelector("link")?.textContent || "",
          date: item.querySelector("pubDate")?.textContent || "",
          desc: item.querySelector("description")?.textContent || "",
        });
      });
      setAlerts(list);
    } catch { setAlerts([]); }
    finally { setLoading(false); }
  };

  const openDetail = async (link: string) => {
    try {
      const text = await fetchAlertDetail(link);
      const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
      const info = xmlDoc.querySelector("info");
      if (!info) return;

      const webImage = info.querySelector("web")?.textContent || null;
      let img1: string | null = null;
      let img2: string | null = null;
      let zipUrl: string | null = null;
      let dateStr = "Terbaru";

      if (webImage) {
        const dateMatch = webImage.match(/\/(\d{4}\/\d{2}\/\d{2})\//);
        if (dateMatch) dateStr = dateMatch[1].replace(/\//g, '-');
        try {
          const parsed = new URL(webImage);
          if (parsed.protocol === "https:" && parsed.hostname.endsWith("bmkg.go.id")) {
            img1 = webImage;
            img2 = webImage.replace("infografis.jpg", "infografis_text.jpg");
            zipUrl = webImage.replace("infografis.jpg", "download.zip");
          }
        } catch {}
      }

      setModalData({
        event: info.querySelector("event")?.textContent || "-",
        desc: info.querySelector("description")?.textContent || "-",
        areaDesc: info.querySelector("areaDesc")?.textContent || "-",
        severity: info.querySelector("severity")?.textContent || "-",
        effective: formatTglBMKG(info.querySelector("effective")?.textContent || "-"),
        expires: formatTglBMKG(info.querySelector("expires")?.textContent || "-"),
        img1, img2, zipUrl, dateStr,
      });
    } catch (e) { console.error(e); }
  };

  const forceDownload = async (url: string, filename: string) => {
    try {
      const proxyUrl = `${PROXY_BASE}?url=${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch { window.open(url, '_blank'); }
  };

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="text-center py-12"><div className="loader mx-auto mb-4" /><p className="text-slate-500">Memuat data peringatan...</p></div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-16 bg-green-50 rounded-3xl border border-green-200">
          <h3 className="text-2xl font-bold text-green-900 mb-2">Tidak Ada Peringatan</h3>
          <p className="text-green-700">Saat ini tidak ada peringatan dini cuaca ekstrem.</p>
        </div>
      ) : alerts.map((alert, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-l-4 border-l-red-500 border-slate-200 shadow-sm hover:shadow-md transition-all">
          <h3 className="font-bold text-xl text-slate-900 mb-2">{alert.title}</h3>
          <p className="text-xs text-slate-500 mb-4 font-mono uppercase tracking-wider">{alert.date}</p>
          <p className="text-sm text-slate-600 mb-4 leading-relaxed">{alert.desc?.substring(0, 200)}...</p>
          <button onClick={() => openDetail(alert.link)} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Selengkapnya
          </button>
        </div>
      ))}

      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModalData(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Detail Peringatan Cuaca</h3>
            {modalData.img1 && (
              <div className="mb-6 relative bg-slate-50 p-4 rounded-3xl border border-slate-200">
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                    <Image className="w-4 h-4 text-blue-500" /> Peta Infografis
                  </span>
                  <span className="text-[10px] text-white font-bold animate-pulse bg-blue-500 shadow-md shadow-blue-200 px-3 py-1 rounded-full flex items-center gap-1">
                    <ChevronLeft className="w-3 h-3" /> Geser <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 custom-scrollbar pb-2">
                  <div className="relative snap-center w-full flex-shrink-0">
                    <img src={modalData.img1} alt="Peta Spasial" className="w-full rounded-2xl border border-slate-200 shadow-sm object-contain bg-white" />
                    <button onClick={() => forceDownload(modalData.img1, `Peta_Peringatan_BMKG_${modalData.dateStr}.jpg`)}
                      className="absolute top-3 right-3 bg-slate-900/60 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors shadow-lg">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  {modalData.img2 && (
                    <div className="relative snap-center w-full flex-shrink-0">
                      <img src={modalData.img2} alt="Teks Peringatan" className="w-full rounded-2xl border border-slate-200 shadow-sm object-contain bg-white"
                        onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')} />
                      <button onClick={() => forceDownload(modalData.img2, `Teks_Peringatan_BMKG_${modalData.dateStr}.jpg`)}
                        className="absolute top-3 right-3 bg-slate-900/60 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors shadow-lg">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {modalData.zipUrl && (
                  <div className="mt-3 flex justify-center">
                    <button onClick={() => forceDownload(modalData.zipUrl, `Paket_Data_BMKG_${modalData.dateStr}.zip`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md">
                      <Download className="w-4 h-4" /> Unduh Paket Data (.zip)
                    </button>
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div className="col-span-1 md:col-span-2 bg-slate-100 p-4 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Peristiwa</span>
                <p className="font-black text-slate-800">{modalData.event}</p>
              </div>
              <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-2xl">
                <span className="text-[10px] uppercase text-blue-600 font-bold">Wilayah Terdampak</span>
                <p className="font-bold text-blue-900 text-sm leading-relaxed">{modalData.areaDesc}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl">
                <span className="text-[10px] uppercase text-orange-600 font-bold">Status Level</span>
                <p className="font-black text-orange-900">{modalData.severity}</p>
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl">
                <span className="text-[10px] uppercase text-slate-500 font-bold">Masa Berlaku</span>
                <p className="font-bold text-slate-800 text-xs">{modalData.effective} s/d {modalData.expires}</p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm">
              <span className="text-[11px] uppercase text-slate-500 font-black tracking-widest block mb-4">Narasi Peringatan Dini</span>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{modalData.desc}</p>
            </div>
            <button onClick={() => setModalData(null)} className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-colors">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ====== Digital Weather for Traffic ====== */
function DWTTab() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="space-y-4">
      <div className={`${fullscreen ? 'fixed inset-0 z-50 bg-black' : 'relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm'}`}>
        {!fullscreen && (
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Digital Weather for Traffic</h3>
              <p className="text-xs text-slate-500">BMKG Signature - Cuaca Lalu Lintas</p>
            </div>
            <button onClick={() => setFullscreen(true)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors" title="Fullscreen">
              <Maximize2 className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        )}
        {fullscreen && (
          <button onClick={() => setFullscreen(false)} className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
            <Minimize2 className="w-5 h-5 text-slate-700" />
          </button>
        )}
        <IframeFallback
          src="https://signature.bmkg.go.id/dwt/"
          className={`w-full border-0 ${fullscreen ? 'h-full' : 'h-[600px]'}`}
          title="Digital Weather for Traffic"
        />
      </div>
    </div>
  );
}


function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/10 p-3 rounded-2xl border border-white/5">
      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">{label}</span>
      <div className="text-lg font-bold text-white leading-tight">{value}</div>
    </div>
  );
}
