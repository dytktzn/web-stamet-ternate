import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ShieldCheck, Home, Building2, Info, Users } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const navItems = {
  profil: [
    { label: "Sejarah Stasiun", to: "/profil/sejarah" },
    { label: "Visi & Misi", to: "/profil/visi-misi" },
    { label: "Struktur Organisasi", to: "/profil/struktur" },
  ],
  informasi: [
    { label: "Cuaca Publik", to: "/cuaca-publik" },
    { label: "Cuaca Penerbangan", to: "/cuaca-penerbangan" },
    { label: "Cuaca Maritim", to: "/cuaca-maritim" },
    { label: "Informasi Iklim", to: "/iklim" },
    { label: "Gempa Bumi & Tsunami", to: "/gempa" },
    { label: "Satelit Cuaca", to: "/satelit-cuaca" },
    { label: "Media Publikasi", to: "/media" },
  ],
  zi: [
    { label: "1. Komitmen & Deklarasi", to: "/zona-integritas?tab=komitmen" },
    { label: "2. Budaya Anti-Korupsi", to: "/zona-integritas?tab=budaya" },
    { label: "3. Transparansi & Akuntabilitas", to: "/zona-integritas?tab=transparansi" },
    { label: "4. Standar Pelayanan & IKM", to: "/zona-integritas?tab=pelayanan" },
    { label: "5. Saluran Pengaduan (WBS)", to: "/zona-integritas?tab=pengaduan" },
    { label: "6. Inovasi Layanan", to: "/zona-integritas?tab=inovasi" },
  ],
  pelayanan: [
    { label: "Permintaan Data", to: "/pelayanan" },
    { label: "Kunjungan Edukasi", to: "/edukasi" },
  ],
};

interface DropdownProps {
  label: string;
  items: { label: string; to: string }[];
  icon?: React.ReactNode;
  className?: string;
}

const DesktopDropdown = ({ label, items, icon, className = "" }: DropdownProps) => (
  <div className="relative dropdown">
    <button className={`flex items-center gap-1 hover:text-blue-600 transition-colors py-2 focus:outline-none ${className}`}>
      {icon}
      {label}
      <ChevronDown className="w-4 h-4" />
    </button>
    <div className="absolute top-full left-0 w-64 bg-white border border-slate-100 shadow-xl rounded-2xl py-2 mt-0 dropdown-menu z-50">
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="block w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-sm">
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

interface MobileSubmenuProps {
  label: string;
  items: { label: string; to: string }[];
  icon: React.ReactNode;
  onNavigate: () => void;
}

const MobileSubmenu = ({ label, items, icon, onNavigate }: MobileSubmenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-2 border-b border-slate-50">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2 text-sm font-bold text-slate-700 hover:text-blue-600">
        <span className="flex items-center gap-3">{icon} {label}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pl-9 mt-1 space-y-1">
          {items.map((item) => (
            <Link key={item.to} to={item.to} onClick={onNavigate} className="block w-full text-left text-sm text-slate-500 py-2 hover:text-blue-600 border-l-2 border-slate-100 pl-3 hover:border-blue-500">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 cursor-pointer" onClick={closeMobile}>
          <div className="w-10 h-10 md:w-12 md:h-12 overflow-hidden bg-transparent flex items-center justify-center">
            <img src={siteConfig.station.logoUrl} alt="Logo BMKG" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-blue-900 leading-tight">
              <span className="block lg:hidden text-base font-bold tracking-tight">BMKG</span>
              <span className="hidden lg:block text-lg font-extrabold tracking-tight">{siteConfig.station.fullName}</span>
            </h1>
            <h2 className="text-slate-500 font-bold">
              <span className="block lg:hidden text-[10px] uppercase tracking-wide">{siteConfig.station.shortName}</span>
              <span className="hidden lg:block text-[10px] uppercase tracking-widest">{siteConfig.station.name} - {siteConfig.station.city}</span>
            </h2>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
          <Link to="/" className="hover:text-blue-600 transition-colors">Beranda</Link>
          <DesktopDropdown label="Profil" items={navItems.profil} />
          <DesktopDropdown label="Informasi" items={navItems.informasi} />
          <DesktopDropdown
            label="Zona Integritas"
            items={navItems.zi}
            icon={<ShieldCheck className="w-4 h-4" />}
            className="text-blue-700 hover:text-blue-900"
          />
          <DesktopDropdown label="Pelayanan" items={navItems.pelayanan} />
          <Link to="/kontak" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
            Kontak Kami
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-600 hover:text-blue-600">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-2 shadow-lg max-h-screen overflow-y-auto pb-32">
          <Link to="/" onClick={closeMobile} className="flex items-center gap-3 w-full text-left text-sm font-bold text-slate-700 hover:text-blue-600 py-3 border-b border-slate-50">
            <Home className="w-4 h-4 text-slate-400" /> Beranda
          </Link>
          <MobileSubmenu label="Zona Integritas" items={navItems.zi} icon={<ShieldCheck className="w-4 h-4 text-blue-600" />} onNavigate={closeMobile} />
          <MobileSubmenu label="Profil" items={navItems.profil} icon={<Building2 className="w-4 h-4 text-slate-400" />} onNavigate={closeMobile} />
          <MobileSubmenu label="Informasi Publik" items={navItems.informasi} icon={<Info className="w-4 h-4 text-slate-400" />} onNavigate={closeMobile} />
          <MobileSubmenu label="Pelayanan" items={navItems.pelayanan} icon={<Users className="w-4 h-4 text-slate-400" />} onNavigate={closeMobile} />
          <Link to="/kontak" onClick={closeMobile} className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">
            Kontak Kami
          </Link>
        </div>
      )}
    </nav>
  );
}
