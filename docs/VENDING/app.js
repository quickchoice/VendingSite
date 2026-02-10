
(function () {
  const ticker = document.getElementById('ticker');
  let t1 = document.getElementById('tickerText');
  if (!ticker || !t1) return;

  // Clone for seamless loop
  let t2 = t1.cloneNode(true);
  t2.id = 'tickerTextClone';
  t2.style.display = 'none';
  ticker.appendChild(t2);

  // --- step-motion controls ---
  const STEP_PX = 10;        // move this many pixels per tick
  const TICK_MS = 100;       // pause between steps (ms). 30–60ms feels “LED driver”-ish
  const TRIGGER = -2;       // when to spawn the clone

  let cw = 0;
  let x1 = 0, x2 = 0;       // logical/displayed positions (we only set in steps)
  let w1 = 0, w2 = 0;

  // fixed-step timer
  let last = null;
  let acc = 0;

  function layout() {
    // reset transforms/positions before measuring
    t1.style.transform = 'none';
    t2.style.transform = 'none';
    t1.style.left = '0px';
    t2.style.left = '0px';

    w1 = t1.offsetWidth;
    w2 = w1;
    cw = ticker.clientWidth;

    x1 = cw;
    t1.style.left = x1 + 'px';

    x2 = 0;
    t2.style.display = 'none';

    last = null;
    acc = 0;
  }

  function stepOnce() {
    // advance primary
    x1 -= STEP_PX;
    t1.style.left = x1 + 'px';

    // spawn clone when first reaches trigger
    if (t2.style.display === 'none' && x1 <= TRIGGER) {
      x2 = cw;
      t2.style.left = x2 + 'px';
      t2.style.display = 'block';
    }

    // advance clone if active
    if (t2.style.display === 'block') {
      x2 -= STEP_PX;
      t2.style.left = x2 + 'px';
    }

    // wrap + swap when primary fully left
    if (x1 <= -w1) {
      if (t2.style.display === 'block') {
        x1 = x2 + w2;   // place behind the visible one
      } else {
        x1 = cw;        // fallback (should rarely happen)
      }
      t1.style.left = x1 + 'px';

      // swap nodes/vars
      let tmpEl = t1; t1 = t2; t2 = tmpEl;
      let tmpX  = x1; x1 = x2;  x2 = tmpX;
      let tmpW  = w1; w1 = w2;  w2 = tmpW;

      // hide the one that just wrapped to become the “next” copy
      t2.style.display = 'none';
    }
  }

  function raf(ts) {
    if (last == null) { last = ts; requestAnimationFrame(raf); return; }
    acc += (ts - last);
    last = ts;

    // do fixed-size steps at fixed intervals; never accelerate
    while (acc >= TICK_MS) {
      acc -= TICK_MS;
      stepOnce();
    }

    requestAnimationFrame(raf);
  }

  const ro = new ResizeObserver(layout);
  ro.observe(ticker);
  layout();
  requestAnimationFrame(raf);
})();



/* ===== Fit the vending machine to the viewport (no scroll, centered) ===== */
(function () {
  const root  = document.documentElement;
  const stack = document.querySelector('.vm__stack');
  if (!stack) return;

  function fit() {
    // Reset before measuring
    root.style.setProperty('--vm-scale', 1);
    root.style.setProperty('--vm-x', '0px');
    root.style.setProperty('--vm-y', '0px');

    const styles = getComputedStyle(root);
    const vw = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    const margin = parseFloat(styles.getPropertyValue('--fit-margin'))  || 0;
    const nudgeY = parseFloat(styles.getPropertyValue('--fit-nudge-y')) || 0;
    const mult   = parseFloat(styles.getPropertyValue('--fit-scale-mult')) || 1;

    // Measure natural size (scale=1) of whole stack
    const rect = stack.getBoundingClientRect();
    const natW = rect.width;
    const natH = rect.height;

    // Uniform scale to fit, then apply extra multiplier (phones use <1)
    const scaleX = (vw - margin * 2) / natW;
    const scaleY = (vh - margin * 2) / natH;
    let scale  = Math.min(scaleX, scaleY);
    scale = Math.max(0.1, scale * mult);

    const usedW = natW * scale;
    const usedH = natH * scale;

    const x = Math.round((vw - usedW) / 2);
    const y = Math.round((vh - usedH) / 2 + nudgeY);

    root.style.setProperty('--vm-scale', scale.toFixed(3));
    root.style.setProperty('--vm-x', `${x}px`);
    root.style.setProperty('--vm-y', `${y}px`);
  }

  let raf;
  const queue = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); };

  window.addEventListener('load', fit, { once: true });
  window.addEventListener('resize', queue, { passive: true });
  window.addEventListener('orientationchange', queue, { passive: true });

  // iOS URL bar height jitter
  let lastVh = window.innerHeight;
  setInterval(() => {
    const now = window.innerHeight;
    if (Math.abs(now - lastVh) > 8) { lastVh = now; queue(); }
  }, 400);
})();