<script setup>
import { faixa } from '../content';
</script>

<template>
  <div class="faixa" aria-hidden="true">
    <div class="faixa__trilho vidro">
      <div class="faixa__fita">
        <template v-for="n in 2" :key="n">
          <span v-for="t in faixa" :key="`${n}-${t}`" class="faixa__item">
            {{ t }}
            <i class="faixa__ponto"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faixa {
  position: relative;
  z-index: 2;
  margin-block: -1.5rem 0;
  padding-block: 2rem;
}
.faixa__trilho {
  width: 112vw;
  margin-left: -6vw;
  padding-block: 1.1rem;
  border-radius: 0;
  overflow: hidden;
  transform: rotate(-2deg);
}
.faixa__fita {
  display: flex;
  width: max-content;
  animation: rolar 45s linear infinite;
}
.faixa:hover .faixa__fita {
  animation-play-state: paused;
}
.faixa__item {
  display: inline-flex;
  align-items: center;
  gap: 2.25rem;
  padding-right: 2.25rem;
  font-family: var(--font-titulo);
  font-weight: 300;
  letter-spacing: -0.03em;
  font-size: clamp(1.35rem, 2.8vw, 2.1rem);
  white-space: nowrap;
}
.faixa__ponto {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--rubi-luz);
  box-shadow: 0 0 8px 2px rgb(224 50 95 / 0.6), 0 0 18px 4px rgb(224 50 95 / 0.25);
}

@keyframes rolar {
  to {
    transform: translateX(-50%);
  }
}
</style>
