const locations = [
  { id: "chs", name: "Charleston, SC" },
  { id: "myr", name: "Myrtle Beach, SC" }
];

const categories = [
  { id: "baby", name: "Baby Equipment" },
  { id: "beach", name: "Beach Gear" },
  { id: "access", name: "Handicap Options" }
];

const products = [
  {
    id: "crib-01",
    name: "Premium Travel Crib",
    categoryId: "baby",
    pricePerDay: 14,
    imageUrl: "https://placeholder.example/baby-crib.jpg",
    shortDescription: "Sleep-safe, hotel-ready crib.",
    longDescription: "A calm, neutral crib with fresh linens and breathable sides.",
    specs: ["Fits 0-3 yrs", "Easy fold", "Mattress included"]
  },
  {
    id: "highchair-01",
    name: "Wipe-Clean High Chair",
    categoryId: "baby",
    pricePerDay: 9,
    imageUrl: "https://placeholder.example/baby-highchair.jpg",
    shortDescription: "Comfortable seating, easy cleanup.",
    longDescription: "Sturdy chair with removable tray and soft straps.",
    specs: ["3-point harness", "Tray included", "Lightweight"]
  },
  {
    id: "stroller-01",
    name: "Lightweight Stroller",
    categoryId: "baby",
    pricePerDay: 12,
    imageUrl: "https://placeholder.example/baby-stroller.jpg",
    shortDescription: "Smooth city & boardwalk rides.",
    longDescription: "Easy glide wheels, shade canopy, and compact fold.",
    specs: ["Recline seat", "Sun canopy", "Under-basket"]
  },
  {
    id: "monitor-01",
    name: "Audio Baby Monitor",
    categoryId: "baby",
    pricePerDay: 7,
    imageUrl: "https://placeholder.example/baby-monitor.jpg",
    shortDescription: "Clear audio with night light.",
    longDescription: "Reliable audio monitor for naps and bedtime.",
    specs: ["Night light", "Long range", "Two units"]
  },
  {
    id: "bouncer-01",
    name: "Soothing Baby Bouncer",
    categoryId: "baby",
    pricePerDay: 8,
    imageUrl: "https://placeholder.example/baby-bouncer.jpg",
    shortDescription: "Soft support with gentle motion.",
    longDescription: "Neutral bouncer with simple fold and washable cover.",
    specs: ["Machine-washable", "Lightweight", "Harness"]
  },
  {
    id: "tub-01",
    name: "Infant Bath Tub",
    categoryId: "baby",
    pricePerDay: 6,
    imageUrl: "https://placeholder.example/baby-tub.jpg",
    shortDescription: "Safe bathing setup.",
    longDescription: "Contoured tub for easy bathing and quick drainage.",
    specs: ["Non-slip base", "Drain plug", "0-12 months"]
  },
  {
    id: "wagon-01",
    name: "Beach Wagon",
    categoryId: "beach",
    pricePerDay: 12,
    imageUrl: "https://placeholder.example/beach-wagon.jpg",
    shortDescription: "Hauls towels, toys, and snacks.",
    longDescription: "Durable wheels and a sturdy frame for soft sand.",
    specs: ["Folds flat", "All-terrain wheels", "Cup holder"]
  },
  {
    id: "chair-01",
    name: "Comfort Beach Chair",
    categoryId: "beach",
    pricePerDay: 6,
    imageUrl: "https://placeholder.example/beach-chair.jpg",
    shortDescription: "Recline-ready coastal comfort.",
    longDescription: "Adjustable back with wood-tone accents.",
    specs: ["5 positions", "Lightweight", "Shoulder strap"]
  },
  {
    id: "umbrella-01",
    name: "Wide Beach Umbrella",
    categoryId: "beach",
    pricePerDay: 8,
    imageUrl: "https://placeholder.example/beach-umbrella.jpg",
    shortDescription: "Big shade, easy setup.",
    longDescription: "UV protection with sand anchor.",
    specs: ["UPF 50+", "Vent top", "Carry bag"]
  },
  {
    id: "toy-01",
    name: "Sand Toy Kit",
    categoryId: "beach",
    pricePerDay: 4,
    imageUrl: "https://placeholder.example/beach-toys.jpg",
    shortDescription: "Buckets, shovels, and molds.",
    longDescription: "A tidy set for beach play.",
    specs: ["10 pieces", "Lightweight", "Mesh bag"]
  },
  {
    id: "shower-01",
    name: "Portable Beach Shower",
    categoryId: "beach",
    pricePerDay: 7,
    imageUrl: "https://placeholder.example/beach-shower.jpg",
    shortDescription: "Quick rinse before heading in.",
    longDescription: "Solar-warm bag shower for sandy feet.",
    specs: ["5-gallon bag", "Easy hang", "No power"]
  },
  {
    id: "walker-01",
    name: "Rolling Walker",
    categoryId: "access",
    pricePerDay: 10,
    imageUrl: "https://placeholder.example/access-walker.jpg",
    shortDescription: "Stable and easy to maneuver.",
    longDescription: "Comfortable handles with a small storage pouch.",
    specs: ["Height adjustable", "Brakes", "Foldable"]
  }
];

