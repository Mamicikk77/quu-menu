/* QUU COFFEE — QR Menü uygulaması */
(async () => {
  "use strict";
  const t = (tr, en, ru) => ({ tr, en, ru });

  /* ---------- Arayüz metinleri ---------- */
  const UI = {
    tagline:   t("Her yudumda mutluluk", "Happiness in every sip", "Счастье в каждом глотке"),
    viewMenu:  t("Menüyü Görüntüle", "View Menu", "Открыть меню"),
    home:      t("Ana Sayfa", "Home", "Главная"),
    menuTitle: t("Menü", "Menu", "Меню"),
    featured:  t("Öne Çıkanlar", "Featured", "Рекомендуем"),
    heroQ:     t("Bugün ne içmek istersin?", "What are you craving today?", "Что будете пить сегодня?"),
    morning:   t("Günaydın", "Good morning", "Доброе утро"),
    day:       t("İyi günler", "Good afternoon", "Добрый день"),
    evening:   t("İyi akşamlar", "Good evening", "Добрый вечер"),
    whatsapp:  t("WhatsApp", "WhatsApp", "WhatsApp"),
    review:    t("Değerlendir", "Review", "Отзыв"),
    vat:       t("Fiyatlarımıza KDV dahildir", "All prices include VAT", "Все цены включают НДС"),
    categories:t("Kategoriler", "Categories", "Категории"),
    searchPh:  t("Ara", "Search", "Поиск"),
    items:     t("ürün", "items", "позиций"),
    small:     t("Small", "Small", "Малый"),
    grande:    t("Grande", "Grande", "Гранде"),
    portion:   t("Porsiyon", "Portion", "Порция"),
    kcal:      t("kcal", "kcal", "ккал"),
    allergens: t("Alerjenler", "Allergens", "Аллергены"),
    noAllergen:t("Bilinen alerjen içermez", "No known allergens", "Без известных аллергенов"),
    legend:    t("Alerjen Rehberi", "Allergen Guide", "Справочник аллергенов"),
    popular:   t("Favori", "Popular", "Хит"),
    soldOut:   t("Tükendi", "Sold out", "Нет в наличии"),
    noResult:  t("Sonuç bulunamadı", "No results found", "Ничего не найдено"),
    disclaimer:t(
      "Kalori değerleri ortalama tahminlerdir ve tam yağlı süt ile hesaplanmıştır. Tüm ürünler aynı mutfakta hazırlandığından eser miktarda alerjen içerebilir. Alerjiniz varsa lütfen personelimize bildiriniz. Fiyatlarımıza KDV dahildir.",
      "Calorie values are average estimates based on whole milk. All items are prepared in the same kitchen and may contain traces of allergens. Please inform our staff about any allergies. All prices include VAT.",
      "Калорийность — средние оценки на основе цельного молока. Все блюда готовятся на одной кухне и могут содержать следы аллергенов. Пожалуйста, сообщите персоналу о своей аллергии. Все цены включают НДС."
    ),
    wifiTitle: t("Wi-Fi", "Wi-Fi", "Wi-Fi"),
    wifiText:  t("Ücretsiz internetimize bağlanın, keyfini çıkarın.", "Connect to our free Wi-Fi and enjoy.", "Подключайтесь к нашему бесплатному Wi-Fi."),
    network:   t("Ağ adı", "Network", "Сеть"),
    password:  t("Şifre", "Password", "Пароль"),
    copy:      t("Kopyala", "Copy", "Копировать"),
    copied:    t("Kopyalandı", "Copied", "Скопировано"),
    close:     t("Kapat", "Close", "Закрыть"),
    waMsg:     t("Merhaba QUU Coffee!", "Hello QUU Coffee!", "Здравствуйте, QUU Coffee!"),
  };
  const LANGS = [["tr", "TR"], ["en", "EN"], ["ru", "RU"]];

  /* ---------- İkonlar (SF Symbols tarzı çizgi ikonlar) ---------- */
  const P = {
    coffee: '<path d="M10 2v2M14 2v2M6 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
    snow: '<path d="M12 2v20M2 12h20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4"/>',
    glass: '<path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8"/><path d="M5 8h14"/><path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0"/><path d="m12 8 1-6h2"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    citrus: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 6.5v11M6.5 12h11M8.1 8.1l7.8 7.8M15.9 8.1l-7.8 7.8"/>',
    mug: '<path d="M17 10h1a3 3 0 0 1 0 6h-1"/><path d="M3 10h14v7a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M7 2c0 1.2 1 1.6 1 2.8S7 6.6 7 7.5M11 2c0 1.2 1 1.6 1 2.8s-1 1.8-1 2.7"/>',
    tea: '<path d="M8 3h8"/><path d="M8.6 3c0 2.6 1.7 3.8 1.7 5.6 0 1.8-3.3 3.1-3.3 7.1A4.3 4.3 0 0 0 11.3 20h1.4a4.3 4.3 0 0 0 4.3-4.3c0-4-3.3-5.3-3.3-7.1 0-1.8 1.7-3 1.7-5.6"/><path d="M5 22h14"/>',
    shake: '<path d="M7 10h10l-1.4 10.2a2 2 0 0 1-2 1.8h-3.2a2 2 0 0 1-2-1.8Z"/><path d="M6 10a3 3 0 0 1 3-3 3 3 0 0 1 6 0 3 3 0 0 1 3 3"/><path d="m13 4 3-3"/>',
    bubble: '<path d="M6 8h12l-1.5 12.2a2 2 0 0 1-2 1.8h-5a2 2 0 0 1-2-1.8Z"/><path d="M5 8h14"/><path d="m13 8 2-6"/><circle cx="10" cy="18" r=".9"/><circle cx="14" cy="18.5" r=".9"/><circle cx="12" cy="15.5" r=".9"/>',
    waffle: '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    arrowR: '<path d="M5 12h14M13 5l7 7-7 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    starF: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
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

  /* ---------- Durum & yardımcılar ---------- */
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
  const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motion = () => !reduceMQ.matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const EASE_OUT = "cubic-bezier(.23, 1, .32, 1)";
  const EASE_SHEET = "cubic-bezier(.32, .72, 0, 1)";

  /* ---------- Menü verisi: menu.json (admin panelinden düzenlenir) ---------- */
  let DATA;
  try {
    // Her açılışta taze veri: admin panelinden yapılan değişiklik önbelleğe takılmasın
    const r = await fetch(`menu.json?v=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    DATA = await r.json();
  } catch (err) {
    console.error("menu.json yüklenemedi:", err);
    document.body.insertAdjacentHTML("beforeend",
      '<div class="load-error" role="alert">Menü yüklenemedi, lütfen sayfayı yenileyin.<br><small>Menu could not be loaded, please refresh.</small></div>');
    return;
  }
  const CONFIG = DATA.config || {};
  const ALLERGENS = DATA.allergens || {};
  // Gizlenen ürün ve kategoriler müşteriye gösterilmez; boş kalan kategori de gizlenir
  const MENU = (DATA.categories || [])
    .filter((c) => !c.hidden)
    .map((c) => ({ ...c, items: (c.items || []).filter((i) => !i.hidden) }))
    .filter((c) => c.items.length);

  // Arama indeksi (Türkçe/Rusça harf farklarını yok sayar)
  const norm = (s) => s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ё/g, "е");
  MENU.forEach((c) => c.items.forEach((it, i) => {
    it.cat = c; it.uid = it.id || `${c.id}-${i}`;
    it.d = it.d || {}; it.k = it.k || [];
    it.a = (it.a || []).filter((k) => ALLERGENS[k]);
    it.idx = norm([it.n.tr, it.n.en, it.n.ru, it.d.tr, it.d.en, it.d.ru, c.n.tr, c.n.en, c.n.ru].filter(Boolean).join(" "));
  }));
  const byUid = Object.fromEntries(MENU.flatMap((c) => c.items.map((it) => [it.uid, it])));

  // iOS Safari'de :active durumunun dokunuşta hemen çalışması için
  document.addEventListener("touchstart", () => {}, { passive: true });

  /* ---------- Statik metinler ---------- */
  function paintStatic() {
    document.documentElement.lang = state.lang;
    $$("[data-i18n]").forEach((el) => (el.textContent = L(UI[el.dataset.i18n])));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = L(UI[el.dataset.i18nPh])));
    $$("[data-i18n-label]").forEach((el) => el.setAttribute("aria-label", L(UI[el.dataset.i18nLabel])));
    // Royal Maison Script yalnızca temel Latin harfleri içerir; diğer harflerde yedek yazı tipine geç
    $$(".tagline").forEach((el) => el.classList.toggle("no-rm", /[^ -~]/.test(el.textContent)));
    const hr = new Date().getHours();
    const greet = hr >= 5 && hr < 12 ? UI.morning : hr >= 12 && hr < 18 ? UI.day : UI.evening;
    $("#hello").innerHTML = ico(hr >= 6 && hr < 19 ? "sun" : "moon") + esc(L(greet));
    $$("[data-ico]").forEach((el) => { if (!el.dataset.painted) { el.insertAdjacentHTML("afterbegin", ico(el.dataset.ico)); el.dataset.painted = 1; } });
    $("#sheetClose").setAttribute("aria-label", L(UI.close));
    document.title = state.screen === "splash" ? "QUU Coffee" : `QUU Coffee — ${L(UI.menuTitle)}`;
    $("#qWa").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(L(UI.waMsg))}`;
    $("#qGo").href = CONFIG.googleReview;
    $("#qIg").href = CONFIG.instagram;
    paintSegs();
  }

  function paintSegs() {
    const idx = LANGS.findIndex(([k]) => k === state.lang);
    $$("[data-seg]").forEach((box) => {
      if (!box.dataset.built) {
        box.innerHTML = '<span class="seg-thumb" aria-hidden="true"></span>' +
          LANGS.map(([k, lab]) => `<button type="button" data-lang="${k}" lang="${k}">${lab}</button>`).join("");
        box.setAttribute("role", "group");
        box.setAttribute("aria-label", "Dil / Language / Язык");
        box.addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b) setLang(b.dataset.lang); });
        box.dataset.built = 1;
      }
      box.style.setProperty("--i", idx);
      $$("button", box).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === state.lang)));
    });
  }

  function setLang(lang) {
    if (lang === state.lang) return;
    state.lang = lang; store.set("quu-lang", lang);
    paintStatic();
    renderCurrent();
    requestAnimationFrame(() => { updateNav($("#menu")); updateNav($("#category")); centerChip(false); });
  }

  /* ---------- Parçalar ---------- */
  const fmt = (n) => `${n}<span class="cur">${CONFIG.currency}</span>`;
  const alg = (k) => `<span class="alg" style="--c:${ALLERGENS[k].color}" title="${esc(L(ALLERGENS[k].n))}">${ico(k)}</span>`;
  const kcalTxt = (k) => `${k[0]}${k[1] ? "–" + k[1] : ""} ${L(UI.kcal)}`;

  function itemHTML(it) {
    const prices = it.p.length === 2
      ? `<span class="pp"><small>S</small><b>${it.p[0]}</b></span><span class="pp"><small>G</small><b>${it.p[1]}</b></span>`
      : `<span class="pp one"><b>${fmt(it.p[0])}</b></span>`;
    const badges = (it.pop ? `<span class="badge">${ico("starF", "fill")}${esc(L(UI.popular))}</span>` : "") +
      (it.soldOut ? `<span class="badge badge-sold">${esc(L(UI.soldOut))}</span>` : "");
    const kcal = it.k.length ? `<span class="kcal">${ico("flame")}${esc(kcalTxt(it.k))}</span>` : "";
    return `<button type="button" class="card-item${it.soldOut ? " sold" : ""}${it.img ? " has-img" : ""}" data-uid="${it.uid}">
      ${it.img ? `<span class="ci-thumb"><img src="${esc(it.img)}" alt="" loading="lazy" decoding="async"></span>` : ""}
      <span class="ci-main">
        <span class="ci-name">${esc(L(it.n))}${badges}</span>
        <span class="ci-desc">${esc(L(it.d))}</span>
        <span class="ci-meta">${kcal}${it.a.length ? `<span class="algs">${it.a.map(alg).join("")}</span>` : ""}</span>
      </span>
      <span class="ci-prices">${prices}</span>
    </button>`;
  }
  const itemsBlock = (items, tone) => `<div class="items tone-${tone}">${items.map(itemHTML).join("")}</div>`;

  /* ---------- Menü ekranı ---------- */
  function renderMenu() {
    const feat = MENU.map((c) => c.items.find((i) => i.pop)).filter(Boolean);
    $("#featured").innerHTML = feat.map((it) => `<button type="button" class="feat tone-${it.cat.tone}" data-uid="${it.uid}">
        <span class="feat-mark">${ico(it.cat.icon)}</span>
        <span class="feat-ico">${ico(it.cat.icon)}</span>
        <span>
          <span class="feat-cat">${esc(L(it.cat.n))}</span>
          <span class="feat-name">${esc(L(it.n))}</span>
          <span class="feat-price">${fmt(it.p[0])}</span>
        </span>
      </button>`).join("");
    $("#catGrid").innerHTML = MENU.map((c, i) => `<a href="#/c/${c.id}" class="tile tone-${c.tone}${MENU.length % 2 && i === MENU.length - 1 ? " wide" : ""}">
        <span class="tile-ico">${ico(c.icon)}</span>
        <span class="tile-go">${ico("chev")}</span>
        <span class="tile-name">${esc(L(c.n))}</span>
        <span class="tile-count">${c.items.length} ${esc(L(UI.items))}</span>
      </a>`).join("");
  }

  /* ---------- Arama ---------- */
  function applySearch() {
    const q = state.query.trim();
    const res = $("#menuResults");
    $("#searchClear").hidden = !q;
    $("#menuNormal").hidden = !!q;
    res.hidden = !q;
    if (!q) { res.innerHTML = ""; return; }
    const terms = norm(q).split(/\s+/).filter(Boolean);
    const hits = MENU.flatMap((c) => c.items).filter((it) => terms.every((w) => it.idx.includes(w)));
    if (!hits.length) { res.innerHTML = `<div class="empty">${ico("search")}<p>${esc(L(UI.noResult))}</p></div>`; return; }
    const groups = new Map();
    hits.forEach((h) => { if (!groups.has(h.cat)) groups.set(h.cat, []); groups.get(h.cat).push(h); });
    res.innerHTML = [...groups].map(([c, g]) => `<h3 class="res-h tone-${c.tone}">${esc(L(c.n))} · ${g.length}</h3>${itemsBlock(g, c.tone)}`).join("");
  }
  let searchTimer;
  const searchInput = $("#search");
  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(applySearch, 80);
  });
  searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") searchInput.blur(); });
  $("#searchClear").addEventListener("click", () => {
    state.query = ""; searchInput.value = ""; applySearch(); searchInput.focus();
  });

  /* ---------- Kategori ekranı ---------- */
  function renderChips() {
    $("#chips").innerHTML = MENU.map((c) => {
      const on = c === state.cat;
      return `<a href="#/c/${c.id}" class="chip tone-${c.tone}${on ? " on" : ""}"${on ? ' aria-current="page"' : ""}>${esc(L(c.n))}</a>`;
    }).join("");
  }
  function centerChip(smooth) {
    const on = $("#chips .chip.on"); if (!on) return;
    const box = $("#chips");
    box.scrollTo({ left: on.offsetLeft - box.clientWidth / 2 + on.offsetWidth / 2, behavior: smooth && motion() ? "smooth" : "auto" });
  }
  function renderCategory() {
    const c = state.cat; if (!c) return;
    $("#catHero").className = `hero tone-${c.tone}`;
    $("#catIco").innerHTML = ico(c.icon);
    $("#catMark").innerHTML = ico(c.icon);
    $("#catTitle").textContent = L(c.n);
    $("#catNavTitle").textContent = L(c.n);
    $("#catSub").textContent = `${c.items.length} ${L(UI.items)}${c.sub ? " · " + L(c.sub) : ""}`;
    const used = new Set(c.items.flatMap((i) => i.a));
    $("#catBody").innerHTML = itemsBlock(c.items, c.tone) +
      `<h2 class="sec-h">${esc(L(UI.legend))}</h2>
       <div class="legend">${Object.keys(ALLERGENS).map((k) =>
        `<span class="legend-item${used.has(k) ? "" : " dim"}">${alg(k)}${esc(L(ALLERGENS[k].n))}</span>`).join("")}</div>`;
  }

  /* ---------- Büyük başlık → gezinme çubuğu ---------- */
  function updateNav(screen) {
    const sc = $(".scroll", screen), hero = $(".hero", screen), nav = $(".nav", screen);
    if (!sc || !hero) return;
    screen.classList.toggle("solid", sc.scrollTop > hero.offsetHeight - nav.offsetHeight - 12);
  }
  ["#menu", "#category"].forEach((id) => {
    const screen = $(id); let ticking = false;
    $(".scroll", screen).addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => { ticking = false; updateNav(screen); });
    }, { passive: true });
  });

  /* ---------- Alt panel (iOS kart sunumu) ---------- */
  const app = $("#app"), sheet = $("#sheet"), scrim = $("#scrim");
  let sheetOpen = false, lastFocus = null, hideTimer = 0;

  function openSheet(html, tone) {
    clearTimeout(hideTimer);
    if (!sheetOpen) lastFocus = document.activeElement;
    $("#sheetBody").innerHTML = html;
    $("#sheetBody").className = `tone-${tone}`;
    sheet.hidden = false; scrim.hidden = false;
    sheet.scrollTop = 0;
    sheet.style.transitionDuration = "";
    sheet.getBoundingClientRect(); // başlangıç konumunu sabitle → geçiş aşağıdan başlasın
    sheetOpen = true;
    document.body.classList.add("sheet-open");
    app.inert = true;
    $("#sheetClose").focus({ preventScroll: true });
  }
  function closeSheet(duration) {
    if (!sheetOpen) return;
    sheetOpen = false;
    if (duration) sheet.style.transitionDuration = duration + "ms";
    document.body.classList.remove("sheet-open");
    app.inert = false;
    hideTimer = setTimeout(() => {
      if (sheetOpen) return;
      sheet.hidden = true; scrim.hidden = true;
      sheet.style.transitionDuration = "";
    }, motion() ? Math.max(duration || 0, 380) + 40 : 220);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }
  $("#sheetClose").addEventListener("click", () => closeSheet());
  scrim.addEventListener("click", () => closeSheet());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

  // Aşağı çekerek kapatma: parmağı 1:1 izler, hızı devralır, sınırda esner
  (() => {
    let y0 = 0, dragging = false, armed = false, off = 0, h = 0, samples = [];
    const rubber = (x, d) => (x * d * 0.55) / (d + 0.55 * Math.abs(x));
    const reset = () => {
      sheet.style.transform = ""; scrim.style.opacity = ""; app.style.transform = ""; app.style.borderRadius = "";
      document.body.classList.remove("sheet-dragging");
    };
    sheet.addEventListener("touchstart", (e) => {
      if (!sheetOpen || e.touches.length > 1) { armed = false; return; }
      armed = sheet.scrollTop <= 0;
      dragging = false; off = 0;
      y0 = e.touches[0].clientY; h = sheet.offsetHeight;
      samples = [{ y: y0, t: e.timeStamp }];
    }, { passive: true });
    sheet.addEventListener("touchmove", (e) => {
      if (!armed || e.touches.length > 1) return;
      const y = e.touches[0].clientY;
      if (!dragging) {
        if (y - y0 > 8) { dragging = true; y0 = y; document.body.classList.add("sheet-dragging"); } // eşik aşılınca kilitle, sıçrama olmasın
        else { if (y - y0 < -4) armed = false; return; }
      }
      e.preventDefault();
      const d = y - y0;
      off = d >= 0 ? d : rubber(d, h);
      sheet.style.transform = `translate3d(0, ${off}px, 0)`;
      const p = Math.min(1, Math.max(0, off / h));
      scrim.style.opacity = String(1 - p);
      if (motion()) {
        app.style.transform = `translateY(${8 * (1 - p)}px) scale(${0.94 + 0.06 * p})`;
        app.style.borderRadius = `${16 * (1 - p)}px`;
      }
      samples.push({ y, t: e.timeStamp });
      if (samples.length > 5) samples.shift();
    }, { passive: false });
    const end = () => {
      if (!dragging) return;
      dragging = false; armed = false;
      const a = samples[0], b = samples[samples.length - 1];
      const v = (b.y - a.y) / Math.max(1, b.t - a.t);          // px/ms
      const projected = off + v * (0.998 / (1 - 0.998));       // Apple'ın momentum projeksiyonu
      const dismiss = v > -0.05 && projected > h * 0.45;
      reset();
      if (dismiss) closeSheet(v > 0.05 ? Math.min(360, Math.max(180, (h - off) / v)) : 320);
    };
    sheet.addEventListener("touchend", end);
    sheet.addEventListener("touchcancel", end);
  })();

  const sheetHero = (icon) => `<div class="sh-hero"><span class="sh-mark">${ico(icon)}</span><span class="sh-ico">${ico(icon)}</span></div>`;

  const photoHero = (src) => `<div class="sh-hero sh-photo"><img src="${esc(src)}" alt="" decoding="async"></div>`;

  function openItem(it) {
    const two = it.p.length === 2;
    const sizes = it.p.map((p, i) => `<div class="size">
        <span class="size-label">${esc(two ? L(i ? UI.grande : UI.small) : L(UI.portion))}</span>
        <span class="size-price">${p}<small> ${CONFIG.currency}</small></span>
        ${it.k[i] ? `<span class="kcal">${ico("flame")}~${it.k[i]} ${esc(L(UI.kcal))}</span>` : ""}
      </div>`).join("");
    const algs = it.a.length
      ? it.a.map((k) => `<span class="alg-chip">${alg(k)}${esc(L(ALLERGENS[k].n))}</span>`).join("")
      : `<span class="alg-chip"><span class="alg" style="--c:var(--green)">${ico("shield")}</span>${esc(L(UI.noAllergen))}</span>`;
    openSheet(`
      ${it.img ? photoHero(it.img) : sheetHero(it.cat.icon)}
      <span class="eyebrow">${esc(L(it.cat.n))}${it.soldOut ? ` · ${esc(L(UI.soldOut))}` : ""}</span>
      <h2 class="sh-title" id="sheetTitle">${esc(L(it.n))}</h2>
      <p class="sh-desc">${esc(L(it.d))}</p>
      <div class="sizes">${sizes}</div>
      <h3 class="sh-h">${esc(L(UI.allergens))}</h3>
      <div class="alg-chips">${algs}</div>
      <p class="foot-note">${esc(L(UI.disclaimer))}</p>`, it.cat.tone);
  }

  function openWifi() {
    const row = (label, val) => `<div class="kv">
        <span class="kv-main"><small>${esc(label)}</small><b>${esc(val)}</b></span>
        <button type="button" class="btn-tinted" data-copy="${esc(val)}">${ico("copy")}${esc(L(UI.copy))}</button>
      </div>`;
    openSheet(`
      ${sheetHero("wifi")}
      <span class="eyebrow">QUU Coffee</span>
      <h2 class="sh-title" id="sheetTitle">${esc(L(UI.wifiTitle))}</h2>
      <p class="sh-desc">${esc(L(UI.wifiText))}</p>
      <div class="kv-list">${row(L(UI.network), CONFIG.wifiName)}${row(L(UI.password), CONFIG.wifiPass)}</div>`, "sea");
  }

  /* ---------- Bildirim ---------- */
  function hud(msg) {
    const el = $("#hud");
    el.innerHTML = ico("check") + esc(msg);
    el.classList.add("show");
    clearTimeout(hud.t); hud.t = setTimeout(() => el.classList.remove("show"), 1600);
  }
  async function copyText(txt) {
    try { await navigator.clipboard.writeText(txt); }
    catch { const ta = document.createElement("textarea"); ta.value = txt; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch {} ta.remove(); }
    if (navigator.vibrate) navigator.vibrate(10);
    hud(L(UI.copied));
  }

  document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-uid]");
    if (item) { openItem(byUid[item.dataset.uid]); return; }
    const cp = e.target.closest("[data-copy]");
    if (cp) copyText(cp.dataset.copy);
  });
  $("#qWifi").addEventListener("click", openWifi);

  /* ---------- Video & ses ---------- */
  const video = $("#bgVideo"), soundBtn = $("#soundBtn");
  const playVideo = () => { const p = video.play(); if (p) p.catch(() => {}); };
  soundBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) playVideo();
    $("#soundIco").innerHTML = ico(video.muted ? "volx" : "vol");
    soundBtn.setAttribute("aria-pressed", String(!video.muted));
  });
  // Otomatik oynatma engellenirse ilk dokunuşta başlat
  document.addEventListener("touchstart", function once() { if (state.screen === "splash") playVideo(); document.removeEventListener("touchstart", once); }, { passive: true });

  /* ---------- Ekran geçişleri (iOS gezinme yığını) ---------- */
  const ORDER = { splash: 0, menu: 1, category: 2 };
  let running = [];

  function transition(from, to, dir) {
    running.forEach((a) => a.cancel());
    running = [];
    $$(".screen").forEach((s) => { s.style.zIndex = ""; s.classList.remove("pushing"); if (s !== from && s !== to) s.classList.remove("active"); });
    to.classList.add("active");
    if (!motion()) {
      from.classList.remove("active");
      to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease" });
      return;
    }
    const top = dir > 0 ? to : from, under = dir > 0 ? from : to;
    top.style.zIndex = 2; under.style.zIndex = 1; top.classList.add("pushing");
    const opts = { duration: 480, easing: EASE_SHEET };
    const slide = [{ transform: "translate3d(100%,0,0)" }, { transform: "translate3d(0,0,0)" }];
    const back = [{ transform: "translate3d(-28%,0,0)", opacity: 0.85 }, { transform: "translate3d(0,0,0)", opacity: 1 }];
    running = dir > 0
      ? [to.animate(slide, opts), from.animate([...back].reverse(), opts)]
      : [from.animate([...slide].reverse(), opts), to.animate(back, opts)];
    Promise.all(running.map((a) => a.finished)).then(() => {
      from.classList.remove("active");
      top.style.zIndex = ""; under.style.zIndex = ""; top.classList.remove("pushing");
      running = [];
    }).catch(() => {});
  }

  function parseHash() {
    const h = location.hash || "#/";
    const m = h.match(/^#\/c\/([\w-]+)/);
    if (m) return { screen: "category", cat: MENU.find((c) => c.id === m[1]) || MENU[0] };
    if (h.startsWith("#/menu")) return { screen: "menu" };
    return { screen: "splash" };
  }

  function renderCurrent() {
    if (state.screen === "menu") { renderMenu(); applySearch(); }
    if (state.screen === "category") { renderChips(); renderCategory(); }
  }

  function setThemeColor() {
    $("#themeColor").content = state.screen === "splash" ? "#000000"
      : state.screen === "menu" ? "#0A3A5F"
      : getComputedStyle($("#catHero")).getPropertyValue("--tc-top").trim() || "#0A3A5F";
  }

  function go(next) {
    const prev = state.screen;
    closeSheet();

    // Aynı ekranda kategori değişimi → içerik yumuşakça yer değiştirir
    if (prev === "category" && next.screen === "category") {
      if (next.cat === state.cat) return;
      const dir = MENU.indexOf(next.cat) > MENU.indexOf(state.cat) ? 1 : -1;
      state.cat = next.cat;
      renderChips(); renderCategory();
      $("#catScroll").scrollTop = 0;
      updateNav($("#category"));
      centerChip(true);
      if (motion()) {
        const o = { duration: 280, easing: EASE_OUT };
        $("#catBody").animate([{ opacity: 0, transform: `translateX(${18 * dir}px)` }, { opacity: 1, transform: "none" }], o);
        $$("#catHero > *").forEach((el) => el.animate([{ opacity: 0, transform: `translateX(${12 * dir}px)` }, { opacity: 1, transform: "none" }], o));
      }
      setThemeColor();
      return;
    }

    state.screen = next.screen;
    if (next.cat) state.cat = next.cat;
    renderCurrent();
    if (next.screen === "category") $("#catScroll").scrollTop = 0;
    if (next.screen === "splash") playVideo(); else video.pause();
    document.title = next.screen === "splash" ? "QUU Coffee" : `QUU Coffee — ${L(UI.menuTitle)}`;
    setThemeColor();

    const from = $("#" + prev), to = $("#" + next.screen);
    if (from !== to) transition(from, to, ORDER[next.screen] >= ORDER[prev] ? 1 : -1);
    requestAnimationFrame(() => { updateNav(to); centerChip(false); });
  }

  window.addEventListener("hashchange", () => go(parseHash()));

  /* ---------- Başlat ---------- */
  const first = parseHash();
  state.screen = first.screen; state.cat = first.cat || null;
  paintStatic();
  $$(".screen").forEach((s) => s.classList.toggle("active", s.id === first.screen));
  renderCurrent();
  setThemeColor();
  if (first.screen === "splash") {
    const splash = $("#splash");
    splash.classList.add("intro");
    setTimeout(() => splash.classList.remove("intro"), 1800);
    playVideo();
  } else {
    video.pause();
    requestAnimationFrame(() => { updateNav($("#" + first.screen)); centerChip(false); });
  }
})();
