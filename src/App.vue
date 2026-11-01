<script setup>
import AberturaLaser from './components/AberturaLaser.vue';
import AuroraFundo from './components/AuroraFundo.vue';
import ProgressoLaser from './components/ProgressoLaser.vue';
import SiteHeader from './components/SiteHeader.vue';
import HeroSection from './components/HeroSection.vue';
import FaixaMarquee from './components/FaixaMarquee.vue';
import AboutSection from './components/AboutSection.vue';
import TreatmentsSection from './components/TreatmentsSection.vue';
import CoursesSection from './components/CoursesSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';
import ContactSection from './components/ContactSection.vue';
</script>

<template>
  <AberturaLaser />
  <AuroraFundo />
  <ProgressoLaser />
  <a href="#conteudo" class="pular">Pular para o conteúdo</a>
  <SiteHeader />
  <main id="conteudo" tabindex="-1">
    <HeroSection />
    <FaixaMarquee />
    <AboutSection />
    <TreatmentsSection />
    <CoursesSection />
    <TestimonialsSection />
    <ContactSection />
  </main>
</template>

<style>
#conteudo:focus {
  outline: none;
}
</style>
