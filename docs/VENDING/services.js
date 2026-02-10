const ITEMS = [
  // Snacks
  { n:"Clif Bars", c:"snacks", img:"../public/web-assets/snacks/clif.webp" },
  { n:"Granola Bars", c:"snacks", img:"../public/web-assets/snacks/granolabar.webp" },
  { n:"Trail Mix", c:"snacks", img:"../public/web-assets/snacks/trail.jpg" },
  { n:"Pop-Tarts", c:"snacks", img:"../public/web-assets/snacks/poptart.png" },
  { n:"Jerky", c:"snacks", img:"../public/web-assets/snacks/jerky.png" },

  // Chips
  { n:"Sun Chips", c:"chips", img:"../public/web-assets/snacks/sun chip.png" },
  { n:"Doritos", c:"chips", img:"../public/web-assets/snacks/dorito.jpg" },
  { n:"Ruffles", c:"chips", img:"../public/web-assets/snacks/ruffle.webp" },
  { n:"Cheez-Its", c:"crackers", img:"../public/web-assets/snacks/cheezit.webp" },
  { n:"Cheetos", c:"chips", img:"../public/web-assets/snacks/cheeto.webp" },
  { n:"Chex Mix", c:"snacks", img:"../public/web-assets/snacks/chex mix.webp" },
  { n:"Pretzels", c:"snacks", img:"../public/web-assets/snacks/pretzel.webp" },

  // Candy
  { n:"Skittles", c:"candy", img:"../public/web-assets/snacks/skittle.webp" },
  { n:"Snickers", c:"candy", img:"../public/web-assets/snacks/snicker.png" },
  { n:"Reese’s PBC", c:"candy", img:"../public/web-assets/snacks/pbc.webp" },
  { n:"Kit Kat", c:"candy", img:"../public/web-assets/snacks/kitkat.avif" },
  { n:"Hershey", c:"candy", img:"../public/web-assets/snacks/hershey.webp" },

  // Drinks
  { n:"Water Bottles", c:"drinks", img:"../public/web-assets/snacks/waterbottle.jpg" },
  { n:"Seltzer (La Croix)", c:"drinks", img:"../public/web-assets/snacks/lacroix.webp" },
  { n:"Seltzer (Polar)", c:"drinks", img:"../public/web-assets/snacks/polar.jpg" },
  { n:"Seltzer (Schweppes)", c:"drinks", img:"../public/web-assets/snacks/shweppes.png" },
  { n:"Seltzer (Perrier)", c:"drinks", img:"../public/web-assets/snacks/perrier.webp" },
  { n:"Cold Coffee (Starbucks)", c:"drinks", img:"../public/web-assets/snacks/coldbrew.webp" },
  { n:"Energy Drink (Red Bull)", c:"drinks", img:"../public/web-assets/snacks/redbull.webp" },
  { n:"Energy Drink (Monster)", c:"drinks", img:"../public/web-assets/snacks/monster.webp" },
  { n:"Energy Drink (Rockstar)", c:"drinks", img:"../public/web-assets/snacks/rockstar.webp" },
  { n:"Vitamin Water", c:"drinks", img:"../public/web-assets/snacks/vitaminwater.webp" },
  { n:"Sports Drink (Gatorade)", c:"drinks", img:"../public/web-assets/snacks/gatorade.jpg" },
  { n:"Sports Drink (Propel)", c:"drinks", img:"../public/web-assets/snacks/propel.webp" },
  { n:"Sports Drink (BodyArmor)", c:"drinks", img:"../public/web-assets/snacks/bodyarmor.jpg" },
  { n:"Soda", c:"drinks", img:"../public/web-assets/snacks/soda.jpg" },
  { n:"Diet Soda", c:"drinks", img:"../public/web-assets/snacks/dietsoda.webp" },
  { n:"Iced Tea", c:"drinks", img:"../public/web-assets/snacks/icedtea.jpg" },
  { n:"Lemonade", c:"drinks", img:"../public/web-assets/snacks/lemonade.png" },
  { n:"Juice (V8)", c:"drinks", img:"../public/web-assets/snacks/v8.jpg" },
  { n:"Juice (Minute Maid)", c:"drinks", img:"../public/web-assets/snacks/minutemaid.jpg" },
];



// --- Render ---
const grid = document.getElementById('snackGrid');
const searchInput = document.getElementById('searchInput');
const chips = document.querySelectorAll('.chip');
const stickyBar = document.getElementById('stickyBar');
const selCount = document.getElementById('selCount');
const clearBtn = document.getElementById('clearBtn');
const contactBtn = document.getElementById('contactBtn');

let currentFilter = 'all';
let query = '';
const selected = new Set();

function cardTemplate(item){
  const div = document.createElement('button');
  div.className = 'card';
  div.type = 'button';
  div.setAttribute('data-cat', item.c);
  div.setAttribute('data-name', item.n.toLowerCase());
  div.innerHTML = `
    <span class="thumb">
      <img src="${item.img}" alt="${item.n}" loading="lazy" />
    </span>
    <span class="label">${item.n}</span>
  `;
  div.addEventListener('click', () => toggleSelect(item.n, div));
  return div;
}

function mount(){
  const frag = document.createDocumentFragment();
  ITEMS.forEach(it => frag.appendChild(cardTemplate(it)));
  grid.appendChild(frag);
}
mount();

function applyFilters(){
  const cards = grid.children;
  const q = query.trim().toLowerCase();
  for (const el of cards){
    const cat = el.getAttribute('data-cat');
    const name = el.getAttribute('data-name');
    const passCat = (currentFilter === 'all' || currentFilter === cat);
    const passSearch = (!q || name.includes(q));
    el.style.display = (passCat && passSearch) ? '' : 'none';
  }
}

chips.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    chips.forEach(b=>b.classList.remove('is-active'));
    btn.classList.add('is-active');
    currentFilter = btn.dataset.filter;
    applyFilters();
  });
});
searchInput.addEventListener('input', (e)=>{
  query = e.target.value;
  applyFilters();
});

// selection
function toggleSelect(name, el){
  if (selected.has(name)){
    selected.delete(name);
    el.classList.remove('is-selected');
  } else {
    selected.add(name);
    el.classList.add('is-selected');
  }
  updateSticky();
}

function updateSticky(){
  const count = selected.size;
  selCount.textContent = count;
  stickyBar.hidden = count === 0;
  // Pass selected list to contact via URL (so they can paste it)
  const list = Array.from(selected).join(', ');
const url = new URL(contactBtn.href, window.location.origin);
url.searchParams.set('snacks', list);
contactBtn.href = url.toString();

}

clearBtn.addEventListener('click', ()=>{
  selected.clear();
  document.querySelectorAll('.card.is-selected').forEach(el=>el.classList.remove('is-selected'));
  updateSticky();
});

