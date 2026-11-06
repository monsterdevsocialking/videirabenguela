(() => {
 const loader=document.querySelector('.preloader');document.body.classList.add('locked');
 const finish=()=>{if(loader)loader.classList.add('done');document.body.classList.remove('locked')};
 window.addEventListener('load',()=>setTimeout(finish,450),{once:true});setTimeout(finish,2200);
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
 const scroll=()=>{if(header)header.classList.toggle('scrolled',window.scrollY>30)};scroll();window.addEventListener('scroll',scroll,{passive:true});
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}))}
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -30px 0px'});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 const glow=document.querySelector('.cursor-glow');if(glow&&matchMedia('(pointer:fine)').matches)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true});
 const form=document.querySelector('#visitForm');if(form){const intent=form.querySelector('#intent'),messageField=form.querySelector('#message');const templates={'Quero visitar a igreja':'Olá! Gostaria de visitar a AMC – Ministério Videira Benguela. Podem ajudar-me com as informações da próxima reunião?','Quero saber como chegar à igreja':'Olá! Gostaria de saber como chegar à igreja. Podem enviar-me orientações para chegar à unidade principal?','Quero conhecer uma célula perto de mim':'Olá! Gostaria de conhecer uma célula da Videira perto de mim. Podem indicar-me uma opção?','Quero participar no culto de domingo':'Olá! Gostaria de participar no culto de domingo, das 10h00 às 12h00. Há alguma orientação para a minha primeira visita?','Quero falar com a equipa pastoral':'Olá! Gostaria de falar com a equipa pastoral. Quando seria possível?','Quero pedir oração':'Olá! Gostaria de partilhar um pedido de oração.','Quero obter mais informações':'Olá! Gostaria de obter mais informações sobre a AMC – Ministério Videira Benguela.'};if(intent&&messageField)intent.addEventListener('change',()=>{if(templates[intent.value])messageField.value=templates[intent.value]});form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text='Olá! O meu nome é '+(d.get('name')||'')+'.\\n\\n'+(d.get('message')||'Gostaria de obter mais informações sobre a igreja.');window.open('https://wa.me/244932204168?text='+encodeURIComponent(text),'_blank','noopener')})}
 const cellCards=[...document.querySelectorAll('.cells-stack .cell-card')];
 const soundToggle=document.querySelector('.cell-sound-toggle');
 let cardSoundEnabled=false,audioContext=null;
 const playCardSound=()=>{
  if(!cardSoundEnabled||!audioContext)return;
  try{
   const duration=.055,length=Math.floor(audioContext.sampleRate*duration);
   const buffer=audioContext.createBuffer(1,length,audioContext.sampleRate),data=buffer.getChannelData(0);
   for(let i=0;i<length;i++){const fade=1-i/length;data[i]=(Math.random()*2-1)*fade*fade}
   const source=audioContext.createBufferSource(),filter=audioContext.createBiquadFilter(),gain=audioContext.createGain();
   source.buffer=buffer;filter.type='lowpass';filter.frequency.value=1900;
   gain.gain.setValueAtTime(.0001,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.045,audioContext.currentTime+.006);gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+duration);
   source.connect(filter);filter.connect(gain);gain.connect(audioContext.destination);source.start();source.stop(audioContext.currentTime+duration);
  }catch(error){}
 };
 if(soundToggle){
  soundToggle.addEventListener('click',async()=>{
   cardSoundEnabled=!cardSoundEnabled;
   if(cardSoundEnabled){
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(AudioContextClass){audioContext=audioContext||new AudioContextClass();if(audioContext.state==='suspended')await audioContext.resume()}
    else cardSoundEnabled=false;
   }
   soundToggle.setAttribute('aria-pressed',String(cardSoundEnabled));
   soundToggle.innerHTML=cardSoundEnabled?'<span aria-hidden="true">♪</span> Som das cartas ligado':'<span aria-hidden="true">♪</span> Ativar som das cartas';
   const hint=document.querySelector('.cell-sound-hint');if(hint)hint.textContent=cardSoundEnabled?'Som subtil ao revelar cada carta':'Som opcional · desligado por padrão';
  });
 }
 if(cellCards.length){
  const cardObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting&&!entry.target.classList.contains('is-visible')){
    entry.target.classList.add('is-visible');playCardSound();cardObserver.unobserve(entry.target);
   }
  }),{threshold:.2,rootMargin:'0px 0px -35px 0px'});
  cellCards.forEach(card=>cardObserver.observe(card));
 }
 document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
})();