const bundles = [
  {
    id: "bundle-baby",
    name: "Baby Sleep Set",
    items: [{ productId: "crib-01", qty: 1 }, { productId: "monitor-01", qty: 1 }],
    pricePerDay: 18,
    imageUrl: "https://placeholder.example/bundle-baby.jpg",
    description: "Crib + monitor for peaceful nights."
  },
  {
    id: "bundle-beach",
    name: "Beach Day Set",
    items: [{ productId: "chair-01", qty: 2 }, { productId: "umbrella-01", qty: 1 }],
    pricePerDay: 16,
    imageUrl: "https://placeholder.example/bundle-beach.jpg",
    description: "Shade and seating for two."
  },
  {
    id: "bundle-family",
    name: "Family Comfort Set",
    items: [{ productId: "wagon-01", qty: 1 }, { productId: "toy-01", qty: 1 }],
    pricePerDay: 14,
    imageUrl: "https://placeholder.example/bundle-family.jpg",
    description: "Carry-all plus play set."
  }
];

const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const state = {
  locationId: storage.get("qc_location", "chs"),
  orderMeta: storage.get("qc_order_meta", {
    startDate: "",
    endDate: "",
    deliveryAddress: ""
  }),
  contact: storage.get("qc_contact", {
    fullName: "",
    email: "",
    phone: "",
    notes: ""
  }),
  cart: storage.get("qc_cart", [])
};

const rentalsBase = window.location.pathname.toLowerCase().includes("/rentals/") ? "." : "RENTALS";
const rentalsPath = path => `${rentalsBase}/${path}`;
const parseDateLocal = value => {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

function saveState() {
  storage.set("qc_location", state.locationId);
  storage.set("qc_order_meta", state.orderMeta);
  storage.set("qc_contact", state.contact);
  storage.set("qc_cart", state.cart);
}

function getLocationName() {
  return locations.find(l => l.id === state.locationId)?.name || "—";
}

function getDays() {
  const { startDate, endDate } = state.orderMeta;
  if (!startDate || !endDate) return 1;
  const start = parseDateLocal(startDate);
  const end = parseDateLocal(endDate);
  if (!start || !end) return 1;
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff);
}

function formatMoney(value) {
  return `$${value.toFixed(0)}`;
}

function getProductById(id) {
  return products.find(p => p.id === id);
}

function cartSubtotal() {
  const days = getDays();
  return state.cart.reduce((sum, line) => {
    const item = getProductById(line.productId);
    if (!item) return sum;
    return sum + item.pricePerDay * line.qty * days;
  }, 0);
}

