/**
 * İndirme düğmelerinin oku. Dört ayrı yerde (başlık, hero, indirme kartı ve
 * kapanış şeridi) elle çizilmiş, birbirinden azıcık farklı kopyaları vardı.
 *
 * Ok ile tepsi çizgisi ayrı: hover'da yalnızca ok düşüp üstten yeniden
 * giriyor, tepsi yerinde kalıyor. Hareketi süren kural globals.css'te
 * ".btn-indir:hover .indir-ok" — yani düğmeye "btn-indir" sınıfı eklenmeli.
 */
export function IndirIkonu({ boyut = 17 }: { boyut?: number }) {
  return (
    <svg
      width={boyut}
      height={boyut}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <g className="indir-ok">
        <path d="M12 3v12M6.5 10.5 12 16l5.5-5.5" />
      </g>
      <path d="M4 21h16" />
    </svg>
  );
}
