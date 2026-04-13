import { siteConfig } from "@/config/siteConfig";

const { api, defaults } = siteConfig;

export const API_BASE = api.bmkgPublic;
export const API_INTERNAL = api.internal;
export const META_PATH = api.metaPath;
export const PROXY_BASE = api.proxy;
export const API_PROXY = api.bloggerNews;
export const DEFAULT_LOCATION_ID = defaults.locationId;

export function parseToUTC(dateString: string): Date {
  if (!dateString) return new Date();
  if (dateString.includes('T') && dateString.endsWith('Z')) return new Date(dateString);
  return new Date(dateString.replace(' ', 'T') + 'Z');
}

export function translateDirection(dir: string): string {
  const map: Record<string, string> = {
    'N': 'Utara', 'NNE': 'Utara Timur Laut', 'NE': 'Timur Laut', 'ENE': 'Timur Timur Laut',
    'E': 'Timur', 'ESE': 'Timur Tenggara', 'SE': 'Tenggara', 'SSE': 'Selatan Tenggara',
    'S': 'Selatan', 'SSW': 'Selatan Barat Daya', 'SW': 'Barat Daya', 'WSW': 'Barat Barat Daya',
    'W': 'Barat', 'WNW': 'Barat Barat Laut', 'NW': 'Barat Laut', 'NNW': 'Utara Barat Laut',
    'VAR': 'Berubah-ubah'
  };
  return map[dir] || dir;
}

export function parseTime(item: any): string {
  const timeStr = item.local_datetime || item.datetime || "";
  if (!timeStr) return "--:--";
  if (timeStr.includes(' ')) return timeStr.split(' ')[1].substring(0, 5);
  return timeStr;
}

export function formatTglBMKG(isoString: string): string {
  if (!isoString || isoString === "-") return "-";
  try {
    const parts = isoString.split('T');
    if (parts.length !== 2) return isoString;
    const dateParts = parts[0].split('-');
    const timeStr = parts[1].substring(0, 5);
    let tzLabel = "UTC";
    if (isoString.includes('+07:00')) tzLabel = "WIB";
    else if (isoString.includes('+08:00')) tzLabel = "WITA";
    else if (isoString.includes('+09:00')) tzLabel = "WIT";
    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = dateParts[2];
    const m = namaBulan[parseInt(dateParts[1], 10) - 1];
    const y = dateParts[0];
    return `${d} ${m} ${y}, ${timeStr} ${tzLabel}`;
  } catch {
    return isoString;
  }
}

export async function fetchWeatherData(admCode: string) {
  const res = await fetch(`${API_BASE}/prakiraan-cuaca?adm4=${admCode}`);
  if (!res.ok) throw new Error('Forecast API Failed');
  return res.json();
}

export async function fetchRealtimeWeather(lat: number, lon: number) {
  const realtimeUrl = `${api.cuacaRealtime}?lat=${lat}&lon=${lon}`;
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(realtimeUrl)}`);
  return res.json();
}

export async function fetchGempaAuto() {
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(api.gempaAuto)}`);
  return res.json();
}

export async function fetchGempaDirasakan() {
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(api.gempaDirasakan)}`);
  return res.json();
}

export async function fetchGempaTerkini() {
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(api.gempaTerkini)}`);
  return res.json();
}

export async function fetchAlertRSS() {
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(api.alertRSS)}`);
  return res.text();
}

export async function fetchAlertDetail(url: string) {
  const res = await fetch(`${PROXY_BASE}?url=${encodeURIComponent(url)}`);
  return res.text();
}

export async function fetchRegionData() {
  const res = await fetch(api.regionTree);
  return res.json();
}

export async function fetchAviationWeather() {
  const res = await fetch(api.aviationWeather);
  return res.json();
}

export async function fetchMetarData() {
  const res = await fetch(api.metarData);
  return res.json();
}

export async function fetchMaritimMeta() {
  const res = await fetch(api.maritimMeta);
  return res.json();
}

export async function fetchPublicSearch(keyword: string) {
  const searchUrl = `${api.cuacaSearch}?keyword=${keyword}`;
  const proxyUrl = `${PROXY_BASE}?url=${encodeURIComponent(searchUrl)}`;
  const res = await fetch(proxyUrl);
  return res.json();
}

export async function fetchBloggerNews() {
  const res = await fetch(API_PROXY);
  return res.json();
}

export async function fetchBloggerPost(postId: string) {
  const res = await fetch(`${API_PROXY}?id=${postId}`);
  return res.json();
}

export function processRegions(regionTree: any[]): any[] {
  const flat: any[] = [];
  regionTree.forEach(prov => {
    flat.push({ id: prov.code, name: prov.name, path: 'Indonesia', type: 'Provinsi' });
    if (prov.children) {
      prov.children.forEach((kab: any) => {
        flat.push({ id: kab.code, name: kab.name, path: prov.name, type: 'Kab/Kota' });
        if (kab.children) {
          kab.children.forEach((kec: any) => {
            flat.push({ id: kec.code, name: kec.name, path: `${prov.name} > ${kab.name}`, type: 'Kecamatan' });
            if (kec.children) {
              kec.children.forEach((desa: any) => {
                flat.push({ id: desa.code, name: desa.name, path: `${prov.name} > ${kab.name} > ${kec.name}`, type: 'Desa/Kel' });
              });
            }
          });
        }
      });
    }
  });
  return flat;
}