function addToCart(productId, qty = 1) {
  const existing = state.cart.find(line => line.productId === productId);
  if (existing) existing.qty += qty;
  else state.cart.push({ productId, qty });
  saveState();
  renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(line => line.productId !== productId);
  saveState();
  renderCart();
}

function updateQty(productId, delta) {
  const line = state.cart.find(l => l.productId === productId);
  if (!line) return;
  line.qty = Math.max(1, line.qty + delta);
  saveState();
  renderCart();
}

function renderCart() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const count = state.cart.reduce((sum, line) => sum + line.qty, 0);
    el.textContent = count;
  });

  document.querySelectorAll("[data-cart-subtotal]").forEach(el => {
    el.textContent = formatMoney(cartSubtotal());
  });

  document.querySelectorAll("[data-cart-items]").forEach(container => {
    container.innerHTML = "";
    if (!state.cart.length) {
      container.innerHTML = "<p class='muted'>Your cart is empty.</p>";
      return;
    }
    state.cart.forEach(line => {
      const item = getProductById(line.productId);
      if (!item) return;
      const row = document.createElement("div");
      row.className = "cart-line";
      row.innerHTML = `
        <div>
          <strong>${item.name}</strong><br/>
          <span class="muted">${formatMoney(item.pricePerDay)}/day</span>
        </div>
        <div class="cart-actions">
          <button data-dec="${item.id}">-</button>
          <span>${line.qty}</span>
          <button data-inc="${item.id}">+</button>
          <button data-remove="${item.id}">Remove</button>
        </div>
      `;
      container.appendChild(row);
    });
  });

  document.querySelectorAll("[data-meta-location]").forEach(el => {
    el.textContent = getLocationName();
  });
  document.querySelectorAll("[data-meta-dates]").forEach(el => {
    const { startDate, endDate } = state.orderMeta;
    el.textContent = startDate && endDate ? `${startDate} → ${endDate}` : "Dates not set";
  });
  document.querySelectorAll("[data-meta-address]").forEach(el => {
    el.textContent = state.orderMeta.deliveryAddress || "Address not set";
  });

  const hasItems = state.cart.length > 0;
  document.querySelectorAll("[data-mobile-cart]").forEach(el => {
    el.classList.toggle("show", hasItems);
  });
  const floating = document.querySelector("[data-floating-checkout]");
  if (floating) floating.style.display = hasItems ? "inline-flex" : "none";
}

function bindCartControls() {
  document.body.addEventListener("click", e => {
    const target = e.target;
    if (target.matches("[data-cart-open]")) {
      document.querySelector("[data-cart-drawer]")?.classList.add("open");
    }
    if (target.matches("[data-cart-close]")) {
      document.querySelector("[data-cart-drawer]")?.classList.remove("open");
    }
    if (target.matches("[data-inc]")) updateQty(target.dataset.inc, 1);
    if (target.matches("[data-dec]")) updateQty(target.dataset.dec, -1);
    if (target.matches("[data-remove]")) removeFromCart(target.dataset.remove);
    if (target.matches("[data-floating-checkout]")) window.location.href = rentalsPath("checkout.html");
  });
}

function bindLocationToggle() {
  document.querySelectorAll("[data-location-toggle] .seg-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.locationId = btn.dataset.location;
      saveState();
      syncLocationToggle();
      renderCart();
    });
  });
}

function syncLocationToggle() {
  document.querySelectorAll("[data-location-toggle] .seg-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.location === state.locationId);
  });
}

