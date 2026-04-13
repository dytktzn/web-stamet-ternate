// ============================================================
// Site Configuration — Centralized config for all URLs, APIs,
// contacts, social media, and station info.
// Edit this file to update any external URL or contact detail.
// ============================================================

export const siteConfig = {
  // === Station Info ===
  station: {
    name: "Stasiun Meteorologi Sultan Babullah",
    shortName: "Stamet Sultan Babullah",
    city: "Ternate",
    province: "Maluku Utara",
    fullName: "Badan Meteorologi Klimatologi dan Geofisika",
    address: "Jl. Bandara Sultan Babullah, Ternate, Maluku Utara",
    icao: "WAEE",
    coordinates: "0.8328°N, 127.3797°E",
    elevation: "15 m",
    timezone: "WIT (UTC+9)",
    logoUrl: "https://miniapps.my.id/project012/assets/logo-bmkg.svg",
    serviceHours: "Senin - Jumat, 08.00 - 16.00 WIT",
    visitHours: "Senin - Jumat, 08.00 - 15.00 WIT",
  },

  // === Contact Info ===
  contact: {
    phone: {
      label: "Telepon",
      value: "(0921) 3121234",
      href: "tel:09213121234",
    },
    whatsapp: {
      label: "WhatsApp",
      value: "+62 821-xxxx-xxxx",
      href: "https://wa.me/62821xxxxx",
    },
    email: {
      label: "Email",
      value: "stamet.ternate@bmkg.go.id",
      href: "mailto:stamet.ternate@bmkg.go.id",
    },
  },

  // === Social Media ===
  socialMedia: {
    instagram: {
      label: "Instagram",
      handle: "@stamet_ternate",
      url: "https://instagram.com/stamet_ternate",
    },
    facebook: {
      label: "Facebook",
      handle: "Stasiun Meteorologi Ternate",
      url: "https://facebook.com/StametTernate",
    },
    twitter: {
      label: "X (Twitter)",
      handle: "@BMKG_Ternate",
      url: "https://x.com/BMKG_Ternate",
    },
    tiktok: {
      label: "TikTok",
      handle: "@bmkg_ternate",
      url: "https://tiktok.com/@bmkg_ternate",
    },
    youtube: {
      label: "YouTube",
      handle: "BMKG Ternate",
      url: "https://youtube.com/@BMKGTernate",
    },
  },

  // === API Endpoints ===
  api: {
    bmkgPublic: "https://api.bmkg.go.id/publik",
    internal: "https://miniapps.my.id/project012/api",
    metaPath: "https://miniapps.my.id/project012/meta",
    proxy: "https://miniapps.my.id/project012/proxy/index.php",
    bloggerNews: "https://miniapps.my.id/project012/api/api-berita.php",
    aviationWeather: "https://miniapps.my.id/project012/api/resmi/weather-waee.php",
    metarData: "https://miniapps.my.id/project012/api/resmi/metar-waee.php",
    gempaAuto: "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json",
    gempaDirasakan: "https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json",
    gempaTerkini: "https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json",
    alertRSS: "https://www.bmkg.go.id/alerts/nowcast/id/rss.xml",
    cuacaRealtime: "https://cuaca.bmkg.go.id/api/presentwx/coord",
    cuacaSearch: "https://cuaca.bmkg.go.id/api/df/v1/adm/search",
    shakemapBase: "https://static.bmkg.go.id/",
    maritimMeta: "/data/maritim-meta.json",
    regionTree: "/data/kodewilayah_tree.json",
  },

  // === Default Values ===
  defaults: {
    locationId: "82.71.03.1020",
  },

  // === External Links ===
  links: {
    wbsPortal: "https://wbs.bmkg.go.id",
    bmkgWebsite: "https://bmkg.go.id",
    ternateWebsite: "https://ternate.bmkg.go.id",
  },
} as const;
