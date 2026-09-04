// Beau Papier — manually controlled inspiration carousel. Desktop arrows,
// native horizontal swipe on mobile (CSS scroll-snap does the swipe work,
// this script only drives the arrow buttons and their enabled state).
window.DearDaria = window.DearDaria || {};

DearDaria.initCardCarousel = function (trackId, prevBtnId, nextBtnId) {
  const track = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  if (!track || !prevBtn || !nextBtn) return;

  function cardStep() {
    const firstCard = track.querySelector('.card');
    if (!firstCard) return 320;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
    return firstCard.getBoundingClientRect().width + gap;
  }

  function updateArrowState() {
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    prevBtn.classList.toggle('carousel-arrow-hidden', track.scrollLeft <= 2);
    nextBtn.classList.toggle('carousel-arrow-hidden', track.scrollLeft >= maxScroll);
  }

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardStep(), behavior: 'smooth' });
  });
  track.addEventListener('scroll', () => window.requestAnimationFrame(updateArrowState));
  window.addEventListener('resize', () => window.requestAnimationFrame(updateArrowState));

  // Keyboard support when the track itself has focus.
  track.setAttribute('tabindex', '0');
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -cardStep(), behavior: 'smooth' }); }
    if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: cardStep(), behavior: 'smooth' }); }
  });

  window.setTimeout(updateArrowState, 200);
};
