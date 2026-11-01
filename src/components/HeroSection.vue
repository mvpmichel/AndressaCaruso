<script setup>
import { onMounted, ref } from 'vue';
import { hero, site } from '../content';

const palavras = hero.titulo.split(' ').map((texto) => ({
  texto,
  destaque: texto.replace(/[.,!?]/g, '') === hero.destaque,
}));

const secao = ref(null);
const interativo = ref(false);
let raf = 0;
let ponteiro;

onMounted(() => {
  interativo.value = matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches;
});

function mover(e) {
  if (!interativo.value) return;
  ponteiro = e;
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    const el = secao.value;
    const r = el.getBoundingClientRect();
    const x = (ponteiro.clientX - r.left) / r.width;
    const y = (ponteiro.clientY - r.top) / r.height;
    el.style.setProperty('--px', `${x * 100}%`);
    el.style.setProperty('--py', `${y * 100}%`);
    el.style.setProperty('--dx', (x - 0.5).toFixed(3));
    el.style.setProperty('--dy', (y - 0.5).toFixed(3));
  });
}
</script>

<template>
  <section id="topo" ref="secao" class="hero" aria-labelledby="hero-titulo" @pointermove="mover">
    <div class="hero__luz" aria-hidden="true"></div>

    <div class="wrap hero__grid">
      <div class="hero__texto">
        <h1 id="hero-titulo" class="hero__titulo">
          <template v-for="(p, i) in palavras" :key="i">
            <span class="hero__palavra"
              ><span :class="{ 'texto-brilho': p.destaque }" :style="{ '--i': i }">{{ p.texto }}</span></span
            >{{ ' ' }}
          </template>
        </h1>
        <p class="hero__lead">{{ hero.texto }}</p>
        <div class="hero__acoes">
          <a :href="site.whatsappCom(hero.mensagem)" class="botao" target="_blank" rel="noopener">
            {{ hero.cta }} <span class="botao__seta" aria-hidden="true">→</span>
          </a>
          <a :href="hero.linkSecundario.href" class="botao botao--vidro">{{ hero.linkSecundario.texto }}</a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__orbe" aria-hidden="true"></div>
        <div class="hero__anel" aria-hidden="true"></div>

        <div class="hero__cena">
          <figure class="hero__foto foto-tratada">
            <img :src="hero.imagem.src" :alt="hero.imagem.alt" width="900" height="1200" fetchpriority="high" />
            <span class="hero__varredura" aria-hidden="true"></span>
          </figure>
          <span class="hero__feixe" aria-hidden="true"></span>
          <span class="hero__ponto" aria-hidden="true"></span>
        </div>

        <div v-for="(c, i) in hero.chips" :key="c.titulo" class="hero__chip-pos" :class="`hero__chip-pos--${i + 1}`">
          <p class="hero__chip vidro">
            <strong>{{ c.titulo }}</strong>
            <span>{{ c.texto }}</span>
          </p>
        </div>
      </div>
    </div>

    <a href="#sobre" class="hero__rolar" :aria-label="hero.rolar">
      <span aria-hidden="true">{{ hero.rolar }}</span>
      <i aria-hidden="true"></i>
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  min-height: calc(100svh - var(--header));
  padding-block: clamp(2.5rem, 6vw, 4rem) clamp(5rem, 9vw, 7rem);
}
.hero__luz {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: radial-gradient(640px circle at var(--px, 72%) var(--py, 45%), rgb(224 50 95 / 0.13), transparent 60%);
  transition: background 0.2s linear;
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: clamp(3rem, 6vw, 6rem);
  align-items: center;
}

/* Título: cada palavra sobe por trás de uma máscara */
.hero__titulo {
  font-size: clamp(2.7rem, 6.2vw, 5.5rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
}
.hero__palavra {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0 0.04em 0.14em 0;
  margin-bottom: -0.14em;
}
.hero__palavra > span {
  display: inline-block;
  animation: palavra-sobe 1.1s var(--ease) calc(0.2s + var(--i) * 0.08s) both, brilho-texto 7s ease-in-out 2s infinite;
}
.hero__palavra > span:not(.texto-brilho) {
  animation: palavra-sobe 1.1s var(--ease) calc(0.2s + var(--i) * 0.08s) both;
}
@keyframes palavra-sobe {
  from {
    transform: translateY(110%) rotate(6deg);
  }
  to {
    transform: none;
  }
}

.hero__lead {
  max-width: 34rem;
  margin-top: 2rem;
  font-size: 1.18rem;
  color: var(--nevoa);
  animation: sobe-suave 1.2s var(--ease) 0.75s both;
}
.hero__acoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
  margin-top: 2.5rem;
  animation: sobe-suave 1.2s var(--ease) 0.9s both;
}
@keyframes sobe-suave {
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
}

/* Visual */
.hero__visual {
  position: relative;
  justify-self: center;
  width: min(100%, 30rem);
}
.hero__orbe {
  position: absolute;
  inset: 12% -18% -8% 10%;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(224 50 95 / 0.45), rgb(158 27 60 / 0.15) 45%, transparent 70%);
  filter: blur(30px);
  animation: pulsa 7s ease-in-out infinite alternate;
}
.hero__anel {
  position: absolute;
  inset: -7% -9%;
  z-index: -1;
  border: 1px solid rgb(158 27 60 / 0.22);
  border-radius: 999px 999px 48px 48px;
  transform: translate(calc(var(--dx, 0) * -18px), calc(var(--dy, 0) * -18px));
  transition: transform 0.6s var(--ease);
  animation: aparece 1.6s var(--ease) 1s both;
}
@keyframes pulsa {
  to {
    transform: scale(1.12);
    opacity: 0.75;
  }
}
@keyframes aparece {
  from {
    opacity: 0;
    scale: 0.92;
  }
}

