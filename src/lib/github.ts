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
  assets?: GitHubVarlik[];
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

export async function surumBilgisiniAl(): Promise<SurumBilgisi> {
  try {
    const repo = new URL(site.github).pathname.replace(/^\/+|\/+$/g, "");
    const yanit = await fetch(
      `https://api.github.com/repos/${repo}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        // Saatte bir tazele. Kimliksiz GitHub API sınırı IP başına 60 istek/saat,
        // bu aralıkta sınıra yaklaşmak mümkün değil.
        next: { revalidate: 3600 },
      },
    );
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
