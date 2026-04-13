import { Smile, Users, GraduationCap, Calendar, Mail, MessageCircle } from "lucide-react";

export default function Edukasi() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Outing Class</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Belajar Cuaca Bersama BMKG</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Mengenalkan dunia meteorologi sejak dini.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-[40px] shadow-xl border border-slate-100 p-6 space-y-6">
            <div className="bg-slate-100 rounded-3xl h-64 w-full flex items-center justify-center text-slate-400">
              <div className="text-center">
                <Smile className="w-16 h-16 mx-auto mb-2 text-yellow-500" />
                <span className="font-bold">Foto Kegiatan Edukasi</span>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Kapasitas Ideal</h4>
                <p className="text-sm text-slate-600">Maksimal 30 Orang / Sesi</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Target Peserta</h4>
                <p className="text-sm text-slate-600">TK, SD, SMP, SMA, & Universitas</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Prosedur Pengajuan Kunjungan</h2>
            <div className="space-y-8 relative pl-6 border-l-2 border-slate-100">
              {[
                { num: 1, color: 'bg-yellow-500', title: 'Kirim Surat Permohonan', desc: 'Ajukan surat resmi minimal H-7 sebelum kunjungan.' },
                { num: 2, color: 'bg-yellow-500', title: 'Cantumkan Detail Peserta', desc: 'Jumlah peserta dan guru pendamping (maks 30 orang).' },
                { num: 3, color: 'bg-green-500', title: 'Tunggu Konfirmasi', desc: 'Tim kami akan menghubungi Contact Person untuk konfirmasi.' },
              ].map(item => (
                <div key={item.num} className="relative">
                  <span className={`absolute -left-[31px] top-0 w-6 h-6 ${item.color} rounded-full text-white text-xs flex items-center justify-center font-bold ring-4 ring-white`}>{item.num}</span>
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="text-yellow-400" /> Jadwal Kunjungan Tersedia
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-slate-400">Hari</p><p className="font-bold">Senin - Jumat</p></div>
                <div><p className="text-slate-400">Waktu</p><p className="font-bold">08.00 - 15.00 WIT</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
