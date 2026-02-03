// Beginner-friendly image carousel for the gallery section
// - Shows multiple images at once and lets you scroll through them
// - The closest image to the center becomes slightly larger

document.addEventListener('DOMContentLoaded', function () {
  // Fade-in sections on scroll (simple and beginner-friendly)
  const sections = document.querySelectorAll('main section');
  sections.forEach(section => section.classList.add('fade-section'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // reveal once
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback: show all sections if observer isn't supported
    sections.forEach(section => section.classList.add('is-visible'));
  }

  const track = document.querySelector('.carousel-track');
  if (!track) return; // If there's no gallery, do nothing

  // List your images here in the order you want them shown
  const images = [ 'img/me1.jpg', 'img/me2.jpg', 'img/me3.jpg', 'img/me4.jpg' ];

  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  // Build the image list inside the track
  images.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Photo ${index + 1}`;
    img.className = 'carousel-image';
    img.loading = 'lazy';
    track.appendChild(img);
  });

  const imageEls = Array.from(track.querySelectorAll('.carousel-image'));
  if (imageEls.length === 0) return;

  function findCenteredIndex() {
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    imageEls.forEach((img, index) => {
      const imgRect = img.getBoundingClientRect();
      const imgCenter = imgRect.left + imgRect.width / 2;
      const distance = Math.abs(trackCenter - imgCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }

  function updateCenter() {
    currentIndex = findCenteredIndex();
    imageEls.forEach((img, index) => {
      img.classList.toggle('is-center', index === currentIndex);
    });
  }

  function scrollToIndex(index, behavior = 'smooth') {
    if (imageEls.length === 0) return;

    index = (index + imageEls.length) % imageEls.length;
    const img = imageEls[index];
    const trackRect = track.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    const imgLeft = imgRect.left - trackRect.left + track.scrollLeft;
    const target = imgLeft - (trackRect.width / 2 - imgRect.width / 2);

    track.scrollTo({ left: target, behavior });
  }

  let isTicking = false;
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    if (!isTicking) {
      isTicking = true;
      window.requestAnimationFrame(() => {
        updateCenter();
        isTicking = false;
      });
    }

    // After scrolling stops, snap the closest image to the center
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      scrollToIndex(currentIndex);
    }, 120);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => scrollToIndex(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollToIndex(currentIndex + 1));

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') scrollToIndex(currentIndex - 1);
    else if (e.key === 'ArrowRight') scrollToIndex(currentIndex + 1);
  });

  // Initialize (center the first image)
  window.addEventListener('load', () => {
    scrollToIndex(0, 'auto');
    updateCenter();
  });
});
