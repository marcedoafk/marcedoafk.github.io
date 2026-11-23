// Réplica em código do Intro.png / Contact.png: cada barra foi medida do PNG original
// (posição, tamanho e cor nas duas pontas → gradiente horizontal). Em repouso o desenho é idêntico ao PNG;
// de vez em quando uma barra "apaga" e "digita" de novo. Só anima enquanto a seção está visível.
import intro from './codebg-intro.json'
import contact from './codebg-contact.json'

type Bar = [number, number, number, number, string, string] // x, y, w, h, corEsq, corDir
type Data = { w: number; h: number; bg: string; bars: Bar[] }
const sets: Record<string, Data> = { intro: intro as Data, contact: contact as Data }
const rand = (a: number, b: number) => a + Math.random() * (b - a)

// 0→1 digitando, 1 em repouso (= PNG), 1→0 apagando
const level = (p: number) => (p < 0.08 ? p / 0.08 : p < 0.86 ? 1 : (1 - p) / 0.14)
const ease = (v: number) => v * v * (3 - 2 * v)

function setup(cv: HTMLCanvasElement, d: Data, reduce: boolean) {
  const ctx = cv.getContext('2d')!
  const anim = d.bars.map(() => ({ cycle: rand(14, 28), phase: rand(0.1, 0.85) }))
  let cw = 0, ch = 0, visible = false, id = 0, last = 0

  const draw = (t: number) => {
    ctx.setTransform(1, 0, 0, 1, 0, 0) // sem isso o clearRect usa a escala do quadro anterior e limpa só parte do canvas
    ctx.clearRect(0, 0, cv.width, cv.height)
    ctx.setTransform(dpr(), 0, 0, dpr(), 0, 0)
    // Desktop: idêntico ao PNG (cover). Mobile: o cover cortaria todas as barras (ficam nas bordas do PNG),
    // então usa tamanho fixo, colado nas bordas, com altura esticada ao hero.
    const s = Math.max(cw / d.w, ch / d.h)
    const mobile = (d.w - cw / s) / 2 > 300 // o cover corta >300px do PNG por lado: as barras das bordas somem
    const m = Math.min(0.5, Math.max(0.3, cw / 1300)) // 0,3 no celular, até 0,5 no tablet
    const [sx, sy] = mobile ? [m, m * 1.5] : [s, s]
    const ox = (cw - d.w * s) / 2, oy = (ch - d.h * s) / 2
    ctx.globalAlpha = mobile ? 0.55 : 1 // no celular as barras ficam atrás do texto
    d.bars.forEach(([x, y, w, h, c0, c1], i) => {
      const k = reduce ? 1 : ease(level(((t / 1000 / anim[i].cycle) + anim[i].phase) % 1))
      const fromRight = x + w >= d.w - 1 // barras coladas na borda direita apagam em direção à borda
      const W = w * sx, H = h * sy
      const left = mobile
        ? (x + w / 2 < d.w / 2 ? x * sx : cw - (d.w - x - w) * sx - W)
        : ox + x * s
      const top = mobile ? (y / d.h) * ch : oy + y * s
      const bw = W * k
      if (bw < 1) return
      const bx = fromRight ? left + W - bw : left
      const g = ctx.createLinearGradient(left, 0, left + W, 0)
      g.addColorStop(0, c0); g.addColorStop(1, c1)
      ctx.fillStyle = g
      ctx.beginPath(); ctx.roundRect(bx, top, bw, H, Math.min(H / 2, bw / 2)); ctx.fill()
    })
  }
  const dpr = () => Math.min(devicePixelRatio || 1, 2)

  const resize = () => {
    cw = cv.clientWidth; ch = cv.clientHeight
    cv.width = cw * dpr(); cv.height = ch * dpr()
    draw(performance.now())
  }
  const loop = (t: number) => {
    id = requestAnimationFrame(loop)
    if (t - last < 33) return // ~30fps
    last = t; draw(t)
  }

  new ResizeObserver(resize).observe(cv)
  if (reduce) return
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    cancelAnimationFrame(id)
    if (visible && !document.hidden) id = requestAnimationFrame(loop)
  }).observe(cv)
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(id)
    if (visible && !document.hidden) id = requestAnimationFrame(loop)
  })
}

export function codeBackgrounds() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  document.querySelectorAll<HTMLCanvasElement>('canvas[data-bg]').forEach((cv) => setup(cv, sets[cv.dataset.bg!], reduce))
}
