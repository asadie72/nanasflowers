/* ===== EDIT THESE ===== */
const SHOP = { name:"Nanas Flowers", email:"orders@nanasflowers.com", phone:"(801) 555-0142" };
// Paste your Formspree form ID here (the part after formspree.io/f/), e.g. "xyzabcd".
// Leave it empty and the forms fall back to "copy this message and send it to us".
const FORMSPREE_ID = "";
/* ====================== */

const CATS = [
  {id:"Wraps", lane:"order", blurb:"Hand-tied bouquets wrapped in paper and ribbon. Ready to hand over.",
    items:[["Petite wrap","8–10 stems","$35"],["Classic wrap","15–18 stems","$55"],["Lush wrap","25+ stems, premium blooms","$85"],["Dozen roses, wrapped","12 long-stem roses","$75"]]},
  {id:"Vase Arrangements", lane:"order", blurb:"Designed in glass or ceramic. Vase included and yours to keep.",
    items:[["Bud vase","3–5 stems","$28"],["Classic vase","Medium, mixed seasonal","$65"],["Statement vase","Large, tall and full","$120"],["Low centerpiece","Table height, for dining","$75"]]},
  {id:"Novelties", lane:"order", blurb:"Small, playful pieces that make a gift feel personal.",
    items:[["Teacup or mug arrangement","Keepsake cup included","$40"],["Single preserved rose in dome","Lasts a year or more","$45"],["Hat box arrangement","Round box, packed full","$75"],["Flower crown","Fresh or dried","$55"]]},
  {id:"Gift Bags", lane:"order", blurb:"A mini bouquet packed with treats. Built for birthdays and thank-yous.",
    items:[["Petite gift bag","Mini bouquet + chocolate","$45"],["Self-care bag","Bouquet, candle, bath soak","$70"],["Deluxe gift bag","Classic wrap + 3 curated gifts","$110"]]},
  {id:"Add-ons", lane:"order", blurb:"Add to any order. Select them on the request form.",
    items:[["Greeting card","Handwritten message","$5"],["Mylar balloon","","$8"],["Chocolates","6 pc box","$12"],["Plush animal","","$15"],["Soy candle","8 oz","$18"],["Vase upgrade","Premium glass or ceramic","$20"]]},
  {id:"Weddings", lane:"event", blurb:"Full-service wedding florals, from personal flowers to ceremony installs.",
    items:[["Bridal bouquet","","from $175"],["Bridesmaid bouquet","","from $65"],["Boutonniere","","$18"],["Corsage","Wrist or pin","$30"],["Reception centerpiece","each","from $55"],["Ceremony arch","Installed","from $450"]]},
  {id:"Funerals", lane:"event", blurb:"Sympathy pieces handled with care, delivered to the home or service.",
    items:[["Sympathy vase","For the family home","$85"],["Wreath on stand","","from $175"],["Standing spray","Easel included","from $225"],["Casket spray","Half or full","from $350"]]},
  {id:"Special Events", lane:"event", blurb:"Showers, galas, corporate events, and parties of any size.",
    items:[["Table centerpiece","each","from $45"],["Entry statement piece","","from $250"],["Cake flowers","Placed by us or your baker","$40"],["Weekly office flowers","Recurring","from $75/wk"]]},
  {id:"Delivery", lane:"order", blurb:"Delivered by us, not a third party. Rates by distance from the studio.",
    items:[["Studio pickup","","Free"],["Within 5 mi","","$10"],["5–15 mi","","$18"],["15–25 mi","","$28"],["Same-day rush","Ordered before noon","+$15"]]},
  {id:"Holidays", lane:"order", blurb:"Seasonal collections. Holidays sell out, so order a week ahead.",
    items:[["Valentine's dozen roses","","$95"],["Mother's Day vase","","$65"],["Easter basket arrangement","","$50"],["Thanksgiving centerpiece","","$70"],["Christmas centerpiece","With candle","$70"]]},
];
const PIECES = ["Bridal / personal flowers","Bouquets","Boutonnieres & corsages","Centerpieces","Ceremony arch or arbor","Aisle & entry pieces","Sympathy pieces","Cake flowers","Delivery & setup"];
const STATUSES = [["new","New"],["quoted","Quoted"],["confirmed","Confirmed"],["done","Fulfilled"],["declined","Declined"]];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const slug = s => s.toLowerCase().replace(/[^a-z]+/g,"-");

