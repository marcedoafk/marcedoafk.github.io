<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import AnimatedIcon from './AnimatedIcon.vue'
const github = 'https://github.com/marcedoafk'
const technologies = ['Node.js', 'Vue', 'TypeScript', 'Fastify', 'Docker'] // o nome também é o arquivo /media/<nome>.svg
const projects = [
  { name: 'pix-brcode', url: 'https://www.npmjs.com/package/@m4rquin/pix-brcode', tags: ['TypeScript', 'Pix', 'npm'], description: 'Publiquei uma biblioteca TypeScript para quem integra Pix a uma aplicação. Ela gera e valida o código copia e cola e cria o QR Code em SVG, sem dependências externas.' },
  { name: 'Embraza Gringos', url: 'https://embrazagringos.com.br/', tags: ['Cardápio digital', 'Delivery'], description: 'Desenvolvi o fluxo de pedidos da hamburgueria. Pelo site, o cliente monta a sacola, escolhe entrega ou retirada e acompanha o pedido depois da confirmação.' },
  { name: 'Qbombom Sorvetes', url: 'https://qbombomararipe.com.br/', tags: ['Sorveteria', 'Pedidos online'], description: 'Criei a experiência de compra da sorveteria. O cliente personaliza o produto com os adicionais disponíveis e revisa suas escolhas no carrinho antes de pedir.' }
]
const services = [
  ['Devices', 'Aplicações web e mobile', 'Desenvolvo interfaces para fluxos com várias etapas, como a personalização de um produto, a revisão da sacola e a conclusão de um pedido. Aprendo novas tecnologias conforme o projeto exige.'],
  ['HardDrives', 'APIs e integrações', 'Escrevo APIs em Node.js com Fastify e Express. No servidor, valido os dados recebidos da interface e aplico as regras de negócio.'],
  ['Infinity', 'Infraestrutura', 'Configuro aplicações em contêineres Docker e uso Nginx em servidores Linux para encaminhar as requisições ao serviço certo.']
]
const contacts = [
  { name: 'LinkedIn', icon: 'LinkedinLogo', href: 'https://www.linkedin.com/in/antonio-marcos-9305bb2b4/' },
  { name: 'GitHub', icon: 'GithubLogo', href: github },
  { name: 'npm', icon: 'Code', href: 'https://www.npmjs.com/~m4rquin' }
]
// Currículo: coloque o PDF em public/ e informe o caminho aqui (ex.: '/curriculo.pdf'). Vazio = botão oculto.
const curriculo: string = ''
const links = [['projetos', 'Projetos'], ['ferramentas', 'Tecnologias'], ['sobre', 'Sobre'], ['contato', 'Contato']]
const active = ref('')

// Conteúdo do editor "sobre.ts": cada linha = nível de indentação + tokens [classe, texto]
type Tok = [string, string]
const q = (v: string): Tok => ['s', `'${v}'`]
const items = (vs: string[]): Tok[] => vs.flatMap((v, i): Tok[] => [q(v), ['p', i < vs.length - 1 ? ', ' : ',']])
const code: { i: number; t: Tok[]; caret?: boolean }[] = [
  { i: 0, t: [['k', 'const'], ['', ' '], ['v', 'marcos'], ['p', ' = {']] },
  { i: 1, t: [['pr', 'nome'], ['p', ': '], q('Marcos Macedo'), ['p', ',']] },
  { i: 1, t: [['pr', 'cidade'], ['p', ': '], q('Araripe, CE'), ['p', ',']] },
  { i: 1, t: [['pr', 'curso'], ['p', ': '], q('Análise e Desenvolvimento de Sistemas'), ['p', ',']] },
  { i: 1, t: [['pr', 'stack'], ['p', ': [']] },
  { i: 2, t: items(technologies.slice(0, 3)) },
  { i: 2, t: items(technologies.slice(3)) },
  { i: 1, t: [['p', '],']] },
  { i: 1, t: [['pr', 'npm'], ['p', ': '], q('@m4rquin/pix-brcode'), ['p', ',']] },
  { i: 0, t: [['p', '}']], caret: true }
]

