/* =====================================================================
   app.js — ওয়েবসাইট ও AI সহায়কের কাজ করার কোড
   সাধারণত এই ফাইল বদলানোর দরকার নেই। তথ্য বদলাতে data.js ফাইল খুলুন।
   ===================================================================== */
var $ = function (s) { return document.querySelector(s); };
var WA = "https://wa.me/" + APU.phone;

/* ছবি + না থাকলে আদ্যক্ষর */
function img(p) { return '<img src="' + p.img + '" alt="' + p.n + '" onerror="this.remove()">'; }

/* ---------- নোটিশ পট্টি ---------- */
if (NOTICES.length) {
  var ni = 0, nb = $("#notice"); nb.hidden = false; nb.textContent = NOTICES[0];
  if (NOTICES.length > 1) setInterval(function () { ni = (ni + 1) % NOTICES.length; nb.textContent = NOTICES[ni]; }, 4000);
}

/* ---------- টুলস ফিতা ও কেন APU ---------- */
var tl = TOOLS.concat(TOOLS).map(function (t) { return "<span>" + t + "</span>"; }).join("");
$("#tools").innerHTML = tl;
$("#feat").innerHTML = FEATURES.map(function (f) { return '<div class="f rv"><i>' + f.i + '</i><h3>' + f.t + '</h3><p>' + f.d + '</p></div>'; }).join("");

/* ---------- কোর্স ---------- */
$("#courses-list").innerHTML = COURSES.map(function (c) {
  return '<div class="c rv"><i style="--b:' + c.c + '">' + c.ic.replace("<", "&lt;").replace(">", "&gt;") + '</i><h3>' + c.n + '</h3><p>' + c.d + '</p><span>' + c.dur + '</span><button onclick="apply(this.dataset.n)" data-n="' + c.n + '">ভর্তি হতে চাই</button></div>';
}).join("");
$("#fc").innerHTML = COURSES.map(function (c) { return "<option>" + c.n + "</option>"; }).join("");
function apply(n) { $("#fc").value = n; $("#join").scrollIntoView(); }

/* ---------- প্রতিষ্ঠাতা ও প্রশিক্ষক ---------- */
$("#f-ph").dataset.i = FOUNDER.i; $("#f-ph").innerHTML = img(FOUNDER);
$("#f-info").innerHTML = '<span class="tag">প্রতিষ্ঠাতা</span><div class="fn">' + FOUNDER.n + '</div><div class="role">' + FOUNDER.r + '</div>' +
  '<p><b>শিক্ষাগত যোগ্যতা:</b> ' + FOUNDER.edu + '</p><p class="quote">' + FOUNDER.msg + '</p>';
$("#team-list").innerHTML = TEAM.map(function (p) {
  return '<article class="tr rv"><div class="ph" data-i="' + p.i + '">' + img(p) + '</div><div class="t"><h3>' + p.n + '</h3><div class="role">' + p.r + '</div><small><b>শিক্ষাগত যোগ্যতা:</b> ' + p.edu + '</small></div></article>';
}).join("");

/* ---------- ধাপ, জিজ্ঞাসা, যোগাযোগ ---------- */
$("#steps").innerHTML = STEPS.map(function (s) { return '<div class="step rv"><h3>' + s.t + '</h3><p>' + s.d + '</p></div>'; }).join("");
$("#faq").innerHTML = FAQ.map(function (f) { return '<details><summary>' + f.q + '</summary><p>' + f.a + '</p></details>'; }).join("");
$("#info").innerHTML = '<dt>ঠিকানা</dt><dd>' + APU.address + '</dd><dt>ফোন</dt><dd><a href="tel:+' + APU.phone + '">' + APU.phoneShow + '</a></dd>' +
  (APU.email ? '<dt>ই-মেইল</dt><dd><a href="mailto:' + APU.email + '">' + APU.email + '</a></dd>' : "") +
  '<dt>ফেসবুক</dt><dd><a href="' + APU.fb + '" target="_blank" rel="noopener">APU IT ACADEMY</a></dd><dt>অফিস সময়</dt><dd>' + APU.hours + '</dd>';
$("#mapbtn").href = APU.map; $("#wabtn").href = WA; $("#wa").href = WA; $("#fbl").href = APU.fb;
$("#mapf").src = APU.mapEmbed; $("#slogan").textContent = APU.slogan;

/* ভর্তি ফরম → হোয়াটসঅ্যাপ */
$("#send").onclick = function () {
  var n = $("#fn").value.trim(), p = $("#fp").value.trim();
  if (!n || !p) { alert("অনুগ্রহ করে নাম ও মোবাইল নম্বর দিন"); return; }
  var m = "ভর্তির আবেদন\nনাম: " + n + "\nমোবাইল: " + p + "\nকোর্স: " + $("#fc").value + "\nবার্তা: " + $("#fm").value;
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

/* ---------- স্ক্রল অ্যানিমেশন, মেনু, স্ক্রল লাইন ---------- */
var io = new IntersectionObserver(function (e) { e.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("on"); io.unobserve(x.target); } }); }, { threshold: .12 });
document.querySelectorAll(".rv").forEach(function (e, k) { e.style.transitionDelay = (k % 4) * 90 + "ms"; io.observe(e); });
onscroll = function () { var h = document.documentElement; $("#bar").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%"; };
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
        '<div class="acts"><a href="' + g + '" target="_blank" rel="noopener">🔎 গুগলে খুঁজুন</a><a href="' + WA + '" target="_blank" rel="noopener">💬 হোয়াটসঅ্যাপ</a><a href="tel:+' + APU.phone + '">📞 কল করুন</a></div>';
    }
    chat.scrollTop = chat.scrollHeight;
  });
}
CHIPS.forEach(function (t) { var b = document.createElement("button"); b.textContent = t; b.onclick = function () { ask(t); }; $("#chips").appendChild(b); });
$("#cf").onsubmit = function (e) { e.preventDefault(); var v = $("#q").value; $("#q").value = ""; ask(v); };
say(WELCOME, "bot");
