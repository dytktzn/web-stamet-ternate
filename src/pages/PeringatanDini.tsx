import { useState, useEffect } from "react";
import { Download, Image, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchAlertRSS, fetchAlertDetail, formatTglBMKG, PROXY_BASE } from "@/lib/api";

export default function PeringatanDini() {
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
      }

      if (webImage) {
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
        img1,
        img2,
        zipUrl,
        dateStr,
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
    } catch {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-red-600 font-bold uppercase tracking-widest text-xs mb-2 block">Early Warning System</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Peringatan Dini Cuaca</h1>
          <p className="text-slate-500 text-lg">Informasi resmi cuaca ekstrem terkini untuk seluruh wilayah Indonesia.</p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {loading ? (
            <div className="text-center py-12"><div className="loader mx-auto mb-4" /><p className="text-slate-500">Memuat data peringatan...</p></div>
          ) : alerts.length === 0 ? (
            <div className="text-center py-16 bg-green-50 rounded-3xl border border-green-200">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Tidak Ada Peringatan</h3>
              <p className="text-green-700">Saat ini tidak ada peringatan dini cuaca ekstrem yang terdeteksi.</p>
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
        </div>
      </section>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setModalData(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Detail Peringatan Cuaca</h3>

            {/* Infographic Images */}
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
                    <button 
                      onClick={() => forceDownload(modalData.img1, `Peta_Peringatan_BMKG_${modalData.dateStr}.jpg`)}
                      className="absolute top-3 right-3 bg-slate-900/60 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors shadow-lg"
                      title="Unduh Gambar Peta"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                  {modalData.img2 && (
                    <div className="relative snap-center w-full flex-shrink-0">
                      <img 
                        src={modalData.img2} 
                        alt="Teks Peringatan" 
                        className="w-full rounded-2xl border border-slate-200 shadow-sm object-contain bg-white"
                        onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
                      />
                      <button 
                        onClick={() => forceDownload(modalData.img2, `Teks_Peringatan_BMKG_${modalData.dateStr}.jpg`)}
                        className="absolute top-3 right-3 bg-slate-900/60 hover:bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md transition-colors shadow-lg"
                        title="Unduh Gambar Teks"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
                {modalData.zipUrl && (
                  <div className="mt-3 flex justify-center">
                    <button
                      onClick={() => forceDownload(modalData.zipUrl, `Paket_Data_BMKG_${modalData.dateStr}.zip`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-md"
                    >
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
            <button onClick={() => setModalData(null)} className="mt-6 w-full py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-700 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
