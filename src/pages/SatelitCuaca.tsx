import { useState } from "react";
import { satelitCuacaData, SatelitItem } from "@/data/satelitCuaca";
import { AlertTriangle, X, Download, ExternalLink } from "lucide-react";
import { PROXY_BASE } from "@/lib/api";

function ImageModal({ item, onClose }: { item: SatelitItem; onClose: () => void }) {
  const forceDownload = async () => {
    try {
      const proxyUrl = `${PROXY_BASE}?url=${encodeURIComponent(item.url_gambar)}`;
      const res = await fetch(proxyUrl);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      const ext = item.url_gambar.split(".").pop() || "png";
      a.download = `${item.judul.replace(/\s+/g, "_")}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    } catch {
      window.open(item.url_gambar, "_blank");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{item.judul}</h3>
            <p className="text-xs text-slate-400 mt-0.5 capitalize">{item.caption}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
            <img
              src={item.url_gambar}
              alt={item.judul}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={forceDownload}
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mt-4">{item.deskripsi}</p>

          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs text-amber-700">
              <strong>Sumber:</strong> BMKG — Badan Meteorologi, Klimatologi, dan Geofisika
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SatelitCuaca() {
  const [selectedItem, setSelectedItem] = useState<SatelitItem | null>(null);

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Informasi</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Satelit Cuaca</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Kumpulan citra satelit cuaca terkini dari BMKG untuk pemantauan kondisi atmosfer Indonesia.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Peringatan */}
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-300 rounded-xl p-5 mb-10 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-800 text-sm">Perhatian</p>
              <p className="text-amber-700 text-sm leading-relaxed mt-1">
                Setiap penggunaan citra satelit wajib mencantumkan <strong>BMKG</strong> sebagai sumber. Pemotongan gambar tanpa menyertakan sumber dan logo BMKG <strong>tidak diperbolehkan!</strong>
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {satelitCuacaData.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.url_gambar_thumbnail}
                    alt={item.judul}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      Lihat Detail
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-800 text-sm leading-snug">{item.judul}</h3>
                  <p className="text-xs text-slate-400 capitalize mt-1">{item.caption}</p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-3 flex-1">{item.deskripsi}</p>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Lihat selengkapnya
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Peringatan bawah */}
          <div className="flex items-start gap-4 bg-amber-50 border border-amber-300 rounded-xl p-5 mt-10 shadow-sm">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-amber-700 text-sm leading-relaxed">
              Seluruh citra satelit pada halaman ini bersumber dari <strong>BMKG</strong>. Wajib mencantumkan sumber saat menggunakan citra.
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
