const files=['DSC00893','DSC00899','DSC00948','DSC00946','DSC00965','DSC00976','DSC00888'];const gallery=document.querySelector('#gallery'), dialog=document.querySelector('#lightbox');files.forEach((f,i)=>{const img=document.createElement('img');img.src='assets/'+f+'.jpg';img.alt='FULLCOUNT launch photograph '+(i+1);img.loading='lazy';if(f==='DSC00888')img.classList.add('gallery-wide');img.tabIndex=0;const open=()=>{dialog.querySelector('img').src=img.src;dialog.showModal()};img.onclick=open;img.onkeydown=e=>{if(e.key==='Enter')open()};gallery.append(img)});dialog.querySelector('button').onclick=()=>dialog.close();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};document.querySelector('#accept').onclick=()=>document.querySelector('#airmsg').textContent='Invitation accepted. See you at Pop Shop, Friday 17 October 2025, 18:00–20:00!';document.querySelector('#decline').onclick=()=>document.querySelector('#airmsg').textContent='No worries. The invitation is still here if you change your mind.';
// Enable CV download automatically when a real PDF is present on the web server.
const cvLink=document.querySelector('#cv'),cvNote=document.querySelector('#cv-note');
cvLink.addEventListener('click',e=>{if(cvLink.getAttribute('aria-disabled')==='true')e.preventDefault()});
fetch(cvLink.getAttribute('href'),{method:'HEAD',cache:'no-store'}).then(r=>{if(r.ok && (r.headers.get('content-type')||'').includes('application/pdf')){cvLink.removeAttribute('aria-disabled');cvNote.hidden=true}}).catch(()=>{});

// V8: progressive enhancement; content stays visible without JavaScript.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }), {threshold:0.08});
  document.querySelectorAll('section:not(.hero) h2, section:not(.hero) .casehead, .metrics > div, .timeline article, .gallery img, .panel, .plot, .air, .flyer, .pitch-actions, .earned-tile, .earned-subhead').forEach(el=>{
    el.classList.add('reveal');
    if(el.parentElement.matches('.metrics,.timeline,.gallery')) el.style.setProperty('--delay',`${Math.min(Array.from(el.parentElement.children).indexOf(el),3)*70}ms`);
    observer.observe(el);
  });
  const progress=document.querySelector('.reading-progress');
  let pending=false;
  function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?Math.min(1,Math.max(0,scrollY/max)):0})`;pending=false;}
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateProgress)}},{passive:true});
  addEventListener('resize',updateProgress);updateProgress();
  document.querySelectorAll('.air button').forEach(b=>b.addEventListener('click',()=>{const air=b.closest('.air');air.classList.remove('pulse');void air.offsetWidth;air.classList.add('pulse');}));
}

// Placeholder gifting links are intentionally inactive until edited.
document.querySelectorAll('a[data-edit-link="true"][href="#"]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

// V36: Do not navigate when a press / gifting URL has not yet been added.
document.querySelectorAll('a[href="PASTE_YOUR_LINK_HERE"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});

// Keep unfilled portfolio links from navigating to a nonexistent page.
document.querySelectorAll('a[href="PASTE_YOUR_LINK_HERE"]').forEach(link => {
  link.addEventListener("click", event => event.preventDefault());
});
