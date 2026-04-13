import { Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const { station, contact, links } = siteConfig;

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <img src={station.logoUrl} alt="Logo BMKG" className="w-12 h-12" />
            <div>
              <h3 className="font-bold text-lg">BMKG</h3>
              <p className="text-slate-400 text-xs">{station.shortName} {station.city}</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            {station.name} merupakan unit pelayanan teknis BMKG yang melayani informasi cuaca, iklim, dan geofisika di wilayah {station.province}.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Kontak</h4>
          <div className="space-y-4 text-sm text-slate-400">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>{station.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>{contact.phone.value}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>{contact.email.value}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Tautan</h4>
          <div className="space-y-3 text-sm text-slate-400">
            <a href={`https://${links.bmkgWebsite}`} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">BMKG Pusat</a>
            <a href="https://cuaca.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Portal Cuaca BMKG</a>
            <a href="https://web-aviation.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Cuaca Penerbangan</a>
            <a href="https://maritim.bmkg.go.id" target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">Cuaca Maritim</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {station.name} - BMKG. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
}
