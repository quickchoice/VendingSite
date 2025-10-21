// Stagger fallback + reflection sweep trigger
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slot").forEach((el, i) => {
    el.style.animationDelay = `${0.08 * (i + 1)}s`;
    el.addEventListener("click", () => {
      // Optional: tiny “click” sound
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type="square"; o.frequency.value=440; g.gain.value=0.04;
        o.connect(g); g.connect(ctx.destination);
        o.start(); setTimeout(()=>{o.stop(); ctx.close()}, 90);
      } catch {}
    });
  });
});
