const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const filterButtons = document.querySelectorAll('.filter-btn');
let currentImageIndex = 0;
let activeCategory = 'all';
let visibleItems = galleryItems;
function updateVisibleItems(category) {
  activeCategory = category;
  visibleItems = galleryItems.filter(item =>
    category === 'all' || item.getAttribute('data-category') === category
  );
}
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = visibleItems.indexOf(item);
    updateLightbox();
    lightbox.style.display = 'flex';
  });
});
function updateLightbox() {
  const item = visibleItems[currentImageIndex];
  lightboxImg.src = item.querySelector('img').src;
  lightboxCaption.textContent = item.querySelector('.caption').textContent;
}
function closeLightbox() {
  lightbox.style.display = 'none';
}
function changeImage(direction) {
  currentImageIndex = (currentImageIndex + direction + visibleItems.length) % visibleItems.length;
  updateLightbox();
}
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-category');
    updateVisibleItems(category);
    galleryItems.forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    currentImageIndex = 0;
    if (visibleItems.length > 0 && lightbox.style.display === 'flex') {
      updateLightbox();
    }
  });
});
document.addEventListener('keydown', (event) => {
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowLeft') changeImage(-1);
    else if (event.key === 'ArrowRight') changeImage(1);
    else if (event.key === 'Escape') closeLightbox();
  }
});
updateVisibleItems('all');
