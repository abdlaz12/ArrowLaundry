document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if(mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
  
    // ======== HERO SLIDER INFINITE ========
    const slidesContainer = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slides .slide');
    const progressBar = document.getElementById('progress-bar');
    

    let currentIndex = 1; // karena kita mulai dari slide kedua (asli pertama)
    let slideInterval;
    let slideWidth = slideImages[0].clientWidth;

    function goToSlide(index, animate = true) {
      if (!animate) {
        slidesContainer.style.transition = 'none';
      } else {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out';
      }
      slidesContainer.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    function nextSlide() {
      currentIndex++;
      goToSlide(currentIndex);
      resetProgressBar();
    }

    function prevSlide() {
      currentIndex--;
      goToSlide(currentIndex);
      resetProgressBar();
    }

    function resetProgressBar() {
      if (progressBar) {
        progressBar.style.animation = 'none';
        void progressBar.offsetWidth; // force reflow
        progressBar.style.animation = 'fill 5s linear forwards';
      }
    }

    function startAutoSlide() {
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    slidesContainer.addEventListener('transitionend', () => {
      // Looping seamless
      if (currentIndex === 0) {
        currentIndex = slideImages.length - 2;
        goToSlide(currentIndex, false);
      } else if (currentIndex === slideImages.length - 1) {
        currentIndex = 1;
        goToSlide(currentIndex, false);
      }
    });

    window.addEventListener('resize', () => {
      slideWidth = slideImages[0].clientWidth;
      goToSlide(currentIndex, false);
    });

    if (slideImages.length >= 3) {
      goToSlide(currentIndex, false);
      startAutoSlide();
    }

    // ======== SERVICES POPUP MODAL ========
    const serviceDetails = [
      {
        title: "CARPET CLEANING",
        description: "Our professional carpet cleaning service removes deep-set dirt, stains, and allergens, leaving your carpets fresh and revitalized. We use eco-friendly cleaning solutions and state-of-the-art equipment to ensure the best results while extending the life of your carpets.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "POOL CLEANING",
        description: "Keep your pool crystal clear and safe with our comprehensive pool cleaning service. Our technicians handle everything from water testing and chemical balancing to debris removal and equipment maintenance. Enjoy your pool without the hassle of maintaining it yourself.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "CARPET CLEANING",
        description: "Our professional carpet cleaning service removes deep-set dirt, stains, and allergens, leaving your carpets fresh and revitalized. We use eco-friendly cleaning solutions and state-of-the-art equipment to ensure the best results while extending the life of your carpets.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "POOL CLEANING",
        description: "Keep your pool crystal clear and safe with our comprehensive pool cleaning service. Our technicians handle everything from water testing and chemical balancing to debris removal and equipment maintenance. Enjoy your pool without the hassle of maintaining it yourself.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "CARPET CLEANING",
        description: "Our professional carpet cleaning service removes deep-set dirt, stains, and allergens, leaving your carpets fresh and revitalized. We use eco-friendly cleaning solutions and state-of-the-art equipment to ensure the best results while extending the life of your carpets.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "POOL CLEANING",
        description: "Keep your pool crystal clear and safe with our comprehensive pool cleaning service. Our technicians handle everything from water testing and chemical balancing to debris removal and equipment maintenance. Enjoy your pool without the hassle of maintaining it yourself.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "CARPET CLEANING",
        description: "Our professional carpet cleaning service removes deep-set dirt, stains, and allergens, leaving your carpets fresh and revitalized. We use eco-friendly cleaning solutions and state-of-the-art equipment to ensure the best results while extending the life of your carpets.",
        image: "assets/slider/pohon.jpg"
      },
      {
        title: "POOL CLEANING",
        description: "Keep your pool crystal clear and safe with our comprehensive pool cleaning service. Our technicians handle everything from water testing and chemical balancing to debris removal and equipment maintenance. Enjoy your pool without the hassle of maintaining it yourself.",
        image: "assets/slider/pohon.jpg"
      }
    ];
  
    // Create the modal element
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img class="modal-image" src="" alt="Service Image">
        <h3 class="modal-title"></h3>
        <p class="modal-description"></p>
      </div>
    `;
    document.body.appendChild(modal);
  
    // Get all "VIEW DETAILS" buttons
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    
    // Add click event listeners to all view details buttons
    viewDetailsBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const service = serviceDetails[index] || {
          title: "Service Details",
          description: "Service details are not available at the moment.",
          image: "assets/slider/pohon.jpg"
        };
        
        // Set modal content
        modal.querySelector('.modal-image').src = service.image;
        modal.querySelector('.modal-title').textContent = service.title;
        modal.querySelector('.modal-description').textContent = service.description;
        
        // Show modal
        modal.style.display = 'flex';
      });
    });
  
    // Close modal when clicking the close button
    modal.querySelector('.modal-close').addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // ======== AUTO SLIDE SERVICES ========
    const servicesSlider = document.querySelector('.services-slider');
    let isScrolling = false;
    let isDragging = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;
  
    if (servicesSlider) {
      // Start auto scrolling
      startAutoScroll();
      
      // Stop auto scroll on mouse enter
      servicesSlider.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
      });
      
      // Resume auto scroll on mouse leave
      servicesSlider.addEventListener('mouseleave', () => {
        if (!isDragging) {
          startAutoScroll();
        }
      });
      
      // Manual scrolling for services
      servicesSlider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - servicesSlider.offsetLeft;
        scrollLeft = servicesSlider.scrollLeft;
        clearInterval(autoScrollInterval);
      });
      
      servicesSlider.addEventListener('mouseleave', () => {
        isDragging = false;
        if (!isScrolling) {
          startAutoScroll();
        }
      });
      
      servicesSlider.addEventListener('mouseup', () => {
        isDragging = false;
        setTimeout(() => {
          if (!isScrolling) {
            startAutoScroll();
          }
        }, 1000);
      });
      
      servicesSlider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - servicesSlider.offsetLeft;
        const walk = (x - startX) * 2;
        servicesSlider.scrollLeft = scrollLeft - walk;
        isScrolling = true;
        
        // Reset the isScrolling flag after a delay
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 150);
      });
      
      // Touch events for mobile
      servicesSlider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - servicesSlider.offsetLeft;
        scrollLeft = servicesSlider.scrollLeft;
        clearInterval(autoScrollInterval);
      });
      
      servicesSlider.addEventListener('touchend', () => {
        isDragging = false;
        setTimeout(() => {
          if (!isScrolling) {
            startAutoScroll();
          }
        }, 1000);
      });
      
      servicesSlider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - servicesSlider.offsetLeft;
        const walk = (x - startX) * 2;
        servicesSlider.scrollLeft = scrollLeft - walk;
        isScrolling = true;
        
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 150);
      });
    }
    
    function startAutoScroll() {
      clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(() => {
        if(servicesSlider) {
          servicesSlider.scrollLeft += 220; // Approximately the width of one service box
          
          // If reached the end, scroll back to start
          if (servicesSlider.scrollLeft >= (servicesSlider.scrollWidth - servicesSlider.clientWidth - 10)) {
            servicesSlider.scrollLeft = 0;
          }
        }
      }, 3000);
    }
  
    // ======== PORTFOLIO FILTERING ========
    const portfolioTabs = document.querySelectorAll('.portfolio-tabs .tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    // Show all portfolio items initially
    portfolioItems.forEach(item => {
      item.style.display = 'block';
    });
    
    // Create portfolio modal for images
    const portfolioModal = document.createElement('div');
    portfolioModal.className = 'service-modal';
    portfolioModal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <img class="modal-image" src="" alt="Portfolio Image">
        <h3 class="modal-title">Project Detail</h3>
      </div>
    `;
    document.body.appendChild(portfolioModal);
    
    // Add click event for portfolio items
    portfolioItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        
        // Set modal content
        portfolioModal.querySelector('.modal-image').src = imgSrc;
        
        // Show modal
        portfolioModal.style.display = 'flex';
      });
    });
    
    // Close portfolio modal
    portfolioModal.querySelector('.modal-close').addEventListener('click', () => {
      portfolioModal.style.display = 'none';
    });
    
    portfolioModal.addEventListener('click', (e) => {
      if (e.target === portfolioModal) {
        portfolioModal.style.display = 'none';
      }
    });
    
    // Add click event for portfolio tabs
    portfolioTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        portfolioTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        const filter = tab.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
