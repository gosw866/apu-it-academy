/* =====================================================================
   app.js — ওয়েবসাইট ও AI সহায়কের কাজ করার কোড
   সাধারণত এই ফাইল বদলানোর দরকার নেই। তথ্য ও হেডলাইন বদলাতে data.js ফাইল খুলুন।
   ===================================================================== */
var $ = function (s) { return document.querySelector(s); };
var WA = "https://wa.me/" + APU.phone;
var FB_USER = APU.fb.replace(/\/+$/, "").split("/").pop();
var FB_MSG = "https://m.me/" + FB_USER;
var FBI = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .4-1.7 1.8-1.7h1.6V3.5c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2v2.8H7.6v3.4h2.8V22z"/></svg>';

/* ছবি + না থাকলে আদ্যক্ষর */
function img(p) { return '<img src="' + p.img + '" alt="' + p.n + '" onerror="imgFail(this)">'; }
/* ছবি না পেলে নাম_1 (যেমন logo_1.png) চেষ্টা করে, তারপরও না পেলে সরিয়ে দেয় */
function imgFail(im) {
  if (!im.dataset.t) { im.dataset.t = 1; im.src = im.getAttribute("src").replace(/(\.\w+)$/, "_1$1"); } else im.remove();
}
/* লোগো — data.js-এর APU.logo থেকে সব জায়গায় বসে */
document.querySelectorAll("img[data-logo]").forEach(function (im) { im.onerror = function () { imgFail(im); }; im.src = APU.logo || "logo.png"; });
$("link[rel=icon]").href = APU.logo || "logo.png";

/* ---------- সেকশনের হেডলাইন (data.js → SECTIONS) ---------- */
document.querySelectorAll("[data-s]").forEach(function (el) {
  var k = el.dataset.s.split("."), v = (typeof SECTIONS !== "undefined" && SECTIONS[k[0]]) ? SECTIONS[k[0]][k[1]] : "";
  if (v) { el.textContent = v; el.hidden = false; }
});

/* ---------- ফেসবুক লিংক (সব জায়গায় একসাথে) ---------- */
function setFb(id, label) { var a = $(id); if (!a) return; a.href = APU.fb; a.innerHTML = FBI + "<span>" + label + "</span>"; }
setFb("#fbnav", "ফেসবুক"); setFb("#heroFb", "ফেসবুক পেজ"); setFb("#socialFb", "পেজ ফলো করুন");
setFb("#contactFb", "ফেসবুক"); setFb("#fbl", "ফেসবুক পেজ দেখুন");
$("#fbf2").href = APU.fb; $("#fbf2").innerHTML = FBI + "<span>ফেসবুক</span>";
$("#socialMsg").href = FB_MSG;
$("#fbf").src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(APU.fb) + "&tabs=timeline&width=380&height=520&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true";

/* ---------- উপরের পট্টি ---------- */
$("#topbar .tb").innerHTML = '<span>📞 <a href="tel:+' + APU.phone + '">' + APU.phoneShow + '</a></span><span class="tadr">📍 ' + APU.address + '</span>' +
  '<a class="tfb" href="' + APU.fb + '" target="_blank" rel="noopener">' + FBI + ' Facebook-এ আমাদের ফলো করুন</a>';

/* ---------- নোটিশ পট্টি ---------- */
if (NOTICES.length) {
  var ni = 0, nb = $("#notice"); nb.hidden = false; nb.textContent = NOTICES[0];
  if (NOTICES.length > 1) setInterval(function () { ni = (ni + 1) % NOTICES.length; nb.textContent = NOTICES[ni]; }, 4000);
}

/* ---------- হিরোর ট্যাগ, সংখ্যার ফিতা, টুলস, কেন APU ---------- */
$("#badges").innerHTML = (typeof BADGES !== "undefined" ? BADGES : []).map(function (b) { return "<span>" + b + "</span>"; }).join("");
if (typeof STATS !== "undefined" && STATS.length) {
  $("#statsWrap").hidden = false;
  $("#stats").innerHTML = STATS.map(function (s) {
    return '<div class="st"><b data-n="' + s.n + '" data-u="' + (s.s || "") + '">০' + (s.s || "") + '</b><span>' + s.t + '</span></div>';
  }).join("");
}
var tl = TOOLS.concat(TOOLS).map(function (t) { return "<span>" + t + "</span>"; }).join("");
$("#tools").innerHTML = tl;
$("#feat").innerHTML = FEATURES.map(function (f) { return '<div class="f rv"><i>' + f.i + '</i><h3>' + f.t + '</h3><p>' + f.d + '</p></div>'; }).join("");

