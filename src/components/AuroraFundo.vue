<template>
  <div class="aurora" aria-hidden="true">
    <span class="bolha bolha--1"></span>
    <span class="bolha bolha--2"></span>
    <span class="bolha bolha--3"></span>
    <span class="bolha bolha--4"></span>
  </div>
</template>

<style scoped>
.aurora {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  background: var(--porcelana);
}
.bolha {
  position: absolute;
  aspect-ratio: 1;
  border-radius: 50%;
  will-change: transform;
  animation: deriva 30s ease-in-out infinite alternate;
}
.bolha--1 {
  width: 62vmax;
  top: -24vmax;
  left: -14vmax;
  background: radial-gradient(circle, rgb(224 50 95 / 0.26), transparent 65%);
}
.bolha--2 {
  width: 70vmax;
  top: 4vh;
  right: -28vmax;
  background: radial-gradient(circle, rgb(230 213 203 / 1), transparent 62%);
  animation-duration: 36s;
  animation-direction: alternate-reverse;
}
.bolha--3 {
  width: 64vmax;
  bottom: -30vmax;
  left: 12vw;
  background: radial-gradient(circle, rgb(186 164 214 / 0.5), transparent 64%);
  animation-duration: 42s;
}
.bolha--4 {
  width: 40vmax;
  top: 38vh;
  left: 34vw;
  background: radial-gradient(circle, rgb(158 27 60 / 0.14), transparent 65%);
  animation-duration: 48s;
  animation-direction: alternate-reverse;
}

@keyframes deriva {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(9vw, 7vh, 0) scale(1.16);
  }
  100% {
    transform: translate3d(-7vw, 12vh, 0) scale(0.94);
  }
}

@media (max-width: 760px) {
  .bolha {
    animation: none;
  }
}
</style>
