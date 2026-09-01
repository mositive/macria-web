// Yayın bilgisini GitHub Releases API'sinden okur. Amaç, yeni sürüm çıkınca
// sitenin kendiliğinden güncellenmesi: sürüm etiketi, dosya boyutu ve —
// GitHub veriyorsa — SHA-256 özeti buradan gelir.
//
// İstek başarısız olursa (ağ hatası, API sınırı) site src/lib/site.ts ve
// src/lib/release.ts içindeki statik değerlerle çalışmaya devam eder.
//
// VirusTotal raporu otomatikleşmez: taramayı siz yüklediğiniz için
// src/lib/virustotal.ts elle güncellenir. Buradaki tek iş, raporun gerçekten
// indirilen dosyaya ait olup olmadığını kontrol etmek.

import { release } from "./release";
import { site } from "./site";
import { virustotal, type VirusTotalRaporu } from "./virustotal";

export type SurumBilgisi = {
  surum: string;
  dosya: string;
  boyutBayt: number;
  /** GitHub'dan ya da statik dosyadan gelen özet; ikisi de yoksa null. */
  sha256: string | null;
  indirmeUrl: string;
  tumSurumlerUrl: string;
  /** Yalnızca rapor gerçekten bu dosyaya aitse dolu gelir. */
  virustotal: VirusTotalRaporu | null;
};

type GitHubVarlik = {
  name?: string;
  size?: number;
  digest?: string | null;
  browser_download_url?: string;
};

type GitHubYayin = {
  tag_name?: string;
  html_url?: string;
  name?: string;
  body?: string | null;
  published_at?: string | null;
  draft?: boolean;
  prerelease?: boolean;
  assets?: GitHubVarlik[];
};

/** Sürüm notlarının işlenmiş hali; istemciye düz veri olarak gider. */
export type SurumNotu =
  | { tur: "baslik"; metin: string }
  | { tur: "liste"; ogeler: string[] }
  | { tur: "paragraf"; metin: string };

export type SurumKaydi = {
  surum: string;
  tarih: string | null;
  onSurum: boolean;
  url: string;
  notlar: SurumNotu[];
};

// VirusTotal rapor adresi dosyanın özetini içerir. Tutmuyorsa rapor başka bir
// dosyaya aittir; göstermek kullanıcıyı yanıltır, o yüzden gizlenir.
function raporEslesiyor(sha256: string | null) {
  return Boolean(sha256 && virustotal?.url.includes(sha256));
}

const yedek: SurumBilgisi = {
  surum: site.version,
  dosya: release.dosya,
  boyutBayt: release.boyutBayt,
  sha256: release.sha256,
  indirmeUrl: site.downloads.portable,
  tumSurumlerUrl: site.downloads.latest,
  virustotal: raporEslesiyor(release.sha256) ? virustotal : null,
};

function depoYolu() {
  return new URL(site.github).pathname.replace(/^\/+|\/+$/g, "");
}

function apiIste(yol: string) {
  return fetch(`https://api.github.com/repos/${depoYolu()}${yol}`, {
    headers: { Accept: "application/vnd.github+json" },
    // Saatte bir tazele. Kimliksiz GitHub API sınırı IP başına 60 istek/saat,
    // bu aralıkta sınıra yaklaşmak mümkün değil.
    next: { revalidate: 3600 },
  });
}

export async function surumBilgisiniAl(): Promise<SurumBilgisi> {
  try {
    const yanit = await apiIste("/releases/latest");
    if (!yanit.ok) return yedek;

    const yayin: GitHubYayin = await yanit.json();
    const varlik = yayin.assets?.find((a) => a.name === release.dosya);
    if (!yayin.tag_name || !varlik?.browser_download_url) return yedek;

    const surum = yayin.tag_name.replace(/^v/i, "");
    // GitHub, varlıklar için "sha256:<hex>" biçiminde özet döndürüyor. Alan
    // boşsa statik özet yalnızca aynı sürümün özetiyse kullanılabilir —
    // yoksa eski bir hash'i yeni dosyanın özetiymiş gibi göstermiş oluruz.
    const digest = varlik.digest?.startsWith("sha256:")
      ? varlik.digest.slice("sha256:".length)
      : null;
    const sha256 = digest ?? (surum === site.version ? release.sha256 : null);

    return {
      surum,
      dosya: release.dosya,
      boyutBayt: varlik.size ?? release.boyutBayt,
      sha256,
      indirmeUrl: varlik.browser_download_url,
      tumSurumlerUrl: yayin.html_url ?? site.downloads.latest,
      virustotal: raporEslesiyor(sha256) ? virustotal : null,
    };
  } catch {
    return yedek;
  }
}

// GitHub sürüm notları Markdown. Tam bir Markdown çözümleyicisi getirmek yerine
// notlarda fiilen kullanılan üç yapıyı ayırıyoruz: başlık, madde listesi ve
// paragraf. Satır içi kalın/eğik işaretleri ve bağlantılar düz metne indirilir,
// böylece istemciye HTML değil veri gider.
function satirIciSadelestir(metin: string) {
  return metin
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // görseller
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // bağlantılar → metni
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // kalın
    .replace(/(\*|_)(?=\S)(.*?)(?<=\S)\1/g, "$2") // eğik
    .replace(/`([^`]*)`/g, "$1") // satır içi kod
    .trim();
}

function notlariAyristir(govde: string | null | undefined): SurumNotu[] {
  if (!govde) return [];

  const notlar: SurumNotu[] = [];
  let liste: string[] = [];

  const listeyiKapat = () => {
    if (liste.length) {
      notlar.push({ tur: "liste", ogeler: liste });
      liste = [];
    }
  };

  for (const hamSatir of govde.replace(/\r\n/g, "\n").split("\n")) {
    const satir = hamSatir.trim();

    if (!satir) {
      listeyiKapat();
      continue;
    }

    const baslik = satir.match(/^#{1,6}\s+(.*)$/);
    if (baslik) {
      listeyiKapat();
      const metin = satirIciSadelestir(baslik[1]);
      if (metin) notlar.push({ tur: "baslik", metin });
      continue;
    }

    const madde = satir.match(/^[-*+]\s+(.*)$/);
    if (madde) {
      const metin = satirIciSadelestir(madde[1]);
      if (metin) liste.push(metin);
      continue;
    }

    listeyiKapat();
    const metin = satirIciSadelestir(satir);
    if (metin) notlar.push({ tur: "paragraf", metin });
  }

  listeyiKapat();
  return notlar;
}

/**
 * Yayınlanmış bütün sürümleri yeniden eskiye doğru döndürür. İstek başarısız
 * olursa boş dizi döner ve sürüm geçmişi bölümü sayfada hiç görünmez.
 */
export async function surumGecmisiniAl(): Promise<SurumKaydi[]> {
  try {
    const yanit = await apiIste("/releases?per_page=50");
    if (!yanit.ok) return [];

    const yayinlar: GitHubYayin[] = await yanit.json();
    if (!Array.isArray(yayinlar)) return [];

    return yayinlar
      .filter((y) => !y.draft && y.tag_name)
      .map((y) => ({
        surum: (y.tag_name as string).replace(/^v/i, ""),
        // Tarihi sunucuda biçimlendiriyoruz; istemcide biçimlendirmek
        // sunucu çıktısıyla uyuşmayıp hidrasyon uyarısı üretebiliyor.
        tarih: y.published_at
          ? new Date(y.published_at).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : null,
        onSurum: Boolean(y.prerelease),
        url: y.html_url ?? site.downloads.latest,
        notlar: notlariAyristir(y.body),
      }));
  } catch {
    return [];
  }
}