/* ---------- ক্লাসের ধরন ---------- */
$("#modes-list").innerHTML = MODES.map(function (m, k) {
  return '<div class="mc rv' + (k ? ' alt' : '') + '"><i>' + m.i + '</i><small>' + m.tag + '</small><h3>' + m.t + '</h3><p>' + m.d + '</p><ul>' +
    m.pts.map(function (x) { return "<li>" + x + "</li>"; }).join("") + '</ul></div>';
}).join("");

/* ---------- কোর্স ---------- */
$("#courses-list").innerHTML = COURSES.map(function (c) {
  return '<div class="c rv"><i style="--b:' + c.c + '">' + c.ic.replace("<", "&lt;").replace(">", "&gt;") + '</i><h3>' + c.n + '</h3><p>' + c.d + '</p><span>' + c.dur + '</span><button onclick="apply(this.dataset.n)" data-n="' + c.n + '">ভর্তি হতে চাই</button></div>';
}).join("");
$("#fc").innerHTML = COURSES.map(function (c) { return "<option>" + c.n + "</option>"; }).join("");
function apply(n) { $("#fc").value = n; $("#join").scrollIntoView(); }

/* ---------- প্রতিষ্ঠাতা ও প্রশিক্ষক ---------- */
$("#f-ph").dataset.i = FOUNDER.i; $("#f-ph").innerHTML = img(FOUNDER);
$("#f-info").innerHTML = '<div class="fn">' + FOUNDER.n + '</div><div class="role">' + FOUNDER.r + '</div>' +
  '<p><b>শিক্ষাগত যোগ্যতা:</b> ' + FOUNDER.edu + '</p><p class="quote">' + FOUNDER.msg + '</p>' +
  '<a class="btn fb" href="' + APU.fb + '" target="_blank" rel="noopener" style="margin-top:14px">' + FBI + '<span>ফেসবুকে যোগাযোগ</span></a>';
$("#team-list").innerHTML = TEAM.map(function (p) {
  return '<article class="tr rv"><div class="ph" data-i="' + p.i + '">' + img(p) + '</div><div class="t"><h3>' + p.n + '</h3><div class="role">' + p.r + '</div><small><b>শিক্ষাগত যোগ্যতা:</b> ' + p.edu + '</small></div></article>';
}).join("");

/* ---------- মতামত ও গ্যালারি (ফাঁকা থাকলে লুকানো) ---------- */
if (typeof TESTIMONIALS !== "undefined" && TESTIMONIALS.length) {
  $("#reviews").hidden = false;
  $("#reviews-list").innerHTML = TESTIMONIALS.map(function (t) {
    return '<figure class="rc rv"><blockquote>' + t.m + '</blockquote><figcaption><b>' + t.n + '</b><span>' + (t.c || "") + '</span></figcaption></figure>';
  }).join("");
}
if (typeof GALLERY !== "undefined" && GALLERY.length) {
  $("#gallery").hidden = false;
  $("#gallery-list").innerHTML = GALLERY.map(function (g) { return '<img class="rv" loading="lazy" src="' + g + '" alt="APU IT Academy গ্যালারি" onerror="this.remove()">'; }).join("");
}

/* ---------- ধাপ, জিজ্ঞাসা, যোগাযোগ, ফুটার ---------- */
$("#steps").innerHTML = STEPS.map(function (s) { return '<div class="step rv"><h3>' + s.t + '</h3><p>' + s.d + '</p></div>'; }).join("");
$("#faq").innerHTML = FAQ.map(function (f) { return '<details><summary>' + f.q + '</summary><p>' + f.a + '</p></details>'; }).join("");
$("#info").innerHTML = '<dt>ঠিকানা</dt><dd>' + APU.address + '</dd><dt>ফোন</dt><dd><a href="tel:+' + APU.phone + '">' + APU.phoneShow + '</a></dd>' +
  (APU.email ? '<dt>ই-মেইল</dt><dd><a href="mailto:' + APU.email + '">' + APU.email + '</a></dd>' : "") +
  '<dt>ফেসবুক</dt><dd><a href="' + APU.fb + '" target="_blank" rel="noopener">APU IT ACADEMY</a></dd><dt>অফিস সময়</dt><dd>' + APU.hours + '</dd>';
