<script setup>
import { contato, site } from '../content';
import { dividirTitulo } from '../efeitos';
import LogoAC from './LogoAC.vue';

const [tituloInicio, tituloFim] = dividirTitulo(contato.titulo);
const ano = new Date().getFullYear();
const telefoneLink = `tel:+${site.whatsapp}`;
</script>

<template>
  <section id="contato" class="contato secao" aria-labelledby="contato-titulo">
    <LogoAC class="contato__logo-fundo" />

    <div class="wrap">
      <div v-reveal.vidro v-spot class="contato__painel vidro">
        <div class="contato__chamada">
          <h2 id="contato-titulo" class="titulo-secao contato__titulo">
            {{ tituloInicio }}<em>{{ tituloFim }}</em>
          </h2>
          <p class="contato__texto">{{ contato.texto }}</p>
          <a :href="site.whatsappCom(contato.mensagem)" class="botao contato__cta" target="_blank" rel="noopener">
            {{ contato.cta }} <span class="botao__seta" aria-hidden="true">→</span>
          </a>
        </div>

        <dl class="contato__dados">
          <div>
            <dt>Telefone e WhatsApp</dt>
            <dd>
              <a :href="telefoneLink" class="link">{{ site.telefone }}</a>
            </dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>
              <a :href="`mailto:${site.email}`" class="link">{{ site.email }}</a>
            </dd>
          </div>
          <div>
            <dt>Instagram</dt>
            <dd>
              <a :href="site.instagram" class="link" target="_blank" rel="noopener">{{ site.instagramUser }}</a>
            </dd>
          </div>
          <div>
            <dt>Endereço</dt>
            <dd>
              <address>
                <span v-for="linha in site.endereco" :key="linha">{{ linha }}<br /></span>
              </address>
              <a :href="site.mapa" class="link contato__mapa" target="_blank" rel="noopener">Ver no mapa</a>
            </dd>
          </div>
          <div>
            <dt>Horário</dt>
            <dd>{{ site.horario }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <footer class="rodape">
    <div class="wrap rodape__inner">
      <a href="#topo" class="rodape__marca">
        <LogoAC class="rodape__logo" />
        <span>{{ site.nome }}</span>
      </a>
      <p>{{ contato.rodape }}</p>
      <p>© {{ ano }} {{ site.nome }}. Todos os direitos reservados.</p>
    </div>
    <p class="rodape__assinatura" aria-hidden="true">{{ site.nome }}</p>
  </footer>
</template>

<style scoped>
.contato {
  overflow: clip;
}
/* O logo gigante fica atrás do vidro e aparece desfocado */
.contato__logo-fundo {
  position: absolute;
  top: 50%;
  right: max(2vw, calc((100vw - var(--largura)) / 2));
  width: min(34rem, 62vw);
  z-index: -1;
  opacity: 0.16;
  transform: translateY(-50%) rotate(-8deg);
  pointer-events: none;
}

.contato__painel {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 3rem clamp(2.5rem, 6vw, 5rem);
  padding: clamp(2rem, 5vw, 4.5rem);
  border-radius: clamp(28px, 4vw, 48px);
}
.contato__titulo {
  font-size: clamp(2.6rem, 6vw, 4.6rem);
}
.contato__texto {
  max-width: 30rem;
  margin: 1.5rem 0 2.5rem;
  color: var(--nevoa);
}

/* Anel de luz pulsando em volta do CTA (na sombra do próprio botão) */
.contato__cta {
  min-height: 3.75rem;
  padding-inline: 2.25rem;
  font-size: 1.05rem;
  animation: anel 2.6s ease-out infinite;
}
@keyframes anel {
  from {
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -2px 8px rgb(0 0 0 / 0.18),
      0 12px 30px -12px rgb(158 27 60 / 0.75), 0 0 0 0 rgb(224 50 95 / 0.5);
  }
  to {
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35), inset 0 -2px 8px rgb(0 0 0 / 0.18),
      0 12px 30px -12px rgb(158 27 60 / 0.75), 0 0 0 18px rgb(224 50 95 / 0);
  }
}

.contato__dados {
  align-self: center;
  margin: 0;
}
.contato__dados div {
  display: grid;
  grid-template-columns: 10rem minmax(0, 1fr);
  gap: 0.25rem 1.5rem;
  padding-block: 1.1rem;
  border-bottom: 1px solid var(--linha);
}
.contato__dados div:first-child {
  border-top: 1px solid var(--linha);
}
.contato__dados dt {
  color: var(--nevoa);
  font-size: 0.92rem;
}
.contato__dados dd {
  margin: 0;
  overflow-wrap: anywhere;
}
.contato__dados address {
  font-style: normal;
}
.contato__mapa {
  display: inline-block;
  margin-top: 0.35rem;
  font-size: 0.92rem;
}

.rodape {
  position: relative;
  overflow: hidden;
  padding-top: 2.5rem;
  font-size: 0.9rem;
  color: var(--nevoa);
}
.rodape__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem 2rem;
}
.rodape__marca {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--ameixa);
  text-decoration: none;
}
.rodape__logo {
  width: 2.25rem;
  height: 2.25rem;
}
.rodape__assinatura {
  margin: 2rem 0 -0.2em;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 12.5vw, 13rem);
  line-height: 0.85;
  letter-spacing: -0.03em;
  text-align: center;
  white-space: nowrap;
  background: linear-gradient(to bottom, rgb(158 27 60 / 0.35), rgb(42 34 48 / 0.04) 85%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  user-select: none;
}

@media (max-width: 860px) {
  .contato__painel {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 480px) {
  .contato__dados div {
    grid-template-columns: 1fr;
  }
  .rodape__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
