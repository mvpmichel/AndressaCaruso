<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { sobre } from '../content';
import { dividirTitulo, reduzirMovimento } from '../efeitos';

const [tituloInicio, tituloFim] = dividirTitulo(sobre.titulo);
const formatar = (n) => n.toLocaleString('pt-BR');

const numeros = ref(sobre.numeros.map(() => 0));
const lista = ref(null);
let io;

function contar() {
  const inicio = performance.now();
  const duracao = 2000;
  const passo = (agora) => {
    const k = Math.min(1, (agora - inicio) / duracao);
    const e = 1 - Math.pow(1 - k, 4);
    numeros.value = sobre.numeros.map((n) => Math.round(n.valor * e));
    if (k < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

onMounted(() => {
  if (reduzirMovimento() || !('IntersectionObserver' in window)) {
    numeros.value = sobre.numeros.map((n) => n.valor);
    return;
  }
  io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      contar();
    },
    { threshold: 0.5 },
  );
  io.observe(lista.value);
});
onBeforeUnmount(() => io?.disconnect());
</script>

<template>
  <section id="sobre" class="sobre secao" aria-labelledby="sobre-titulo">
    <div class="sobre__orbe" aria-hidden="true"></div>

    <div class="wrap sobre__grid">
      <div class="sobre__visual" v-reveal>
        <figure class="sobre__foto foto-tratada parallax">
          <img :src="sobre.imagem.src" :alt="sobre.imagem.alt" width="800" height="1000" loading="lazy" />
        </figure>
        <span class="sobre__assinatura" aria-hidden="true">Andressa</span>
      </div>

      <div v-reveal.vidro="120" v-spot class="sobre__painel vidro">
        <h2 id="sobre-titulo" class="titulo-secao">
          {{ tituloInicio }}<em class="nome-marca">{{ tituloFim }}</em>
        </h2>
        <div class="sobre__paragrafos">
          <p v-for="(p, i) in sobre.paragrafos" :key="i">{{ p }}</p>
        </div>

        <ul ref="lista" class="sobre__numeros">
          <li v-for="(n, i) in sobre.numeros" :key="n.rotulo">
            <strong aria-hidden="true">{{ formatar(numeros[i]) }}<span class="sobre__sufixo">{{ n.sufixo }}</span></strong>
            <span class="sr-only">{{ formatar(n.valor) }}{{ n.sufixo }}</span>
            <span>{{ n.rotulo }}</span>
          </li>
        </ul>

        <dl class="sobre__fatos">
          <div v-for="f in sobre.fatos" :key="f.termo">
            <dt>{{ f.termo }}</dt>
            <dd>{{ f.valor }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sobre__orbe {
  position: absolute;
  top: 10%;
  left: -10%;
  width: 55vw;
  aspect-ratio: 1;
  z-index: -1;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(230 213 203 / 0.95), transparent 65%);
  pointer-events: none;
}

.sobre__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  align-items: center;
}
.sobre__visual {
  position: relative;
  grid-column: 1;
  grid-row: 1;
}
.sobre__foto {
  aspect-ratio: 4 / 5;
  border-radius: 32px;
  box-shadow: 0 50px 90px -45px rgb(42 34 48 / 0.6);
}
.sobre__assinatura {
  position: absolute;
  left: -1.5rem;
  bottom: -2.5rem;
  z-index: 2;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(3.5rem, 8vw, 6.5rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgb(158 27 60 / 0.55);
  pointer-events: none;
}

/* O painel de vidro invade a foto: o desfoque mostra a imagem por trás */
.sobre__painel {
  z-index: 3;
  grid-column: 2;
  grid-row: 1;
  margin-left: -5rem;
  padding: clamp(2rem, 4vw, 3.5rem);
  border-radius: 36px;
}
.sobre__paragrafos {
  display: grid;
  gap: 1rem;
  max-width: 36rem;
  margin-top: 1.75rem;
}

.sobre__numeros {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
.sobre__numeros li {
  display: grid;
  gap: 0.15rem;
  font-size: 0.9rem;
  color: var(--nevoa);
}
.sobre__numeros strong {
  font-family: var(--font-titulo);
  font-size: clamp(2rem, 3.6vw, 2.9rem);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  background: linear-gradient(160deg, var(--ameixa) 30%, var(--rubi));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sobre__sufixo {
  margin-left: 0.05em;
  font-size: 0.7em;
  color: var(--rubi-luz);
  -webkit-text-fill-color: var(--rubi-luz);
}

.sobre__fatos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2rem;
  margin: 2.25rem 0 0;
  padding-top: 1.75rem;
  border-top: 1px solid var(--linha);
}
.sobre__fatos dt {
  font-size: 0.85rem;
  color: var(--nevoa);
}
.sobre__fatos dd {
  margin: 0.15rem 0 0;
  font-family: var(--font-titulo);
  font-weight: 400;
  letter-spacing: -0.02em;
  font-size: 1.05rem;
  line-height: 1.3;
}

@media (max-width: 900px) {
  .sobre__grid {
    grid-template-columns: 1fr;
  }
  .sobre__visual {
    width: min(78%, 22rem);
  }
  .sobre__painel {
    grid-column: 1;
    grid-row: 2;
    margin: -5rem 0 0;
  }
  .sobre__assinatura {
    left: auto;
    right: -3rem;
    bottom: auto;
    top: 1rem;
  }
}
@media (max-width: 520px) {
  .sobre__numeros {
    gap: 0.5rem;
  }
  .sobre__numeros strong {
    font-size: 1.9rem;
  }
  .sobre__fatos {
    grid-template-columns: 1fr;
  }
}
</style>
