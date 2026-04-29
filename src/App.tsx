import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout/Layout";

const Beranda = lazy(() => import("@/pages/Beranda"));
const Profil = lazy(() => import("@/pages/Profil"));
const ProfilSejarah = lazy(() => import("@/pages/ProfilSejarah"));
const ProfilVisiMisi = lazy(() => import("@/pages/ProfilVisiMisi"));
const ProfilStruktur = lazy(() => import("@/pages/ProfilStruktur"));
const CuacaPublik = lazy(() => import("@/pages/CuacaPublik"));
const CuacaPenerbangan = lazy(() => import("@/pages/CuacaPenerbangan"));
const CuacaMaritim = lazy(() => import("@/pages/CuacaMaritim"));
const Iklim = lazy(() => import("@/pages/Iklim"));
const Instrumentasi = lazy(() => import("@/pages/Instrumentasi"));
const SatelitCuaca = lazy(() => import("@/pages/SatelitCuaca"));
const GempaBumi = lazy(() => import("@/pages/GempaBumi"));
const MediaPublikasi = lazy(() => import("@/pages/MediaPublikasi"));
const ZonaIntegritas = lazy(() => import("@/pages/ZonaIntegritas"));
const Pelayanan = lazy(() => import("@/pages/Pelayanan"));
const Edukasi = lazy(() => import("@/pages/Edukasi"));
const ContactCenter = lazy(() => import("@/pages/ContactCenter"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="loader" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/web-stamet-ternate">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Beranda />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/profil/sejarah" element={<ProfilSejarah />} />
              <Route path="/profil/visi-misi" element={<ProfilVisiMisi />} />
              <Route path="/profil/struktur" element={<ProfilStruktur />} />
              <Route path="/cuaca-publik" element={<CuacaPublik />} />
              <Route path="/cuaca-penerbangan" element={<CuacaPenerbangan />} />
              <Route path="/cuaca-maritim" element={<CuacaMaritim />} />
              <Route path="/iklim" element={<Iklim />} />
              <Route path="/instrumentasi" element={<Instrumentasi />} />
              <Route path="/satelit-cuaca" element={<SatelitCuaca />} />
              <Route path="/peringatan" element={<CuacaPublik />} />
              <Route path="/gempa" element={<GempaBumi />} />
              <Route path="/media" element={<MediaPublikasi />} />
              <Route path="/zona-integritas" element={<ZonaIntegritas />} />
              <Route path="/pelayanan" element={<Pelayanan />} />
              <Route path="/edukasi" element={<Edukasi />} />
              <Route path="/kontak" element={<ContactCenter />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
