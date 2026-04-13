import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import IframeFallback from "@/components/IframeFallback";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Wind, Droplets, CloudRain, Eye, Clock, AlertTriangle, ShieldCheck, ArrowRight, MapPin, Search, X, Activity, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { fetchWeatherData, fetchRealtimeWeather, fetchRegionData, fetchBloggerNews, fetchBloggerPost, fetchGempaAuto, processRegions, parseTime, DEFAULT_LOCATION_ID } from "@/lib/api";

export default function Beranda() {
  const [weather, setWeather] = useState<any>(null);
  const [currentData, setCurrentData] = useState<any>(null);
  const [hourlyList, setHourlyList] = useState<any[]>([]);
  const [locationName, setLocationName] = useState("Memuat...");
  const [updateTime, setUpdateTime] = useState("Memperbarui...");
  const [alertImages, setAlertImages] = useState<{ img1: string; img2: string } | null>(null);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [news, setNews] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [regionTree, setRegionTree] = useState<any[]>([]);
  const [flatRegions, setFlatRegions] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [newsModal, setNewsModal] = useState<any>(null);
  const [newsModalLoading, setNewsModalLoading] = useState(false);

  const loadWeather = useCallback(async (admCode: string) => {
    try {
      const result = await fetchWeatherData(admCode);
      if (!result.data?.[0]) return;
      const weatherData = result.data[0];
      const cuacaList = weatherData.cuaca.flat();
      const lat = parseFloat(weatherData.lokasi.lat);
      const lon = parseFloat(weatherData.lokasi.lon);
      const correctTimezone = result.lokasi?.timezone || 'Asia/Jakarta';

      setLocationName(`${weatherData.lokasi.desa}, ${weatherData.lokasi.kecamatan}`);

      let cd = cuacaList[0];
      let finalTime = cd.local_datetime;

      try {
        const jsonRealtime = await fetchRealtimeWeather(lat, lon);
        if (jsonRealtime.status === 200 && jsonRealtime.data?.cuaca) {
          cd = jsonRealtime.data.cuaca;
          if (cd.datetime) {
            const utcDate = new Date(cd.datetime);
            finalTime = utcDate.toLocaleString('sv-SE', {
              timeZone: correctTimezone,
              year: 'numeric', month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit', second: '2-digit',
              hour12: false
            });
          }
        }
      } catch {}

      const rainForecast = parseFloat(cuacaList[0].tp) || 0;
      const rainRealtime = parseFloat(cd.tp) || 0;
      cd.rainVal = rainRealtime === 0 ? rainForecast : rainRealtime;

      setCurrentData(cd);
      setUpdateTime(`Pemutakhiran: ${finalTime} (Waktu Setempat)`);
      setHourlyList(cuacaList);
    } catch (err) {
      console.error(err);
      setLocationName("Gagal memuat data");
    }
  }, []);

  const loadAlerts = useCallback(async () => {
    try {
      const now = new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, '0');
      const d = String(now.getDate()).padStart(2, '0');
      const base = `https://nowcasting.bmkg.go.id/infografis/CMU/${y}/${m}/${d}`;
      const img1 = `${base}/infografis.jpg`;
      const img2 = `${base}/infografis_text.jpg`;

      const res = await fetch(img1, { method: 'HEAD', mode: 'no-cors' });
      // With no-cors we get opaque response (status 0) if image exists
      // Try loading via an Image element instead
      await new Promise<void>((resolve, reject) => {
        const img = new window.Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = img1;
      });
      setAlertImages({ img1, img2 });
    } catch {
      setAlertImages(null);
    } finally {
      setAlertsLoading(false);
    }
  }, []);

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('id-ID', options));

    loadWeather(DEFAULT_LOCATION_ID);
    loadAlerts();

    fetchRegionData().then(tree => {
      setRegionTree(tree);
      setFlatRegions(processRegions(tree));
    }).catch(() => {});

    fetchBloggerNews().then(data => {
      if (data.items) setNews(data.items.slice(0, 5));
    }).catch(() => {});

    const interval = setInterval(() => {
      loadWeather(DEFAULT_LOCATION_ID);
      loadAlerts();
    }, 300000);
    return () => clearInterval(interval);
  }, [loadWeather, loadAlerts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) { setShowResults(false); return; }
    const filtered = flatRegions.filter(r => r.name.toLowerCase().includes(query.toLowerCase())).slice(0, 30);
    setSearchResults(filtered);
    setShowResults(true);
  };

  const selectLocation = (item: any) => {
    if (item.type === 'Desa/Kel') {
      setSearchQuery(item.name);
      setShowResults(false);
      loadWeather(item.id);
    }
  };

  const parsePostThumb = (content: string) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const img = div.querySelector('img');
    return img ? img.src : 'https://via.placeholder.com/800x500?text=BMKG+Babullah';
  };

  const openNewsDetail = async (postId: string) => {
    setNewsModal({ loading: true });
    setNewsModalLoading(true);
    try {
      const post = await fetchBloggerPost(postId);
      const formattedDate = new Date(post.published).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      setNewsModal({
        title: post.title,
        author: post.author?.displayName || 'Admin',
        date: formattedDate,
        content: post.content,
      });
    } catch {
      setNewsModal({
        title: "Terjadi Kesalahan",
        content: "<p class='text-center text-red-500'>Gagal memuat berita.</p>",
      });
    } finally {
      setNewsModalLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Hero Weather Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-8 relative">
            <div className="flex items-center gap-3 mb-4">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{currentDate}</p>
                <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {locationName}
                </h2>
              </div>
            </div>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari lokasi (ketik nama desa)..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              {showResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto">
                  {searchResults.length > 0 ? searchResults.map(item => (
                    <button key={item.id} onClick={() => selectLocation(item)}
                      className="w-full text-left px-5 py-3 border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors">
                      <p className="text-sm font-bold text-slate-800">{item.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{item.path} · {item.type}</p>
                    </button>
                  )) : (
                    <div className="px-5 py-4 text-center text-sm text-slate-500">Lokasi tidak ditemukan.</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Weather Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Main Weather Card */}
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-4">
                  <div className="text-sm text-slate-500 font-medium">{updateTime}</div>
                  <div className="text-8xl font-black text-slate-900 leading-none">
                    {currentData ? `${currentData.t}°` : '--°'}
                  </div>
                  <div className="text-2xl font-semibold text-slate-700">
                    {currentData?.weather_desc || 'Memuat...'}
                  </div>
                  <div className="grid grid-cols-2 lg:flex gap-4 lg:gap-6 pt-4">
                    <WeatherStat icon={<Wind className="w-5 h-5" />} label="Angin" value={currentData ? `${currentData.ws} km/j` : '--'} />
                    <WeatherStat icon={<Droplets className="w-5 h-5" />} label="Lembap" value={currentData ? `${currentData.hu}%` : '--'} />
                    <WeatherStat icon={<CloudRain className="w-5 h-5" />} label="Hujan" value={currentData ? `${currentData.rainVal} mm` : '--'} />
                    <WeatherStat icon={<Eye className="w-5 h-5" />} label="Jarak Pandang" value={currentData?.vs_text || '--'} />
                  </div>
                </div>
                {currentData?.image && (
                  <div className="relative hidden md:block">
                    <div className="w-56 h-56 bg-blue-100/50 rounded-full blur-3xl absolute inset-0 animate-pulse" />
                    <img src={currentData.image} alt="Cuaca" className="relative w-44 h-44 object-contain drop-shadow-2xl" />
                  </div>
                )}
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="lg:col-span-2 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" /> Prakiraan Tiap 3 Jam
              </h3>
              <div className="space-y-3 h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                {hourlyList.map((item, i) => {
                  const timeLabel = parseTime(item);
                  const dayLabel = new Date(item.local_datetime?.replace(' ', 'T')).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
                  return (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all">
                      <div className="flex flex-col w-16">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{timeLabel}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{dayLabel}</span>
                      </div>
                      <div className="flex flex-1 items-center gap-3 px-2">
                        {item.image && <img src={item.image} className="w-8 h-8" alt="" />}
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{item.weather_desc}</span>
                          {parseFloat(item.tp) > 0 && <span className="text-[10px] text-blue-500 font-bold">{item.tp} mm hujan</span>}
                        </div>
                      </div>
                      <span className="text-base font-black text-blue-900">{item.t}°</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="py-20 px-6 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-slate-900">
                <AlertTriangle className="text-orange-500 w-8 h-8" /> Peringatan Dini Cuaca Ekstrem
              </h2>
              <div className="space-y-4">
                {alertsLoading ? (
                  <div className="p-4 text-center text-slate-500 text-sm">Memuat peringatan...</div>
                ) : !alertImages ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-green-50/50 rounded-3xl border border-green-100 text-center shadow-sm">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold text-green-900 tracking-tight">Kondisi Aman</h4>
                    <p className="text-sm text-green-700/80 mt-1 mb-4 leading-relaxed">
                      Saat ini tidak ada peringatan dini cuaca ekstrem yang terdeteksi.
                    </p>
                    <Link to="/cuaca-publik?tab=peringatan" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-green-200 rounded-full text-xs font-bold text-green-700 hover:bg-green-50 transition-colors shadow-sm">
                      Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Carousel className="w-full">
                      <CarouselContent>
                        <CarouselItem>
                          <img src={alertImages.img1} alt="Infografis Peringatan Cuaca" className="w-full rounded-2xl border border-slate-200 shadow-sm object-contain bg-white" />
                        </CarouselItem>
                        <CarouselItem>
                          <img src={alertImages.img2} alt="Teks Peringatan Cuaca" className="w-full rounded-2xl border border-slate-200 shadow-sm object-contain bg-white" onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')} />
                        </CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious className="-left-4" />
                      <CarouselNext className="-right-4" />
                    </Carousel>
                    <div className="text-center">
                      <Link to="/cuaca-publik?tab=peringatan" className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                        Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <GempaTerkiniCard />
          </div>
        </div>
      </section>

      {/* Visualisasi Cuaca dan Iklim */}
      <VisualisasiCuacaSection />

      {/* News Section */}
      {news.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Berita & Informasi Terkini</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hero News */}
              <div className="group cursor-pointer" onClick={() => openNewsDetail(news[0].id)}>
                <div className="relative h-[300px] md:h-[400px] overflow-hidden rounded-[2rem] shadow-md">
                  <img src={parsePostThumb(news[0].content)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="px-3 py-1 bg-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 inline-block">Terbaru</span>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">{news[0].title}</h3>
                  </div>
                </div>
              </div>
              {/* List */}
              <div className="space-y-4">
                {news.slice(1).map((post, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer border-b border-slate-100 pb-4 last:border-0" onClick={() => openNewsDetail(post.id)}>
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl">
                      <img src={parsePostThumb(post.content)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] text-blue-600 font-bold uppercase mb-1">
                        {new Date(post.published).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <h4 className="text-sm md:text-base font-bold text-slate-800 line-clamp-2 group-hover:text-blue-600 transition-colors">{post.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Flight Weather Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Cuaca Bandara</h2>
              <p className="text-slate-500 mt-2 font-medium">Cuaca terkini dan prakiraan</p>
            </div>
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Widis Stream
            </span>
          </div>
          <div className="bg-white rounded-[32px] shadow-md border border-slate-200 overflow-hidden">
            <div className="px-5 md:px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Live Departure Board</h2>
                <p className="text-xs text-slate-500 font-medium">Sultan Babullah Ternate (WAEE)</p>
              </div>
            </div>
            <div className="relative w-full aspect-video bg-slate-900">
              <IframeFallback
                src="https://widis.bmkg.go.id/g/ternate-departure"
                className="absolute inset-0 w-full h-full border-0"
                title="Live WIDIS Departure Ternate"
              />
            </div>
            <div className="p-5 md:p-8 bg-slate-50/50 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="https://web-aviation.bmkg.go.id/maps/WAEE" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all shadow-md">
                <div>
                  <span className="text-sm md:text-base font-bold">Metar / Speci / TAF</span>
                  <span className="block text-[10px] md:text-xs text-blue-200">Lihat Peta Cuaca Penerbangan</span>
                </div>
              </a>
              <a href="https://www.bmkg.go.id/cuaca/bandara/WAEE" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl transition-all shadow-sm">
                <div>
                  <span className="text-sm md:text-base font-bold">Cuaca Bandara</span>
                  <span className="block text-[10px] md:text-xs text-slate-500">Info BMKG Resmi Stasiun Babullah</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* News Detail Modal */}
      {newsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setNewsModal(null)}>
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
              <h3 className="font-bold text-slate-900 text-sm">Detail Berita</h3>
              <button onClick={() => setNewsModal(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 md:p-8">
              {newsModalLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-48 bg-slate-200 rounded-2xl w-full mt-6" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
              ) : (
                <>
                  <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">{newsModal.title}</h2>
                  {newsModal.author && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase shadow-sm">
                        {newsModal.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{newsModal.author}</p>
                        <p className="text-xs text-slate-500">{newsModal.date}</p>
                      </div>
                    </div>
                  )}
                  <div 
                    className="prose prose-slate max-w-none prose-img:rounded-2xl prose-img:shadow-md"
                    dangerouslySetInnerHTML={{ __html: newsModal.content || '' }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GempaTerkiniCard() {
  const [gempa, setGempa] = useState<any>(null);
  useEffect(() => {
    fetchGempaAuto().then(res => setGempa(res?.Infogempa?.gempa)).catch(() => {});
  }, []);

  const mag = gempa ? parseFloat(gempa.Magnitude) : 0;
  const magColor = mag >= 6 ? 'bg-red-500' : mag >= 5 ? 'bg-orange-500' : 'bg-yellow-500';

  return (
    <div>
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-slate-900">
        <Activity className="text-red-500 w-8 h-8" /> Gempa Bumi Terkini
      </h2>
      {!gempa ? (
        <div className="p-8 text-center text-slate-400 text-sm">Memuat data gempa...</div>
      ) : (
        <Link to="/gempa" className="block">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className={`${magColor} w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-black leading-none">{gempa.Magnitude}</span>
                  <span className="text-[8px] font-bold">MAG</span>
                </div>
                <div>
                  <span className="inline-block bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1 animate-pulse">Terkini</span>
                  <h4 className="text-lg font-bold leading-tight">{gempa.Wilayah}</h4>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Waktu</p>
                  <p className="font-semibold">{gempa.Tanggal}, {gempa.Jam}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Kedalaman</p>
                  <p className="font-semibold">{gempa.Kedalaman}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Koordinat</p>
                  <p className="font-semibold font-mono text-xs">{gempa.Coordinates}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase">Potensi</p>
                  <p className="font-semibold text-xs">{gempa.Potensi || '-'}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Sumber: BMKG</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-300 hover:text-blue-200">
                  Lihat Selengkapnya <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

function WeatherStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">{icon}</div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-500">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

const VISUALISASI_ITEMS = [
  {
    title: "Citra Satelit",
    caption: "Citra satelit cuaca Himawari-9 IR Enhanced",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/cuaca/satelit/H08_EH_Indonesia.png",
    full: "https://dataweb.bmkg.go.id/cuaca/satelit/H08_EH_Indonesia.png",
  },
  {
    title: "Prakiraan Tinggi Gelombang",
    caption: "Prakiraan tinggi gelombang di perairan Indonesia",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/maritim/gelombang-maritim.png",
    full: "https://dataweb.bmkg.go.id/maritim/gelombang-maritim.png",
  },
  {
    title: "Prakiraan Angin",
    caption: "Prakiraan angin lapisan 3000 kaki di Indonesia",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/cuaca/angin/streamline-d10.jpg",
    full: "https://dataweb.bmkg.go.id/cuaca/angin/streamline-d10.jpg",
  },
  {
    title: "Prediksi Hujan",
    caption: "Prediksi hujan bulanan di wilayah Indonesia",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/iklim/prediksi-hujan-bulanan/pch_bln_det_step2.png",
    full: "https://dataweb.bmkg.go.id/iklim/prediksi-hujan-bulanan/pch_bln_det_step2.png",
  },
  {
    title: "Hari Tanpa Hujan",
    caption: "Jumlah hari berturut-turut tanpa hujan di Indonesia",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/iklim/hari-tanpa-hujan.png",
    full: "https://dataweb.bmkg.go.id/iklim/hari-tanpa-hujan.png",
  },
  {
    title: "Potensi Kebakaran Hutan",
    caption: "Potensi kebakaran hutan dan lahan di Indonesia",
    thumb: "https://www.bmkg.go.id/cdn-cgi/image/w=600,h=450,f=webp/https://dataweb.bmkg.go.id/cuaca/spartan/36_indonesia_ffmc_01.png",
    full: "https://dataweb.bmkg.go.id/cuaca/spartan/36_indonesia_ffmc_01.png",
  },
];

function VisualisasiCuacaSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const scrollAmount = 360;

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };
  const scrollNext = () => {
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Close lightbox on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Visualisasi Cuaca dan Iklim
            </h2>
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button onClick={scrollPrev} aria-label="Sebelumnya" className="size-10 bg-white flex justify-center items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} aria-label="Selanjutnya" className="size-10 bg-white flex justify-center items-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`.visualisasi-scroll::-webkit-scrollbar { display: none; }`}</style>
            {VISUALISASI_ITEMS.map((item, i) => (
              <div key={i} className="snap-start min-w-[280px] md:min-w-[340px] flex-shrink-0 group">
                <div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 cursor-pointer"
                  onClick={() => setLightboxSrc(item.full)}
                >
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 size-10 bg-slate-900/40 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 lg:p-10 animate-in fade-in duration-200"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 size-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={lightboxSrc}
            alt="Preview"
            className="relative max-w-full max-h-full rounded-lg shadow-2xl object-contain z-0"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
