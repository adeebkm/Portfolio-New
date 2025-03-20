/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#986dff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#ffffff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 0.5
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

// Loading animation
window.addEventListener('load', function() {
  // Hide loading screen after page loads
  setTimeout(function() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('hidden');
  }, 1000);
});

// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const header = document.querySelector('header');
  const mobileMenu = document.querySelector('.mobile-menu');
  const navList = document.querySelector('.nav-list');
  let lastScrollTop = 0;
  
  // Mobile menu toggle
  mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navList.classList.toggle('active');
    
    // Animate nav items
    document.querySelectorAll('.nav-list li').forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        link.style.opacity = '1';
      }
    });
  });
  
  // Close mobile menu when clicking a nav link
  document.querySelectorAll('.nav-list li a').forEach(link => {
    link.addEventListener('click', function() {
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.click();
      }
    });
  });
  
  // Function to handle navbar visibility on scroll
  function handleNavbarVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.getElementById('s-home');
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    
    // Don't hide navbar when mobile menu is active
    if (mobileMenu.classList.contains('active')) {
      header.classList.remove('nav-hidden');
      return;
    }
    
    // Make navbar transparent at the top of the page
    if (scrollTop < 50) {
      header.classList.add('nav-transparent');
      header.classList.remove('nav-hidden');
      return;
    } else {
      header.classList.remove('nav-transparent');
    }
    
    // Hide navbar immediately when scrolling below hero section
    if (scrollTop >= (heroBottom - 100)) { // Slightly before the bottom for better UX
      header.classList.add('nav-hidden');
    } else {
      header.classList.remove('nav-hidden');
    }
    
    lastScrollTop = scrollTop;
  }
  
  // Add scroll event listener for navbar
  window.addEventListener('scroll', handleNavbarVisibility);
  
  // Initialize navbar state
  handleNavbarVisibility();

  // Add click event listeners to category buttons
  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the category to filter by
      const filterCategory = this.getAttribute('data-category');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterCategory === 'all') {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          // Change the condition to check if the card's categories include the filter category
          const cardCategories = card.getAttribute('data-category').split(' ');
          if (cardCategories.includes(filterCategory)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });

  // Initialize with "All Projects" selected
  document.querySelector('.category-btn[data-category="all"]').click();
  
  // Highlight active section in navbar
  const sections = document.querySelectorAll('section[id^="s-"]');
  const navLinks = document.querySelectorAll('header .nav-list li a');
  
  function highlightNavLink() {
    let scrollPosition = window.scrollY;
    
    // Add some offset to account for the fixed header
    scrollPosition += 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', highlightNavLink);
  
  // Call once on page load
  highlightNavLink();
  
  // Add smooth scrolling to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Offset for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top button functionality
  const scrollToTopButton = document.getElementById('scroll-to-top');
  
  // Show/hide button based on scroll position
  function toggleScrollToTopButton() {
    if (window.pageYOffset > 300) {
      scrollToTopButton.classList.add('visible');
    } else {
      scrollToTopButton.classList.remove('visible');
    }
  }
  
  // Add scroll event listener for the button
  window.addEventListener('scroll', toggleScrollToTopButton);
  
  // Add click event to scroll to top
  scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initialize button visibility
  toggleScrollToTopButton();
});