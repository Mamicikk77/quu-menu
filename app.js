/* QUU COFFEE — QR Menü uygulaması */
(() => {
  "use strict";

  /* ---------- Arayüz metinleri ---------- */
  const UI = {
    tagline:   t("Her yudumda mutluluk", "Happiness in every sip", "Счастье в каждом глотке"),
    viewMenu:  t("Menüyü Görüntüle", "View Menu", "Открыть меню"),
    whatsapp:  t("WhatsApp", "WhatsApp", "WhatsApp"),
    review:    t("Değerlendir", "Review us", "Отзыв"),
    vat:       t("Fiyatlarımıza KDV dahildir", "All prices include VAT", "Все цены включают НДС"),
    categories:t("Kategoriler", "Categories", "Категории"),
    searchPh:  t("Ürün ara… (ör. latte, waffle)", "Search… (e.g. latte, waffle)", "Поиск… (напр. латте, вафля)"),
    items:     t("ürün", "items", "позиций"),
    small:     t("Small", "Small", "Малый"),
    grande:    t("Grande", "Grande", "Гранде"),
    portion:   t("Porsiyon", "Portion", "Порция"),
    kcal:      t("kcal", "kcal", "ккал"),
    avgKcal:   t("Ort. kalori", "Avg. calories", "Ср. калорийность"),
    allergens: t("Alerjenler", "Allergens", "Аллергены"),
    noAllergen:t("Bilinen alerjen içermez", "No known allergens", "Без известных аллергенов"),
    legend:    t("Alerjen rehberi", "Allergen guide", "Справочник аллергенов"),
    popular:   t("Favori", "Popular", "Хит"),
    noResult:  t("Sonuç bulunamadı", "No results found", "Ничего не найдено"),
    results:   t("sonuç", "results", "результатов"),
    disclaimer:t(
      "Kalori değerleri ortalama tahminlerdir ve tam yağlı süt ile hesaplanmıştır. Tüm ürünler aynı mutfakta hazırlandığından eser miktarda alerjen içerebilir. Alerjiniz varsa lütfen personelimize bildiriniz. Fiyatlarımıza KDV dahildir.",
      "Calorie values are average estimates based on whole milk. All items are prepared in the same kitchen and may contain traces of allergens. Please inform our staff about any allergies. All prices include VAT.",
      "Калорийность — средние оценки на основе цельного молока. Все блюда готовятся на одной кухне и могут содержать следы аллергенов. Пожалуйста, сообщите персоналу о своей аллергии. Все цены включают НДС."
    ),
    wifiTitle: t("Wi-Fi Bağlantısı", "Wi-Fi Connection", "Подключение к Wi-Fi"),
    wifiText:  t("Ücretsiz internetimize bağlanın, keyfini çıkarın.", "Connect to our free Wi-Fi and enjoy.", "Подключайтесь к нашему бесплатному Wi-Fi."),
    network:   t("Ağ adı", "Network", "Сеть"),
    password:  t("Şifre", "Password", "Пароль"),
    copy:      t("Kopyala", "Copy", "Копировать"),
    copied:    t("Kopyalandı ✓", "Copied ✓", "Скопировано ✓"),
    waMsg:     t("Merhaba QUU Coffee!", "Hello QUU Coffee!", "Здравствуйте, QUU Coffee!"),
  };
  const LANGS = [["tr", "TR"], ["en", "EN"], ["ru", "RU"]];

  /* ---------- İkonlar (Lucide tarzı SVG) ---------- */
  const P = {
    coffee: '<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
    snow: '<path d="M12 2v20M2 12h20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
    glass: '<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><path d="m12 8 1-6h2"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    starF: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    citrus: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 6.5v11M6.5 12h11M8.1 8.1l7.8 7.8M15.9 8.1l-7.8 7.8"/>',
    mug: '<path d="M17 10h1a3 3 0 0 1 0 6h-1"/><path d="M3 10h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M7 2c0 1.2 1 1.6 1 2.8S7 6.6 7 7.5M11 2c0 1.2 1 1.6 1 2.8s-1 1.8-1 2.7"/>',
    tea: '<path d="M8 3h8"/><path d="M8.6 3c0 2.6 1.7 3.8 1.7 5.6 0 1.8-3.3 3.1-3.3 7.1A4.3 4.3 0 0 0 11.3 20h1.4a4.3 4.3 0 0 0 4.3-4.3c0-4-3.3-5.3-3.3-7.1 0-1.8 1.7-3 1.7-5.6"/><path d="M5 22h14"/>',
    shake: '<path d="M7 10h10l-1.4 10.2a2 2 0 0 1-2 1.8h-3.2a2 2 0 0 1-2-1.8Z"/><path d="M6 10a3 3 0 0 1 3-3 3 3 0 0 1 6 0 3 3 0 0 1 3 3"/><path d="m13 4 3-3"/>',
    bubble: '<path d="M6 8h12l-1.5 12.2a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8Z"/><path d="M5 8h14"/><path d="m13 8 2-6"/><circle cx="10" cy="18" r=".9"/><circle cx="14" cy="18.5" r=".9"/><circle cx="12" cy="15.5" r=".9"/>',
    waffle: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4-4"/>',
    back: '<path d="m12 19-7-7 7-7M19 12H5"/>',
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrowR: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    wifi: '<path d="M12 20h.01M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.43a5 5 0 0 1 7 0"/>',
    ig: '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><path d="M17.5 6.5h.01"/>',
    wa: '<path d="M3.5 20.5l1.3-4.2A8.6 8.6 0 1 1 8 19.3Z"/><path d="M9 8.6c.3 2.8 2.6 5.2 5.4 5.6l1-1.1 1.7.6v1.2c0 .5-.4.9-.9.9-3.9-.2-7-3.3-7.2-7.2 0-.5.4-.9.9-.9h1.2l.6 1.7Z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    volx: '<path d="M11 5 6 9H2v6h4l5 4Z"/><path d="m22 9-6 6M16 9l6 6"/>',
    vol: '<path d="M11 5 6 9H2v6h4l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    // alerjenler
    gluten: '<path d="M12 22V9"/><path d="M12 9c-1.8-.8-2.8-2.6-2.8-4.8 1.8.2 2.8 1.6 2.8 3 0-1.4 1-2.8 2.8-3 0 2.2-1 4-2.8 4.8Z"/><path d="M12 14.5c-2-.6-3.8-2.1-3.8-4.3 2 .1 3.8 1.5 3.8 3.3m0 1c2-.6 3.8-2.1 3.8-4.3-2 .1-3.8 1.5-3.8 3.3M12 19.5c-2-.6-3.8-2.1-3.8-4.3 2 .1 3.8 1.5 3.8 3.3m0 1c2-.6 3.8-2.1 3.8-4.3-2 .1-3.8 1.5-3.8 3.3"/>',
    milk: '<path d="M8 2h8M9 2v3.2L6 9.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5l-3-4.3V2"/><path d="M6 13.5c2-1 4 1 6 0s4-1 6 0"/>',
    egg: '<path d="M12 22c4 0 7-3 7-7.5C19 9 16 2 12 2S5 9 5 14.5C5 19 8 22 12 22Z"/>',
    nuts: '<path d="M12 5c4.4 0 7 2.8 7 6.6C19 17 15.3 21 12 21s-7-4-7-9.4C5 7.8 7.6 5 12 5Z"/><path d="M12 5V2.5M8.5 10.5c2 1 5 1 7 0"/>',
    soy: '<path d="M9.2 3.5c3 0 4 2.2 5 4.2s3 3 4.8 4.3c2.2 2 .2 8.5-5 8.5C8 20.5 3.5 15.8 3.5 10c0-3.6 2.7-6.5 5.7-6.5Z"/><circle cx="9" cy="10" r="1.6"/><circle cx="14" cy="15" r="1.6"/>',
  };
  const ico = (name, cls = "") => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${P[name] || ""}</svg>`;

  /* ---------- Durum ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const guessLang = () => {
    const saved = store.get("quu-lang");
    if (saved && UI.tagline[saved]) return saved;
    const nav = (navigator.language || "tr").slice(0, 2).toLowerCase();
    return ["tr", "en", "ru"].includes(nav) ? nav : "tr";
  };
  const state = { lang: guessLang(), screen: "splash", cat: null, query: "" };
  const L = (o) => (o && (o[state.lang] || o.tr)) || "";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const hasGsap = typeof window.gsap !== "undefined";
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const anim = hasGsap && !reduced;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Her ürüne kategori referansı ve arama indeksi
  const norm = (s) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ё/g, "е");
  MENU.forEach((c) => c.items.forEach((it, i) => {
    it.cat = c; it.uid = `${c.id}-${i}`;
    it.idx = norm([it.n.tr, it.n.en, it.n.ru, it.d.tr, it.d.en, it.d.ru, c.n.tr, c.n.en, c.n.ru].join(" "));
  }));
  const byUid = Object.fromEntries(MENU.flatMap((c) => c.items.map((it) => [it.uid, it])));

  /* ---------- Statik metinler & ikonlar ---------- */
  function paintStatic() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach((el) => (el.textContent = L(UI[el.dataset.i18n])));
    // Royal Maison sadece temel Latin harfleri içerir; desteklenmeyen harf varsa yedek fonta geç
    $$(".tagline, .section-h").forEach((el) => el.classList.toggle("no-rm", /[^ -~]/.test(el.textContent)));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = L(UI[el.dataset.i18nPh])));
    $$("[data-ico]").forEach((el) => { if (!el.dataset.painted) { el.insertAdjacentHTML("afterbegin", ico(el.dataset.ico)); el.dataset.painted = 1; } });
    document.title = `QUU Coffee — ${L(UI.categories)}`;
    const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(L(UI.waMsg))}`;
    $("#qWa").href = wa; $("#qGo").href = CONFIG.googleReview; $("#qIg").href = CONFIG.instagram;
    paintLangSwitches();
  }

  function paintLangSwitches() {
    $$(".lang-switch").forEach((box) => {
      if (!box.dataset.built) {
        box.innerHTML = '<span class="lg-glass"></span><span class="lg-shadow"></span><span class="pill"></span>' + LANGS.map(([k, lab]) => `<button type="button" data-lang="${k}" aria-label="${lab}">${lab}</button>`).join("");
        box.addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b) setLang(b.dataset.lang); });
        box.dataset.built = 1;
      }
      const btns = $$("button", box);
      btns.forEach((b) => { b.classList.toggle("on", b.dataset.lang === state.lang); b.setAttribute("aria-pressed", b.dataset.lang === state.lang); });
      const on = btns.find((b) => b.dataset.lang === state.lang);
      const pill = $(".pill", box);
      if (on && on.offsetWidth) { pill.style.width = on.offsetWidth + "px"; pill.style.transform = `translateX(${on.offsetLeft - btns[0].offsetLeft}px)`; }
    });
  }

  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang; store.set("quu-lang", lang);
    paintStatic();
    const target = state.screen === "menu" ? "#menuScroll" : state.screen === "category" ? "#catScroll" : ".splash-center";
    renderCurrent();
    if (anim) gsap.fromTo(target, { opacity: 0.2, y: 6 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }

  /* ---------- Butonlar: LiquidButton & MetalButton (liquid-glass-button.tsx portu) ---------- */
  const metalBtn = (inner, attrs = "", variant = "gold") =>
    `<span class="mt-wrap mt-${variant}"><span class="mt-inner"></span><button type="button" class="mt-btn" ${attrs}><span class="mt-shine"></span>${inner}</button></span>`;

  // isPressed durumu: dokunma/tıklama boyunca .is-pressed
  const PRESSABLE = ".lg-btn, .mt-wrap, .quick-btn";
  const release = () => $$(".is-pressed").forEach((el) => el.classList.remove("is-pressed"));
  document.addEventListener("pointerdown", (e) => { const el = e.target.closest(PRESSABLE); if (el) el.classList.add("is-pressed"); }, { passive: true });
  ["pointerup", "pointercancel", "dragstart"].forEach((ev) => document.addEventListener(ev, release, { passive: true }));
  document.addEventListener("pointerout", (e) => { const el = e.target.closest(PRESSABLE); if (el && !el.contains(e.relatedTarget)) el.classList.remove("is-pressed"); }, { passive: true });

  /* ---------- Parçalar ---------- */
  const fmt = (n) => `${n} ${CONFIG.currency}`;
  const algDots = (a) => a.length
    ? `<span class="alg-row">${a.map((k) => `<span class="alg-dot" style="background:${ALLERGENS[k].color}" title="${esc(L(ALLERGENS[k].n))}">${ico(k)}</span>`).join("")}</span>`
    : "";
  const kcalTag = (k) => `<span class="kcal">${ico("flame")}${k[0]}${k[1] ? "–" + k[1] : ""} ${L(UI.kcal)}</span>`;

  function itemHTML(it) {
    const prices = it.p.length === 2
      ? `<div class="prices"><span class="price"><small>S</small><b>${it.p[0]}</b></span><span class="price"><small>G</small><b>${it.p[1]}</b></span></div>`
      : `<div class="prices"><span class="price single"><b>${fmt(it.p[0])}</b></span></div>`;
    return `<button type="button" class="item" data-uid="${it.uid}">
      <div class="item-main">
        <div class="item-name">${esc(L(it.n))}${it.pop ? `<span class="badge-pop">${esc(L(UI.popular))}</span>` : ""}</div>
        <div class="item-desc">${esc(L(it.d))}</div>
        <div class="item-meta">${kcalTag(it.k)}${algDots(it.a)}</div>
      </div>
      ${prices}
    </button>`;
  }

  const sizeHead = (items) => items.some((i) => i.p.length === 2)
    ? `<div class="size-head"><span>${esc(L(UI.small))}</span><span>${esc(L(UI.grande))}</span></div>` : "";

  /* ---------- Kategoriler ekranı ---------- */
  function renderMenu() {
    $("#catGrid").innerHTML = MENU.map((c, i) => {
      const wide = i === MENU.length - 2 ? " wide" : ""; // waffle geniş kart
      return `<a href="#/c/${c.id}" class="cat-card tone-${c.tone}${wide}">
        <span class="cat-go lg-btn lg-dark"><span class="lg-glass"></span><span class="lg-shadow"></span><span class="lg-content">${ico("chev")}</span></span>
        <span class="cat-ico">${ico(c.icon)}</span>
        <span><span class="cat-name" style="display:block">${esc(L(c.n))}</span>
        <span class="cat-count">${c.items.length} ${esc(L(UI.items))}</span></span>
      </a>`;
    }).join("");
  }

  /* ---------- Kategori ekranı ---------- */
  function renderChips() {
    $("#chips").innerHTML = MENU.map((c) =>
      `<a href="#/c/${c.id}" class="chip${state.cat && c.id === state.cat.id ? " on" : ""}" data-id="${c.id}" aria-current="${state.cat && c.id === state.cat.id}">${ico(c.icon)}${esc(L(c.n))}</a>`
    ).join("");
  }
  function centerChip(smooth) {
    const on = $("#chips .chip.on"); if (!on) return;
    const box = $("#chips");
    const left = on.offsetLeft - box.clientWidth / 2 + on.offsetWidth / 2;
    box.scrollTo({ left, behavior: smooth && !reduced ? "smooth" : "auto" });
  }
  function renderCategory() {
    const c = state.cat; if (!c) return;
    $("#catBody").innerHTML = `
      <div class="cat-hero tone-${c.tone}">
        <span class="cat-ico">${ico(c.icon)}</span>
        <div><h2>${esc(L(c.n))}</h2><p>${c.sub ? esc(L(c.sub)) + " · " : ""}${c.items.length} ${esc(L(UI.items))}</p></div>
      </div>
      ${sizeHead(c.items)}
      <div class="items">${c.items.map(itemHTML).join("")}</div>`;
    const used = [...new Set(c.items.flatMap((i) => i.a))];
    $("#legend").innerHTML = `<h3>${esc(L(UI.legend))}</h3><div class="legend-list">${Object.keys(ALLERGENS).map((k) =>
      `<span style="opacity:${used.includes(k) ? 1 : .45}"><span class="alg-dot" style="background:${ALLERGENS[k].color}">${ico(k)}</span>${esc(L(ALLERGENS[k].n))}</span>`).join("")}</div>`;
  }

  /* ---------- Arama ---------- */
  function searchHTML(q) {
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const hits = MENU.flatMap((c) => c.items).filter((it) => terms.every((w) => it.idx.includes(w)));
    if (!hits.length) return `<div class="empty">${ico("search")}<p>${esc(L(UI.noResult))}</p></div>`;
    const groups = {};
    hits.forEach((h) => (groups[h.cat.id] ||= []).push(h));
    return Object.values(groups).map((g) =>
      `<h3 class="results-h">${esc(L(g[0].cat.n))} · ${g.length}</h3><div class="items">${g.map(itemHTML).join("")}</div>`
    ).join("");
  }
  function applySearch(scope) {
    const q = state.query.trim();
    const isMenu = scope === "menu";
    const results = $(isMenu ? "#menuResults" : "#catResults");
    const normal = isMenu ? [$("#catGrid"), $("#menuScroll .section-h")] : [$("#catBody"), $("#legend")];
    if (!isMenu) $("#chips").style.opacity = q ? ".45" : "";
    $$(".search-clear").forEach((b) => (b.hidden = !q));
    if (!q) { results.hidden = true; normal.forEach((n) => (n.hidden = false)); return; }
    normal.forEach((n) => (n.hidden = true));
    results.hidden = false;
    results.innerHTML = searchHTML(q);
    if (anim) gsap.from($$(".item, .results-h", results).slice(0, 12), { opacity: 0, y: 10, duration: 0.3, stagger: 0.03, ease: "power2.out" });
  }
  let searchTimer;
  $$(".search input").forEach((inp) => {
    inp.addEventListener("input", () => {
      state.query = inp.value;
      $$(".search input").forEach((o) => o !== inp && (o.value = inp.value));
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => applySearch(state.screen), 120);
    });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") inp.blur(); });
  });
  $$(".search-clear").forEach((b) => b.addEventListener("click", () => {
    state.query = ""; $$(".search input").forEach((i) => (i.value = ""));
    applySearch(state.screen);
    b.closest(".search").querySelector("input").focus();
  }));

  /* ---------- Alt panel (ürün detayı / Wi-Fi) ---------- */
  const sheet = $("#sheet"), backdrop = $("#backdrop");
  let lastFocus = null;
  function openSheet(html) {
    lastFocus = document.activeElement;
    $("#sheetBody").innerHTML = html;
    sheet.hidden = false; backdrop.hidden = false;
    sheet.scrollTop = 0;
    if (anim) {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(sheet, { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: "expo.out" });
      gsap.from($$("#sheetBody > *"), { opacity: 0, y: 14, duration: 0.4, stagger: 0.05, delay: 0.12, ease: "power2.out" });
    }
    $("#sheetClose").focus({ preventScroll: true });
  }
  function closeSheet() {
    if (sheet.hidden) return;
    const done = () => { sheet.hidden = true; backdrop.hidden = true; lastFocus && lastFocus.focus({ preventScroll: true }); };
    if (anim) {
      gsap.to(backdrop, { opacity: 0, duration: 0.22 });
      gsap.to(sheet, { yPercent: 100, duration: 0.28, ease: "power2.in", onComplete: done });
    } else done();
  }
  $("#sheetClose").addEventListener("click", closeSheet);
  backdrop.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

  // Aşağı kaydırarak kapatma
  (() => {
    let y0 = null, dy = 0;
    sheet.addEventListener("touchstart", (e) => { if (sheet.scrollTop <= 0) { y0 = e.touches[0].clientY; dy = 0; } }, { passive: true });
    sheet.addEventListener("touchmove", (e) => {
      if (y0 === null) return;
      dy = Math.max(0, e.touches[0].clientY - y0);
      sheet.style.transform = `translateY(${dy}px)`;
    }, { passive: true });
    sheet.addEventListener("touchend", () => {
      if (y0 === null) return;
      sheet.style.transform = "";
      if (dy > 110) closeSheet();
      else if (dy > 0 && anim) gsap.fromTo(sheet, { y: dy }, { y: 0, duration: 0.3, ease: "back.out(2)" });
      y0 = null;
    });
  })();

  function openItem(it) {
    const two = it.p.length === 2;
    const sizes = it.p.map((p, i) => `<div class="sh-size">
        <small>${esc(two ? L(i ? UI.grande : UI.small) : L(UI.portion))}</small>
        <b>${fmt(p)}</b>
        <span class="kcal">${ico("flame")}~${it.k[i]} ${esc(L(UI.kcal))}</span>
      </div>`).join("");
    const algs = it.a.length
      ? `<div class="sh-algs">${it.a.map((k) => `<span class="sh-alg"><span class="alg-dot" style="background:${ALLERGENS[k].color}">${ico(k)}</span>${esc(L(ALLERGENS[k].n))}</span>`).join("")}</div>`
      : `<span class="sh-none">${ico("shield")}${esc(L(UI.noAllergen))}</span>`;
    openSheet(`
      <span class="sh-tag">${ico(it.cat.icon)}${esc(L(it.cat.n))}</span>
      <h2 class="sh-title">${esc(L(it.n))}</h2>
      <p class="sh-desc">${esc(L(it.d))}</p>
      <div class="sh-sizes">${sizes}</div>
      <h3 class="sh-h">${esc(L(UI.allergens))}</h3>
      ${algs}
      <p class="sh-note">${esc(L(UI.disclaimer))}</p>`);
  }

  function openWifi() {
    openSheet(`
      <span class="sh-tag">${ico("wifi")}Wi-Fi</span>
      <h2 class="sh-title">${esc(L(UI.wifiTitle))}</h2>
      <p class="sh-desc">${esc(L(UI.wifiText))}</p>
      <div class="wifi-card">
        <div class="wifi-row"><div><small>${esc(L(UI.network))}</small><b>${esc(CONFIG.wifiName)}</b></div>
          ${metalBtn(ico("copy") + esc(L(UI.copy)), `data-copy="${esc(CONFIG.wifiName)}"`)}</div>
        <div class="wifi-row"><div><small>${esc(L(UI.password))}</small><b>${esc(CONFIG.wifiPass)}</b></div>
          ${metalBtn(ico("copy") + esc(L(UI.copy)), `data-copy="${esc(CONFIG.wifiPass)}"`)}</div>
      </div>`);
  }

  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 1800);
  }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); }
    catch { const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch {} ta.remove(); }
    toast(L(UI.copied));
  }

  document.addEventListener("click", (e) => {
    const item = e.target.closest(".item[data-uid]");
    if (item) { openItem(byUid[item.dataset.uid]); return; }
    const cp = e.target.closest("[data-copy]");
    if (cp) copyText(cp.dataset.copy);
  });
  $("#qWifi").addEventListener("click", openWifi);

  /* ---------- Video & ses ---------- */
  const video = $("#bgVideo"), soundBtn = $("#soundBtn");
  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) video.play().catch(() => {});
    $("#soundIco").innerHTML = ico(video.muted ? "volx" : "vol");
    soundBtn.setAttribute("aria-pressed", String(!video.muted));
  });
  const playVideo = () => { const p = video.play(); if (p) p.catch(() => {}); };
  // Bazı iOS modlarında otomatik oynatma engellenirse ilk dokunuşta başlat
  document.addEventListener("touchstart", function once() { if (state.screen === "splash") playVideo(); document.removeEventListener("touchstart", once); }, { passive: true });

  /* ---------- Yönlendirme & geçişler ---------- */
  const ORDER = { splash: 0, menu: 1, category: 2 };
  function parseHash() {
    const h = location.hash || "#/";
    const m = h.match(/^#\/c\/([\w-]+)/);
    if (m) return { screen: "category", cat: MENU.find((c) => c.id === m[1]) || MENU[0] };
    if (h.startsWith("#/menu")) return { screen: "menu" };
    return { screen: "splash" };
  }

  function renderCurrent() {
    if (state.screen === "menu") { renderMenu(); applySearch("menu"); }
    if (state.screen === "category") { renderChips(); renderCategory(); applySearch("category"); requestAnimationFrame(() => centerChip(false)); }
  }

  // iOS Safari: CSS transform geçişleri GSAP ile çakışıp öğeleri ara durumda bırakabiliyor.
  // Bu yüzden intro sırasında geçişler kapatılır, bitince tüm satır içi stiller temizlenir.
  const INTRO_TARGETS = ".brand-leaf, .brand-name, .brand-sub, .tagline, .cta, .quick, .quick .qi, .splash-top > *, .vat";
  let introTl = null;
  function finishIntro() {
    gsap.set(INTRO_TARGETS, { clearProps: "all" });
    $("#splash").classList.remove("intro-running");
  }
  function introSplash() {
    if (!anim) return;
    if (introTl) { introTl.kill(); finishIntro(); }
    $("#splash").classList.add("intro-running");
    const to = { opacity: 1, x: 0, y: 0, scale: 1 };
    introTl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finishIntro, onInterrupt: finishIntro })
      .fromTo(".brand-leaf", { opacity: 0, y: -10 }, { ...to, duration: 0.9 }, 0.15)
      .fromTo(".brand-name", { opacity: 0, y: 30, letterSpacing: "0.3em" }, { ...to, letterSpacing: "0.06em", duration: 1.2 }, 0.2)
      .fromTo(".brand-sub", { opacity: 0, y: 10 }, { ...to, duration: 0.9 }, 0.45)
      .fromTo(".tagline", { opacity: 0, y: 12 }, { ...to, duration: 0.9 }, 0.6)
      .fromTo(".cta", { opacity: 0, y: 24, scale: 0.96 }, { ...to, duration: 0.9 }, 0.75)
      .fromTo(".quick", { opacity: 0, y: 24 }, { ...to, duration: 0.8 }, 0.85)
      .fromTo(".quick .qi", { opacity: 0, scale: 0.4 }, { ...to, duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 1.0)
      .fromTo(".splash-top > *", { opacity: 0, y: -10 }, { ...to, duration: 0.7, stagger: 0.08 }, 0.9)
      .fromTo(".vat", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.2);
    // Güvenlik ağı: sekme arka plandaysa vb. animasyon takılırsa 3 sn sonra son hâle zorla
    setTimeout(() => { if (introTl && introTl.isActive()) introTl.progress(1); }, 3000);
  }

  function enterAnim(scr) {
    if (!anim) return;
    if (scr === "menu") {
      gsap.from("#catGrid .cat-card", { opacity: 0, y: 22, scale: 0.94, duration: 0.5, stagger: { each: 0.045, grid: "auto" }, ease: "back.out(1.4)", delay: 0.08, clearProps: "all" });
    } else if (scr === "category") {
      gsap.from("#catBody .cat-hero", { opacity: 0, y: 14, scale: 0.97, duration: 0.5, ease: "expo.out" });
      gsap.from("#catBody .item", { opacity: 0, y: 18, duration: 0.45, stagger: 0.04, ease: "power3.out", delay: 0.08, clearProps: "all" });
    }
  }

  function go(next) {
    const prev = state.screen;
    const catChanged = next.screen === "category" && prev === "category" && state.cat !== next.cat;
    const prevIdx = state.cat ? MENU.indexOf(state.cat) : 0;
    state.screen = next.screen;
    if (next.cat) state.cat = next.cat;
    closeSheet();

    if (next.screen === "splash") playVideo(); else video.pause();

    // Aynı ekranda kategori değişimi → kaydırmalı geçiş
    if (catChanged) {
      const dir = MENU.indexOf(state.cat) > prevIdx ? 1 : -1;
      const swap = () => { renderChips(); renderCategory(); applySearch("category"); $("#catScroll").scrollTop = 0; centerChip(true); };
      if (anim) {
        gsap.to("#catBody", { opacity: 0, x: -40 * dir, duration: 0.18, ease: "power2.in", onComplete: () => {
          swap();
          gsap.fromTo("#catBody", { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out", clearProps: "transform" });
          gsap.from("#catBody .item", { opacity: 0, y: 12, duration: 0.35, stagger: 0.03, ease: "power2.out", delay: 0.05, clearProps: "all" });
        } });
      } else swap();
      return;
    }

    renderCurrent();
    if (next.screen === "category") $("#catScroll").scrollTop = 0;
    const from = $("#" + prev), to = $("#" + next.screen);
    if (from === to) { to.classList.add("active"); return; }
    const dir = ORDER[next.screen] >= ORDER[prev] ? 1 : -1;

    if (anim) {
      gsap.set(to, { visibility: "visible", zIndex: 3 });
      gsap.set(from, { zIndex: 2 });
      gsap.to(from, { opacity: 0, x: -50 * dir, scale: dir > 0 ? 0.98 : 1, duration: 0.35, ease: "power2.in",
        onComplete: () => { from.classList.remove("active"); gsap.set(from, { clearProps: "all" }); } });
      gsap.fromTo(to, { opacity: 0, x: 60 * dir }, { opacity: 1, x: 0, duration: 0.55, ease: "expo.out", delay: 0.08,
        onComplete: () => {
          to.classList.add("active"); gsap.set(to, { clearProps: "transform,zIndex" });
          if (next.screen === "category") requestAnimationFrame(() => centerChip(true));
        } });
      to.classList.add("active");
      if (next.screen === "splash") introSplash(); else enterAnim(next.screen);
    } else {
      from.classList.remove("active"); to.classList.add("active");
    }
    if (next.screen === "category") requestAnimationFrame(() => centerChip(false));
  }

  window.addEventListener("hashchange", () => go(parseHash()));

  /* ---------- Başlat ---------- */
  paintStatic();
  const first = parseHash();
  if (first.screen !== "splash") {
    $("#splash").classList.remove("active");
    state.screen = first.screen; state.cat = first.cat || null;
    $("#" + first.screen).classList.add("active");
    video.pause();
    renderCurrent(); enterAnim(first.screen);
  } else {
    introSplash(); playVideo();
  }
  window.addEventListener("resize", paintLangSwitches);
  document.fonts && document.fonts.ready.then(paintLangSwitches);
})();
