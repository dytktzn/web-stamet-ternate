import { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface SidePanelLayoutProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
  sidebarTitle?: string;
}

export default function SidePanelLayout({ tabs, activeTab, onTabChange, children, sidebarTitle }: SidePanelLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile: Select dropdown */}
      <div className="w-full lg:hidden">
        <select
          value={activeTab}
          onChange={e => onTabChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          {tabs.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      {/* Desktop: Side panel */}
      <div className="hidden lg:block w-full lg:w-1/4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
          {sidebarTitle && (
            <div className="p-4 bg-slate-50 border-b border-slate-100">
              <h3 className="font-bold text-slate-700 text-sm">{sidebarTitle}</h3>
            </div>
          )}
          <div className="flex flex-col p-2 space-y-1">
            {tabs.map(t => (
              <button key={t.id} onClick={() => onTabChange(t.id)}
                className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all border-l-4 flex items-center gap-3 ${
                  activeTab === t.id ? 'bg-blue-50 text-blue-600 border-l-blue-600' : 'border-transparent text-slate-600 hover:bg-slate-50'
                }`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/4">
        {children}
      </div>
    </div>
  );
}
