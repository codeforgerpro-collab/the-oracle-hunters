(function(){
const sc=document.currentScript,up=(sc&&sc.dataset.up)||'';const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const root=document.documentElement;let th=root.dataset.theme||'dark';
const tb=$('#thm');if(tb)tb.onclick=()=>{th=th=='dark'?'light':'dark';root.dataset.theme=th;try{localStorage.setItem('oh-theme',th)}catch(e){}};
const bg=$('#burger');if(bg)bg.onclick=()=>$('header nav').classList.toggle('open');
const here=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('header nav a').forEach(a=>{if(a.getAttribute('href').split('/').pop()==here)a.classList.add('on')});
document.addEventListener('click',ev=>{const h=ev.target.closest('th');if(!h)return;const tr=h.parentNode,t=tr.closest('table');if(!t||tr!==t.rows[0])return;
 const i=[...tr.children].indexOf(h),rows=[...t.rows].slice(1);const dir=h.dataset.dir=h.dataset.dir=='a'?'d':'a';
 const val=r=>{const x=((r.cells[i]||{}).innerText||'').trim();const n=parseFloat(x.replace(/[,%]/g,''));return isNaN(n)||/^[A-Za-z]/.test(x)?x.toLowerCase():n};
 rows.sort((x,y)=>{const a=val(x),b=val(y);return (typeof a==typeof b?(a>b?1:a<b?-1:0):String(a).localeCompare(String(b)))*(dir=='a'?1:-1)});
 [...tr.children].forEach(c=>c.classList.remove('s-a','s-d'));h.classList.add('s-'+dir);rows.forEach(r=>r.parentNode.appendChild(r));});
const tip=document.createElement('div');tip.className='tip';document.body.appendChild(tip);
document.addEventListener('mousemove',ev=>{const m=ev.target.closest&&ev.target.closest('.chart circle,.chart rect');
 if(m){const t=m.querySelector('title');if(t){m.dataset.t=t.textContent;m.setAttribute('aria-label',t.textContent);t.remove()}}
 if(m&&m.dataset.t){tip.textContent=m.dataset.t;tip.style.display='block';tip.style.left=Math.min(ev.pageX+14,window.scrollX+window.innerWidth-260)+'px';tip.style.top=(ev.pageY+16)+'px'}else tip.style.display='none'});
const q=$('#gq'),box=$('#gres');let S=null;
if(q){q.addEventListener('input',async()=>{const v=q.value.trim().toLowerCase();if(v.length<2){box.style.display='none';return}
 if(!S){try{S=await fetch(up+'data/speakers.json').then(r=>r.json())}catch(e){S=[]}}
 const r=S.filter(x=>(x.n+' '+x.i).toLowerCase().includes(v)).slice(0,8);
 box.innerHTML=r.map(x=>`<a href="${up}speakers/${encodeURIComponent(x.s)}.html"><b>${esc(x.n)}</b><span>${esc(x.k=='institution'?'Institution':x.i)} · ${x.f} statements</span></a>`).join('')+`<a href="${up}ledger.html"><span>Search every statement in the ledger →</span></a>`;box.style.display='block'});
 document.addEventListener('click',e=>{if(!e.target.closest('.gs'))box.style.display='none'});}
const tt=$('#totop');if(tt){window.addEventListener('scroll',()=>tt.classList.toggle('show',window.scrollY>600));tt.onclick=()=>window.scrollTo({top:0,behavior:'smooth'})}
})();
