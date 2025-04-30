document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if(mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
  
    // ======== HERO SLIDER ========
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
  
    // Initialize hero slider if slides exist
    if(slides.length > 0) {
      initializeSlider();
    }
  
    function initializeSlider() {
      // Show the first slide
      slides[currentSlide].classList.add('active');
      
      // Previous button functionality
      prevBtn.addEventListener('click', () => {
        resetProgressBarAnimation();
        prevSlide();
      });
      
      // Next button functionality
      nextBtn.addEventListener('click', () => {
        resetProgressBarAnimation();
        nextSlide();
      });
      
      // Auto slide 
      startSlideInterval();
    }
  
    function nextSlide() {
      // Hide current slide
      slides[currentSlide].classList.remove('active');
      
      // Increment current slide and wrap around if needed
      currentSlide = (currentSlide + 1) % slides.length;
      
      // Show the new current slide
      slides[currentSlide].classList.add('active');
      updateSliderPosition();
    }
  
    function prevSlide() {
      // Hide current slide
      slides[currentSlide].classList.remove('active');
      
      // Decrement current slide and wrap around if needed
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      
      // Show the new current slide
      slides[currentSlide].classList.add('active');
      updateSliderPosition();
    }
  
    function updateSliderPosition() {
      const slidesContainer = document.querySelector('.slides');
      if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}vw)`;
      }
    }
  
    function resetProgressBarAnimation() {
      if(progressBar) {
        progressBar.style.animation = 'none';
        void progressBar.offsetWidth; // Force reflow
        progressBar.style.animation = 'fill 5s linear forwards';
      }
    }
  
    function startSlideInterval() {
      // Clear any existing interval
      clearInterval(slideInterval);
      
      // Set a new interval
      slideInterval = setInterval(() => {
        resetProgressBarAnimation();
        nextSlide();
      }, 5000);
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
    
    // ======== TESTIMONIAL SLIDER ========
    const testimonialSlider = document.getElementById('testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    let testimonialPosition = 0;
    let testimonialInterval;
    
    if(testimonialSlider && testimonialItems.length > 0) {
      // Calculate how many items to show based on window width
      const calculateVisibleItems = () => {
        if (window.innerWidth >= 992) {
          return 3; // Show 3 items on large screens
        } else if (window.innerWidth >= 768) {
          return 2; // Show 2 items on medium screens
        } else {
          return 1; // Show 1 item on small screens
        }
      };
      
      let visibleItems = calculateVisibleItems();
      
      // Update on window resize
      window.addEventListener('resize', () => {
        visibleItems = calculateVisibleItems();
        moveTestimonialSlider();
      });
      
      // Set initial item width and show first items
      const updateItemWidth = () => {
        const containerWidth = testimonialSlider.parentElement.offsetWidth;
        const itemWidth = containerWidth / visibleItems;
        
        testimonialItems.forEach(item => {
          item.style.flex = `0 0 ${itemWidth}px`;
          item.style.maxWidth = `${itemWidth}px`;
        });
      };
      
      updateItemWidth();
      window.addEventListener('resize', updateItemWidth);
      
      // Move slider function
      const moveTestimonialSlider = () => {
        const containerWidth = testimonialSlider.parentElement.offsetWidth;
        const itemWidth = containerWidth / visibleItems;
        testimonialSlider.style.transform = `translateX(-${testimonialPosition * itemWidth}px)`;
      };
      
      // Next testimonial
      const nextTestimonial = () => {
        if (testimonialPosition >= testimonialItems.length - visibleItems) {
          testimonialPosition = 0;
        } else {
          testimonialPosition++;
        }
        moveTestimonialSlider();
      };
      
      // Previous testimonial
      const prevTestimonial = () => {
        if (testimonialPosition <= 0) {
          testimonialPosition = testimonialItems.length - visibleItems;
        } else {
          testimonialPosition--;
        }
        moveTestimonialSlider();
      };
      
      // Button event listeners
      testimonialNext.addEventListener('click', () => {
        nextTestimonial();
        resetTestimonialInterval();
      });
      
      testimonialPrev.addEventListener('click', () => {
        prevTestimonial();
        resetTestimonialInterval();
      });
      
      // Auto slide testimonials
      const startTestimonialInterval = () => {
        testimonialInterval = setInterval(nextTestimonial, 4000);
      };
      
      const resetTestimonialInterval = () => {
        clearInterval(testimonialInterval);
        startTestimonialInterval();
      };
      
      // Start auto sliding
      startTestimonialInterval();
      
      // Pause auto slide on hover
      testimonialSlider.parentElement.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
      });
      
      testimonialSlider.parentElement.addEventListener('mouseleave', () => {
        startTestimonialInterval();
      });
    }
  
})