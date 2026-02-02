// Beginner-friendly image carousel for the gallery section
// - Uses a single <img> element and swaps its `src` to show one photo at a time
// - Works with arrow buttons, the small dots, and left/right keys

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  if (!track) return; // If there's no gallery, do nothing

  // List your images here in the order you want them cycled
  const images = [ 'img/me1.jpg', 'img/me2.jpg' ];

  const imgEl = track.querySelector('.carousel-image');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = Array.from(document.querySelectorAll('.dot'));
  let currentIndex = 0;

  let isTransitioning = false; // prevent overlapping transitions

  function show(index) {
    // wrap the index so cycling works
    index = (index + images.length) % images.length;
    if (index === currentIndex || isTransitioning) return;

    isTransitioning = true;
    // start fade-out
    imgEl.classList.add('fading');

    // Duration should match the CSS transition (300ms)
    const duration = 300;
    setTimeout(() => {
      // swap the image once faded out
      imgEl.src = images[index];
      imgEl.alt = `Photo ${index + 1}`;

      // fade back in
      imgEl.classList.remove('fading');

      // update dots and current index
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      currentIndex = index;

      // allow new transitions after the fade-in completes
      setTimeout(() => { isTransitioning = false; }, duration);
    }, duration);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => show(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => show(currentIndex + 1));

  dots.forEach(dot => dot.addEventListener('click', (e) => show(Number(e.currentTarget.dataset.index))));

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(currentIndex - 1);
    else if (e.key === 'ArrowRight') show(currentIndex + 1);
  });

  // Initialize
  show(0);
});