$("#fcontact").innerHTML = '<p>📍 ' + APU.address + '</p><p>📞 <a href="tel:+' + APU.phone + '">' + APU.phoneShow + '</a></p>' +
  (APU.email ? '<p>✉️ <a href="mailto:' + APU.email + '">' + APU.email + '</a></p>' : "") + '<p>🕘 ' + APU.hours + '</p>';
$("#mapbtn").href = APU.map; $("#wabtn").href = WA; $("#wa").href = WA;
$("#ctaCall").href = "tel:+" + APU.phone;
$("#mapf").src = APU.mapEmbed; $("#slogan").textContent = APU.slogan;

/* ভর্তি ফরম → হোয়াটসঅ্যাপ */
$("#send").onclick = function () {
  var n = $("#fn").value.trim(), p = $("#fp").value.trim();
  if (!n || !p) { alert("অনুগ্রহ করে নাম ও মোবাইল নম্বর দিন"); return; }
  var m = "ভর্তির আবেদন\nনাম: " + n + "\nমোবাইল: " + p + "\nকোর্স: " + $("#fc").value + "\nক্লাসের ধরন: " + $("#fk").value + "\nবার্তা: " + $("#fm").value;
  window.open(WA + "?text=" + encodeURIComponent(m), "_blank");
};

/* ---------- হিরোর টাইপ হওয়া শব্দ ---------- */
var wi = 0, j = 0, del = false, ty = $("#ty");
function tick() {
  var s = TYPED[wi]; j += del ? -1 : 1; ty.textContent = s.slice(0, j) || "\u00a0";
  if (!del && j == s.length) { del = true; return setTimeout(tick, 1500); }
  if (del && j == 0) { del = false; wi = (wi + 1) % TYPED.length; }
  setTimeout(tick, del ? 45 : 90);
}
if (!matchMedia("(prefers-reduced-motion:reduce)").matches) tick();

/* ---------- সংখ্যা গোনা (পর্দায় এলে একবার) ---------- */
function bn(n) { return n.toLocaleString("bn-BD"); }
var reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
var co = new IntersectionObserver(function (e) {
  e.forEach(function (x) {
    if (!x.isIntersecting) return;
    var el = x.target, end = +el.dataset.n, suf = el.dataset.u, t0 = null; co.unobserve(el);
    if (reduce) { el.textContent = bn(end) + suf; return; }
    (function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1200, 1); el.textContent = bn(Math.round(end * p)) + suf; if (p < 1) requestAnimationFrame(step); })(performance.now());
  });
}, { threshold: .5 });
document.querySelectorAll("#stats b").forEach(function (b) { co.observe(b); });

