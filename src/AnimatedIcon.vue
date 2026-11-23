<script setup lang="ts">
defineProps<{ name: string }>()
const brands = ['Node.js', 'Vue', 'TypeScript', 'Fastify', 'Docker']
</script>

<template>
  <span class="motion-icon" :data-icon="name" aria-hidden="true">
    <img v-if="brands.includes(name)" :src="'/media/' + name + '.svg'" alt="">
    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">
      <g v-if="name === 'ArrowUpRight'"><g> <path pathLength="1" d="M7 7H17" /> <path pathLength="1" d="M17 7V17" /> <path pathLength="1" d="M7 17L17 7" /> </g></g>
      <g v-else-if="name === 'HardDrives'"><g> <rect pathLength="1" height="8" rx="2" ry="2" width="20" x="2" y="2" /> <line pathLength="1" x1="6" x2="10" y1="6" y2="6" /> </g> <g> <rect pathLength="1" height="8" rx="2" ry="2" width="20" x="2" y="14" /> <line pathLength="1" x1="6" x2="10" y1="18" y2="18" /> </g></g>
      <g v-else-if="name === 'GithubLogo'"><path pathLength="1" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /> <path pathLength="1" d="M9 18c-4.51 2-5-2-7-2" /></g>
      <g v-else-if="name === 'LinkedinLogo'"><path pathLength="1" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /> <rect pathLength="1" height="12" width="4" x="2" y="9" /> <circle pathLength="1" cx="4" cy="4" r="2" /></g>
      <g v-else-if="name === 'Code'"><path pathLength="1" d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-14-4 18"/></g>
      <g v-else-if="name === 'CaretDoubleDown'"><path pathLength="1" d="m7 6 5 5 5-5"/><path pathLength="1" d="m7 13 5 5 5-5"/></g>
      <g v-else-if="name === 'Devices'"><rect pathLength="1" x="2" y="3" width="16" height="13" rx="2"/><path pathLength="1" d="M6 20h7m-4-4v4"/><rect pathLength="1" x="15" y="9" width="7" height="12" rx="1.5" fill="var(--color-page)"/></g>
      <g v-else-if="name === 'Infinity'"><path pathLength="1" d="M12 12c-2-3-4-5-6-5a5 5 0 0 0 0 10c2 0 4-2 6-5s4-5 6-5a5 5 0 0 1 0 10c-2 0-4-2-6-5Z"/></g>
    </svg>
  </span>
</template>

<style>
.motion-icon { display: inline-flex; flex-shrink: 0; aspect-ratio: 1; }
.motion-icon > * { width: 100%; height: 100%; }
.motion-icon[data-icon="Code"] { color: #82bc4f; }
.motion-icon[data-icon="ArrowUpRight"] { color: #3996db; }
.motion-icon[data-icon="Devices"] { color: #bb72e9; }
.motion-icon[data-icon="HardDrives"] { color: #eabd5f; }
.motion-icon[data-icon="Infinity"] { color: #82bc4f; }
@media (prefers-reduced-motion: no-preference) {
  :is(.icon-trigger:hover, .icon-trigger:focus-visible, .icon-trigger:active) .motion-icon {
    img { animation: icon-lift .42s ease-out; }
    :is(path, rect, circle, line) { stroke-dasharray: 1; animation: icon-trace .48s ease-out; }
    &[data-icon="ArrowUpRight"] svg > g { animation: icon-arrow .38s ease-out; }
    &[data-icon="CaretDoubleDown"] svg > g { animation: icon-down .45s ease-out; }
    &[data-icon="HardDrives"] svg > g > g { animation: icon-rack .65s ease-in-out; }
    &[data-icon="HardDrives"] svg > g > g:last-child { --rack-shift: -12px; }
  }
}
@keyframes icon-trace { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes icon-arrow { 45% { transform: translate(-4px, 4px); } }
@keyframes icon-down { 50% { transform: translateY(2px); } }
@keyframes icon-rack { 40%, 60% { transform: translateY(var(--rack-shift, 12px)); } }
@keyframes icon-lift { 45% { transform: translateY(-2px) rotate(-6deg); } }
</style>
