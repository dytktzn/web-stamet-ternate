import { useState, useRef, useEffect } from "react";
import { AlertCircle, ExternalLink, RefreshCw } from "lucide-react";

interface IframeFallbackProps {
  src: string;
  title: string;
  className?: string;
  onLoad?: () => void;
  fallbackMessage?: string;
}

export default function IframeFallback({ src, title, className = "", onLoad, fallbackMessage }: IframeFallbackProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setStatus('loading');
    // If iframe doesn't fire onLoad within 15s, assume blocked
    timerRef.current = setTimeout(() => {
      setStatus(prev => prev === 'loading' ? 'error' : prev);
    }, 15000);
    return () => clearTimeout(timerRef.current);
  }, [src]);

  const handleLoad = () => {
    clearTimeout(timerRef.current);
    setStatus('loaded');
    onLoad?.();
  };

  const handleError = () => {
    clearTimeout(timerRef.current);
    setStatus('error');
  };

  const retry = () => {
    setStatus('loading');
    if (iframeRef.current) {
      iframeRef.current.src = '';
      setTimeout(() => { if (iframeRef.current) iframeRef.current.src = src; }, 100);
    }
    timerRef.current = setTimeout(() => {
      setStatus(prev => prev === 'loading' ? 'error' : prev);
    }, 15000);
  };

  return (
    <div className="relative w-full h-full">
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="loader" />
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-10">
          <div className="text-center p-8 max-w-md">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Gagal Memuat Konten</h4>
            <p className="text-sm text-slate-500 mb-6">
              {fallbackMessage || "Konten tidak dapat ditampilkan karena pembatasan keamanan dari server tujuan."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button onClick={retry} className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
                <RefreshCw className="w-4 h-4" /> Coba Lagi
              </button>
              <a href={src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-bold transition-colors shadow-sm">
                <ExternalLink className="w-4 h-4" /> Buka di Tab Baru
              </a>
            </div>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        allowFullScreen
      />
    </div>
  );
}
