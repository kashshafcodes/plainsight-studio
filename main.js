(function () {
  const S = window.SITE || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LABELS = { ai: "AI", cyber: "Cybersecurity", tech: "Technology", money: "Money & behaviour" };

  /* ---------- Fill links & text from content.js ---------- */
  const links = {
    email: S.email ? "mailto:" + S.email : "",
    whatsapp: S.whatsapp ? "https://wa.me/" + S.whatsapp.replace(/\D/g, "") : "",
    linkedin: S.linkedin, youtube: S.youtube, facebook: S.facebook, instagram: S.instagram
  };
  $$("[data-link]").forEach((a) => {
    const key = a.dataset.link;
    if (links[key]) {
      a.href = links[key];
      if (key === "email" && !a.textContent.trim()) a.textContent = S.email;
    } else {
      a.remove();
    }
  });
  $$("[data-hide-if-empty]").forEach((el) => { if (!S[el.dataset.hideIfEmpty]) el.remove(); });
  $$("[data-location]").forEach((el) => (el.textContent = S.location || ""));
  $$("[data-founder]").forEach((el) => { if (S.founderName) el.textContent = S.founderName; });
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Stats ---------- */
  const statsEl = $("[data-stats]");
  if (statsEl && Array.isArray(S.stats)) {
    statsEl.innerHTML = S.stats.map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");
  }

  /* ---------- Video modal (showreel) ---------- */
  const modal = $("[data-modal]");
  const frame = $("[data-modal-frame]");
  function openModal(src) {
    frame.innerHTML = `<video src="${esc(src)}" controls autoplay playsinline></video>`;
    modal.hidden = false; $("[data-modal-close]").focus();
  }
  function closeModal() { modal.hidden = true; frame.innerHTML = ""; }
  $("[data-modal-close]").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  const reelBtn = $("[data-showreel]");
  if (S.showreel && reelBtn) { reelBtn.hidden = false; reelBtn.addEventListener("click", () => openModal(S.showreel)); }

  /* ---------- Work grid (vertical reels, self-hosted) ---------- */
  const work = $("[data-work]");
  const videos = Array.isArray(S.videos) ? S.videos : [];
  work.innerHTML = videos.map((v) => `
    <article class="card reveal" data-cat="${esc(v.category)}">
      <button class="card__media" data-src="${esc(v.file)}" aria-label="Play: ${esc(v.title)}">
        <img src="${esc(v.poster)}" alt="" loading="lazy">
        <span class="card__play" aria-hidden="true"></span>
      </button>
      <div class="card__body">
        <span class="card__tag card__tag--${esc(v.category)}">${esc(LABELS[v.category] || v.category)}</span>
        <h3 class="card__title">${esc(v.title)}</h3>
        ${v.bn ? `<p class="card__bn" lang="bn">${esc(v.bn)}</p>` : ""}
        ${v.brief ? `<p class="card__brief">${esc(v.brief)}</p>` : ""}
      </div>
    </article>`).join("");

  const workSection = $("#work");
  workSection.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-src]");
    if (!btn) return;
    const box = document.createElement("div");
    box.className = "card__media";
    const vid = document.createElement("video");
    vid.src = btn.dataset.src; vid.controls = true; vid.playsInline = true;
    vid.poster = btn.querySelector("img").src;
    vid.addEventListener("play", () => $$("video", workSection).forEach((o) => { if (o !== vid) o.pause(); }));
    box.appendChild(vid);
    btn.replaceWith(box);
    vid.play().catch(() => {});
  });

  // Hide filter chips with no videos
  $$(".chip").forEach((c) => {
    const f = c.dataset.filter;
    if (f !== "all" && !videos.some((v) => v.category === f)) c.remove();
  });
  $(".filters").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip").forEach((c) => { const on = c === chip; c.classList.toggle("is-active", on); c.setAttribute("aria-selected", on); });
    const f = chip.dataset.filter;
    $$(".card", work).forEach((card) => { card.hidden = f !== "all" && card.dataset.cat !== f; });
  });

  /* ---------- Hero lens ---------- */
  const stage = $(".lens__stage");
  if (stage) {
    let userControl = false, t = 0, raf;
    const set = (x, y) => { stage.style.setProperty("--x", x + "px"); stage.style.setProperty("--y", y + "px"); };
    const drift = () => {
      if (userControl) return;
      const r = stage.getBoundingClientRect();
      t += 0.006;
      const x = r.width * (0.5 + 0.38 * Math.sin(t * 1.3));
      const y = r.height * (0.5 + 0.32 * Math.sin(t * 2.1 + 1));
      set(x, y);
      raf = requestAnimationFrame(drift);
    };
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const p = e.touches ? e.touches[0] : e;
      userControl = true; cancelAnimationFrame(raf);
      set(Math.max(0, Math.min(r.width, p.clientX - r.left)), Math.max(0, Math.min(r.height, p.clientY - r.top)));
    };
    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", () => { userControl = false; drift(); });
    if (reduced) { const r = stage.getBoundingClientRect(); set(r.width * 0.3, r.height * 0.4); }
    else drift();
  }

  /* ---------- Nav ---------- */
  const nav = $(".nav"), toggle = $(".nav__toggle"), navLinks = $("#nav-links");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open); navLinks.classList.toggle("is-open", open);
  });
  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) { toggle.setAttribute("aria-expanded", "false"); navLinks.classList.remove("is-open"); }
  });
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Reveal on scroll ---------- */
  $$(".service, .step, .plan, .section__head").forEach((el) => el.classList.add("reveal"));
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  } else {
    $$(".reveal").forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Contact form → email ---------- */
  const form = $("[data-form]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    $$("[required]", form).forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^\S+@\S+\.\S+$/.test(f.value));
      f.classList.toggle("is-invalid", bad); if (bad) ok = false;
    });
    if (!ok) { $("[data-form-note]").textContent = "Please fill in your name, email and a short description."; return; }
    const d = Object.fromEntries(new FormData(form));
    const subject = `Project enquiry: ${d.type}${d.company ? " — " + d.company : ""}`;
    const body = `Name: ${d.name}\nCompany: ${d.company || "-"}\nEmail: ${d.email}\nProject type: ${d.type}\nBudget: ${d.budget}\n\n${d.message}`;
    window.location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    $("[data-form-note]").innerHTML = `Your email app should open now. If it didn't, write to <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>.`;
  });
})();
