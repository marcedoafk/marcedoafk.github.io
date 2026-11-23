import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { codeBackgrounds } from './codebg'

createApp(App).mount('#app')
codeBackgrounds()

// Scroll suave só para mouse/âncoras. Toque e teclado seguem nativos (syncTouch desligado)
// e prefers-reduced-motion desliga tudo, inclusive se mudar com a página aberta.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const reduce = matchMedia('(prefers-reduced-motion: reduce)')
let lenis: Lenis | null = null
const syncScroll = () => {
  if (reduce.matches) { lenis?.destroy(); lenis = null; return }
  lenis ??= new Lenis({
    autoRaf: true,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.075, // inércia mais longa que o padrão (0.1)
    wheelMultiplier: 0.9, // cada clique da roda empurra um pouco menos
    anchors: { duration: 1.4, easing: easeInOutCubic },
  })
}
syncScroll()
reduce.addEventListener('change', syncScroll)

// Spotlight: expõe a posição do mouse relativa ao card como --mx/--my
document.addEventListener('pointermove', (e) => {
  const card = (e.target as Element).closest<HTMLElement>('.spot')
  if (!card) return
  const r = card.getBoundingClientRect()
  card.style.setProperty('--mx', e.clientX - r.left + 'px')
  card.style.setProperty('--my', e.clientY - r.top + 'px')
})
