import { createApp } from 'vue';
import App from './App.vue';
import { vReveal, vSpot } from './efeitos';
import './styles.css';

// Abertura com o laser (fica de fora para quem prefere menos movimento)
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('abertura-ativa');
}

createApp(App).directive('reveal', vReveal).directive('spot', vSpot).mount('#app');