function bindOrderMetaForms() {
  document.querySelectorAll("[data-order-meta-form]").forEach(form => {
    const errorEl = form.querySelector("[data-form-error]");
    form.startDate.value = state.orderMeta.startDate || "";
    form.endDate.value = state.orderMeta.endDate || "";
    form.deliveryAddress.value = state.orderMeta.deliveryAddress || "";

    form.addEventListener("submit", e => {
      e.preventDefault();
      const startDate = form.startDate.value;
      const endDate = form.endDate.value;
      const deliveryAddress = form.deliveryAddress.value.trim();

      if (!startDate || !endDate || !deliveryAddress) {
        if (errorEl) errorEl.textContent = "Please add all trip details.";
        return;
      }
      state.orderMeta = { startDate, endDate, deliveryAddress };
      saveState();
      if (errorEl) errorEl.textContent = "";
      renderCart();
      if (document.body.dataset.page === "home") {
        window.location.href = rentalsPath("category.html?cat=baby");
      }
    });
  });
}

function renderCategoryPage() {
  if (document.body.dataset.page !== "category") return;
  const params = new URLSearchParams(window.location.search);
  const catId = params.get("cat") || "baby";
  const cat = categories.find(c => c.id === catId) || categories[0];

  document.querySelector("[data-category-title]").textContent = cat.name;
  document.querySelector("[data-category-badge]").textContent = "Category";
  document.querySelector("[data-category-intro]").textContent =
    cat.id === "baby"
      ? "Clean, comfort-first essentials delivered to your rental."
      : cat.id === "beach"
      ? "Soft-sand ready, light-to-carry beach gear."
      : "Accessibility rentals for a safe, easy stay.";

  const bundleGrid = document.querySelector("[data-bundles-grid]");
  bundleGrid.innerHTML = "";
  bundles.forEach(bundle => {
    const card = document.createElement("div");
    card.className = "bundle-card";
    card.innerHTML = `
      <div class="card-image" style="background-image:url('${bundle.imageUrl}')"></div>
      <strong>${bundle.name}</strong>
      <span class="muted">${bundle.description}</span>
      <span class="price">${formatMoney(bundle.pricePerDay)}/day</span>
      <button class="btn primary" data-bundle-add="${bundle.id}">Add bundle</button>
    `;
    bundleGrid.appendChild(card);
  });

  const productGrid = document.querySelector("[data-products-grid]");
  const searchInput = document.querySelector("[data-product-search]");
  const sortSelect = document.querySelector("[data-product-sort]");

  function renderProducts() {
    const term = searchInput.value.toLowerCase();
    let list = products.filter(p => p.categoryId === cat.id && p.name.toLowerCase().includes(term));
    if (sortSelect.value === "price-asc") list = list.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortSelect.value === "price-desc") list = list.sort((a, b) => b.pricePerDay - a.pricePerDay);

    productGrid.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="card-image" style="background-image:url('${item.imageUrl}')"></div>
        <strong>${item.name}</strong>
        <span class="muted">${item.shortDescription}</span>
        <span class="price">${formatMoney(item.pricePerDay)}/day</span>
        <div class="card-actions">
          <button class="btn primary" data-add="${item.id}">Quick add</button>
          <a class="btn secondary" href="product.html?id=${item.id}">View details</a>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", renderProducts);
  sortSelect.addEventListener("change", renderProducts);
  renderProducts();

  document.body.addEventListener("click", e => {
    const t = e.target;
    if (t.matches("[data-add]")) addToCart(t.dataset.add, 1);
    if (t.matches("[data-bundle-add]")) {
      const bundle = bundles.find(b => b.id === t.dataset.bundleAdd);
      if (!bundle) return;
      bundle.items.forEach(item => addToCart(item.productId, item.qty));
    }
  });
}

