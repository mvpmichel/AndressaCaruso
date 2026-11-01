<script setup>
import { ref } from 'vue';
import { site } from '../content';
import LogoAC from './LogoAC.vue';

const aberto = ref(false);
const links = [
  { href: '#sobre', texto: 'Sobre' },
  { href: '#procedimentos', texto: 'Procedimentos' },
  { href: '#cursos', texto: 'Cursos' },
  { href: '#contato', texto: 'Contato' },
];
</script>

<template>
  <header class="header">
    <div class="wrap header__inner">
      <a href="#topo" class="header__marca">
        <LogoAC class="header__logo" />
        <span>{{ site.nome }}</span>
      </a>

      <button class="header__menu" :aria-expanded="aberto" aria-controls="nav-principal" @click="aberto = !aberto">
        {{ aberto ? 'Fechar' : 'Menu' }}
      </button>

      <nav id="nav-principal" class="header__nav" :class="{ 'is-open': aberto }">
        <a v-for="l in links" :key="l.href" :href="l.href" @click="aberto = false">{{ l.texto }}</a>
        <a :href="site.whatsappLink" class="botao botao--pequeno" target="_blank" rel="noopener"> Agendar avaliação </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: color-mix(in srgb, var(--porcelana) 88%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--linha);
}
.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.25rem;
}
.header__marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--ameixa);
  text-decoration: none;
}
.header__logo {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}
.header__nav a:not(.botao) {
  color: var(--ameixa);
  text-decoration: none;
  font-size: 0.95rem;
}
.header__nav a:not(.botao):hover {
  color: var(--rubi);
}
.header__menu {
  display: none;
}

@media (max-width: 760px) {
  .header__menu {
    display: block;
    padding: 0.4rem 1rem;
    border: 1px solid var(--ameixa);
    border-radius: 999px;
    background: none;
    color: var(--ameixa);
    font: inherit;
    cursor: pointer;
  }
  .header__nav {
    display: none;
    position: absolute;
    inset: 100% 0 auto 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.5rem 1.25rem 2rem;
    background: var(--porcelana);
    border-bottom: 1px solid var(--linha);
  }
  .header__nav.is-open {
    display: flex;
  }
}
</style>
