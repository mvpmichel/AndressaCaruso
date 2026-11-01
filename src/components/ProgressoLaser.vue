<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const barra = ref(null);
let raf = 0;

function atualizar() {
  raf = 0;
  const max = document.documentElement.scrollHeight - innerHeight;
  barra.value?.style.setProperty('--p', (max > 0 ? scrollY / max : 0).toFixed(4));
}
function aoRolar() {
  if (!raf) raf = requestAnimationFrame(atualizar);
}

onMounted(() => {
  atualizar();
  addEventListener('scroll', aoRolar, { passive: true });
  addEventListener('resize', aoRolar);
});
onBeforeUnmount(() => {
  removeEventListener('scroll', aoRolar);
  removeEventListener('resize', aoRolar);
  cancelAnimationFrame(raf);
});
</script>

<template>
  <div ref="barra" class="progresso" aria-hidden="true">
    <span class="progresso__feixe"></span>
    <span class="progresso__ponto"></span>
  </div>
</template>

<style scoped>
.progresso {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
  height: 2px;
  pointer-events: none;
}
.progresso__feixe {
  position: absolute;
  inset: 0;
  transform-origin: left;
  transform: scaleX(var(--p, 0));
  background: linear-gradient(90deg, transparent, var(--rubi) 30%, var(--rubi-luz));
  box-shadow: 0 0 8px rgb(224 50 95 / 0.7);
}
.progresso__ponto {
  position: absolute;
  top: -2px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px 2px var(--rubi-luz), 0 0 16px 4px rgb(224 50 95 / 0.5);
  transform: translateX(calc(var(--p, 0) * 100vw));
  opacity: min(1, calc(var(--p, 0) * 40));
}
</style>