function renderProductPage() {
  if (document.body.dataset.page !== "product") return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = getProductById(id) || products[0];

  document.querySelector("[data-product-name]").textContent = product.name;
  document.querySelector("[data-product-price]").textContent = `${formatMoney(product.pricePerDay)}/day`;
  document.querySelector("[data-product-short]").textContent = product.shortDescription;
  document.querySelector("[data-product-long]").textContent = product.longDescription;
  document.querySelector("[data-product-category]").textContent =
    categories.find(c => c.id === product.categoryId)?.name || "Category";

  const imageEl = document.querySelector("[data-product-image]");
  imageEl.style.backgroundImage = `url('${product.imageUrl}')`;

  const specsEl = document.querySelector("[data-product-specs]");
  specsEl.innerHTML = "";
  product.specs.forEach(spec => {
    const li = document.createElement("li");
    li.textContent = spec;
    specsEl.appendChild(li);
  });

  const qtyInput = document.querySelector("[data-qty-input]");
  document.querySelector("[data-qty-inc]").addEventListener("click", () => qtyInput.value = Number(qtyInput.value) + 1);
  document.querySelector("[data-qty-dec]").addEventListener("click", () => qtyInput.value = Math.max(1, Number(qtyInput.value) - 1));
  document.querySelector("[data-add-to-cart]").addEventListener("click", () => addToCart(product.id, Number(qtyInput.value)));

  document.querySelector("[data-back-to-category]").href = rentalsPath(`category.html?cat=${product.categoryId}`);
}

function renderCheckoutPage() {
  if (document.body.dataset.page !== "checkout") return;

  const checkoutForm = document.querySelector("[data-checkout-form]");
  const checkoutError = document.querySelector("[data-checkout-error]");
  const submitBtn = document.querySelector("[data-checkout-submit]");
  const stepButtons = document.querySelectorAll("[data-next-step]");
  const steps = document.querySelectorAll(".checkout-step");

  const summaryName = document.querySelector("[data-summary-name]");
  const summaryEmail = document.querySelector("[data-summary-email]");
  const summaryDates = document.querySelector("[data-summary-dates]");
  const summaryAddress = document.querySelector("[data-summary-address]");
  const summaryLocation = document.querySelector("[data-summary-location]");

  function showStep(step) {
    steps.forEach(s => s.classList.toggle("active", s.dataset.step === String(step)));
  }

  function syncSummary() {
    summaryName.textContent = state.contact.fullName || "—";
    summaryEmail.textContent = state.contact.email || "—";
    const { startDate, endDate, deliveryAddress } = state.orderMeta;
    summaryDates.textContent = startDate && endDate ? `${startDate} → ${endDate}` : "—";
    summaryAddress.textContent = deliveryAddress || "—";
    summaryLocation.textContent = getLocationName();
  }

  checkoutForm.fullName.value = state.contact.fullName || "";
  checkoutForm.email.value = state.contact.email || "";
  checkoutForm.phone.value = state.contact.phone || "";
  checkoutForm.notes.value = state.contact.notes || "";

  checkoutForm.addEventListener("input", () => {
    state.contact.fullName = checkoutForm.fullName.value.trim();
    state.contact.email = checkoutForm.email.value.trim();
    state.contact.phone = checkoutForm.phone.value.trim();
    state.contact.notes = checkoutForm.notes.value.trim();
    saveState();
    syncSummary();
  });

  stepButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.nextStep);
      if (btn.closest("[data-step='1']")) {
        const metaForm = document.querySelector("[data-order-meta-form]");
        if (!metaForm.checkValidity()) {
          metaForm.reportValidity();
          return;
        }
      }
      if (btn.closest("[data-step='2']")) {
        if (!checkoutForm.checkValidity()) {
          checkoutForm.reportValidity();
          return;
        }
      }
      showStep(target);
      syncSummary();
    });
  });

  checkoutForm.addEventListener("submit", async e => {
    e.preventDefault();
    const { startDate, endDate, deliveryAddress } = state.orderMeta;
    if (!startDate || !endDate || !deliveryAddress) {
      checkoutError.textContent = "Please add trip details before paying.";
      return;
    }
    if (!state.cart.length) {
      checkoutError.textContent = "Your cart is empty.";
      return;
    }
    checkoutError.textContent = "";
    await startStripeCheckout(state.cart, state.orderMeta);
    alert("Stripe checkout stub. Connect backend to proceed.");
  });

  submitBtn?.addEventListener("click", () => {
    checkoutForm.requestSubmit();
  });

  syncSummary();
}

