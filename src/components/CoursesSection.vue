<script setup>
import { cursos, site } from '../content';
import { dividirTitulo } from '../efeitos';

const [tituloInicio, tituloFim] = dividirTitulo(cursos.titulo);
const mensagem = (nome) => `Olá, Andressa! Tenho interesse no curso "${nome}". Pode me passar as próximas datas?`;
</script>

<template>
  <section id="cursos" class="cursos secao" aria-labelledby="cursos-titulo">
    <div class="cursos__luzes" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="wrap">
      <div class="cursos__topo">
        <h2 id="cursos-titulo" v-reveal class="titulo-secao">
          {{ tituloInicio }}<em>{{ tituloFim }}</em>
        </h2>
        <p v-reveal="120" class="cursos__intro">{{ cursos.intro }}</p>
      </div>

      <div class="cursos__lista">
        <template v-for="(c, i) in cursos.itens" :key="c.nome">
          <span v-if="i > 0" v-reveal class="cursos__divisor" aria-hidden="true"></span>
          <article v-reveal.vidro="i * 140" v-spot class="curso vidro vidro--escuro">
            <span class="curso__borda" aria-hidden="true"></span>
            <span class="curso__num" aria-hidden="true">0{{ i + 1 }}</span>
            <h3 class="curso__nome">{{ c.nome }}</h3>
            <p class="curso__descricao">{{ c.descricao }}</p>
            <dl class="curso__dados">
              <div>
                <dt>Formato</dt>
                <dd>{{ c.formato }}</dd>
              </div>
              <div>
                <dt>Carga horária</dt>
                <dd>{{ c.carga }}</dd>
              </div>
              <div>
                <dt>Para quem</dt>
                <dd>{{ c.publico }}</dd>
              </div>
            </dl>
            <a
              :href="site.whatsappCom(mensagem(c.nome))"
              class="botao botao--claro"
              target="_blank"
              rel="noopener"
              :aria-label="`Quero saber mais sobre o curso ${c.nome} pelo WhatsApp`"
            >
              Quero saber mais <span class="botao__seta" aria-hidden="true">→</span>
            </a>
          </article>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cursos {
  overflow: hidden;
  isolation: isolate;
  background: var(--ameixa);
  color: var(--porcelana);
  border-radius: clamp(28px, 5vw, 56px);
  margin-inline: clamp(0.5rem, 1.5vw, 1.25rem);
}
.cursos :focus-visible {
  outline-color: var(--porcelana);
}

/* Luzes que se movem atrás do vidro escuro */
.cursos__luzes span {
  position: absolute;
  z-index: -1;
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
  animation: luz 18s ease-in-out infinite alternate;
}
.cursos__luzes span:nth-child(1) {
  width: 42rem;
  top: -12rem;
  right: -8rem;
  background: radial-gradient(circle, rgb(224 50 95 / 0.5), transparent 65%);
}
.cursos__luzes span:nth-child(2) {
  width: 34rem;
  bottom: -14rem;
  left: -6rem;
  background: radial-gradient(circle, rgb(158 27 60 / 0.6), transparent 65%);
  animation-duration: 22s;
  animation-direction: alternate-reverse;
}
.cursos__luzes span:nth-child(3) {
  width: 26rem;
  top: 40%;
  left: 40%;
  background: radial-gradient(circle, rgb(186 164 214 / 0.28), transparent 65%);
  animation-duration: 26s;
}
@keyframes luz {
  50% {
    transform: translate(-6rem, 4rem) scale(1.15);
  }
  100% {
    transform: translate(4rem, -3rem) scale(0.9);
  }
}

.cursos__topo {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 1.5rem 3rem;
  align-items: end;
}
.cursos__intro {
  max-width: 30rem;
  color: rgb(243 241 244 / 0.72);
}

.cursos__lista {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 1px minmax(0, 1fr);
  gap: clamp(1.5rem, 3vw, 2.5rem);
  margin-top: clamp(3rem, 7vw, 5rem);
}

/* Linha vertical: um feixe de laser com um pulso de luz descendo */
.cursos__divisor {
  position: relative;
  background: linear-gradient(to bottom, transparent, rgb(224 50 95 / 0.7) 20%, rgb(224 50 95 / 0.7) 80%, transparent);
  box-shadow: 0 0 10px rgb(224 50 95 / 0.5);
  overflow: hidden;
}
.cursos__divisor::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, transparent, #fff, transparent);
  animation: pulso 3.5s var(--ease) infinite;
}
@keyframes pulso {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(340%);
  }
}

.curso {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: 32px;
}

/* Borda de luz que gira devagar */
.curso__borda {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  pointer-events: none;
  background: conic-gradient(from var(--angulo), transparent 0 70%, rgb(224 50 95 / 0.9) 85%, transparent 100%);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: gira 8s linear infinite;
}
.curso:nth-of-type(2) .curso__borda {
  animation-delay: -4s;
}
@keyframes gira {
  to {
    --angulo: 360deg;
  }
}

.curso__num {
  font-family: var(--font-titulo);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--rubi-luz);
}
.curso__nome {
  margin-top: 0.5rem;
  font-size: clamp(1.55rem, 2.6vw, 2.1rem);
}
.curso__descricao {
  margin-top: 1.25rem;
  color: rgb(243 241 244 / 0.8);
}
.curso__dados {
  display: grid;
  gap: 0.9rem;
  width: 100%;
  margin: 2rem 0 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgb(243 241 244 / 0.16);
}
.curso__dados div {
  display: grid;
  grid-template-columns: 8.5rem minmax(0, 1fr);
  gap: 1rem;
}
.curso__dados dt {
  color: rgb(243 241 244 / 0.58);
  font-size: 0.95rem;
}
.curso__dados dd {
  margin: 0;
}
.curso .botao {
  margin-top: auto;
}

@media (max-width: 860px) {
  .cursos__topo,
  .cursos__lista {
    grid-template-columns: 1fr;
  }
  .cursos__divisor {
    height: 1px;
    margin-inline: 10%;
    background: linear-gradient(90deg, transparent, rgb(224 50 95 / 0.7), transparent);
  }
  .cursos__divisor::after {
    display: none;
  }
}
@media (max-width: 480px) {
  .curso__dados div {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
