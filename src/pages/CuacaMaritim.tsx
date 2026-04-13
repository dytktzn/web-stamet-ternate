import { useState, useEffect } from "react";
import { Anchor, Waves, Search, ExternalLink } from "lucide-react";
import { fetchMaritimMeta, PROXY_BASE } from "@/lib/api";
import IframeFallback from "@/components/IframeFallback";

// Fallback hardcoded data matching original HTML
const FALLBACK_DATA: Record<string, { name: string; url: string }[]> = {
  pelabuhan: [
    { name: "Pelabuhan Ahmad Yani Ternate", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-ahmad-yani-ternate" },
    { name: "Pelabuhan Bastiong", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-bastiong" },
    { name: "Pelabuhan Sofifi", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-sofifi" },
    { name: "Pelabuhan Rum", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-rum" },
    { name: "Pelabuhan Dufa-Dufa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-dufa-dufa" },
    { name: "Pelabuhan Goto", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-goto" },
    { name: "Pelabuhan Jailolo", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-jailolo" },
    { name: "Pelabuhan Hiri", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-hiri" },
    { name: "Pelabuhan Laigoma", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-laigoma" },
    { name: "Pelabuhan Daruba", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-daruba" },
    { name: "Pelabuhan Sidangoli", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-sidangoli" },
    { name: "Pelabuhan Loloda", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-loloda" },
    { name: "Pelabuhan Dodola", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-dodola" },
    { name: "Pelabuhan Maitara", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-maitara" },
    { name: "Pelabuhan Kupal", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-kupal" },
    { name: "Pelabuhan Kayoa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-kayoa" },
    { name: "Pelabuhan Babang", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-babang" },
    { name: "Pelabuhan Subaim", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-subaim" },
    { name: "Pelabuhan Tobelo", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-tobelo" },
    { name: "Pelabuhan Weda", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-weda" },
    { name: "Pelabuhan Maba", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-maba" },
    { name: "Pelabuhan Patani", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-patani" },
    { name: "Pelabuhan Sanana", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-sanana" },
    { name: "Pelabuhan Mangole", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-mangole" },
    { name: "Pelabuhan Bobong", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-bobong" },
    { name: "Pelabuhan Obi", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-obi" },
    { name: "Pelabuhan Saketa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-saketa" },
    { name: "Pelabuhan Kawasi", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-kawasi" },
    { name: "Pelabuhan Makian", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-makian" },
    { name: "Pelabuhan Mayau", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-mayau" },
    { name: "Pelabuhan Moti", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-moti" },
    { name: "Pelabuhan Dowora", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-dowora" },
    { name: "Pelabuhan Guruapin", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-guruapin" },
    { name: "Pelabuhan Buli", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-buli" },
    { name: "Pelabuhan Gebe", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-gebe" },
    { name: "Pelabuhan Bisui", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-bisui" },
    { name: "Pelabuhan Busua", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-busua" },
    { name: "Pelabuhan Dama", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-dama" },
    { name: "Pelabuhan Falabisahaya", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-falabisahaya" },
    { name: "Pelabuhan Gita", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-gita" },
    { name: "Pelabuhan Indari", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-indari" },
    { name: "Pelabuhan Jojame", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-jojame" },
    { name: "Pelabuhan Laiwui", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-laiwui" },
    { name: "Pelabuhan Loleo", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-loleo" },
    { name: "Pelabuhan Mafa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-mafa" },
    { name: "Pelabuhan Mesa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-mesa" },
    { name: "Pelabuhan Pasipa", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-pasipa" },
    { name: "Pelabuhan Tifure", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-tifure" },
    { name: "Pelabuhan Tikong", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-tikong" },
    { name: "Pelabuhan Tomara", url: "https://maritim.bmkg.go.id/cuaca/pelabuhan/pelabuhan-tomara" },
  ],
  perairan: [],
};

export default function CuacaMaritim() {
  const [category, setCategory] = useState<'pelabuhan' | 'perairan'>('pelabuhan');
  const [data, setData] = useState<Record<string, { name: string; url: string }[]>>(FALLBACK_DATA);
  const [filter, setFilter] = useState("");
  const [activeItem, setActiveItem] = useState<{ name: string; url: string } | null>(FALLBACK_DATA.pelabuhan[0]);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    // Try to fetch from API, use fallback if fails
    fetchMaritimMeta().then(res => {
      const d: Record<string, { name: string; url: string }[]> = {};
      res.categories?.forEach((cat: any) => { d[cat.category_name] = cat.data; });
      if (Object.keys(d).length > 0) {
        setData(d);
        if (d.pelabuhan?.length) setActiveItem(d.pelabuhan[0]);
      }
    }).catch(() => {
      // Use fallback data already set
      console.log("Using fallback maritim data");
    });
  }, []);

  const items = (data[category] || []).filter(i => i.name.toLowerCase().includes(filter.toLowerCase()));

  const handleSelectItem = (item: { name: string; url: string }) => {
    setIframeLoaded(false);
    setActiveItem(item);
  };

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Layanan Informasi</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Prakiraan Cuaca Maritim</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Informasi resmi terkini mengenai kondisi cuaca pelabuhan dan perairan di wilayah Maluku Utara.</p>
        </div>
      </section>

      <section className="py-8 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="bg-slate-100 p-1 rounded-xl flex">
                <button onClick={() => { setCategory('pelabuhan'); if (data.pelabuhan?.length) handleSelectItem(data.pelabuhan[0]); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${category === 'pelabuhan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
                  <Anchor className="w-4 h-4" /> Pelabuhan
                </button>
                <button onClick={() => { setCategory('perairan'); if (data.perairan?.length) handleSelectItem(data.perairan[0]); else setActiveItem(null); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex justify-center items-center gap-2 ${category === 'perairan' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>
                  <Waves className="w-4 h-4" /> Perairan
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={filter} onChange={e => setFilter(e.target.value)} placeholder="Cari nama lokasi..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="max-h-[50vh] lg:max-h-[500px] overflow-y-auto custom-scrollbar space-y-1">
                {items.length === 0 ? (
                  <div className="p-4 text-center text-slate-400 text-sm">Tidak ada data untuk kategori ini.</div>
                ) : items.map(item => (
                  <button key={item.name} onClick={() => handleSelectItem(item)}
                    className={`w-full group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-l-[3px] text-left ${
                      activeItem?.name === item.name ? 'bg-blue-50 border-l-blue-600 text-blue-700' : 'border-transparent hover:bg-blue-50'
                    }`}>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm shrink-0">
                      {category === 'pelabuhan' ? <Anchor className="w-4 h-4" /> : <Waves className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 truncate">BMKG Maritim</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeItem ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[600px] relative">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                  <h3 className="font-bold text-slate-900">{activeItem.name}</h3>
                  <a href={activeItem.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
                <IframeFallback
                  key={activeItem.url}
                  src={activeItem.url}
                  className="w-full h-[calc(100%-57px)] border-0"
                  title={activeItem.name}
                  onLoad={() => setIframeLoaded(true)}
                />
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 h-[600px] flex items-center justify-center">
                <p className="text-slate-400">Pilih lokasi untuk melihat prakiraan cuaca maritim</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
