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
setTimeout(function(){var i=document.querySelector('.intro');if(i)i.style.display='none'},2600);
