/* Moteur du diaporama : ne nécessite aucune modification.
   Le contenu (DIAPOS) est défini dans js/data.js */

const scene=document.getElementById('scene'), zoneEtoiles=document.getElementById('etoiles');
const bPrec=document.getElementById('prec'), bSuiv=document.getElementById('suiv'), compteur=document.getElementById('compteur');
let i=0; const vus=new Set([0]);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function rendu(d,n){
  const date=d.date?`<p class="date">${esc(d.date)}</p>`:'';
  switch(d.type){
    case 'titre': return `<h1>${esc(d.titre)}</h1><p class="soustitre">${esc(d.sous)}</p>`;
    case 'duo': return `<div class="duo"><div>${date}<h2>${esc(d.titre)}</h2><p>${esc(d.texte)}</p></div>
      <div class="visuel" ${d.image?`style="background-image:url('${esc(d.image)}')" role="img" aria-label="${esc(d.legende)}"`:''}>${d.image?'':esc(d.legende)}</div></div>`;
    case 'liste': return `<h2>${esc(d.titre)}</h2><p>${esc(d.texte)}</p><ul class="liste">${d.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
    case 'fin': return `<h2>${esc(d.titre)}</h2><p>${esc(d.texte)}</p>`;
    default: return `${date}<h2>${esc(d.titre)}</h2><p>${esc(d.texte)}</p>`;
  }
}
scene.innerHTML=DIAPOS.map((d,n)=>`<section class="slide" role="group" aria-roledescription="diapositive" aria-label="${n+1} sur ${DIAPOS.length}">${rendu(d,n)}</section>`).join('');
const slides=[...scene.children];

/* Constellation : étoiles à hauteurs variées, reliées par des traits */
const N=DIAPOS.length, W=500, H=44;
const xs=DIAPOS.map((_,n)=>N===1?W/2:12+n*(W-24)/(N-1));
const ys=DIAPOS.map((_,n)=>22+Math.sin(n*2.1)*11);
let svg=`<svg viewBox="0 0 ${W} ${H}" role="tablist" aria-label="Choisir une diapositive">`;
for(let n=0;n<N-1;n++) svg+=`<line data-l="${n}" x1="${xs[n]}" y1="${ys[n]}" x2="${xs[n+1]}" y2="${ys[n+1]}"/>`;
DIAPOS.forEach((d,n)=>{ svg+=`<g class="pt" data-n="${n}" role="tab" tabindex="0" aria-label="Diapositive ${n+1} : ${esc(d.titre)}">
  <circle class="zone" cx="${xs[n]}" cy="${ys[n]}" r="14"/><circle class="halo" cx="${xs[n]}" cy="${ys[n]}" r="13"/>
  <circle class="etoile" cx="${xs[n]}" cy="${ys[n]}" r="4.5"/></g>`; });
zoneEtoiles.innerHTML=svg+'</svg>';

function aller(n){
  n=Math.max(0,Math.min(N-1,n)); if(n===i&&slides[i].classList.contains('actif'))return;
  slides.forEach((s,k)=>{s.classList.toggle('actif',k===n);s.classList.toggle('avant',k<n);s.setAttribute('aria-hidden',k!==n)});
  i=n; vus.add(n); maj();
  try{history.replaceState(null,'','#'+(n+1))}catch(e){/* aperçu isolé : on ignore */}
}
function maj(){
  zoneEtoiles.querySelectorAll('.pt').forEach(g=>{const k=+g.dataset.n;
    g.classList.toggle('actif',k===i);g.classList.toggle('vu',vus.has(k));
    g.setAttribute('aria-selected',k===i)});
  zoneEtoiles.querySelectorAll('line').forEach(l=>l.classList.toggle('parcouru',+l.dataset.l<i));
  bPrec.disabled=i===0; bSuiv.disabled=i===N-1;
  compteur.textContent=`${i+1} / ${N}`;
}
bPrec.onclick=()=>aller(i-1); bSuiv.onclick=()=>aller(i+1);
zoneEtoiles.addEventListener('click',e=>{const g=e.target.closest('.pt');if(g)aller(+g.dataset.n)});
zoneEtoiles.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('.pt')){e.preventDefault();aller(+e.target.closest('.pt').dataset.n)}});
addEventListener('keydown',e=>{
  if(e.target.closest('.pt')&&(e.key===' '||e.key==='Enter'))return;
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();aller(i+1)}
  else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();aller(i-1)}
  else if(e.key==='Home')aller(0); else if(e.key==='End')aller(N-1);
});
let tx=null;
addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
addEventListener('touchend',e=>{if(tx===null)return;const dx=e.changedTouches[0].clientX-tx;
  if(Math.abs(dx)>50)aller(i+(dx<0?1:-1));tx=null},{passive:true});

/* Ciel étoilé discret, immobile si l'utilisateur préfère moins d'animations */
const cv=document.getElementById('ciel'), cx=cv.getContext('2d');
const calme=matchMedia('(prefers-reduced-motion: reduce)').matches;
let etoiles=[];
function ciel(){
  const r=devicePixelRatio||1; cv.width=innerWidth*r; cv.height=innerHeight*r; cx.setTransform(r,0,0,r,0,0);
  etoiles=Array.from({length:Math.round(innerWidth*innerHeight/9000)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.3+.3,p:Math.random()*6.28}));
  dessiner(0);
}
function dessiner(t){
  cx.clearRect(0,0,innerWidth,innerHeight);
  etoiles.forEach(s=>{cx.globalAlpha=.35+.35*Math.sin(s.p+t/1800);cx.fillStyle='#f3ecff';
    cx.beginPath();cx.arc(s.x,s.y,s.r,0,6.28);cx.fill()});
  if(!calme)requestAnimationFrame(dessiner);
}
addEventListener('resize',ciel); ciel();

const depart=parseInt(location.hash.slice(1),10);
slides.forEach(s=>s.classList.remove('actif'));
aller(Number.isFinite(depart)?depart-1:0);