/* ---------- storefront ---------- */
$("#cat-tabs").innerHTML = CATS.map(c=>`<a href="#cat-${slug(c.id)}">${esc(c.id)}</a>`).join("");
$("#menu-grid").innerHTML = CATS.map(c=>`
  <article class="cat" id="cat-${slug(c.id)}">
    <div class="cat-head"><h3>${esc(c.id)}</h3><span class="tag ${c.lane}">${c.lane==="event"?"Event planning":"Order"}</span></div>
    <p class="blurb">${esc(c.blurb)}</p>
    <ul class="items">${c.items.map(([n,d,p])=>`<li><span class="nm">${esc(n)}${d?`<small>${esc(d)}</small>`:""}</span><span class="dots"></span><span class="pr">${esc(p)}</span></li>`).join("")}</ul>
    <div class="foot">${c.id==="Add-ons"||c.id==="Delivery"?`<span class="note">Choose on any request form.</span>`:`<span class="note">${c.lane==="event"?"Quoted per event":"Starting prices"}</span>`}
      ${c.id==="Add-ons"||c.id==="Delivery"?"":`<button class="btn btn-ghost btn-small" type="button" data-req="${esc(c.id)}">${c.lane==="event"?"Plan this event":"Request "+esc(c.id.toLowerCase())}</button>`}</div>
  </article>`).join("");

const orderCats = CATS.filter(c=>!["Add-ons","Delivery"].includes(c.id));
$("#or-cat").innerHTML = orderCats.map(c=>`<option>${esc(c.id)}</option>`).join("");
function fillItems(){
  const c = CATS.find(x=>x.id===$("#or-cat").value);
  $("#or-item").innerHTML = c.items.map(([n,,p])=>`<option value="${esc(n+" — "+p)}">${esc(n)} · ${esc(p)}</option>`).join("") + `<option value="Custom / not sure">Custom / not sure</option>`;
}
$("#or-cat").addEventListener("change",fillItems); fillItems();
$("#or-addons").innerHTML = CATS.find(c=>c.id==="Add-ons").items.filter(i=>i[0]!=="Vase upgrade"||true).map(([n,,p],i)=>`<label><input type="checkbox" id="ao-${i}" value="${esc(n)}"> ${esc(n)} <span class="hint">${esc(p)}</span></label>`).join("");
$("#ev-pieces").innerHTML = PIECES.map((p,i)=>`<label><input type="checkbox" id="pc-${i}" value="${esc(p)}"> ${esc(p)}</label>`).join("");
$("#or-ful").addEventListener("change",()=>{$("#or-addr-wrap").hidden = $("#or-ful").value!=="Delivery"});
const today = new Date(); const iso = d=>d.toISOString().slice(0,10);
$("#or-date").min = iso(today); $("#ev-date").min = iso(today);

document.addEventListener("click",e=>{
  const b = e.target.closest("[data-req]"); if(!b) return;
  const c = CATS.find(x=>x.id===b.dataset.req);
  if(c.lane==="event"){ $("#ev-type").value = c.id; location.hash="plan"; }
  else { $("#or-cat").value = c.id; fillItems(); location.hash="request"; }
});

/* ---------- submission ---------- */
function ticketId(lane){
  const d = new Date(); const mmdd = String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");
  return (lane==="event"?"EVT-":"ORD-")+mmdd+"-"+Math.random().toString(36).slice(2,5).toUpperCase();
}
const fmtDate = s => s ? new Date(s+"T12:00:00").toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"}) : "—";