// ======== TESTIMONIAL SLIDER MANUAL + AUTO SCROLL ========
const testimonialSlider = document.getElementById('testimonial-slider');
let isDraggingTesti = false;
let startXTesti, scrollLeftTesti;
let testiAutoScrollInterval;

if (testimonialSlider) {
  // Manual drag mouse
  testimonialSlider.addEventListener('mousedown', (e) => {
    isDraggingTesti = true;
    startXTesti = e.pageX - testimonialSlider.offsetLeft;
    scrollLeftTesti = testimonialSlider.scrollLeft;
    clearInterval(testiAutoScrollInterval);
  });

  testimonialSlider.addEventListener('mouseleave', () => {
    isDraggingTesti = false;
    startAutoScrollTestimonial();
  });

  testimonialSlider.addEventListener('mouseup', () => {
    isDraggingTesti = false;
    startAutoScrollTestimonial();
  });

  testimonialSlider.addEventListener('mousemove', (e) => {
    if (!isDraggingTesti) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startXTesti) * 2;
    testimonialSlider.scrollLeft = scrollLeftTesti - walk;
  });

  // Touch (mobile)
  testimonialSlider.addEventListener('touchstart', (e) => {
    isDraggingTesti = true;
    startXTesti = e.touches[0].pageX - testimonialSlider.offsetLeft;
    scrollLeftTesti = testimonialSlider.scrollLeft;
    clearInterval(testiAutoScrollInterval);
  });

  testimonialSlider.addEventListener('touchend', () => {
    isDraggingTesti = false;
    startAutoScrollTestimonial();
  });

  testimonialSlider.addEventListener('touchmove', (e) => {
    if (!isDraggingTesti) return;
    const x = e.touches[0].pageX - testimonialSlider.offsetLeft;
    const walk = (x - startXTesti) * 2;
    testimonialSlider.scrollLeft = scrollLeftTesti - walk;
  });

  // Auto scroll testimonial
  function startAutoScrollTestimonial() {
    clearInterval(testiAutoScrollInterval);
    testiAutoScrollInterval = setInterval(() => {
      testimonialSlider.scrollLeft += 320;

      if (testimonialSlider.scrollLeft >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth - 10) {
        testimonialSlider.scrollLeft = 0;
      }
    }, 4000);
  }

  startAutoScrollTestimonial();
}
emailjs.init("ED_If7aLg-65o9uvo"); // PUBLIC KEY kamu

const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();

    emailjs.sendForm('service_wwud6ct', 'template_tv2dtt9', this)
      .then(() => {
        console.log("✅ Email sent successfully.");
        const statusEl = document.getElementById('subscribe-status');
        statusEl.innerText = "✅ Check your inbox! We sent you a confirmation.";
        statusEl.classList.remove('subscribe-error');
        statusEl.classList.add('subscribe-success');
      }, (error) => {
        console.error("❌ Email send error:", error);
        const statusEl = document.getElementById('subscribe-status');
        statusEl.innerText = "❌ Failed to send email: " + error.text;
        statusEl.classList.remove('subscribe-success');
        statusEl.classList.add('subscribe-error');
      });

    this.reset();
  });
}
})