// Digitação no hero (reduced-motion: mostra a primeira frase parada)
const phrases = ['APIs em Node.js e Fastify', 'Interfaces com Vue e TypeScript', 'pix-brcode no npm']
const typed = ref(phrases[0])
let typer = 0
const startTyping = () => {
  let i = 0, n = 0, erasing = false
  const tick = () => {
    const full = phrases[i]
    n += erasing ? -1 : 1
    typed.value = full.slice(0, n)
    let wait = erasing ? 25 : 55
    if (!erasing && n === full.length) { erasing = true; wait = 1600 }
    else if (erasing && n === 0) { erasing = false; i = (i + 1) % phrases.length; wait = 350 }
    typer = window.setTimeout(tick, wait)
  }
  typed.value = ''
  typer = window.setTimeout(tick, 900)
}
onUnmounted(() => clearTimeout(typer))

onMounted(() => {
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) startTyping()
  // Scroll-spy: a seção que cruza a linha de 45% da tela vira a ativa
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-45% 0px -54% 0px' })
  links.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el) })
})
</script>

<template>
  <div class="progress" aria-hidden="true"></div>
  <nav class="topnav" aria-label="Principal">
    <ul class="mx-auto flex max-w-[1038px] justify-center gap-1 px-3 py-2 text-sm sm:gap-4">
      <li v-for="[id, label] in links" :key="id">
        <a :href="'#' + id" :aria-current="active === id ? 'true' : undefined" class="navlink rounded-full px-3 py-1.5">{{ label }}</a>
      </li>
    </ul>
  </nav>
  <main>
    <header class="intro px-5 pt-16 pb-14 text-center sm:pt-[120px]">
      <canvas class="codebg" data-bg="intro" aria-hidden="true"></canvas>
      <div class="intro-inner">
      <div class="icon-trigger relative mx-auto mb-14 grid size-28 place-items-center">
        <img src="https://github.com/marcedoafk.png?size=192" alt="Marcos Macedo" class="size-24 rounded-full border-2 border-accent object-cover p-1">
        <AnimatedIcon :name="'Code'" class="absolute right-0 bottom-0 w-9" />
      </div>
      <p class="kicker">Olá, eu sou <span class="text-accent">Marcos Macedo</span></p>
      <h1 class="mt-2 text-[clamp(2.25rem,5vw,3.5rem)]">Desenvolvedor Full Stack</h1>
      <p class="kicker mt-3 h-7 text-muted" aria-hidden="true">&gt; {{ typed }}<span class="caret"></span></p>
      <p class="mx-auto mt-5 max-w-[680px] text-sm leading-[1.4] text-muted">Desenvolvo aplicações web, mobile e APIs, do planejamento ao deploy, com Vue, Node.js e TypeScript. Entre meus projetos estão as plataformas de pedidos da Embraza Gringos e da Qbombom e a pix-brcode, biblioteca publicada no npm para integrar Pix.</p>
      <ul class="mt-12 flex flex-wrap justify-center gap-3 sm:mt-20 sm:gap-4">
        <li v-for="technology in technologies" :key="technology" class="icon-trigger flex items-center gap-2 rounded-full bg-panel px-4 py-2">
          <AnimatedIcon :name="technology" class="size-5" />{{ technology }}
        </li>
      </ul>
      <a href="#projetos" aria-label="Ver projetos em destaque" class="icon-trigger mx-auto mt-12 grid size-11 place-items-center sm:mt-[88px]"><AnimatedIcon :name="'CaretDoubleDown'" class="size-8" /></a>
      </div>
    </header>
    <section id="projetos" class="px-5 pt-[72px] pb-20 sm:pb-36">
      <header class="reveal mb-14 text-center"><p class="kicker text-accent">Portfólio</p><h2>Projetos em destaque</h2></header>
      <div class="mx-auto grid max-w-[1038px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="project in projects" :key="project.url" class="reveal lift spot rounded-xl bg-panel p-3">
          <a :href="project.url" class="icon-trigger block rounded-lg p-3 hover:underline">
            <AnimatedIcon :name="'ArrowUpRight'" class="mb-5 size-7" />
            <h3>{{ project.name }}</h3>
            <p class="mt-2 text-sm leading-[1.4]">{{ project.description }}</p>
          </a>
          <div class="flex flex-wrap items-center gap-2 px-3 pt-1 pb-3">
            <span v-for="tag in project.tags" :key="tag" class="rounded-full bg-page px-3 py-1 text-xs text-muted">{{ tag }}</span>
          </div>
        </article>
      </div>
    </section>
    <section id="ferramentas" class="bg-[#0d0e11] px-5 pt-[88px] pb-[120px]">
      <header class="reveal mb-14 text-center"><p class="kicker text-accent">Stack</p><h2>Como uso essas tecnologias</h2></header>
      <div class="mx-auto grid max-w-[888px] gap-6 md:grid-cols-3">
        <article v-for="[symbol, name, description] in services" :key="symbol" class="icon-trigger reveal lift spot rounded-xl border-2 border-page p-5">
          <AnimatedIcon :name="symbol" class="mb-5 size-12" /><h3>{{ name }}</h3><p class="mt-2 text-sm">{{ description }}</p>
        </article>
      </div>
    </section>
    <section id="sobre" class="px-5 py-24 text-center">
      <header class="reveal mb-10"><p class="kicker text-accent">Sobre mim</p><h2>O que tenho aprendido construindo</h2></header>
      <p class="reveal mx-auto max-w-[680px] text-base leading-[1.5]">Curso Análise e Desenvolvimento de Sistemas. Atuo em diferentes frentes, de interfaces a APIs e infraestrutura, e aprendo o que cada projeto exige. Nos projetos de delivery, aprendi a olhar para o que acontece depois do clique em “Pedir”: o cliente precisa saber se o pedido foi recebido e como acompanhá-lo. Publicar a pix-brcode trouxe outro desafio: escrever testes e exemplos para que alguém consiga usar meu código sem precisar falar comigo.</p>
      <figure class="editor reveal mx-auto mt-10 max-w-[600px] text-left" aria-label="Resumo do perfil em código TypeScript">
        <div class="editor-bar">
          <span class="editor-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="editor-tab"><img src="/media/TypeScript.svg" alt="" class="size-3.5">sobre.ts</span>
          <span class="editor-path">portfolio / src</span>
        </div>
        <pre class="editor-code"><code><span v-for="(l, n) in code" :key="n" class="ln" :class="{ cur: l.caret }" :style="{ '--i': l.i }"><span v-for="([c, t], k) in l.t" :key="k" :class="'tk-' + c">{{ t }}</span><span v-if="l.caret" class="caret"></span></span></code></pre>
        <div class="editor-status" aria-hidden="true"><span>TypeScript</span><span class="hidden sm:inline">UTF-8 · LF</span><span>Ln {{ code.length }}, Col 2</span></div>
      </figure>
      <a v-if="curriculo" :href="curriculo" download class="reveal lift mt-10 inline-block rounded-lg bg-accent px-6 py-3 font-medium text-page">Baixar currículo</a>
    </section>
    <footer id="contato" class="contact px-5 pt-32 pb-[200px] text-center">
      <canvas class="codebg" data-bg="contact" aria-hidden="true"></canvas>
      <p class="kicker text-[#bb72e9]">Contato</p><h2>Vamos conversar?</h2>
      <p class="mx-auto mt-2 max-w-[520px]">Quer conversar sobre uma vaga ou um projeto, web, mobile ou API? Me chame no LinkedIn. Posso apresentar os projetos acima e explicar as decisões técnicas por trás deles.</p>
      <ul class="mx-auto mt-12 grid max-w-[400px] gap-4 text-left">
        <li v-for="contact in contacts" :key="contact.name" class="reveal lift spot rounded-lg">
          <a :href="contact.href" class="icon-trigger flex items-center gap-3 rounded-lg bg-panel p-5 font-medium" >
            <AnimatedIcon :name="contact.icon" class="size-7" />{{ contact.name }}
            <AnimatedIcon :name="'ArrowUpRight'" class="ml-auto size-5" />
          </a>
        </li>
      </ul>
    </footer>
  </main>
</template>