function buildMessage(r){
  const L = [];
  if(r.lane==="event"){
    L.push(`Event: ${r.category}`, `Date: ${fmtDate(r.neededDate)}`, `Venue: ${r.venue||"—"}`, `Guests: ${r.guests||"—"}`,
      `Needs: ${r.pieces?.length?r.pieces.join(", "):"—"}`, `Budget: ${r.budget||"Not sure yet"}`, `Colors/style: ${r.palette||"—"}`);
  } else {
    L.push(`Category: ${r.category}`, `Item: ${r.item}`, `Add-ons: ${r.addons?.length?r.addons.join(", "):"None"}`,
      `Needed: ${fmtDate(r.neededDate)}`, `${r.fulfillment}${r.fulfillment==="Delivery"?": "+(r.address||"address TBD"):""}`);
  }
  L.push("", `Name: ${r.name}`, `Phone: ${r.phone||"—"}`, `Email: ${r.email||"—"}`, `Prefers: ${r.prefContact}`);
  if(r.message) L.push("", `Notes: ${r.message}`);
  return L.join("\n");
}
const subjectOf = r => `[${r.lane==="event"?"EVENT":"ORDER"} · ${r.category}] ${fmtDate(r.neededDate)} · ${r.name} · ${r.ticket}`;

function validate(r, errEl){
  const miss = [];
  if(!r.neededDate) miss.push("the date");
  if(!r.name) miss.push("your name");
  if(!r.phone && !r.email) miss.push("a phone number or email");
  if(miss.length){ errEl.textContent = "Please add "+miss.join(", ")+" so we can reach you."; errEl.hidden=false; errEl.style.color = "var(--bloom)"; return false; }
  errEl.hidden = true; return true;
}

async function submitRequest(r, slot, form){
  r.ticket = ticketId(r.lane); r.createdAt = new Date().toISOString();
  let sent = false;
  if(FORMSPREE_ID){
    const btn = form.querySelector('button[type="submit"]'); const label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";
    try{
      const payload = { _subject: subjectOf(r), email: r.email || undefined, ticket: r.ticket,
        type: r.lane==="event" ? "Event inquiry" : "Order", ...r, summary: buildMessage(r) };
      const res = await fetch("https://formspree.io/f/"+FORMSPREE_ID, { method:"POST",
        headers:{ "Content-Type":"application/json", "Accept":"application/json" }, body: JSON.stringify(payload) });
      sent = res.ok;
    }catch(e){ sent = false; }
    btn.disabled = false; btn.textContent = label;
  }
  showConfirm(r, slot, form, sent);
}

function showConfirm(r, slot, form, saved){
  form.hidden = true;
  const box = document.createElement("div"); box.className = "confirm";
  const subj = subjectOf(r), body = buildMessage(r);
  if(saved){
    box.innerHTML = `<span class="ticket">${esc(r.ticket)}</span><h3>Request sent. Thank you!</h3>
      <p>We'll reach out by ${esc(r.prefContact.toLowerCase())} within 2 business days to confirm details and your quote. Your reference number is <b>${esc(r.ticket)}</b>.</p>
      <div class="acts"><button class="btn btn-ghost btn-small" type="button" data-again>Send another request</button></div>`;
  } else {
    box.innerHTML = `<span class="ticket">${esc(r.ticket)}</span><h3>One last step: send it to us</h3>
      <p>Copy this request and send it by email or text. The subject line keeps it sorted on our end.</p>
      <div class="field"><label>Subject</label><div class="msgbox" id="cf-subj">${esc(subj)}</div></div>
      <div class="field"><label>Message</label><div class="msgbox" id="cf-body">${esc(body)}</div></div>
      <p>Email <b style="user-select:all">${esc(SHOP.email)}</b> or text <b style="user-select:all">${esc(SHOP.phone)}</b></p>
      <div class="acts"><button class="btn btn-primary btn-small" type="button" data-copy>Copy request</button>
        <a class="btn btn-ghost btn-small" href="mailto:${esc(SHOP.email)}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}">Open in email app</a>
        <button class="btn btn-ghost btn-small" type="button" data-again>Start over</button></div>`;
  }
  slot.appendChild(box);
  box.querySelector("[data-again]").onclick = ()=>{ box.remove(); form.reset(); form.hidden=false; if(form.id==="order-form"){fillItems(); $("#or-addr-wrap").hidden=true;} };
  const cp = box.querySelector("[data-copy]");
  if(cp) cp.onclick = async ()=>{
    const text = "Subject: "+subj+"\n\n"+body;
    try{ await navigator.clipboard.writeText(text); toast("Copied. Paste it into an email or text."); }
    catch{ const sel = getSelection(), rg = document.createRange(); rg.selectNodeContents(box.querySelector("#cf-body")); sel.removeAllRanges(); sel.addRange(rg); toast("Selected. Press copy on your keyboard."); }
  };
  box.scrollIntoView({block:"start"});
}

