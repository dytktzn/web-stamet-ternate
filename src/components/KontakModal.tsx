import { X, Phone, MessageCircle, Mail, Instagram, Facebook, Twitter } from "lucide-react";

interface KontakModalProps {
  open: boolean;
  onClose: () => void;
}

const contacts = [
  { icon: <Phone className="w-5 h-5" />, label: "Telepon", value: "(0921) 3121234", href: "tel:09213121234", color: "bg-green-100 text-green-600" },
  { icon: <MessageCircle className="w-5 h-5" />, label: "WhatsApp", value: "+62 821-xxxx-xxxx", href: "https://wa.me/62821xxxxx", color: "bg-emerald-100 text-emerald-600" },
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: "stamet.ternate@bmkg.go.id", href: "mailto:stamet.ternate@bmkg.go.id", color: "bg-blue-100 text-blue-600" },
];

const socials = [
  { icon: <Instagram className="w-5 h-5" />, label: "Instagram", handle: "@stamet_ternate", href: "https://instagram.com/stamet_ternate", color: "bg-gradient-to-br from-yellow-100 to-pink-100 text-pink-600" },
  { icon: <Facebook className="w-5 h-5" />, label: "Facebook", handle: "Stasiun Meteorologi Ternate", href: "https://facebook.com/StametTernate", color: "bg-blue-100 text-blue-600" },
  { icon: <Twitter className="w-5 h-5" />, label: "X (Twitter)", handle: "@BMKG_Ternate", href: "https://x.com/BMKG_Ternate", color: "bg-slate-100 text-slate-700" },
  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.3 0 .58.05.86.12V9.01a6.32 6.32 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.16 8.16 0 0 0 4.76 1.52V6.69h-1z"/></svg>, label: "TikTok", handle: "@bmkg_ternate", href: "https://tiktok.com/@bmkg_ternate", color: "bg-slate-100 text-slate-700" },
  { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, label: "YouTube", handle: "BMKG Ternate", href: "https://youtube.com/@BMKGTernate", color: "bg-red-100 text-red-600" },
];

export default function KontakModal({ open, onClose }: KontakModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <h3 className="font-bold text-slate-900 text-lg">Kontak Kami</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Hubungi Langsung</h4>
            <div className="space-y-2">
              {contacts.map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${c.color}`}>{c.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{c.label}</p>
                    <p className="text-xs text-slate-500">{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Media Sosial</h4>
            <div className="space-y-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.color}`}>{s.icon}</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{s.label}</p>
                    <p className="text-xs text-slate-500">{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-center">
            <p className="text-xs text-slate-500">Stasiun Meteorologi Sultan Babullah - Ternate</p>
            <p className="text-xs text-slate-400 mt-1">Jl. Bandara Sultan Babullah, Ternate, Maluku Utara</p>
          </div>
        </div>
      </div>
    </div>
  );
}
