// Shared code for all pages: cart, header, footer.

const ICONS = {
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.5 12.5h12L22 7H6.2"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3c.3 2.2 1.6 3.6 4 3.8v3c-1.5.1-2.8-.4-4-1.2v6.1c0 3.4-2.6 5.8-5.8 5.8S4.5 18 4.5 14.9c0-3.4 2.9-6 6.6-5.5v3.1c-1.7-.4-3.4.6-3.4 2.4 0 1.4 1.1 2.6 2.6 2.6 1.6 0 2.7-1.1 2.7-3V3H16z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.6-1-2.6-2.6-2.8C17.2 5 12 5 12 5s-5.2 0-7.4.4C3 5.6 2.2 6.6 2 8.2 1.8 9.5 1.8 12 1.8 12s0 2.5.2 3.8c.2 1.6 1 2.6 2.6 2.8C6.8 19 12 19 12 19s5.2 0 7.4-.4c1.6-.2 2.4-1.2 2.6-2.8.2-1.3.2-3.8.2-3.8s0-2.5-.2-3.8zM10 15V9l5.2 3L10 15z"/></svg>',
  threads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8.5C16.2 5.8 14.3 4 11.8 4 8 4 5.5 7 5.5 12s2.5 8 6.3 8c3 0 5.2-1.8 5.2-4.4 0-2.4-2-3.9-4.8-3.9-2 0-3.3 1-3.3 2.4 0 1.3 1.1 2.2 2.6 2.2 2.6 0 3.6-2.2 3.6-5.3"/></svg>',
};

const byId = id => PRODUCTS.find(p => p.id === id);

// Cart is kept in the browser (localStorage), with an in-memory fallback.
// Shape: { items: { "strawberry|0": 2 }, sets: [ { set: 0, flavors: ["cherry", ...] } ] }
const Cart = {
  key: "lvb-cart",
  mem: null,
  get() {
    if (this.mem) return this.mem;
    let c = null;
    try { c = JSON.parse(localStorage.getItem(this.key)); } catch (e) {}
    this.mem = c && c.items && c.sets ? c : { items: {}, sets: [] };
    return this.mem;
  },
  save() {
    try { localStorage.setItem(this.key, JSON.stringify(this.mem)); } catch (e) {}
    renderHeader();
    document.dispatchEvent(new Event("cart"));
  },
  qty(id, size) { return this.get().items[`${id}|${size}`] || 0; },
  add(id, size, delta) {
    const c = this.get(), k = `${id}|${size}`;
    c.items[k] = Math.max(0, (c.items[k] || 0) + delta);
    if (!c.items[k]) delete c.items[k];
    this.save();
  },
  addSet(set, flavors) { this.get().sets.push({ set, flavors }); this.save(); },
  removeSet(i) { this.get().sets.splice(i, 1); this.save(); },
  clear() { this.mem = { items: {}, sets: [] }; this.save(); },
  lines() {
    const c = this.get();
    const jars = Object.entries(c.items).map(([k, qty]) => {
      const [id, size] = k.split("|"), p = byId(id), pr = SHOP.prices[size];
      return p && { kind: "jar", key: k, title: p.name, detail: `${pr.size} × ${qty}`, qty, sum: pr.price * qty };
    }).filter(Boolean);
    const sets = c.sets.map((s, i) => {
      const st = SHOP.sets[s.set];
      return { kind: "set", index: i, title: st.title, detail: s.flavors.map(f => byId(f)?.name).join(", "), qty: 1, sum: st.price };
    });
    return [...jars, ...sets];
  },
  count() { return this.lines().reduce((a, l) => a + l.qty, 0); },
  total() { return this.lines().reduce((a, l) => a + l.sum, 0); },
};

function renderHeader() {
  const el = document.getElementById("top");
  if (!el) return;
  const home = el.dataset.home || "";
  const n = Cart.count();
  el.innerHTML = `
    <div class="wrap">
      <a class="logo" href="index.html"><img src="img/logo.png" alt="Літо в банці"></a>
      <nav>
        <a class="nav-link" href="${home}#menu">Смаки</a>
        <a class="nav-link" href="${home}#sets">Набори</a>
        <a class="nav-link" href="${home}#order">Доставка</a>
        <a class="cart-btn" href="checkout.html" aria-label="Кошик">${ICONS.cart}<span class="badge">${n}</span></a>
      </nav>
    </div>`;
}

function renderFooter() {
  const el = document.getElementById("foot");
  if (el) el.innerHTML = `<img src="img/logo.png" alt="Літо в банці"><div>Ручна робота з любов'ю ·
    <a class="foot-link" href="https://instagram.com/${SHOP.instagram}" target="_blank" rel="noopener"><img class="avatar" src="img/avatar.jpg" alt="">@${SHOP.instagram}</a></div>`;
}

const money = n => `${n} грн`;

document.addEventListener("DOMContentLoaded", () => { renderHeader(); renderFooter(); });