.hero__cena {
  position: relative;
  transform: perspective(1400px) rotateX(calc(var(--dy, 0) * -7deg)) rotateY(calc(var(--dx, 0) * 9deg));
  transition: transform 0.7s var(--ease);
}
.hero__foto {
  aspect-ratio: 3 / 4;
  border-radius: 999px 999px 32px 32px;
  box-shadow: 0 50px 90px -40px rgb(42 34 48 / 0.65);
  animation: foto-abre 1.5s var(--ease) 0.25s both;
}
.hero__foto img {
  animation: foto-zoom 2.2s var(--ease) 0.25s both;
}
@keyframes foto-abre {
  from {
    clip-path: inset(100% 0 0 0 round 999px 999px 32px 32px);
  }
  to {
    clip-path: inset(0 0 0 0 round 999px 999px 32px 32px);
  }
}
@keyframes foto-zoom {
  from {
    transform: scale(1.3);
  }
}

/* Assinatura: o feixe cruza a foto uma vez e termina num ponto de luz */
.hero__feixe,
.hero__ponto {
  position: absolute;
  top: 62%;
  pointer-events: none;
  z-index: 2;
}
.hero__feixe {
  left: -3.5rem;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--rubi) 12%, var(--rubi-luz) 85%, #fff);
  box-shadow: 0 0 6px 1px rgb(224 50 95 / 0.65), 0 0 22px 3px rgb(224 50 95 / 0.3);
  transform-origin: left center;
  animation: feixe 1.3s cubic-bezier(0.65, 0, 0.35, 1) 1.3s both;
}
.hero__ponto {
  right: 0;
  width: 8px;
  height: 8px;
  margin: -3.5px -4px 0 0;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px 2px var(--rubi-luz), 0 0 24px 8px rgb(224 50 95 / 0.45), 0 0 60px 16px rgb(224 50 95 / 0.2);
  animation: ponto 0.7s var(--mola) 2.5s both, ponto-respira 3.2s ease-in-out 3.2s infinite;
}
/* Faixa de luz que acompanha o feixe dentro da foto */
.hero__varredura {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(90deg, transparent 0 40%, rgb(255 220 230 / 0.35) 50%, transparent 60% 100%);
  mix-blend-mode: screen;
  transform: translateX(-100%);
  animation: varre 1.3s cubic-bezier(0.65, 0, 0.35, 1) 1.3s both;
}
@keyframes feixe {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
@keyframes varre {
  0% {
    transform: translateX(-100%);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}
@keyframes ponto {
  from {
    transform: scale(0);
  }
}
@keyframes ponto-respira {
  50% {
    transform: scale(1.35);
  }
}

/* Cards de vidro flutuando sobre a foto */
.hero__chip-pos {
  position: absolute;
  z-index: 3;
  transform: translate(calc(var(--dx, 0) * 26px), calc(var(--dy, 0) * 26px));
  transition: transform 0.6s var(--ease);
}
.hero__chip-pos--1 {
  left: -14%;
  bottom: 12%;
}
.hero__chip-pos--2 {
  right: -10%;
  top: 16%;
}
.hero__chip {
  display: grid;
  gap: 0.1rem;
  margin: 0;
  padding: 1rem 1.35rem;
  border-radius: 22px;
  font-size: 0.88rem;
  line-height: 1.35;
  animation: chip-entra 1s var(--mola) 2s both, flutua 6s ease-in-out 3s infinite alternate;
}
.hero__chip-pos--2 .hero__chip {
  animation-delay: 2.2s, 3.4s;
}
.hero__chip strong {
  font-family: var(--font-titulo);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
  color: var(--rubi);
}
.hero__chip span {
  max-width: 11rem;
  color: var(--ameixa);
}
@keyframes chip-entra {
  from {
    transform: translateY(1.5rem) scale(0.3);
  }
}
@keyframes flutua {
  to {
    transform: translateY(-12px);
  }
}

/* Indicador de rolagem */
.hero__rolar {
  position: absolute;
  left: 50%;
  bottom: 1.75rem;
  display: grid;
  justify-items: center;
  gap: 0.6rem;
  font-size: 0.8rem;
  color: var(--nevoa);
  text-decoration: none;
  transform: translateX(-50%);
  animation: sobe-suave 1s var(--ease) 2.6s both;
}
.hero__rolar i {
  position: relative;
  width: 1px;
  height: 2.75rem;
  overflow: hidden;
  background: var(--linha);
}
.hero__rolar i::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, var(--rubi-luz));
  animation: desce 2.2s var(--ease) infinite;
}
@keyframes desce {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}

@media (max-width: 900px) {
  .hero {
    min-height: auto;
  }
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero__visual {
    width: min(82%, 24rem);
    margin-top: 1rem;
  }
  .hero__feixe {
    left: -12%;
  }
  .hero__chip-pos--1 {
    left: -12%;
  }
  .hero__chip-pos--2 {
    right: -12%;
  }
  .hero__rolar {
    display: none;
  }
}
@media (max-width: 480px) {
  .hero__chip {
    padding: 0.75rem 1rem;
    font-size: 0.8rem;
  }
  .hero__chip strong {
    font-size: 1.3rem;
  }
}
</style>
