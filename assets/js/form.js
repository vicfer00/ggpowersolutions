// Contact form handler with loading, success, and error states
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackDiv = document.getElementById('form-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Basic client-side validation
    if (!contactForm.checkValidity()) {
      contactForm.classList.add('was-validated');
      return;
    }

    // Show loading state
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
    feedbackDiv.innerHTML = '';

    try {
      // Construct FormData from form
      const formData = new FormData(contactForm);

      // Send to Formspree endpoint
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        feedbackDiv.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Thank you!</strong> Your message has been sent successfully. We\'ll be in touch shortly.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
        contactForm.reset();
        contactForm.classList.remove('was-validated');
      } else {
        // Error from Formspree
        feedbackDiv.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Oops!</strong> There was an issue sending your message. Please try again or contact us directly.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
      }
    } catch (error) {
      // Network or other error
      console.error('Form submission error:', error);
      feedbackDiv.innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Error!</strong> A network error occurred. Please check your connection and try again.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    } finally {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

  // Scroll to feedback if visible
  const observer = new MutationObserver(() => {
    if (feedbackDiv.innerHTML.trim()) {
      feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  observer.observe(feedbackDiv, { childList: true });
});
