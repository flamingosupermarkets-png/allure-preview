(function(){
  // rotate hero reviews
  var rv=document.querySelectorAll('.cine-review .rv'), i=0;
  if(rv.length>1 && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    setInterval(function(){ rv[i].classList.remove('on'); i=(i+1)%rv.length; rv[i].classList.add('on'); },5200);
  }
  // reveal sections as they scroll in
  var els=document.querySelectorAll('main > section:not(.cine):not(.hero):not(.svc-hero) .wrap');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){ if(el.getBoundingClientRect().top>innerHeight){ el.classList.add('reveal'); io.observe(el);} });
  }
})();
