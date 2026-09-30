/* QUU Coffee — Menü yönetim paneli
   Veri: depo kökündeki menu.json. Fotoğraflar: images/ klasörü.
   "Yayınla" tüm değişiklikleri GitHub'a tek bir commit olarak gönderir;
   GitHub Pages yaklaşık 1 dakika içinde QR menüyü günceller. */
(() => {
  "use strict";

  /* ---------- Depo bilgisi ---------- */
  // github.io üzerinde çalışırken sahibi ve depoyu adresten bulur; yerelde varsayılanları kullanır.
  const FALLBACK = { owner: "Mamicikk77", repo: "quu-menu", branch: "main" };
  const REPO = (() => {
    const h = location.hostname;
    if (h.endsWith(".github.io")) {
      const seg = location.pathname.split("/").filter(Boolean)[0];
      if (seg && seg !== "admin") return { owner: h.replace(".github.io", ""), repo: seg, branch: "main" };
    }
    return FALLBACK;
  })();
  const DATA_PATH = "menu.json";
  const API = `https://api.github.com/repos/${REPO.owner}/${REPO.repo}`;
  const RAW = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.repo}/${REPO.branch}/`;
  const TOKEN_KEY = "quu-admin-token";

  /* ---------- Sabitler ---------- */
  const LANGS = ["tr", "en", "ru"];
  const TONES = {
    espresso: ["#3B2215", "#7B4A2B"], icedcoffee: ["#4E3020", "#A0714A"], latte: ["#8A5A30", "#C9985F"],
    chocolate: ["#3E2218", "#8C5840"], crema: ["#5A4538", "#A48B78"], waffle: ["#91561A", "#D59B46"],
    matcha: ["#3F6A22", "#8DB456"], olive: ["#526D25", "#8DAA4C"], lemon: ["#8F6300", "#D8A11C"],
    sand: ["#B67A33", "#E2B46C"], sunset: ["#6B3219", "#DB7F2A"], turkishtea: ["#7F2410", "#C9642C"],
    terracotta: ["#A44326", "#DE8555"], berry: ["#A81E57", "#EC6A9A"], strawberry: ["#B23E6B", "#EE8FAE"],
    bougain: ["#AE1F5B", "#E45E97"], taro: ["#553585", "#9C7CCB"], navy: ["#0F4C75", "#2382BA"],
    aegean: ["#0A3A5F", "#0E6391"], sea: ["#0A8290", "#3CC3CA"],
  };
  const grad = (tone) => { const g = TONES[tone] || TONES.navy; return `linear-gradient(150deg, ${g[0]}, ${g[1]})`; };
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
    // araçlar
    up: '<path d="m18 15-6-6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v8"/>',
    eyeoff: '<path d="M9.9 4.2A10.9 10.9 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.2 3.2M6.6 6.6A17.6 17.6 0 0 0 2 12s3.5 8 10 8a9.7 9.7 0 0 0 5.4-1.6"/><path d="m2 2 20 20"/><path d="M14.1 14.1a3 3 0 0 1-4.2-4.2"/>',
    // alerjenler
    gluten: '<path d="M12 22V9"/><path d="M12 9c-1.8-.8-2.8-2.6-2.8-4.8 1.8.2 2.8 1.6 2.8 3 0-1.4 1-2.8 2.8-3 0 2.2-1 4-2.8 4.8Z"/><path d="M12 14.5c-2-.6-3.8-2.1-3.8-4.3 2 .1 3.8 1.5 3.8 3.3m0 1c2-.6 3.8-2.1 3.8-4.3-2 .1-3.8 1.5-3.8 3.3M12 19.5c-2-.6-3.8-2.1-3.8-4.3 2 .1 3.8 1.5 3.8 3.3m0 1c2-.6 3.8-2.1 3.8-4.3-2 .1-3.8 1.5-3.8 3.3"/>',
    milk: '<path d="M8 2h8M9 2v3.2L6 9.5V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9.5l-3-4.3V2"/><path d="M6 13.5c2-1 4 1 6 0s4-1 6 0"/>',
    egg: '<path d="M12 22c4 0 7-3 7-7.5C19 9 16 2 12 2S5 9 5 14.5C5 19 8 22 12 22Z"/>',
    nuts: '<path d="M12 5c4.4 0 7 2.8 7 6.6C19 17 15.3 21 12 21s-7-4-7-9.4C5 7.8 7.6 5 12 5Z"/><path d="M12 5V2.5M8.5 10.5c2 1 5 1 7 0"/>',
    soy: '<path d="M9.2 3.5c3 0 4 2.2 5 4.2s3 3 4.8 4.3c2.2 2 .2 8.5-5 8.5C8 20.5 3.5 15.8 3.5 10c0-3.6 2.7-6.5 5.7-6.5Z"/><circle cx="9" cy="10" r="1.6"/><circle cx="14" cy="15" r="1.6"/>',
  };
  const CAT_ICONS = ["coffee", "snow", "glass", "leaf", "star", "citrus", "mug", "tea", "shake", "bubble", "waffle", "plus"];
  const ico = (n) => `<svg viewBox="0 0 24 24" class="i" aria-hidden="true">${P[n] || ""}</svg>`;

  /* ---------- Yardımcılar ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const slug = (s) => (s || "").toLocaleLowerCase("tr")
    .replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ş/g, "s").replace(/ü/g, "u")
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "urun";
  const norm = (s) => (s || "").toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const store = {
    get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k); } catch { return null; } },
    set(k, v, persist) { try { (persist ? localStorage : sessionStorage).setItem(k, v); } catch {} },
    del(k) { try { localStorage.removeItem(k); sessionStorage.removeItem(k); } catch {} },
  };

  function toast(msg, isErr) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.toggle("err", !!isErr);
    el.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("show"), isErr ? 5000 : 2400);
  }

  // UTF-8 güvenli base64
  const b64FromText = (txt) => {
    const bytes = new TextEncoder().encode(txt);
    let bin = ""; for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  };
  const textFromB64 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\s/g, "")), (c) => c.charCodeAt(0)));
  const b64FromBlob = (blob) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1]);
    r.onerror = () => rej(r.error);
    r.readAsDataURL(blob);
  });

  /* ---------- GitHub API ---------- */
  let token = "";
  async function gh(path, { method = "GET", body } = {}) {
    const res = await fetch(path ? `${API}/${path}` : API, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    if (!res.ok) {
      let msg = `GitHub hatası (${res.status})`;
      try { const j = await res.json(); if (j.message) msg += `: ${j.message}`; } catch {}
      const err = new Error(msg); err.status = res.status; throw err;
    }
    return res.status === 204 ? null : res.json();
  }

  /* ---------- Durum ---------- */
  const S = {
    remote: null,       // son yüklenen menu.json
    remoteSha: null,    // menu.json blob sha (çakışma kontrolü)
    draft: null,        // düzenlenen kopya
    uploads: new Map(), // yeni fotoğraflar: yol → Blob
    deletes: new Set(), // silinecek fotoğraf yolları
    previews: new Map(),// yol → objectURL
    tab: "products",
    cat: null,          // ürünler sekmesinde seçili kategori id'si (null = tümü)
    query: "",
  };

  const dirtyCount = () => {
    if (!S.draft) return 0;
    let n = S.uploads.size + S.deletes.size;
    const a = S.remote, b = S.draft;
    if (JSON.stringify(a.config) !== JSON.stringify(b.config)) n++;
    const flat = (d) => new Map(d.categories.flatMap((c) => c.items.map((i, idx) => [i.id, JSON.stringify({ ...i, _c: c.id, _i: idx })])));
    const fa = flat(a), fb = flat(b);
    fb.forEach((v, k) => { if (fa.get(k) !== v) n++; });
    fa.forEach((_, k) => { if (!fb.has(k)) n++; });
    const cats = (d) => new Map(d.categories.map((c, idx) => [c.id, JSON.stringify({ ...c, items: undefined, _i: idx })]));
    const ca = cats(a), cb = cats(b);
    cb.forEach((v, k) => { if (ca.get(k) !== v) n++; });
    ca.forEach((_, k) => { if (!cb.has(k)) n++; });
    return n;
  };
  function refreshDirty() {
    const n = dirtyCount();
    $("#dirtyCount").hidden = !n;
    $("#dirtyCount").textContent = n;
    $("#publishBtn").disabled = !n;
    $("#discardBtn").hidden = !n;
  }

  const imgSrc = (p) => S.previews.get(p) || (p ? RAW + p + `?v=${encodeURIComponent(S.remoteSha || "")}` : "");
  const catOf = (itemId) => S.draft.categories.find((c) => c.items.some((i) => i.id === itemId));
  const allIds = () => new Set(S.draft.categories.flatMap((c) => [c.id, ...c.items.map((i) => i.id)]));
  const uniqueId = (base) => { const ids = allIds(); let id = base, n = 2; while (ids.has(id)) id = `${base}-${n++}`; return id; };
  const priceTxt = (p) => p.length === 2 ? `${p[0]} / ${p[1]} ${S.draft.config.currency || "₺"}` : `${p[0]} ${S.draft.config.currency || "₺"}`;

  /* ---------- Giriş ---------- */
  async function login(tk, remember) {
    token = tk;
    const repo = await gh("");
    if (!repo.permissions || !repo.permissions.push) {
      const e = new Error("Bu anahtarın depoya yazma izni yok. Token'da “Contents: Read and write” iznini verin."); e.status = 403; throw e;
    }
    store.set(TOKEN_KEY, tk, remember);
    await loadRemote();
  }

  async function loadRemote() {
    const f = await gh(`contents/${DATA_PATH}?ref=${REPO.branch}`);
    const data = JSON.parse(textFromB64(f.content));
    data.config = data.config || {};
    data.categories = data.categories || [];
    S.remote = data; S.remoteSha = f.sha; S.draft = clone(data);
    S.uploads.clear(); S.deletes.clear();
    S.previews.forEach((u) => URL.revokeObjectURL(u)); S.previews.clear();
    if (S.cat && !S.draft.categories.some((c) => c.id === S.cat)) S.cat = null;
    showPanel();
  }

  function showPanel() {
    $("#login").hidden = true; $("#panel").hidden = false; $("#loading").hidden = true;
    renderAll();
  }
  function showLogin(err) {
    $("#loading").hidden = true; $("#panel").hidden = true; $("#login").hidden = false;
    $("#repoName").textContent = REPO.repo;
    if (err) { $("#loginErr").textContent = err; $("#loginErr").hidden = false; }
    setTimeout(() => $("#tokenInput").focus(), 50);
  }

  $("#loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("#loginBtn"), tk = $("#tokenInput").value.trim();
    if (!tk) return;
    btn.disabled = true; btn.textContent = "Kontrol ediliyor…"; $("#loginErr").hidden = true;
    try { await login(tk, $("#rememberInput").checked); $("#tokenInput").value = ""; }
    catch (err) {
      $("#loginErr").textContent = err.status === 401 ? "Anahtar geçersiz ya da süresi dolmuş." : err.status === 404 ? `“${REPO.repo}” deposuna erişim yok. Token oluştururken bu depoyu seçtiğinizden emin olun.` : err.message;
      $("#loginErr").hidden = false;
    } finally { btn.disabled = false; btn.textContent = "Giriş yap"; }
  });

  $("#logoutBtn").addEventListener("click", () => {
    if (dirtyCount() && !confirm("Yayınlanmamış değişiklikler var. Çıkış yaparsanız kaybolacak. Devam edilsin mi?")) return;
    store.del(TOKEN_KEY); token = ""; S.draft = null; showLogin();
  });

  /* ---------- Sekmeler ---------- */
  $$(".tab").forEach((b) => b.addEventListener("click", () => {
    S.tab = b.dataset.tab;
    $$(".tab").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", String(x === b)); });
    $$(".view").forEach((v) => (v.hidden = v.id !== `view-${S.tab}`));
    renderAll();
  }));

  function renderAll() {
    if (!S.draft) return;
    if (S.tab === "products") renderProducts();
    if (S.tab === "categories") renderCategories();
    if (S.tab === "settings") renderSettings();
    refreshDirty();
  }

  /* ---------- Ürünler ---------- */
  function renderProducts() {
    const cats = S.draft.categories;
    const total = cats.reduce((a, c) => a + c.items.length, 0);
    $("#catChips").innerHTML =
      `<button class="cchip${S.cat ? "" : " on"}" data-cat="">Tümü <small>${total}</small></button>` +
      cats.map((c) => `<button class="cchip${S.cat === c.id ? " on" : ""}" data-cat="${esc(c.id)}" style="--g:${grad(c.tone)}"><span class="dot"></span>${esc(c.n.tr)} <small>${c.items.length}</small></button>`).join("");

    const q = norm(S.query.trim());
    const shown = cats.filter((c) => !S.cat || c.id === S.cat);
    let html = "";
    shown.forEach((c) => {
      const items = c.items.filter((i) => !q || norm([i.n.tr, i.n.en, i.n.ru].join(" ")).includes(q));
      if (!items.length && (q || S.cat === null)) return;
      html += `<h3 class="group-h" style="--g:${grad(c.tone)}"><span class="dot"></span>${esc(c.n.tr)}${c.hidden ? " · gizli" : ""}</h3>`;
      if (!items.length) html += `<div class="empty-state">Bu kategoride ürün yok. “Yeni ürün” ile ekleyin.</div>`;
      items.forEach((it) => {
        const idx = c.items.indexOf(it);
        const isNew = !S.remote.categories.some((rc) => rc.items.some((ri) => ri.id === it.id));
        html += `<div class="row${it.hidden || c.hidden ? " is-hidden" : ""}">
          <button class="row-main" data-edit="${esc(it.id)}" type="button">
            <span class="thumb" style="--g:${grad(c.tone)}">${it.img ? `<img src="${esc(imgSrc(it.img))}" alt="" loading="lazy">` : ico(c.icon)}</span>
            <span class="row-text">
              <span class="row-name">${esc(it.n.tr || "(adsız)")}</span>
              <span class="row-sub">${esc(it.d?.tr || "Açıklama yok")}</span>
              <span class="tags">${isNew ? '<span class="tag new">YENİ</span>' : ""}${it.pop ? '<span class="tag pop">FAVORİ</span>' : ""}${it.soldOut ? '<span class="tag sold">TÜKENDİ</span>' : ""}${it.hidden ? '<span class="tag hid">GİZLİ</span>' : ""}</span>
            </span>
          </button>
          <span class="row-price">${esc(priceTxt(it.p))}${it.p.length === 2 ? "<small>Small / Grande</small>" : ""}</span>
          <span class="row-tools">
            <button class="mini${it.soldOut ? " on" : ""}" type="button" data-sold="${esc(it.id)}" title="${it.soldOut ? "Tekrar satışa aç" : "Tükendi olarak işaretle"}" aria-label="Tükendi">${ico("box")}</button>
            <button class="mini" type="button" data-move="${esc(it.id)}" data-dir="-1" ${q || idx === 0 ? "disabled" : ""} title="Yukarı taşı" aria-label="Yukarı taşı">${ico("up")}</button>
            <button class="mini" type="button" data-move="${esc(it.id)}" data-dir="1" ${q || idx === c.items.length - 1 ? "disabled" : ""} title="Aşağı taşı" aria-label="Aşağı taşı">${ico("down")}</button>
            <button class="mini" type="button" data-edit="${esc(it.id)}" title="Düzenle" aria-label="Düzenle">${ico("edit")}</button>
          </span>
        </div>`;
      });
    });
    $("#itemList").innerHTML = html || `<div class="empty-state">${q ? "Aramayla eşleşen ürün yok." : "Henüz ürün yok."}</div>`;
  }

  $("#catChips").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]"); if (!b) return;
    S.cat = b.dataset.cat || null; renderProducts();
  });
  $("#prodSearch").addEventListener("input", (e) => { S.query = e.target.value; renderProducts(); });
  $("#itemList").addEventListener("click", (e) => {
    const ed = e.target.closest("[data-edit]");
    if (ed) return openItem(ed.dataset.edit);
    const mv = e.target.closest("[data-move]");
    if (mv) {
      const c = catOf(mv.dataset.move), i = c.items.findIndex((x) => x.id === mv.dataset.move), j = i + Number(mv.dataset.dir);
      if (j < 0 || j >= c.items.length) return;
      [c.items[i], c.items[j]] = [c.items[j], c.items[i]];
      return renderAll();
    }
    const so = e.target.closest("[data-sold]");
    if (so) {
      const it = catOf(so.dataset.sold).items.find((x) => x.id === so.dataset.sold);
      if (it.soldOut) delete it.soldOut; else it.soldOut = true;
      toast(it.soldOut ? `“${it.n.tr}” tükendi olarak işaretlendi` : `“${it.n.tr}” tekrar satışta`);
      renderAll();
    }
  });
  $("#addItemBtn").addEventListener("click", () => {
    if (!S.draft.categories.length) { toast("Önce bir kategori ekleyin.", true); return; }
    openItem(null);
  });

  /* ---------- Ürün düzenleyici ---------- */
  const itemModal = $("#itemModal");
  let edit = null; // { id|null, catId, img, pendingImg:{path,blob}|null, removeImg:bool, mode }

  function openItem(id) {
    const c = id ? catOf(id) : (S.draft.categories.find((x) => x.id === S.cat) || S.draft.categories[0]);
    const it = id ? c.items.find((x) => x.id === id) : null;
    edit = { id, catId: c.id, img: it?.img || "", pendingImg: null, removeImg: false, mode: it ? it.p.length : 2 };
    $("#itemModalTitle").textContent = it ? "Ürünü düzenle" : "Yeni ürün";
    $("#itemDelete").hidden = !it;
    $("#fCat").innerHTML = S.draft.categories.map((x) => `<option value="${esc(x.id)}"${x.id === c.id ? " selected" : ""}>${esc(x.n.tr)}</option>`).join("");
    LANGS.forEach((l) => {
      $(`#fName${cap(l)}`).value = it?.n?.[l] || "";
      $(`#fDesc${cap(l)}`).value = it?.d?.[l] || "";
    });
    renderPrices(it?.p || [], it?.k || []);
    $("#fAlg").innerHTML = Object.entries(S.draft.allergens || {}).map(([k, a]) =>
      `<button type="button" class="alg-tg" data-alg="${esc(k)}" aria-pressed="${!!it?.a?.includes(k)}" style="--c:${esc(a.color)}"><span class="adot">${ico(k)}</span>${esc(a.n.tr)}</button>`).join("");
    $("#fPop").checked = !!it?.pop; $("#fSold").checked = !!it?.soldOut; $("#fHidden").checked = !!it?.hidden;
    $("#itemErr").hidden = true; $$("#itemForm .invalid").forEach((x) => x.classList.remove("invalid"));
    paintPhoto();
    itemModal.showModal();
    $(".modal-body", itemModal).scrollTop = 0;
    if (!it) setTimeout(() => $("#fNameTr").focus(), 60);
  }
  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  function renderPrices(p, k) {
    const two = edit.mode === 2;
    $$("#fSizeMode button").forEach((b) => b.setAttribute("aria-checked", String(Number(b.dataset.mode) === edit.mode)));
    const cur = esc(S.draft.config.currency || "₺");
    const box = (i, title) => `<div class="pbox"><h4>${title}</h4>
        <label class="field"><span class="field-l">Fiyat</span><span class="suffix"><input type="number" inputmode="decimal" min="0" step="any" data-price="${i}" value="${p[i] ?? ""}" required /><span>${cur}</span></span></label>
        <label class="field"><span class="field-l">Ortalama kalori</span><span class="suffix"><input type="number" inputmode="numeric" min="0" step="1" data-kcal="${i}" value="${k[i] ?? ""}" /><span>kcal</span></span></label>
      </div>`;
    $("#priceGrid").className = `price-grid${two ? "" : " one"}`;
    $("#priceGrid").innerHTML = two ? box(0, "Small") + box(1, "Grande") : box(0, "Porsiyon");
  }
  $("#fSizeMode").addEventListener("click", (e) => {
    const b = e.target.closest("[data-mode]"); if (!b) return;
    const p = $$("[data-price]").map((x) => x.value), k = $$("[data-kcal]").map((x) => x.value);
    edit.mode = Number(b.dataset.mode);
    renderPrices(p, k);
  });
  $("#fAlg").addEventListener("click", (e) => {
    const b = e.target.closest("[data-alg]"); if (b) b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
  });

  function paintPhoto() {
    const src = edit.pendingImg ? S.previews.get(edit.pendingImg.path) : (!edit.removeImg && edit.img ? imgSrc(edit.img) : "");
    $("#photoPreview").innerHTML = src ? `<img src="${esc(src)}" alt="Ürün fotoğrafı">` : '<span class="photo-empty">Fotoğraf yok</span>';
    $("#photoRemove").hidden = !src;
    $("#photoPickLabel").textContent = src ? "Fotoğrafı değiştir" : "Fotoğraf seç";
  }

  // Fotoğrafı tarayıcıda küçült (en uzun kenar 1000 px) ve WebP/JPEG'e çevir
  async function shrink(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error("Görsel okunamadı")); im.src = url; });
      const max = 1000, sc = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.round(img.naturalWidth * sc), h = Math.round(img.naturalHeight * sc);
      const cv = Object.assign(document.createElement("canvas"), { width: w, height: h });
      const ctx = cv.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const toBlob = (type, q) => new Promise((r) => cv.toBlob(r, type, q));
      let blob = await toBlob("image/webp", 0.82);
      if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg", 0.84);
      return blob;
    } finally { URL.revokeObjectURL(url); }
  }

  $("#photoInput").addEventListener("change", async (e) => {
    const file = e.target.files[0]; e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast("Lütfen bir görsel dosyası seçin.", true); return; }
    try {
      $("#photoPickLabel").textContent = "Hazırlanıyor…";
      const blob = await shrink(file);
      const ext = blob.type === "image/webp" ? "webp" : "jpg";
      const base = slug($("#fNameTr").value) || "urun";
      const path = `images/${base}-${Date.now().toString(36)}.${ext}`;
      if (edit.pendingImg) S.previews.delete(edit.pendingImg.path);
      edit.pendingImg = { path, blob };
      S.previews.set(path, URL.createObjectURL(blob));
      edit.removeImg = false;
      paintPhoto();
      toast(`Fotoğraf hazır (${Math.round(blob.size / 1024)} KB)`);
    } catch (err) { toast(err.message || "Fotoğraf işlenemedi", true); paintPhoto(); }
  });
  $("#photoRemove").addEventListener("click", () => {
    if (edit.pendingImg) { S.previews.delete(edit.pendingImg.path); edit.pendingImg = null; }
    else edit.removeImg = true;
    paintPhoto();
  });

  // Eski fotoğrafı bırak: yeni yüklenmişse kuyruktan çıkar, yayınlanmışsa silinecekler listesine ekle
  function releaseImg(path) {
    if (!path) return;
    if (S.uploads.has(path)) { S.uploads.delete(path); S.previews.delete(path); }
    else if (S.remote.categories.some((c) => c.items.some((i) => i.img === path))) S.deletes.add(path);
  }

  $("#itemForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = (msg, el) => { $("#itemErr").textContent = msg; $("#itemErr").hidden = false; if (el) { el.classList.add("invalid"); el.focus(); } };
    $$("#itemForm .invalid").forEach((x) => x.classList.remove("invalid"));
    const nameTr = $("#fNameTr").value.trim();
    if (!nameTr) return err("Türkçe ürün adı zorunlu.", $("#fNameTr"));
    const priceEls = $$("[data-price]");
    const p = [];
    for (const el of priceEls) {
      const v = Number(String(el.value).replace(",", "."));
      if (!el.value || !(v > 0)) return err("Geçerli bir fiyat girin.", el);
      p.push(Math.round(v * 100) / 100);
    }
    const k = $$("[data-kcal]").map((el) => Math.max(0, Math.round(Number(el.value) || 0)));

    const n = {}, d = {};
    LANGS.forEach((l) => {
      const nv = $(`#fName${cap(l)}`).value.trim(), dv = $(`#fDesc${cap(l)}`).value.trim();
      if (nv) n[l] = nv;
      if (dv) d[l] = dv;
    });
    const a = $$("#fAlg [aria-pressed=true]").map((b) => b.dataset.alg);
    const targetCat = S.draft.categories.find((c) => c.id === $("#fCat").value);

    let it;
    if (edit.id) {
      const from = catOf(edit.id);
      const idx = from.items.findIndex((x) => x.id === edit.id);
      it = from.items[idx];
      if (from !== targetCat) { from.items.splice(idx, 1); targetCat.items.push(it); }
    } else {
      it = { id: uniqueId(slug(n.en || nameTr)) };
      targetCat.items.push(it);
    }
    Object.assign(it, { n, d, p, k: k.some(Boolean) ? k : [], a });
    ["pop", "soldOut", "hidden"].forEach((f, i) => {
      const on = [$("#fPop"), $("#fSold"), $("#fHidden")][i].checked;
      if (on) it[f] = true; else delete it[f];
    });
    // Fotoğraf
    if (edit.pendingImg) {
      releaseImg(it.img);
      S.uploads.set(edit.pendingImg.path, edit.pendingImg.blob);
      it.img = edit.pendingImg.path;
    } else if (edit.removeImg && it.img) {
      releaseImg(it.img); delete it.img;
    }
    if (!it.img) delete it.img;
    edit = null;
    itemModal.close();
    toast(`“${nameTr}” kaydedildi. Menüye aktarmak için Yayınla'ya basın.`);
    renderAll();
  });

  $("#itemDelete").addEventListener("click", () => {
    const c = catOf(edit.id), it = c.items.find((x) => x.id === edit.id);
    if (!confirm(`“${it.n.tr}” menüden silinsin mi?`)) return;
    releaseImg(it.img);
    c.items.splice(c.items.indexOf(it), 1);
    if (edit.pendingImg) S.previews.delete(edit.pendingImg.path);
    edit = null; itemModal.close();
    toast(`“${it.n.tr}” silindi`);
    renderAll();
  });

  // Kapatma: vazgeçilen yeni fotoğrafın önizlemesini temizle
  itemModal.addEventListener("close", () => {
    if (edit?.pendingImg) S.previews.delete(edit.pendingImg.path);
    edit = null;
  });
  $$("[data-close]").forEach((b) => b.addEventListener("click", () => b.closest("dialog").close()));

  /* ---------- Kategoriler ---------- */
  function renderCategories() {
    const cats = S.draft.categories;
    $("#catList").innerHTML = cats.map((c, i) => `<div class="row${c.hidden ? " is-hidden" : ""}">
        <button class="row-main" type="button" data-cedit="${esc(c.id)}">
          <span class="thumb" style="--g:${grad(c.tone)}">${ico(c.icon)}</span>
          <span class="row-text">
            <span class="row-name">${esc(c.n.tr)}</span>
            <span class="row-sub">${esc([c.n.en, c.n.ru].filter(Boolean).join(" · ") || "—")}</span>
            <span class="tags">${c.hidden ? '<span class="tag hid">GİZLİ</span>' : ""}</span>
          </span>
        </button>
        <span class="row-price">${c.items.length}<small>ürün</small></span>
        <span class="row-tools">
          <button class="mini" type="button" data-cmove="${i}" data-dir="-1" ${i === 0 ? "disabled" : ""} aria-label="Yukarı taşı">${ico("up")}</button>
          <button class="mini" type="button" data-cmove="${i}" data-dir="1" ${i === cats.length - 1 ? "disabled" : ""} aria-label="Aşağı taşı">${ico("down")}</button>
          <button class="mini" type="button" data-cedit="${esc(c.id)}" aria-label="Düzenle">${ico("edit")}</button>
        </span>
      </div>`).join("") || `<div class="empty-state">Henüz kategori yok.</div>`;
  }
  $("#catList").addEventListener("click", (e) => {
    const ed = e.target.closest("[data-cedit]");
    if (ed) return openCat(ed.dataset.cedit);
    const mv = e.target.closest("[data-cmove]");
    if (mv) {
      const cats = S.draft.categories, i = Number(mv.dataset.cmove), j = i + Number(mv.dataset.dir);
      [cats[i], cats[j]] = [cats[j], cats[i]];
      renderAll();
    }
  });
  $("#addCatBtn").addEventListener("click", () => openCat(null));

  const catModal = $("#catModal");
  let cedit = null;
  function openCat(id) {
    const c = id ? S.draft.categories.find((x) => x.id === id) : null;
    cedit = { id, tone: c?.tone || "espresso", icon: c?.icon || "coffee" };
    $("#catModalTitle").textContent = c ? "Kategoriyi düzenle" : "Yeni kategori";
    $("#catDelete").hidden = !c;
    LANGS.forEach((l) => { $(`#cName${cap(l)}`).value = c?.n?.[l] || ""; $(`#cSub${cap(l)}`).value = c?.sub?.[l] || ""; });
    $("#cHidden").checked = !!c?.hidden;
    $("#cTone").innerHTML = Object.keys(TONES).map((t) => `<button type="button" class="tone" role="radio" data-tone="${t}" aria-label="${t}" style="--g:${grad(t)}"></button>`).join("");
    $("#cIcon").innerHTML = CAT_ICONS.map((n) => `<button type="button" class="icon-opt" role="radio" data-icon="${n}" aria-label="${n}">${ico(n)}</button>`).join("");
    $("#catErr").hidden = true;
    paintCat();
    catModal.showModal();
    if (!c) setTimeout(() => $("#cNameTr").focus(), 60);
  }
  function paintCat() {
    $$("#cTone [data-tone]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.tone === cedit.tone)));
    $$("#cIcon [data-icon]").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.icon === cedit.icon)));
    $("#catPreview").style.setProperty("--g", grad(cedit.tone));
    $("#catPreview").innerHTML = `<span class="ci">${ico(cedit.icon)}</span><b>${esc($("#cNameTr").value || "Kategori adı")}</b>`;
  }
  $("#cTone").addEventListener("click", (e) => { const b = e.target.closest("[data-tone]"); if (b) { cedit.tone = b.dataset.tone; paintCat(); } });
  $("#cIcon").addEventListener("click", (e) => { const b = e.target.closest("[data-icon]"); if (b) { cedit.icon = b.dataset.icon; paintCat(); } });
  $("#cNameTr").addEventListener("input", paintCat);

  $("#catForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameTr = $("#cNameTr").value.trim();
    if (!nameTr) { $("#catErr").textContent = "Türkçe kategori adı zorunlu."; $("#catErr").hidden = false; $("#cNameTr").focus(); return; }
    const n = {}, sub = {};
    LANGS.forEach((l) => {
      const nv = $(`#cName${cap(l)}`).value.trim(), sv = $(`#cSub${cap(l)}`).value.trim();
      if (nv) n[l] = nv; if (sv) sub[l] = sv;
    });
    let c = cedit.id ? S.draft.categories.find((x) => x.id === cedit.id) : null;
    if (!c) { c = { id: uniqueId(slug(n.en || nameTr)), items: [] }; S.draft.categories.push(c); }
    Object.assign(c, { icon: cedit.icon, tone: cedit.tone, n });
    if (Object.keys(sub).length) c.sub = sub; else delete c.sub;
    if ($("#cHidden").checked) c.hidden = true; else delete c.hidden;
    // Alan sırasını sabit tut (okunaklı menu.json)
    const { id, icon, tone, n: nn, sub: ss, hidden, items } = c;
    const ordered = { id, icon, tone, n: nn, ...(ss ? { sub: ss } : {}), ...(hidden ? { hidden } : {}), items };
    Object.keys(c).forEach((k) => delete c[k]); Object.assign(c, ordered);
    cedit = null; catModal.close();
    toast(`“${nameTr}” kaydedildi`);
    renderAll();
  });
  $("#catDelete").addEventListener("click", () => {
    const cats = S.draft.categories, c = cats.find((x) => x.id === cedit.id);
    const msg = c.items.length
      ? `“${c.n.tr}” kategorisi ve içindeki ${c.items.length} ürün silinecek. Emin misiniz?`
      : `“${c.n.tr}” kategorisi silinsin mi?`;
    if (!confirm(msg)) return;
    c.items.forEach((i) => releaseImg(i.img));
    cats.splice(cats.indexOf(c), 1);
    if (S.cat === c.id) S.cat = null;
    cedit = null; catModal.close();
    toast("Kategori silindi");
    renderAll();
  });

  /* ---------- Ayarlar ---------- */
  function renderSettings() {
    const f = $("#settingsForm");
    ["whatsapp", "instagram", "googleReview", "wifiName", "wifiPass", "currency"].forEach((k) => {
      if (document.activeElement !== f.elements[k]) f.elements[k].value = S.draft.config[k] ?? "";
    });
  }
  $("#settingsForm").addEventListener("input", (e) => {
    const el = e.target; if (!el.name) return;
    let v = el.value;
    if (el.name === "whatsapp") v = v.replace(/[^\d]/g, "");
    S.draft.config[el.name] = v;
    refreshDirty();
  });
  $("#settingsForm").addEventListener("submit", (e) => e.preventDefault());

  /* ---------- Yayınla ---------- */
  function busy(txt) {
    const m = $("#busyModal");
    if (txt === false) { if (m.open) m.close(); return; }
    $("#busyText").textContent = txt;
    if (!m.open) m.showModal();
  }
  $("#busyModal").addEventListener("cancel", (e) => e.preventDefault());

  function summary() {
    const lines = [];
    const byId = (d) => new Map(d.categories.flatMap((c) => c.items.map((i) => [i.id, i])));
    const a = byId(S.remote), b = byId(S.draft);
    b.forEach((it, id) => {
      if (!a.has(id)) lines.push(`+ ${it.n.tr}`);
      else if (JSON.stringify(a.get(id)) !== JSON.stringify(it)) lines.push(`~ ${it.n.tr}`);
    });
    a.forEach((it, id) => { if (!b.has(id)) lines.push(`- ${it.n.tr}`); });
    if (JSON.stringify(S.remote.config) !== JSON.stringify(S.draft.config)) lines.push("~ işletme ayarları");
    return lines;
  }

  $("#publishBtn").addEventListener("click", async () => {
    const n = dirtyCount(); if (!n) return;
    try {
      busy("Kontrol ediliyor…");
      // Başka biri (ya da başka cihaz) arada menüyü değiştirdiyse üstüne yazmadan önce sor
      const cur = await gh(`contents/${DATA_PATH}?ref=${REPO.branch}`);
      if (cur.sha !== S.remoteSha) {
        busy(false);
        if (!confirm("Menü siz düzenlerken başka bir yerden değiştirilmiş. Yayınlarsanız o değişikliklerin üzerine yazılacak.\n\nYine de yayınlansın mı? (İptal ederseniz güncel menüyü yükleyebilirsiniz.)")) {
          if (confirm("Güncel menü yüklensin mi? Buradaki yayınlanmamış değişiklikleriniz kaybolacak.")) { busy("Yükleniyor…"); await loadRemote(); busy(false); }
          return;
        }
        busy("Hazırlanıyor…");
      }

      const ref = await gh(`git/ref/heads/${REPO.branch}`);
      const baseSha = ref.object.sha;
      const baseCommit = await gh(`git/commits/${baseSha}`);
      const tree = [];

      let i = 0;
      for (const [path, blob] of S.uploads) {
        busy(`Fotoğraflar yükleniyor (${++i}/${S.uploads.size})…`);
        const b = await gh("git/blobs", { method: "POST", body: { content: await b64FromBlob(blob), encoding: "base64" } });
        tree.push({ path, mode: "100644", type: "blob", sha: b.sha });
      }

      busy("Menü kaydediliyor…");
      const out = clone(S.draft);
      out.updatedAt = new Date().toISOString();
      const json = JSON.stringify(out, null, 2) + "\n";
      const jb = await gh("git/blobs", { method: "POST", body: { content: b64FromText(json), encoding: "base64" } });
      tree.push({ path: DATA_PATH, mode: "100644", type: "blob", sha: jb.sha });

      if (S.deletes.size) {
        const full = await gh(`git/trees/${baseCommit.tree.sha}?recursive=1`);
        const exists = new Set(full.tree.map((x) => x.path));
        S.deletes.forEach((p) => { if (exists.has(p)) tree.push({ path: p, mode: "100644", type: "blob", sha: null }); });
      }

      const nt = await gh("git/trees", { method: "POST", body: { base_tree: baseCommit.tree.sha, tree } });
      const lines = summary();
      const message = `Menü güncellendi (yönetim paneli)\n\n${lines.slice(0, 40).join("\n")}${lines.length > 40 ? `\n… ve ${lines.length - 40} değişiklik daha` : ""}`;
      const nc = await gh("git/commits", { method: "POST", body: { message, tree: nt.sha, parents: [baseSha] } });
      busy("Yayınlanıyor…");
      await gh(`git/refs/heads/${REPO.branch}`, { method: "PATCH", body: { sha: nc.sha } });

      // Yeni durumu esas al
      S.remote = out; S.remoteSha = jb.sha; S.draft = clone(out);
      S.uploads.clear(); S.deletes.clear();
      busy(false);
      renderAll();
      toast("Yayınlandı! Menü yaklaşık 1 dakika içinde güncellenecek.");
    } catch (err) {
      busy(false);
      console.error(err);
      toast(err.status === 401 ? "Oturum süresi dolmuş, tekrar giriş yapın." : `Yayınlanamadı: ${err.message}`, true);
      if (err.status === 401) { store.del(TOKEN_KEY); showLogin("Anahtarın süresi dolmuş ya da iptal edilmiş."); }
    }
  });

  $("#discardBtn").addEventListener("click", () => {
    if (!confirm("Yayınlanmamış tüm değişiklikler geri alınsın mı?")) return;
    S.draft = clone(S.remote);
    S.uploads.forEach((_, p) => S.previews.delete(p));
    S.uploads.clear(); S.deletes.clear();
    renderAll();
    toast("Değişiklikler geri alındı");
  });

  window.addEventListener("beforeunload", (e) => { if (S.draft && dirtyCount()) { e.preventDefault(); e.returnValue = ""; } });

  /* ---------- Başlat ---------- */
  $("#previewLink").href = "../";
  (async () => {
    const saved = store.get(TOKEN_KEY);
    if (!saved) return showLogin();
    try { await login(saved, !!(() => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } })()); }
    catch (err) {
      if (err.status === 401 || err.status === 403 || err.status === 404) { store.del(TOKEN_KEY); showLogin("Kayıtlı anahtar artık geçerli değil, lütfen tekrar giriş yapın."); }
      else showLogin(`Bağlantı hatası: ${err.message}`);
    }
  })();
})();
