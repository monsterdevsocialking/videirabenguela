(() => {
 const loader=document.querySelector('.preloader');document.body.classList.add('locked');
 const finish=()=>{if(loader)loader.classList.add('done');document.body.classList.remove('locked')};
 window.addEventListener('load',()=>setTimeout(finish,450),{once:true});setTimeout(finish,2200);
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
 const scroll=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>30)};scroll();window.addEventListener('scroll',scroll,{passive:true});
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}))}
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const glow=document.querySelector('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
 const form=document.querySelector('#visitForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const message='Olá! O meu nome é '+(d.get('name')||'')+'. Contacto: '+(d.get('contact')||'')+'. Pretendo: '+(d.get('date')||'A combinar')+'. '+(d.get('message')||'Gostaria de obter mais informações sobre a igreja.');window.open('https://wa.me/244932204168?text='+encodeURIComponent(message),'_blank','noopener')});
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();