function initCarousel() {
  const track = document.querySelector("[data-carousel-track]");
  if (!track) return;
  const slides = Array.from(track.children);
  if (slides.length < 2) return;
  let index = 0;
  setInterval(() => {
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000);
}

function initCalendar() {
  const calendars = document.querySelectorAll("[data-calendar]");
  if (!calendars.length) return;

  const instances = [];

  calendars.forEach(cal => {
    const grid = cal.querySelector("[data-cal-grid]");
    const monthLabel = cal.querySelector("[data-cal-month]");
    const selectedLabel = cal.querySelector("[data-cal-selected]");
    const prevBtn = cal.querySelector("[data-cal-prev]");
    const nextBtn = cal.querySelector("[data-cal-next]");
    const form = cal.closest("form");
    const startInput = form?.querySelector("input[name='startDate']");
    const endInput = form?.querySelector("input[name='endDate']");

    let viewDate = new Date();

    function formatDate(d) {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    function sameDay(a, b) {
      return a && b && a.toDateString() === b.toDateString();
    }

    function render() {
      const start = parseDateLocal(state.orderMeta.startDate);
      const end = parseDateLocal(state.orderMeta.endDate);
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const startDay = firstDay.getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      monthLabel.textContent = firstDay.toLocaleString("en-US", { month: "long", year: "numeric" });
      grid.innerHTML = "";

      for (let i = 0; i < startDay; i++) {
        const empty = document.createElement("div");
        empty.className = "cal-day inactive";
        empty.textContent = "";
        grid.appendChild(empty);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cal-day";
        btn.innerHTML = `<span class="cal-day-num">${day}</span>`;

        const hasSelection = !!start;
        const inRange = start && end && date >= start && date <= end;
        if (!hasSelection) btn.classList.add("no-selection");
        if (inRange) btn.classList.add("range");
        if (sameDay(date, start)) btn.classList.add("selected", "start");
        if (sameDay(date, end)) btn.classList.add("selected", "end");

        btn.addEventListener("click", () => {
          const currentStart = parseDateLocal(state.orderMeta.startDate);
          const currentEnd = parseDateLocal(state.orderMeta.endDate);
          if (!start || (start && end)) {
            state.orderMeta.startDate = formatDate(date);
            state.orderMeta.endDate = "";
          } else if (date < start) {
            state.orderMeta.startDate = formatDate(date);
            state.orderMeta.endDate = "";
          } else {
            state.orderMeta.endDate = formatDate(date);
          }
          saveState();
          updateSelected();
          renderAllCalendars();
          renderCart();
        });
        grid.appendChild(btn);
      }
    }

    function updateSelected() {
      const start = parseDateLocal(state.orderMeta.startDate);
      const end = parseDateLocal(state.orderMeta.endDate);
      if (startInput) startInput.value = start ? formatDate(start) : "";
      if (endInput) endInput.value = end ? formatDate(end) : "";
      if (start && end) {
        selectedLabel.textContent = `${formatDate(start)} → ${formatDate(end)}`;
      } else if (start) {
        selectedLabel.textContent = `Start: ${formatDate(start)} — select end date`;
      } else {
        selectedLabel.textContent = "Pick start and end dates";
      }
    }

    prevBtn?.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
      render();
    });
    nextBtn?.addEventListener("click", () => {
      viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
      render();
    });

    instances.push({ render, updateSelected });
  });

  function renderAllCalendars() {
    instances.forEach(i => {
      i.updateSelected();
      i.render();
    });
  }

  renderAllCalendars();
}

function init() {
  bindCartControls();
  bindLocationToggle();
  syncLocationToggle();
  bindOrderMetaForms();
  renderCategoryPage();
  renderProductPage();
  renderCheckoutPage();
  initCarousel();
  initCalendar();
  renderCart();
}

document.addEventListener("DOMContentLoaded", init);
