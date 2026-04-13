import { Phone, MessageCircle, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const { contact, socialMedia, station } = siteConfig;

export default function ContactCenter() {
  return (
    <div className="fade-in">
      <section className="pt-20 pb-10 px-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-2 block">Layanan Informasi</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Contact Center</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Hubungi kami melalui berbagai saluran komunikasi resmi.</p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hubungi Langsung */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Hubungi Langsung</h2>
            <div className="space-y-4">
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                label={contact.phone.label}
                value={contact.phone.value}
                href={contact.phone.href}
                color="bg-green-100 text-green-600"
              />
              <ContactCard
                icon={<MessageCircle className="w-5 h-5" />}
                label={contact.whatsapp.label}
                value={contact.whatsapp.value}
                href={contact.whatsapp.href}
                color="bg-emerald-100 text-emerald-600"
              />
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                label={contact.email.label}
                value={contact.email.value}
                href={contact.email.href}
                color="bg-blue-100 text-blue-600"
              />
            </div>
          </div>

          {/* Media Sosial */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Media Sosial</h2>
            <div className="space-y-4">
              <ContactCard
                icon={<Instagram className="w-5 h-5" />}
                label={socialMedia.instagram.label}
                value={socialMedia.instagram.handle}
                href={socialMedia.instagram.url}
                color="bg-gradient-to-br from-yellow-100 to-pink-100 text-pink-600"
              />
              <ContactCard
                icon={<Facebook className="w-5 h-5" />}
                label={socialMedia.facebook.label}
                value={socialMedia.facebook.handle}
                href={socialMedia.facebook.url}
                color="bg-blue-100 text-blue-600"
              />
              <ContactCard
                icon={<Twitter className="w-5 h-5" />}
                label={socialMedia.twitter.label}
                value={socialMedia.twitter.handle}
                href={socialMedia.twitter.url}
                color="bg-slate-100 text-slate-700"
              />
              <ContactCard
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.3 0 .58.05.86.12V9.01a6.32 6.32 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.16 8.16 0 0 0 4.76 1.52V6.69h-1z" />
                  </svg>
                }
                label={socialMedia.tiktok.label}
                value={socialMedia.tiktok.handle}
                href={socialMedia.tiktok.url}
                color="bg-slate-100 text-slate-700"
              />
              <ContactCard
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                }
                label={socialMedia.youtube.label}
                value={socialMedia.youtube.handle}
                href={socialMedia.youtube.url}
                color="bg-red-100 text-red-600"
              />
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="bg-slate-50 rounded-2xl p-6 text-center">
            <p className="text-sm font-bold text-slate-700">{station.name}</p>
            <p className="text-xs text-slate-400 mt-1">{station.address}</p>
            <p className="text-xs text-slate-400 mt-1">Jam Layanan: {station.serviceHours}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, label, value, href, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group border border-slate-100"
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600">{label}</p>
        <p className="text-sm text-slate-500">{value}</p>
      </div>
    </a>
  );
}
