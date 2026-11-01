// Diretivas e utilitários de movimento usados pelas seções.

export const reduzirMovimento = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Separa a última palavra de um título para receber o destaque em itálico.
export function dividirTitulo(titulo) {
  const i = titulo.lastIndexOf(' ');
  return i === -1 ? ['', titulo] : [titulo.slice(0, i + 1), titulo.slice(i + 1)];
}

let observador;
function obterObservador() {
  if (observador || typeof IntersectionObserver === 'undefined') return observador;
  observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-visivel');
        observador.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  return observador;
}

// v-reveal="atrasoEmMs" · v-reveal.vidro para superfícies de vidro (sem opacidade)
export const vReveal = {
  mounted(el, { value, modifiers }) {
    el.classList.add('revelar');
    if (modifiers.vidro) el.classList.add('revelar--vidro');
    if (value) el.style.setProperty('--atraso', `${value}ms`);
    const io = obterObservador();
    if (!io || reduzirMovimento()) return el.classList.add('is-visivel');
    io.observe(el);
  },
  unmounted(el) {
    observador?.unobserve(el);
  },
};

// v-spot: o reflexo de luz do vidro segue o ponteiro
export const vSpot = {
  mounted(el) {
    el._spot = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    el.addEventListener('pointermove', el._spot);
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._spot);
  },
};
