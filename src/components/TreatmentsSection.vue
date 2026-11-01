<script setup>
import { procedimentos, site } from '../content';

const mensagem = (nome) => `Olá, Andressa! Gostaria de saber mais sobre ${nome.toLowerCase()}.`;
</script>

<template>
  <section id="procedimentos" class="trat secao" aria-labelledby="trat-titulo">
    <div class="trat__orbe" aria-hidden="true"></div>

    <div class="wrap">
      <header class="trat__topo">
        <h2 id="trat-titulo" v-reveal class="titulo-secao">{{ procedimentos.titulo }}</h2>
        <p v-reveal="120" class="trat__intro">{{ procedimentos.intro }}</p>
      </header>

      <div v-for="(g, gi) in procedimentos.grupos" :key="g.nome" class="trat__grupo">
        <div class="trat__lado">
          <div class="trat__fixo" v-reveal>
            <span class="trat__num" aria-hidden="true">0{{ gi + 1 }}</span>
            <h3 :id="`grupo-${gi}`" class="trat__categoria">{{ g.nome }}</h3>
            <figure class="trat__foto foto-tratada parallax">
              <img :src="g.imagem.src" :alt="g.imagem.alt" width="800" height="600" loading="lazy" />
            </figure>
          </div>
        </div>

        <ul class="trat__lista" :aria-labelledby="`grupo-${gi}`">
          <li v-for="(item, ii) in g.itens" :key="item.nome" v-reveal.vidro="ii * 90" v-spot class="trat__li vidro">
            <details class="trat__item" :name="`grupo-${gi}`">
              <summary>
                <span class="trat__nome">{{ item.nome }}</span>
                <span class="trat__resumo">{{ item.resumo }}</span>
                <span class="trat__icone" aria-hidden="true"></span>
              </summary>
              <div class="trat__corpo">
                <p>{{ item.detalhes }}</p>
                <p class="trat__sessoes">
                  <span class="trat__sessoes-rotulo">Sessões</span>
                  {{ item.sessoes }}
                </p>
                <a :href="site.whatsappCom(mensagem(item.nome))" class="link" target="_blank" rel="noopener">
                  Perguntar sobre {{ item.nome.toLowerCase() }}
                </a>
              </div>
            </details>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trat__orbe {
  position: absolute;
  top: 30%;
  right: -15%;
  width: 50vw;
  aspect-ratio: 1;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(224 50 95 / 0.16), transparent 65%);
  pointer-events: none;
}

.trat__topo {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 1.5rem clamp(2rem, 5vw, 4rem);
  align-items: end;
  margin-bottom: clamp(3rem, 7vw, 5rem);
}
.trat__intro {
  max-width: 34rem;
  color: var(--nevoa);
}

.trat__grupo {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  gap: 2rem clamp(2rem, 5vw, 4rem);
  padding-block: 3rem;
}
.trat__grupo + .trat__grupo {
  border-top: 1px solid var(--linha);
}
.trat__fixo {
  position: sticky;
  top: calc(var(--header) + 2rem);
}
.trat__num {
  display: block;
  font-family: var(--font-titulo);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--rubi);
}
.trat__categoria {
  margin-top: 0.4rem;
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
}
.trat__foto {
  aspect-ratio: 4 / 3;
  margin-top: 1.75rem;
  border-radius: 24px;
  box-shadow: 0 40px 70px -40px rgb(42 34 48 / 0.55);
}

.trat__lista {
  display: grid;
  align-content: start;
  gap: 0.9rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.trat__li {
  border-radius: 24px;
}

.trat__item summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.2rem 1.5rem;
  padding: 1.5rem 1.6rem;
  border-radius: 24px;
  list-style: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}
.trat__item summary::-webkit-details-marker {
  display: none;
}
.trat__nome {
  font-family: var(--font-titulo);
  font-weight: 400;
  letter-spacing: -0.025em;
  font-size: 1.3rem;
  line-height: 1.2;
  transition: color 0.3s ease;
}
.trat__resumo {
  grid-column: 1;
  color: var(--nevoa);
}
.trat__item summary:hover .trat__nome,
.trat__item[open] .trat__nome {
  color: var(--rubi);
}

/* + que vira −, dentro de uma bolha de vidro */
.trat__icone {
  position: relative;
  grid-column: 2;
  grid-row: 1 / span 2;
  align-self: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.55);
  box-shadow: var(--vidro-brilho), 0 6px 16px -8px rgb(42 34 48 / 0.35);
  transition: transform 0.5s var(--mola), background 0.3s ease;
}
.trat__icone::before,
.trat__icone::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.95rem;
  height: 1.5px;
  margin: -0.75px 0 0 -0.475rem;
  background: var(--rubi);
  transition: transform 0.5s var(--mola), background 0.3s ease;
}
.trat__icone::after {
  transform: rotate(90deg);
}
.trat__item summary:hover .trat__icone {
  transform: scale(1.08);
}
.trat__item[open] .trat__icone {
  transform: rotate(180deg);
  background: var(--rubi);
}
.trat__item[open] .trat__icone::before,
.trat__item[open] .trat__icone::after {
  background: #fff;
}
.trat__item[open] .trat__icone::after {
  transform: rotate(90deg) scaleX(0);
}

/* Abertura suave (navegadores que suportam ::details-content) */
.trat__item::details-content {
  block-size: 0;
  overflow: clip;
  opacity: 0;
  transition: block-size 0.6s var(--ease), opacity 0.5s ease, content-visibility 0.6s allow-discrete;
}
.trat__item[open]::details-content {
  block-size: auto;
  opacity: 1;
}

.trat__corpo {
  display: grid;
  justify-items: start;
  gap: 1rem;
  max-width: 40rem;
  padding: 0 1.6rem 1.75rem;
}
.trat__sessoes {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}
.trat__sessoes-rotulo {
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  background: rgb(158 27 60 / 0.1);
  color: var(--rubi);
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 860px) {
  .trat__topo,
  .trat__grupo {
    grid-template-columns: 1fr;
  }
  .trat__fixo {
    position: static;
  }
  .trat__foto {
    aspect-ratio: 16 / 9;
  }
}
@media (max-width: 480px) {
  .trat__item summary {
    padding: 1.25rem;
  }
  .trat__corpo {
    padding: 0 1.25rem 1.5rem;
  }
  .trat__icone {
    width: 2.25rem;
    height: 2.25rem;
  }
}
</style>
