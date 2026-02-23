
document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector(".banner");
    if (!banner) return;
  
    const slides = Array.from(banner.querySelectorAll(".slide"));
    const dots = Array.from(banner.querySelectorAll(".list-dots button"));
    const btnPrev = banner.querySelector(".btn-slide-prev");
    const btnNext = banner.querySelector(".btn-slide-next");
  
    if (slides.length === 0) return;
  
    let index = slides.findIndex(s => s.classList.contains("slide-active"));
    if (index < 0) index = 0;
  
    const show = (i) => {
      slides.forEach((s, idx) => s.classList.toggle("slide-active", idx === i));
      dots.forEach((d, idx) => d.classList.toggle("dot-active", idx === i));
      index = i;
    };
  
    const next = () => show((index + 1) % slides.length);
    const prev = () => show((index - 1 + slides.length) % slides.length);
  
    // Click next/prev
    btnNext?.addEventListener("click", () => { next(); resetAuto(); });
    btnPrev?.addEventListener("click", () => { prev(); resetAuto(); });
  
    // Click dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { show(i); resetAuto(); });
    });
  
    // Auto play
    const INTERVAL = 2000; // 4s
    let timer = setInterval(next, INTERVAL);
  
    function resetAuto() {
      clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }
  
    // Pause when hover banner
    banner.addEventListener("mouseenter", () => clearInterval(timer));
    banner.addEventListener("mouseleave", () => resetAuto());
  
    // Init
    show(index);
  });
  