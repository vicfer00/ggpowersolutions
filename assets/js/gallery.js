// Simple gallery lightbox that uses Bootstrap modal with arrow navigation
document.addEventListener('DOMContentLoaded', function() {
  const modalEl = document.getElementById('galleryModal');
  if (!modalEl) return;
  
  const modalImg = document.getElementById('gallery-modal-image');
  const modalCaption = document.getElementById('gallery-modal-caption');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const bsModal = new bootstrap.Modal(modalEl, {});
  
  let allImages = [];
  let currentIndex = 0;

  // Collect all gallery items
  function updateImageArray() {
    allImages = Array.from(document.querySelectorAll('.gallery-item'));
  }

  // Navigate to image by index
  function goToImage(index) {
    if (allImages.length === 0) return;
    
    // Wrap around: if index is out of bounds, loop to the other end
    currentIndex = (index + allImages.length) % allImages.length;
    
    const item = allImages[currentIndex];
    const src = item.getAttribute('data-src');
    const alt = item.getAttribute('data-alt') || '';
    
    if (modalImg && src) {
      modalImg.src = src;
      modalImg.alt = alt;
    }
    if (modalCaption) modalCaption.textContent = alt;
  }

  // Click handler for gallery items
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      updateImageArray();
      currentIndex = Array.from(document.querySelectorAll('.gallery-item')).indexOf(this);
      goToImage(currentIndex);
      bsModal.show();
    });
  });

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.preventDefault();
      goToImage(currentIndex - 1);
    });
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.preventDefault();
      goToImage(currentIndex + 1);
    });
  }

  // Keyboard navigation
  modalEl.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') goToImage(currentIndex - 1);
    if (e.key === 'ArrowRight') goToImage(currentIndex + 1);
  });
});

