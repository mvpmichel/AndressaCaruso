<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { contato, site } from '../content';

// main.js adiciona "abertura-ativa" no <html> antes de montar o app:
// isso trava a rolagem e pausa as animações do hero até a tela se abrir.
const raiz = document.documentElement;
const ativa = ref(raiz.classList.contains('abertura-ativa'));
const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
const timers = [];

function abrir() {
  raiz.classList.remove('abertura-ativa');
}
function limpar() {
  timers.forEach(clearTimeout);
  eventos.forEach((e) => removeEventListener(e, terminar));
}
function terminar() {
  abrir();
  ativa.value = false;
  limpar();
}

onMounted(() => {
  if (!ativa.value) return;
  // 1.45s: as metades começam a se abrir · 2.55s: a abertura sai do DOM
  timers.push(setTimeout(abrir, 1450), setTimeout(terminar, 2550));
  eventos.forEach((e) => addEventListener(e, terminar, { passive: true }));
});
onBeforeUnmount(limpar);
</script>

<template>
  <div v-if="ativa" class="abertura" aria-hidden="true">
    <div class="abertura__metade abertura__metade--cima">
      <p class="abertura__nome">{{ site.nome }}</p>
    </div>
    <div class="abertura__metade abertura__metade--baixo">
      <p class="abertura__frase">{{ contato.rodape }}</p>
    </div>
    <span class="abertura__clarao"></span>
    <span class="abertura__feixe"></span>
    <span class="abertura__cabeca"></span>
  </div>
</template>

<style scoped>
.abertura {
  --corte: cubic-bezier(0.7, 0, 0.2, 1);
  position: fixed;
  inset: 0;
  z-index: 110;
  overflow: hidden;
  pointer-events: none;
}

/* As duas metades da tela escura, que se separam no corte do laser */
.abertura__metade {
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  display: flex;
  justify-content: center;
  background-color: var(--noite);
  animation: 1s cubic-bezier(0.77, 0, 0.18, 1) 1.45s both;
}
.abertura__metade--cima {
  top: 0;
  align-items: flex-end;
  padding-bottom: clamp(1.25rem, 3vh, 2rem);
  background-image: radial-gradient(ellipse 70% 45% at 50% 100%, rgb(158 27 60 / 0.32), transparent 70%);
  animation-name: abre-cima;
}
.abertura__metade--baixo {
  bottom: 0;
  align-items: flex-start;
  padding-top: clamp(1.25rem, 3vh, 2rem);
  background-image: radial-gradient(ellipse 70% 45% at 50% 0%, rgb(158 27 60 / 0.32), transparent 70%);
  animation-name: abre-baixo;
}
/* Borda em brasa ao longo do corte */
.abertura__metade::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--rubi-luz);
  box-shadow: 0 0 10px 2px rgb(224 50 95 / 0.85), 0 0 40px 8px rgb(224 50 95 / 0.35);
  opacity: 0;
  animation: brasa 1.4s ease-out 1.25s both;
}
.abertura__metade--cima::after {
  bottom: 0;
}
.abertura__metade--baixo::after {
  top: 0;
}

.abertura__nome {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 6vw, 4.25rem);
  line-height: 1;
  color: var(--porcelana);
  white-space: nowrap;
  animation: nome-entra 1.1s var(--ease) 0.05s both;
}
.abertura__frase {
  font-size: clamp(0.8rem, 1.6vw, 0.95rem);
  letter-spacing: 0.04em;
  color: rgb(243 241 244 / 0.55);
  animation: frase-entra 0.9s var(--ease) 0.35s both;
}

/* O feixe que rasga a tela */
.abertura__feixe {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  margin-top: -1px;
  transform-origin: left center;
  background: linear-gradient(90deg, rgb(224 50 95 / 0), var(--rubi) 12%, var(--rubi-luz) 70%, #fff);
  box-shadow: 0 0 8px 1px rgb(224 50 95 / 0.8), 0 0 30px 4px rgb(224 50 95 / 0.4);
  animation: corta 0.85s var(--corte) 0.35s both, incendeia 0.3s ease-out 1.2s both, some 0.45s ease 1.6s forwards;
}
/* Ponto de luz que puxa o feixe */
.abertura__cabeca {
  position: absolute;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px 4px var(--rubi-luz), 0 0 40px 14px rgb(224 50 95 / 0.55), 0 0 90px 30px rgb(224 50 95 / 0.25);
  animation: corre 0.85s var(--corte) 0.35s both;
}
.abertura__cabeca::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220px;
  height: 2px;
  margin: -1px 0 0 -110px;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  opacity: 0.8;
}
/* Clarão no instante do corte */
.abertura__clarao {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 140vmax;
  height: 40vmax;
  margin: -20vmax 0 0 -70vmax;
  background: radial-gradient(closest-side, rgb(255 230 238 / 0.55), rgb(224 50 95 / 0.25) 40%, transparent);
  opacity: 0;
  animation: clarao 0.9s ease-out 1.2s both;
}

@keyframes nome-entra {
  from {
    opacity: 0;
    letter-spacing: 0.25em;
    filter: blur(10px);
  }
  to {
    opacity: 0.92;
    letter-spacing: 0.01em;
    filter: blur(0);
  }
}
@keyframes frase-entra {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}
@keyframes corta {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes corre {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
}
@keyframes incendeia {
  to {
    box-shadow: 0 0 14px 3px rgb(255 200 215 / 0.95), 0 0 60px 14px rgb(224 50 95 / 0.6),
      0 0 140px 40px rgb(224 50 95 / 0.25);
  }
}
@keyframes some {
  to {
    opacity: 0;
  }
}
@keyframes clarao {
  0% {
    opacity: 0;
    transform: scaleY(0.2);
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scaleY(1);
  }
}
@keyframes brasa {
  0% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
@keyframes abre-cima {
  to {
    transform: translateY(-100%);
  }
}
@keyframes abre-baixo {
  to {
    transform: translateY(100%);
  }
}
</style>
