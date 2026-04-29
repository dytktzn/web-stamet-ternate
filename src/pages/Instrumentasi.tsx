import { useState, useEffect } from "react";
import SidePanelLayout from "@/components/SidePanelLayout";
import { Cloud, Radar, Gauge, Activity, MapPin, Droplets, Battery, Thermometer, Clock, AlertCircle } from "lucide-react";

interface ArgStation {
  id_station: string;
  name_station: string;
  nama_kota: string;
  lat: string;
  lng: string;
  nama_provinsi: string;
  tanggal: string;
  diff_day: string;
  diff_hour: string;
  diff_minute: string;
  klasifikasi: string;
  station_data_monitor: {
    curah_hujan: string;
    tegangan_batre: string;
    suhu_logger: string;
  };
}

const tabs = [
  { id: "arg", label: "ARG", icon: <Droplets className="w-4 h-4" /> },
  { id: "aws", label: "AWS", icon: <Gauge className="w-4 h-4" /> },
  { id: "radar", label: "Radar Cuaca", icon: <Radar className="w-4 h-4" /> },
  { id: "konvensional", label: "Alat Konvensional", icon: <Activity className="w-4 h-4" /> },
];

function statusColor(klasifikasi: string, diffDay: string, diffHour: string) {
  const day = parseInt(diffDay);
  const hour = parseInt(diffHour);
  if (day > 0 || hour >= 6) return { bg: "bg-red-100", text: "text-red-700", label: "Tidak Aktif", dot: "bg-red-500" };
  if (hour >= 1) return { bg: "bg-amber-100", text: "text-amber-700", label: "Tertunda", dot: "bg-amber-500" };
  return { bg: "bg-emerald-100", text: "text-emerald-700", label: "Aktif", dot: "bg-emerald-500" };
}

function formatLastUpdate(s: ArgStation) {
  const d = parseInt(s.diff_day), h = parseInt(s.diff_hour), m = parseInt(s.diff_minute);
  if (d > 0) return `${d} hari lalu`;
  if (h > 0) return `${h} jam ${m}m lalu`;
  return `${m} menit lalu`;
}

function ArgContent() {
  const [stations, setStations] = useState<ArgStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch("https://miniapps.my.id/project012/api/alat.php")
      .then(r => r.json())
      .then(data => { if (!cancelled) setStations(Array.isArray(data) ? data : []); })
      .catch(() => {
        // Fallback via http if https not available
        fetch("http://miniapps.my.id/project012/api/alat.php")
          .then(r => r.json())
          .then(data => { if (!cancelled) setStations(Array.isArray(data) ? data : []); })
          .catch(e => { if (!cancelled) setError("Gagal memuat data ARG. Periksa koneksi atau coba lagi nanti."); });
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="loader mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Memuat data stasiun ARG...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-bold mb-1">Automatic Rain Gauge (ARG)</h2>
            <p className="text-blue-100 text-sm max-w-xl">Jaringan pengukur hujan otomatis BMKG yang merekam intensitas curah hujan secara real-time.</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center">
            <div className="text-3xl font-extrabold">{stations.length}</div>
            <div className="text-[10px] uppercase tracking-wider text-blue-100">Stasiun</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stations.map((s) => {
          const status = statusColor(s.klasifikasi, s.diff_day, s.diff_hour);
          const monitor = s.station_data_monitor || ({} as ArgStation["station_data_monitor"]);
          return (
            <div key={s.id_station} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 ${status.bg} ${status.text} rounded-full text-[10px] font-bold`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} /> {status.label}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">#{s.id_station}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 leading-tight truncate">{s.name_station}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3 h-3" /> {s.nama_kota}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                  <Droplets className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-slate-900">{monitor.curah_hujan ?? "-"}<span className="text-[10px] font-normal text-slate-500"> mm</span></div>
                  <div className="text-[9px] text-slate-500 uppercase">Hujan</div>
                </div>
                <div className="bg-amber-50 rounded-lg p-2.5 text-center">
                  <Thermometer className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-slate-900">{monitor.suhu_logger ?? "-"}<span className="text-[10px] font-normal text-slate-500">°C</span></div>
                  <div className="text-[9px] text-slate-500 uppercase">Suhu Logger</div>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2.5 text-center">
                  <Battery className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-slate-900">{monitor.tegangan_batre ?? "-"}<span className="text-[10px] font-normal text-slate-500">V</span></div>
                  <div className="text-[9px] text-slate-500 uppercase">Baterai</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {formatLastUpdate(s)}</span>
                <span className="font-mono">{parseFloat(s.lat).toFixed(3)}, {parseFloat(s.lng).toFixed(3)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StaticContent({ title, image, description }: { title: string; image: string; description: string[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="aspect-video bg-slate-100 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
          {description.map((p, i) => (
            <p key={i} className="text-slate-600 leading-relaxed mb-3 last:mb-0">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Instrumentasi() {
  const [tab, setTab] = useState("arg");

  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Peralatan Observasi</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Instrumentasi</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Jaringan peralatan observasi cuaca dan iklim BMKG di wilayah Maluku Utara.</p>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <SidePanelLayout tabs={tabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Jenis Peralatan">
            {tab === "arg" && <ArgContent />}
            {tab === "aws" && (
              <StaticContent
                title="Automatic Weather Station (AWS)"
                image="https://images.unsplash.com/photo-1561553590-267fc716698a?w=1200&auto=format&fit=crop"
                description={[
                  "Automatic Weather Station (AWS) merupakan sistem stasiun pengamatan cuaca otomatis yang mengukur berbagai parameter meteorologi seperti suhu udara, kelembapan, tekanan udara, kecepatan dan arah angin, curah hujan, serta radiasi matahari.",
                  "AWS bekerja secara terus-menerus 24 jam dengan interval pengukuran setiap 10 menit, sehingga data yang dihasilkan lebih akurat dan terperinci untuk mendukung analisis cuaca, prakiraan, serta peringatan dini cuaca ekstrem di wilayah Maluku Utara.",
                ]}
              />
            )}
            {tab === "radar" && (
              <StaticContent
                title="Radar Cuaca"
                image="https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1200&auto=format&fit=crop"
                description={[
                  "Radar Cuaca adalah peralatan teledeteksi yang menggunakan gelombang elektromagnetik untuk mendeteksi pergerakan awan, intensitas hujan, dan fenomena atmosfer lainnya dalam radius hingga ratusan kilometer.",
                  "Hasil pemindaian radar disajikan dalam bentuk citra reflectivity yang membantu prakirawan mengidentifikasi sel awan konvektif penyebab hujan lebat, badai guntur, hingga potensi puting beliung secara real-time.",
                ]}
              />
            )}
            {tab === "konvensional" && (
              <StaticContent
                title="Alat Konvensional"
                image="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop"
                description={[
                  "Alat konvensional merupakan peralatan observasi cuaca manual yang menjadi standar pengamatan klasik BMKG, antara lain termometer bola basah/kering, barometer, penakar hujan Hellman, anemometer cup, sangkar meteorologi, hingga campbell stokes untuk durasi penyinaran matahari.",
                  "Meskipun teknologi otomatis terus berkembang, alat konvensional tetap dipertahankan sebagai data pembanding (verifikasi) dan menjadi cadangan pengamatan ketika peralatan otomatis mengalami gangguan.",
                ]}
              />
            )}
          </SidePanelLayout>
        </div>
      </section>
    </div>
  );
}
