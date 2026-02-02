// Beginner-friendly image carousel for the gallery section
// - Add your images to `img/` and name them me1.jpg, me2.jpg, etc.
// - This script allows clicking the arrows or dots and using left/right keys.

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return; // If there's no gallery, do nothing

  const images = Array.from(track.querySelectorAll('.carousel-image'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = Array.from(document.querySelectorAll('.dot'));
  let currentIndex = 0;

  function show(index) {
    // wrap the index
    index = (index + images.length) % images.length;
    images.forEach((img, i) => {
      if (i === index) {
        img.hidden = false;
      } else {
        img.hidden = true;
      }
    });

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentIndex = index;
  }

  // Wire buttons and dots
  if (prevBtn) prevBtn.addEventListener('click', () => show(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(currentIndex + 1));
  dots.forEach(dot => dot.addEventListener('click', (e) => show(Number(e.currentTarget.dataset.index))));

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      show(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      show(currentIndex + 1);
    }
  });

  // Initialize
  show(0);
});
