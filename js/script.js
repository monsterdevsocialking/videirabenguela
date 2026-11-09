(() => {
 const loader=document.querySelector('.preloader');document.body.classList.add('locked');
 const finish=()=>{if(loader)loader.classList.add('done');document.body.classList.remove('locked')};
 window.addEventListener('load',()=>setTimeout(finish,450),{once:true});setTimeout(finish,2200);
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
 const scroll=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>30)};scroll();window.addEventListener('scroll',scroll,{passive:true});
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}))}
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const glow=document.querySelector('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
 const form=document.querySelector('#visitForm');if(form){const intent=form.querySelector('#intent'),messageField=form.querySelector('#message');const templates={'Quero visitar a igreja':'Olá! Gostaria de visitar a Videira Benguela. Podem ajudar-me com as informações da próxima reunião?','Quero saber como chegar à igreja':'Olá! Gostaria de saber como chegar à igreja. Podem enviar-me orientações para chegar à unidade principal?','Quero conhecer uma célula perto de mim':'Olá! Gostaria de conhecer uma célula da Videira perto de mim. Podem indicar-me uma opção?','Quero participar no culto de domingo':'Olá! Gostaria de participar no culto de domingo, das 10h00 às 12h00. Há alguma orientação para a minha primeira visita?','Quero falar com a equipa pastoral':'Olá! Gostaria de falar com a equipa pastoral. Quando seria possível?','Quero pedir oração':'Olá! Gostaria de partilhar um pedido de oração.','Quero obter mais informações':'Olá! Gostaria de obter mais informações sobre a Videira Benguela.'};if(intent&&messageField)intent.addEventListener('change',()=>{if(templates[intent.value])messageField.value=templates[intent.value]});form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text='Olá! O meu nome é '+(d.get('name')||'')+'.\\n\\n'+(d.get('message')||'Gostaria de obter mais informações sobre a igreja.');window.open('https://wa.me/244932204168?text='+encodeURIComponent(text),'_blank','noopener')})}
 const cellChapters=document.querySelector('[data-cell-chapters]');
 if(cellChapters){
  const tabs=[...cellChapters.querySelectorAll('.cell-chapter-tab')];
  const panel=cellChapters.querySelector('#cell-chapter-panel');
  const name=cellChapters.querySelector('#cell-panel-name');
  const number=cellChapters.querySelector('#cell-panel-number');
  const count=cellChapters.querySelector('#cell-panel-count');
  const navLabel=cellChapters.querySelector('#cell-nav-label');
  const location=cellChapters.querySelector('#cell-panel-location');
  const mapLink=cellChapters.querySelector('#cell-map-cta');
  const progress=cellChapters.querySelector('#cell-panel-progress');
  const leaderLink=cellChapters.querySelector('#cell-leader-cta');
  const previous=cellChapters.querySelector('#cell-prev');
  const next=cellChapters.querySelector('#cell-next');
  let active=0;
  const churchWhatsApp='244932204168';
  const showCell=(index,moveFocus=false)=>{
   active=Math.max(0,Math.min(index,tabs.length-1));
   const tab=tabs[active],n=String(active+1).padStart(2,'0');
   const cellName=tab.dataset.cellName,zone=tab.dataset.cellZone;
   tabs.forEach((item,i)=>{const selected=i===active;item.classList.toggle('is-active',selected);item.setAttribute('aria-selected',String(selected));item.tabIndex=selected?0:-1});
   panel.setAttribute('aria-labelledby',tab.id);
   name.textContent=cellName;
   number.textContent=n;
   count.innerHTML=n+' <b>—</b> '+String(tabs.length).padStart(2,'0');
   navLabel.textContent=n+' / '+String(tabs.length).padStart(2,'0');
   location.textContent=zone;
   mapLink.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(zone+', Benguela, Angola');
   progress.style.width=((active+1)/tabs.length*100)+'%';
   leaderLink.href='https://wa.me/'+churchWhatsApp+'?text='+encodeURIComponent('Olá! Gostaria de conhecer a '+cellName+'. Podem, por favor, partilhar o nome e o contacto confirmado do líder desta célula? A localização indicada é '+zone+'.');
   previous.disabled=active===0;
   next.disabled=active===tabs.length-1;
   panel.classList.remove('is-changing');
   void panel.offsetWidth;
   panel.classList.add('is-changing');
   if(moveFocus){tab.focus();tab.scrollIntoView({block:'nearest',inline:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
  };
  tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>showCell(i));tab.addEventListener('keydown',e=>{let target=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')target=Math.min(tabs.length-1,active+1);if(e.key==='ArrowUp'||e.key==='ArrowLeft')target=Math.max(0,active-1);if(e.key==='Home')target=0;if(e.key==='End')target=tabs.length-1;if(target!==null){e.preventDefault();showCell(target,true)}})});
  previous.addEventListener('click',()=>showCell(active-1));
  next.addEventListener('click',()=>showCell(active+1));
  showCell(0);
 }
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();