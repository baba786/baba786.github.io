// Main.js - Custom JavaScript for award-worthy site

document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  setTimeout(function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 1000);

  // Intersection Observer for scroll animations
  const animatedElements = document.querySelectorAll('.animated, .fade-up');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Custom cursor
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  const cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  document.body.appendChild(cursorOutline);
  
  document.addEventListener('mousemove', function(e) {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    // Add a slight delay to the outline for a trailing effect
    setTimeout(() => {
      cursorOutline.style.left = e.clientX + 'px';
      cursorOutline.style.top = e.clientY + 'px';
    }, 50);
  });
  
  // Add active state to cursor when hovering over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skills-grid__item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
      cursorOutline.classList.add('active');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorOutline.classList.remove('active');
    });
  });

  // 3D Tilt effect for project cards
  const tiltElements = document.querySelectorAll('.project-card');
  
  tiltElements.forEach(el => {
    el.classList.add('tilt-element');
    
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const xPos = (e.clientX - rect.left) / rect.width;
      const yPos = (e.clientY - rect.top) / rect.height;
      
      const xOffset = (xPos - 0.5) * 10;
      const yOffset = (yPos - 0.5) * 10;
      
      this.style.transform = `perspective(1000px) rotateX(${-yOffset}deg) rotateY(${xOffset}deg)`;
    });
    
    el.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
  });

  // Typing effect for hero title
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeEffect = setInterval(() => {
      if (i < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typeEffect);
      }
    }, 50);
  }

  // Dynamic header on scroll
  const header = document.querySelector('.masthead');
  if (header) {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('masthead--scrolled');
      } else {
        header.classList.remove('masthead--scrolled');
      }
      
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down
        header.classList.add('masthead--hidden');
      } else {
        // Scrolling up
        header.classList.remove('masthead--hidden');
      }
      
      lastScrollTop = scrollTop;
    });
  }

  // Theme toggle functionality
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      const isDarkMode = document.body.classList.contains('dark-theme');
      localStorage.setItem('darkMode', isDarkMode);
      
      // Update icon
      const icon = themeToggle.querySelector('i');
      if (isDarkMode) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    });
    
    // Check for saved theme preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (savedDarkMode || (prefersDarkMode && savedDarkMode !== false)) {
      document.body.classList.add('dark-theme');
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
  }

  // Add parallax effect to hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.pageYOffset;
      const decoration = document.querySelector('.hero__decoration');
      
      if (decoration) {
        decoration.style.transform = `translateY(${scrollPosition * 0.15}px)`;
      }
    });
  }

  // Create random particles in hero section
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'hero__particle';
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 10 + 2;
      
      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Apply styles
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      
      // Add to hero background
      heroBg.appendChild(particle);
      
      // Animate particles
      setInterval(() => {
        const newPosX = parseFloat(particle.style.left) + (Math.random() * 1 - 0.5);
        const newPosY = parseFloat(particle.style.top) + (Math.random() * 1 - 0.5);
        
        particle.style.left = `${newPosX}%`;
        particle.style.top = `${newPosY}%`;
      }, 3000);
    }
  }
});

// Add particles to the hero section
function createParticlesEffect() {
  const container = document.querySelector('.hero');
  if (!container) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  container.appendChild(particlesContainer);
  
  // Add CSS for particles
  const style = document.createElement('style');
  style.textContent = `
    .particles-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
    }
    .particle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
  
  // Create particles
  for (let i = 0; i < 100; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random properties
  const size = Math.random() * 6 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const opacity = Math.random() * 0.3 + 0.1;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  
  // Set styles
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}%`;
  particle.style.top = `${posY}%`;
  particle.style.opacity = opacity;
  particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
  
  container.appendChild(particle);
}

// Call function after DOM is loaded
document.addEventListener('DOMContentLoaded', createParticlesEffect);
