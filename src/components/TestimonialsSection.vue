<script setup>
import { ref } from 'vue';
import { depoimentos, site } from '../content';
import { dividirTitulo, reduzirMovimento } from '../efeitos';

const [tituloInicio, tituloFim] = dividirTitulo(depoimentos.titulo);
const lista = ref(null);

function rolar(direcao) {
  const el = lista.value;
  const item = el.querySelector('li');
  const passo = item ? item.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth * 0.8;
  el.scrollBy({ left: direcao * passo, behavior: reduzirMovimento() ? 'auto' : 'smooth' });
}
</script>

<template>
  <section class="depo secao" aria-labelledby="depo-titulo">
    <div class="depo__orbe" aria-hidden="true"></div>

    <div class="wrap depo__topo">
      <h2 id="depo-titulo" v-reveal class="titulo-secao">
        {{ tituloInicio }}<em>{{ tituloFim }}</em>
      </h2>
      <div v-reveal="120" class="depo__controles">
        <a :href="site.avaliacoes" class="link" target="_blank" rel="noopener">{{ depoimentos.linkAvaliacoes }}</a>
        <button
          type="button"
          class="depo__seta botao--vidro"
          aria-label="Depoimento anterior"
          aria-controls="depo-lista"
          @click="rolar(-1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
          type="button"
          class="depo__seta botao--vidro"
          aria-label="Próximo depoimento"
          aria-controls="depo-lista"
          @click="rolar(1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <ul id="depo-lista" ref="lista" class="depo__lista" tabindex="0" aria-label="Depoimentos, role para o lado para ver mais">
      <li v-for="(d, i) in depoimentos.itens" :key="d.nome" v-reveal.vidro="i * 90" v-spot class="depo__item vidro">
        <figure>
          <span class="depo__aspas" aria-hidden="true">“</span>
          <blockquote>
            <p>{{ d.texto }}</p>
          </blockquote>
          <figcaption>
            <span class="depo__avatar" aria-hidden="true">{{ d.nome.charAt(0) }}</span>
            <span>
              <span class="depo__nome">{{ d.nome }}</span>
              <span class="depo__proc">{{ d.procedimento }}</span>
            </span>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.depo__orbe {
  position: absolute;
  top: 35%;
  left: 20%;
  width: 60vw;
  height: 26rem;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgb(224 50 95 / 0.18), rgb(186 164 214 / 0.16) 50%, transparent);
  pointer-events: none;
}

.depo__topo {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem 2rem;
}
.depo__controles {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.depo__controles .link {
  margin-right: 1rem;
}
.depo__seta {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.45s var(--mola), box-shadow 0.45s var(--ease);
}
.depo__seta:hover {
  transform: scale(1.08);
}
.depo__seta:active {
  transform: scale(0.95);
}
.depo__seta svg {
  width: 1.2rem;
  height: 1.2rem;
  fill: none;
  stroke: var(--ameixa);
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.depo__lista {
  --inicio: max(var(--gutter), calc((100vw - var(--largura)) / 2));
  display: flex;
  gap: clamp(1rem, 2.5vw, 1.75rem);
  margin: clamp(1.5rem, 5vw, 3rem) 0 -3rem;
  padding: 2rem var(--inicio) 6rem;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: var(--inicio);
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}
.depo__lista::-webkit-scrollbar {
  display: none;
}
.depo__lista:focus-visible {
  outline-offset: -4px;
  border-radius: var(--raio);
}

.depo__item {
  flex: 0 0 min(84%, 27rem);
  scroll-snap-align: start;
  padding: 2rem 2rem 1.75rem;
  border-radius: 32px;
}
.depo__item figure {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
}
.depo__aspas {
  height: 3.2rem;
  font-family: var(--font-titulo);
  font-weight: 600;
  font-size: 5rem;
  line-height: 1;
  background: linear-gradient(160deg, var(--rubi-luz), var(--rubi-escuro));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.depo__item blockquote {
  margin: 0.75rem 0 0;
}
.depo__item blockquote p {
  font-family: var(--font-titulo);
  font-weight: 300;
  letter-spacing: -0.02em;
  font-size: clamp(1.15rem, 2vw, 1.35rem);
  line-height: 1.45;
}
.depo__item figcaption {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: auto;
  padding-top: 1.75rem;
  font-size: 0.92rem;
}
.depo__avatar {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: linear-gradient(145deg, var(--rubi-luz), var(--rubi-escuro));
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.5), 0 6px 14px -6px rgb(158 27 60 / 0.7);
  color: #fff;
  font-family: var(--font-titulo);
  font-weight: 500;
  font-size: 1.05rem;
}
.depo__nome,
.depo__proc {
  display: block;
}
.depo__nome {
  font-weight: 600;
}
.depo__proc {
  color: var(--nevoa);
}

@media (max-width: 520px) {
  .depo__controles .link {
    margin-right: auto;
  }
  .depo__controles {
    width: 100%;
  }
}
</style>
