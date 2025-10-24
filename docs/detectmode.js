(() => {
  function setMode() {
    const isMobile = window.innerHeight > window.innerWidth;
    document.documentElement.classList.remove("mode-desktop", "mode-mobile");
    document.documentElement.classList.add(isMobile ? "mode-mobile" : "mode-desktop");
  }

  // run once at load
  setMode();

  // optional: re-run on orientationchange, but not on every resize
  window.addEventListener("orientationchange", setMode);
})();
