// ============================================================
// ARSIP PARA PENEMU — interaction layer
// ============================================================

// 1) Ambient sparks in the hero
(function initSparks(){
  const container = document.getElementById('sparks');
  if(!container) return;
  const COUNT = 26;
  for(let i=0;i<COUNT;i++){
    const s = document.createElement('span');
    const left = Math.random()*100;
    const delay = Math.random()*10;
    const duration = 6 + Math.random()*8;
    const drift = (Math.random()*80 - 40) + 'px';
    s.style.left = left + '%';
    s.style.animationDelay = delay + 's';
    s.style.animationDuration = duration + 's';
    s.style.setProperty('--drift', drift);
    container.appendChild(s);
  }
})();

// 2) Reveal exhibit sections as they scroll into view
(function initReveal(){
  const exhibits = document.querySelectorAll('.exhibit');
  if(!('IntersectionObserver' in window)){
    exhibits.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{ threshold:0.18 });
  exhibits.forEach(el => io.observe(el));
})();

// 3) Highlight the active dossier-nav dot based on scroll position
(function initDossierNav(){
  const links = Array.from(document.querySelectorAll('.dossier-nav a'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if(!sections.length) return;

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = '#' + entry.target.id;
      const link = links.find(a => a.getAttribute('href') === id);
      if(!link) return;
      if(entry.isIntersecting){
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  },{ threshold:0.5 });

  sections.forEach(sec => io.observe(sec));
})();
