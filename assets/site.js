(function(){
  // rotate hero reviews
  var rv=document.querySelectorAll('.cine-review .rv'), i=0;
  if(rv.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){ rv[i].classList.remove('on'); i=(i+1)%rv.length; rv[i].classList.add('on'); },5200);
  }
  // big quotes rotate
  var qb=document.querySelectorAll('.qb blockquote'),q=0;
  if(qb.length>1&&!matchMedia('(prefers-reduced-motion: reduce)').matches){setInterval(function(){qb[q].classList.remove('on');q=(q+1)%qb.length;qb[q].classList.add('on')},6500)}
  // count-up stats + kinetic band
  function countUp(el){var to=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),pre=el.dataset.pre||'',suf=el.dataset.suf||'',t0=null;
    function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1600,1),e=1-Math.pow(1-p,3);el.textContent=pre+(to*e).toFixed(dec)+suf;if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
  if('IntersectionObserver' in window){
    var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;
      if(e.target.classList.contains('kinetic'))e.target.classList.add('in');
      else e.target.querySelectorAll('[data-count]').forEach(countUp);
      io2.unobserve(e.target)})},{threshold:.35});
    document.querySelectorAll('.stats,.kinetic').forEach(function(el){io2.observe(el)});
  } else { document.querySelectorAll('.kinetic').forEach(function(el){el.classList.add('in')}); }
  // reveal sections as they scroll in
  var els=document.querySelectorAll('main > section:not(.cine):not(.hero):not(.svc-hero):not(.kinetic):not(.stats) > .wrap');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ if(el.getBoundingClientRect().top>innerHeight){ el.classList.add('reveal'); io.observe(el);} });
  }
})();
// failsafe: never leave the intro covering the page
setTimeout(function(){var i=document.querySelector('.intro');if(i)i.style.display='none'},5200);
// preview forms: no backend yet
document.querySelectorAll('[data-preview-form]').forEach(function(f){
  f.addEventListener('submit',function(e){e.preventDefault();var m=f.querySelector('.form-msg');var req=f.querySelector('[required]');
    if(req&&!req.value.trim()){req.focus();if(m){m.hidden=false;m.textContent='Please fill in '+(req.closest('label')?req.closest('label').firstChild.textContent.trim().toLowerCase():'the required field')+'.'}return}
    if(m){m.hidden=false;m.textContent='Thanks! (Preview: at launch this goes straight to Allure’s inbox and texts.)'}});
});
// accessibility toggle
(function(){var b=document.querySelector('.a11y');if(!b)return;var d=document.documentElement;
  try{if(localStorage.getItem('allureBig')==='1'){d.classList.add('big-text');b.setAttribute('aria-pressed','true')}}catch(e){}
  b.addEventListener('click',function(){var on=d.classList.toggle('big-text');b.setAttribute('aria-pressed',on);try{localStorage.setItem('allureBig',on?'1':'0')}catch(e){}});})();
// weight-loss candidate quiz (runs on the phone only, nothing is sent)
(function(){var f=document.getElementById('quiz');if(!f)return;
  var qs=[].slice.call(f.querySelectorAll('.q')),i=0,next=document.getElementById('q-next'),back=document.getElementById('q-back'),res=document.getElementById('q-result');
  var ft=document.getElementById('q-ft'),inch=document.getElementById('q-in'),lb=document.getElementById('q-lb'),out=document.getElementById('q-bmi');
  function bmi(){var h=(+ft.value||0)*12+(+inch.value||0),w=+lb.value||0;return h>40&&w>60?703*w/(h*h):0}
  [ft,inch,lb].forEach(function(x){x.addEventListener('input',function(){var b=bmi();out.textContent=b?'Your BMI is about '+b.toFixed(1)+'.':''})});
  function val(n){var c=f.querySelector('input[name='+n+']:checked');return c?c.value:''}
  function ok(){if(i===0)return bmi()>0;var q=qs[i];var r=q.querySelector('input[type=radio]');return !r||!!val(r.name)}
  function show(){qs.forEach(function(q,k){q.classList.toggle('on',k===i)});back.hidden=i===0;next.textContent=i===qs.length-1?'See my result':'Next';var l=qs[i].querySelector('input');if(l)l.focus()}
  function result(){var b=bmi(),cond=f.querySelectorAll('input[name=cond]:checked').length,stop=val('preg')==='yes'||val('mtc')==='yes'||val('panc')==='yes',unsure=val('mtc')==='unsure',h,t;
    if(stop){h='Let’s talk before anything else';t='Something you shared means GLP-1 medication may not be safe for you. Alicia can walk you through other options, like nutrition coaching and wood therapy.'}
    else if(b>=30||(b>=27&&cond>0)||val('glp')==='yes'){h='You may be a good candidate';t='Based on your answers, a consultation is the next step. Alicia will review your history and labs and decide what’s safe for you.'+(unsure?' Bring any family history you can find about thyroid cancer.':'')}
    else{h='Medication may not be the best fit';t='Your BMI is under the usual range for these medications. Nutrition coaching, an InBody scan or wood therapy body contouring may be a better place to start.'}
    res.hidden=false;res.innerHTML='<h3>'+h+'</h3><p>'+t+'</p><p class="ctas" style="margin:0"><a class="btn" href="https://allure-wellness-and-esthetics.square.site/">Book a consultation</a><a class="btn ghost" href="#quiz-call">Request a call</a></p><p class="note">This quiz is a starting point, not a diagnosis.</p>';
    res.scrollIntoView({behavior:'smooth',block:'nearest'})}
  next.addEventListener('click',function(){if(!ok()){var l=qs[i].querySelector('input');if(l)l.focus();return}if(i<qs.length-1){i++;show()}else result()});
  back.addEventListener('click',function(){if(i>0){i--;show()}});
})();
// spa music: royalty-free tracks (Mixkit free license), only plays after the visitor taps
(function(){var b=document.querySelector('.music');if(!b)return;
  var list=b.dataset.tracks.split(' '),i=0,a=new Audio();a.preload='none';a.volume=0;
  var lbl=b.querySelector('.lbl');
  function src(){a.src=list[i%list.length]}
  a.addEventListener('ended',function(){i++;src();a.play().catch(function(){})});
  function fade(to,done){var step=function(){var v=a.volume+(to>a.volume?.03:-.05);if((to>a.volume&&v>=to)||(to<=a.volume&&v<=to)){a.volume=Math.max(0,Math.min(1,to));done&&done();return}a.volume=Math.max(0,Math.min(1,v));requestAnimationFrame(step)};step()}
  function on(){if(!a.src)src();a.play().then(function(){b.setAttribute('aria-pressed','true');lbl.textContent='Music on';fade(.35);try{sessionStorage.setItem('allureMusic','1')}catch(e){}}).catch(function(){})}
  function off(){fade(0,function(){a.pause()});b.setAttribute('aria-pressed','false');lbl.textContent='Spa music';try{sessionStorage.setItem('allureMusic','0')}catch(e){}}
  b.addEventListener('click',function(){b.getAttribute('aria-pressed')==='true'?off():on()});
  // keep music going page to page if they turned it on (browser may require another tap)
  try{if(sessionStorage.getItem('allureMusic')==='1'){on();var once=function(){if(b.getAttribute('aria-pressed')!=='true')on();document.removeEventListener('pointerdown',once)};document.addEventListener('pointerdown',once)}}catch(e){}
})();