/* ---------- স্ক্রল অ্যানিমেশন, মেনু, স্ক্রল লাইন ---------- */
var io = new IntersectionObserver(function (e) { e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("on"); io.unobserve(x.target); } }); }, { threshold: .12 });
document.querySelectorAll(".rv").forEach(function (e, k) { e.style.transitionDelay = (k % 4) * 90 + "ms"; io.observe(e); });
var secs = [].slice.call(document.querySelectorAll("section[id]")), navs = [].slice.call(document.querySelectorAll("#nv a[href^='#']")), hd = $("header");
onscroll = function () {
  var h = document.documentElement, y = h.scrollTop + 140, cur = "";
  $("#bar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  hd.classList.toggle("sc", h.scrollTop > 10);
  secs.forEach(function (s) { if (!s.hidden && s.offsetTop <= y) cur = s.id; });
  navs.forEach(function (n) { n.classList.toggle("act", n.getAttribute("href") === "#" + cur); });
};
var nv = $("#nv"); $("#mb").onclick = function () { nv.classList.toggle("open"); }; nv.onclick = function () { nv.classList.remove("open"); };

/* =====================================================================
   AI সহায়ক (চ্যাট)
   ===================================================================== */
var chat = $("#chat");
function openChat() { $("#cp").classList.add("on"); $("#q").focus(); }
$("#fab").onclick = function () { $("#cp").classList.toggle("on"); };
$("#askAi").onclick = openChat; $("#cx").onclick = function () { $("#cp").classList.remove("on"); };

function fill(t) {
  return t.replace(/\{PHONE\}/g, APU.phoneShow).replace(/\{ADDR\}/g, APU.address).replace(/\{HOURS\}/g, APU.hours)
          .replace(/\{MAP\}/g, APU.map).replace(/\{FB\}/g, APU.fb).replace(/\{WA\}/g, WA);
}
function say(html, who) {
  var d = document.createElement("div"); d.className = "m " + who;
  if (who === "me") d.textContent = html; else d.innerHTML = html;
  chat.appendChild(d); chat.scrollTop = chat.scrollHeight; return d;
}
function esc(s) { var p = document.createElement("div"); p.textContent = s; return p.innerHTML; }

/* প্রশ্নের সাথে সবচেয়ে মিলে যাওয়া উত্তর */
function best(q) {
  q = q.toLowerCase().replace(/[?।!,.;:()"']/g, " ");
  var words = q.split(/\s+/), top = null, hi = 0;
  KB.forEach(function (e) {
    var s = 0;
    e.k.forEach(function (w) {
      w = w.toLowerCase();
      var short = /^[a-z0-9 ]{1,3}$/.test(w);
      if (short ? words.indexOf(w) > -1 : q.indexOf(w) > -1) s += Math.max(w.length, 2);
    });
    if (s > hi) { hi = s; top = e; }
  });
  return hi >= 2 ? top : null;
}

/* উত্তর না পেলে বাংলা উইকিপিডিয়া থেকে খোঁজা */
function wiki(q, done) {
  var ctl = new AbortController(), t = setTimeout(function () { ctl.abort(); }, 7000);
  var url = "https://bn.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=1&prop=extracts&exintro=1&explaintext=1&exchars=450&format=json&origin=*&gsrsearch=" + encodeURIComponent(q);
  fetch(url, { signal: ctl.signal }).then(function (r) { return r.json(); }).then(function (j) {
    clearTimeout(t);
    var p = j.query && j.query.pages && Object.values(j.query.pages)[0];
    done(p && p.extract ? p : null);
  }).catch(function () { clearTimeout(t); done(null); });
}

function ask(q) {
  q = q.trim(); if (!q) return;
  say(q, "me");
  var dots = say('<span class="dots"><span></span><span></span><span></span></span>', "bot");
  var found = best(q), g = "https://www.google.com/search?q=" + encodeURIComponent(q);
  if (found) { setTimeout(function () { dots.innerHTML = fill(found.a); chat.scrollTop = chat.scrollHeight; }, 500); return; }
  wiki(q, function (p) {
    if (p) {
      dots.innerHTML = esc(p.extract) + '<span class="src">সূত্র: বাংলা উইকিপিডিয়া (' + esc(p.title) + '), সঠিক না হলে গুগলে খুঁজে দেখুন।</span>' +
        '<div class="acts"><a href="https://bn.wikipedia.org/wiki/' + encodeURIComponent(p.title) + '" target="_blank" rel="noopener">পুরোটা পড়ুন</a><a href="' + g + '" target="_blank" rel="noopener">🔎 গুগলে খুঁজুন</a></div>';
    } else {
      dots.innerHTML = "দুঃখিত, এই প্রশ্নের উত্তর আমার কাছে নেই। আপনি গুগলে খুঁজে দেখতে পারেন, অথবা আমাদের অফিসে সরাসরি জিজ্ঞেস করতে পারেন।" +
        '<div class="acts"><a href="' + g + '" target="_blank" rel="noopener">🔎 গুগলে খুঁজুন</a><a href="' + WA + '" target="_blank" rel="noopener">💬 হোয়াটসঅ্যাপ</a><a href="' + APU.fb + '" target="_blank" rel="noopener">ফেসবুক</a><a href="tel:+' + APU.phone + '">📞 কল করুন</a></div>';
    }
    chat.scrollTop = chat.scrollHeight;
  });
}
CHIPS.forEach(function (t) { var b = document.createElement("button"); b.textContent = t; b.onclick = function () { ask(t); }; $("#chips").appendChild(b); });
$("#cf").onsubmit = function (e) { e.preventDefault(); var v = $("#q").value; $("#q").value = ""; ask(v); };
say(WELCOME, "bot");
