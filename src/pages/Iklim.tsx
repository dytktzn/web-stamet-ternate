import { useState, useEffect } from "react";
import SidePanelLayout from "@/components/SidePanelLayout";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FileText, Calendar, X, Download } from "lucide-react";

interface BuletinItem {
  title: string;
  date: string;
  cover: string;
  originalImage: string;
  description: string;
  fileUrl?: string;
}

const PLACEHOLDER_THUMB = "https://placehold.co/300x200/jpg?text=Peta%0AAnalisis";
const PLACEHOLDER_ORIGINAL = "https://placehold.co/300x200/jpg?text=Peta%0AAnalisis";
const PLACEHOLDER_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const buletinData: Record<string, { hero: BuletinItem; list: BuletinItem[] }> = {
  "prakiraan-bulanan": {
    hero: {
      title: "Prakiraan Hujan Bulanan April 2026",
      date: "April 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Prakiraan distribusi curah hujan bulanan untuk wilayah Maluku Utara berdasarkan analisis model numerik dan data klimatologi.",
    },
    list: [
      { title: "Prakiraan Hujan Bulanan Maret 2026", date: "Maret 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "Prakiraan Hujan Bulanan Februari 2026", date: "Februari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "Prakiraan Hujan Bulanan Januari 2026", date: "Januari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  "prakiraan-dasarian": {
    hero: {
      title: "Prakiraan Hujan Dasarian III April 2026",
      date: "Dasarian III April 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Prakiraan curah hujan per dasarian (10 harian) untuk mendukung sektor pertanian dan pengelolaan sumber daya air.",
    },
    list: [
      { title: "Prakiraan Hujan Dasarian II April 2026", date: "Dasarian II April 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "Prakiraan Hujan Dasarian I April 2026", date: "Dasarian I April 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  "analisis-bulanan": {
    hero: {
      title: "Analisis Iklim Bulanan Maret 2026",
      date: "Maret 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Analisis kondisi cuaca dan iklim bulanan termasuk anomali suhu, curah hujan, dan parameter iklim lainnya.",
    },
    list: [
      { title: "Analisis Iklim Bulanan Februari 2026", date: "Februari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "Analisis Iklim Bulanan Januari 2026", date: "Januari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  "analisis-dasarian": {
    hero: {
      title: "Analisis Curah Hujan Dasarian III Maret 2026",
      date: "Dasarian III Maret 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Analisis curah hujan per dasarian dibandingkan dengan rata-rata normal 30 tahun terakhir.",
    },
    list: [
      { title: "Analisis Dasarian II Maret 2026", date: "Dasarian II Maret 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  hth: {
    hero: {
      title: "Monitoring Hari Tanpa Hujan April 2026",
      date: "April 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Hari Tanpa Hujan (HTH) berturut-turut untuk monitoring potensi kekeringan meteorologis di wilayah Maluku Utara.",
    },
    list: [
      { title: "Monitoring HTH Maret 2026", date: "Maret 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "Monitoring HTH Februari 2026", date: "Februari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  spi: {
    hero: {
      title: "Standardized Precipitation Index April 2026",
      date: "April 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Standardized Precipitation Index (SPI) untuk klasifikasi tingkat kekeringan dan kebasahan di wilayah Maluku Utara.",
    },
    list: [
      { title: "SPI Maret 2026", date: "Maret 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
      { title: "SPI Februari 2026", date: "Februari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "" },
    ],
  },
  kaleidoskop: {
    hero: {
      title: "Kaleidoskop Iklim Maret 2026",
      date: "Maret 2026",
      cover: PLACEHOLDER_THUMB,
      originalImage: PLACEHOLDER_ORIGINAL,
      description: "Ringkasan peristiwa cuaca dan iklim penting setiap bulan di wilayah Maluku Utara.",
      fileUrl: PLACEHOLDER_PDF,
    },
    list: [
      { title: "Kaleidoskop Iklim Februari 2026", date: "Februari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "", fileUrl: PLACEHOLDER_PDF },
      { title: "Kaleidoskop Iklim Januari 2026", date: "Januari 2026", cover: PLACEHOLDER_THUMB, originalImage: PLACEHOLDER_ORIGINAL, description: "", fileUrl: PLACEHOLDER_PDF },
    ],
  },
};

const iklimTabs = [
  { id: "prakiraan-bulanan", label: "Prakiraan Hujan Bulanan" },
  { id: "prakiraan-dasarian", label: "Prakiraan Hujan Dasarian" },
  { id: "analisis-bulanan", label: "Analisis Bulanan" },
  { id: "analisis-dasarian", label: "Analisis Dasarian" },
  { id: "hth", label: "Hari Tanpa Hujan (HTH)" },
  { id: "spi", label: "Standardized Precipitation Index (SPI)" },
  { id: "kaleidoskop", label: "Kaleidoskop Bulanan" },
];

function handleDownload(url: string, filename: string) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    })
    .catch(() => {
      // fallback
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
}

function DetailModal({
  item,
  onClose,
}: {
  item: BuletinItem;
  onClose: () => void;
}) {
  const isKaleidoskop = !!item.fileUrl;
  const downloadUrl = item.fileUrl || item.originalImage;
  const ext = isKaleidoskop ? ".pdf" : ".jpg";
  const filename = item.title.replace(/\s+/g, "_") + ext;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full hover:bg-slate-100 transition-colors shadow"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        {isKaleidoskop ? (
          <div className="w-full h-[60vh]">
            <iframe src={item.fileUrl} className="w-full h-full rounded-t-2xl" title={item.title} />
          </div>
        ) : (
          <div className="flex items-center justify-center bg-slate-50 rounded-t-2xl p-4">
            <img
              src={item.originalImage}
              alt={item.title}
              className="max-w-full max-h-[60vh] object-contain"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
              <Calendar className="w-3 h-3" /> {item.date}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-3">{item.title}</h3>
            {item.description && (
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.description}</p>
            )}
          </div>
          <button
            onClick={() => handleDownload(downloadUrl, filename)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <Download className="w-4 h-4" /> Download
          </button>
        </div>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 5;

function BuletinHeroList({
  data,
  onSelect,
  page,
  onPageChange,
}: {
  data: { hero: BuletinItem; list: BuletinItem[] };
  onSelect: (item: BuletinItem) => void;
  page: number;
  onPageChange: (p: number) => void;
}) {
  const totalPages = Math.ceil(data.list.length / ITEMS_PER_PAGE);
  const paginatedList = data.list.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div
        onClick={() => onSelect(data.hero)}
        className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm group cursor-pointer hover:shadow-md transition-shadow"
      >
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

      {/* Archive list */}
      {data.list.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Arsip Sebelumnya
          </h4>
          <div className="space-y-3">
            {paginatedList.map((item, i) => (
              <div
                key={i}
                onClick={() => onSelect(item)}
                className="flex gap-4 bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-sm transition-shadow cursor-pointer group"
              >
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

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => onPageChange(p)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}

export default function Iklim() {
  const [tab, setTab] = useState("prakiraan-bulanan");
  const [selectedItem, setSelectedItem] = useState<BuletinItem | null>(null);
  const [archivePage, setArchivePage] = useState(1);

  useEffect(() => {
    setArchivePage(1);
  }, [tab]);

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
          <SidePanelLayout tabs={iklimTabs} activeTab={tab} onTabChange={setTab} sidebarTitle="Produk Klimat">
            {buletinData[tab] && (
              <BuletinHeroList data={buletinData[tab]} onSelect={setSelectedItem} page={archivePage} onPageChange={setArchivePage} />
            )}
          </SidePanelLayout>
        </div>
      </section>

      {selectedItem && (
        <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