$("#order-form").addEventListener("submit",e=>{
  e.preventDefault();
  const r = { lane:"order", category:$("#or-cat").value, item:$("#or-item").value,
    addons:[...document.querySelectorAll("#or-addons input:checked")].map(i=>i.value),
    neededDate:$("#or-date").value, fulfillment:$("#or-ful").value, address:$("#or-ful").value==="Delivery"?$("#or-addr").value.trim():"",
    name:$("#or-name").value.trim(), phone:$("#or-phone").value.trim(), email:$("#or-email").value.trim(), prefContact:$("#or-pref").value, message:$("#or-msg").value.trim() };
  if(validate(r,$("#or-err"))) submitRequest(r,$("#order-slot"),$("#order-form"));
});
$("#event-form").addEventListener("submit",e=>{
  e.preventDefault();
  const r = { lane:"event", category:$("#ev-type").value, neededDate:$("#ev-date").value, venue:$("#ev-venue").value.trim(), guests:$("#ev-guests").value,
    pieces:[...document.querySelectorAll("#ev-pieces input:checked")].map(i=>i.value), budget:$("#ev-budget").value, palette:$("#ev-palette").value.trim(),
    name:$("#ev-name").value.trim(), phone:$("#ev-phone").value.trim(), email:$("#ev-email").value.trim(), prefContact:$("#ev-pref").value, message:$("#ev-msg").value.trim() };
  if(validate(r,$("#ev-err"))) submitRequest(r,$("#event-slot"),$("#event-form"));
});

let toastT; function toast(m){ const t=$("#toast"); t.textContent=m; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2600); }

/* ---------- scroll titles + reveal ---------- */
(function(){
  const hdr=document.querySelector("header.top");
  const setH=()=>document.documentElement.style.setProperty("--hdr",hdr.offsetHeight+"px");
  setH(); addEventListener("resize",setH);
  const links=[...document.querySelectorAll("#titles a")];
  const secs=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  function spy(){
    const y=hdr.offsetHeight+120; let cur=null;
    for(const s of secs){ if(s.getBoundingClientRect().top<=y) cur=s; }
    links.forEach(a=>{ const on=cur && a.getAttribute("href")==="#"+cur.id; a.setAttribute("aria-current",on?"true":"false");
      if(on && a.scrollIntoView && a.parentElement.scrollWidth>a.parentElement.clientWidth){ const p=a.parentElement; p.scrollLeft=a.offsetLeft-p.clientWidth/2+a.offsetWidth/2; } });
  }
  addEventListener("scroll",spy,{passive:true}); spy();
  if("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    const els=[...document.querySelectorAll(".rv")];
    const vh=innerHeight;
    els.forEach(el=>{ if(el.getBoundingClientRect().top>vh*0.9) el.classList.add("pre"); });
    const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.remove("pre"); io.unobserve(e.target);} }),{rootMargin:"0px 0px -12% 0px"});
    els.forEach(el=>io.observe(el));
  }
})();
