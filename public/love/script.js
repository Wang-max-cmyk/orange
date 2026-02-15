/* ============================================= */
/*  ROMANTIC WEBSITE - MAIN JAVASCRIPT           */
/*  For My Love - 致我最爱的你                    */
/* ============================================= */

document.addEventListener('DOMContentLoaded', function () {
  // ==========================================
  // INTRO SCREEN - Flower Bloom & Enter
  // ==========================================
  const introScreen = document.getElementById('intro-screen');
  const enterBtn = document.getElementById('enter-btn');
  const mainSite = document.getElementById('main-site');

  // Create sparkle particles for intro
  createIntroParticles();

  enterBtn.addEventListener('click', function () {
    introScreen.classList.add('fade-out');
    // Create burst of hearts on click
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);

    setTimeout(function () {
      introScreen.style.display = 'none';
      mainSite.classList.remove('hidden');
      mainSite.style.animation = 'pageLoad 1s ease forwards';

      // Initialize everything after main site is visible
      initAll();
    }, 1500);
  });

  function createIntroParticles() {
    const container = document.getElementById('intro-particles');
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(232, 80, 122, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: introParticleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
      `;
      container.appendChild(particle);
    }

    // Add keyframes for intro particles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes introParticleFloat {
        0%, 100% {
          transform: translate(0, 0) scale(1);
          opacity: 0.3;
        }
        25% {
          transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5);
          opacity: 0.8;
        }
        50% {
          transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8);
          opacity: 0.5;
        }
        75% {
          transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2);
          opacity: 0.6;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // INITIALIZE ALL FEATURES
  // ==========================================
  function initAll() {
    initAOS();
    initNavigation();
    initCountdown();
    initFloatingHearts();
    initTypedText();
    initStatCounters();
    initPhotoWallFilters();
    initHerWorldTabs();
    initEnvelope();
    initGalleryModal();
    initLightbox();
    initMomentCards();
    initBackToTop();
    initCursorTrail();
    initFooterHearts();
    initMusicPlayer();
    initFeaturedQuote();
    initParallaxEffects();
    initScrollAnimations();
    initPhotoWallReveal();
  }

  // ==========================================
  // AOS (Animate On Scroll)
  // ==========================================
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: false
      });
    }
  }

  // ==========================================
  // NAVIGATION
  // ==========================================
  function initNavigation() {
    const nav = document.getElementById('main-nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const allLinks = navLinks.querySelectorAll('a');

    // Scroll effect
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    // Mobile toggle
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Smooth scroll for nav links
    allLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', function () {
      let current = '';
      sections.forEach(function (section) {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      allLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  // ==========================================
  // COUNTDOWN TIMER
  // ==========================================
  function initCountdown() {
    const startDate = new Date('2025-09-14T00:00:00');

    function updateCountdown() {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      animateNumber('count-days', days);
      animateNumber('count-hours', hours);
      animateNumber('count-minutes', minutes);
      animateNumber('count-seconds', seconds);
    }

    function animateNumber(id, value) {
      const el = document.getElementById(id);
      if (el && el.textContent !== String(value)) {
        el.textContent = value;
        el.style.transform = 'scale(1.1)';
        setTimeout(function () {
          el.style.transform = 'scale(1)';
          el.style.transition = 'transform 0.3s ease';
        }, 100);
      }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // ==========================================
  // FLOATING HEARTS BACKGROUND
  // ==========================================
  function initFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    const heartSymbols = ['\u2665', '\u2764', '\u2661'];

    function createHeart() {
      const heart = document.createElement('div');
      heart.classList.add('floating-heart');
      heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
      heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
      heart.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(heart);

      // Remove after animation
      setTimeout(function () {
        heart.remove();
      }, 25000);
    }

    // Create initial hearts
    for (let i = 0; i < 15; i++) {
      setTimeout(createHeart, i * 500);
    }

    // Continuously create hearts
    setInterval(createHeart, 3000);
  }

  // ==========================================
  // TYPED TEXT
  // ==========================================
  function initTypedText() {
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings: [
          '橙子天天开心',
          '遇见你，是我这辈子最大的幸运',
          '每一天都想和你在一起',
          '你笑起来的样子，是我见过最美的风景',
          '想牵着你的手，走过每一个四季',
          '小橙子是全世界最乖的宝宝',
          '今天也心想是橙哦'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 3000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      });
    }
  }

  // ==========================================
  // STAT COUNTERS (Scroll Animation)
  // ==========================================
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach(function (numEl) {
            const target = parseInt(numEl.getAttribute('data-target'));
            animateCountUp(numEl, target, 2000);
          });
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.love-stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  function animateCountUp(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    function step() {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        return;
      }
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(step);
    }

    step();
  }

  // ==========================================
  // PHOTO WALL FILTERS
  // ==========================================
  function initPhotoWallFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        // Filter photos with animation
        photoItems.forEach(function (item, index) {
          const itemFilter = item.getAttribute('data-filter');
          if (filter === 'all' || itemFilter === filter) {
            item.classList.remove('hidden-photo');
            item.style.animation = 'fadeIn 0.5s ease ' + (index * 0.05) + 's forwards';
          } else {
            item.classList.add('hidden-photo');
          }
        });
      });
    });
  }

  // ==========================================
  // PHOTO WALL REVEAL (vanilla IntersectionObserver)
  // ==========================================
  function initPhotoWallReveal() {
    var photoItems = document.querySelectorAll('.photo-item');
    
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    photoItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  // ==========================================
  // HER WORLD TABS
  // ==========================================
  function initHerWorldTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const momentCards = document.querySelectorAll('.moment-card');

    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = this.getAttribute('data-category');

        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        momentCards.forEach(function (card, index) {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden-card');
            card.style.animation = 'fadeIn 0.4s ease ' + (index * 0.08) + 's forwards';
          } else {
            card.classList.add('hidden-card');
          }
        });
      });
    });
  }

  // ==========================================
  // MOMENT CARDS - Click to Open Gallery
  // ==========================================
  function initMomentCards() {
    const momentCards = document.querySelectorAll('.moment-card');

    momentCards.forEach(function (card) {
      card.querySelector('.moment-card-inner').addEventListener('click', function () {
        const title = card.querySelector('.moment-card-info h3').textContent;
        const galleryDiv = card.querySelector('.moment-card-gallery');
        if (galleryDiv) {
          const images = galleryDiv.querySelectorAll('img');
          const imageSrcs = [];
          images.forEach(function (img) {
            imageSrcs.push(img.src);
          });
          openGalleryWithImages(title, imageSrcs);
        }
      });
    });
  }

  // ==========================================
  // ENVELOPE / LOVE LETTER
  // ==========================================
  function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');

    envelope.addEventListener('click', function () {
      envelope.classList.add('opened');
      letterContent.classList.add('show');

      // Animate letter paragraphs one by one
      const paragraphs = letterContent.querySelectorAll('.letter-body p');
      paragraphs.forEach(function (p, i) {
        p.style.opacity = '0';
        p.style.transform = 'translateY(15px)';
        p.style.transition = 'all 0.6s ease';
        setTimeout(function () {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 300 + i * 200);
      });
    });
  }

  // ==========================================
  // GALLERY MODAL (for Timeline)
  // ==========================================
  const galleryData = {
    sept: {
      title: '相片情人节 - 2025.09.14',
      // 📷 替换: 在这里添加9月14日的照片路径
      images: [
        'photos/timeline/sept-1.jpg',
        'photos/timeline/sept-2.jpg',
        'photos/timeline/sept-3.jpg'
      ]
    },
    oct: {
      title: '葡萄酒情人节 - 2025.10.14',
      images: [
        'photos/timeline/oct-1.jpg',
        'photos/timeline/oct-2.jpg',
        'photos/timeline/oct-3.jpg'
      ]
    },
    nov: {
      title: '电影情人节 - 2025.11.14',
      images: [
        'photos/timeline/nov-1.jpg',
        'photos/timeline/nov-2.jpg',
        'photos/timeline/nov-3.jpg'
      ]
    },
    dec: {
      title: '拥抱情人节 - 2025.12.14',
      images: [
        'photos/timeline/dec-1.jpg',
        'photos/timeline/dec-2.jpg',
        'photos/timeline/dec-3.jpg'
      ]
    },
    birthday: {
      title: '你的生日 - 2025.12.29',
      images: [
        'photos/timeline/birthday-1.jpg',
        'photos/timeline/birthday-2.jpg',
        'photos/timeline/birthday-3.jpg'
      ]
    },
    jan: {
      title: '日记情人节 - 2026.01.14',
      images: [
        'photos/timeline/jan-1.jpg',
        'photos/timeline/jan-2.jpg',
        'photos/timeline/jan-3.jpg'
      ]
    },
    feb: {
      title: '传统情人节 - 2026.02.14',
      images: [
        'photos/timeline/feb-1.jpg',
        'photos/timeline/feb-2.jpg',
        'photos/timeline/feb-3.jpg'
      ]
    }
  };

  let gallerySwiperInstance = null;

  function initGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('gallery-close');
    const overlay = modal.querySelector('.gallery-modal-overlay');

    closeBtn.addEventListener('click', closeGallery);
    overlay.addEventListener('click', closeGallery);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeGallery();
        closeLightbox();
      }
    });
  }

  // Global function for timeline buttons
  window.openGallery = function (key) {
    const data = galleryData[key];
    if (!data) return;
    openGalleryWithImages(data.title, data.images);
  };

  function openGalleryWithImages(title, images) {
    const modal = document.getElementById('gallery-modal');
    const titleEl = document.getElementById('gallery-title');
    const slidesContainer = document.getElementById('gallery-slides');

    titleEl.textContent = title;
    slidesContainer.innerHTML = '';

    images.forEach(function (src) {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <img src="${src}" alt="${title}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Crect fill=%22%23f8e8ee%22 width=%22800%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23c44569%22 font-size=%2224%22%3E%E7%85%A7%E7%89%87%E5%8D%A0%E4%BD%8D%3C/text%3E%3C/svg%3E'">
        <button class="slide-download-btn" onclick="downloadSinglePhoto('${src}')" style="
          position: absolute;
          bottom: 20px;
          right: 20px;
          padding: 8px 16px;
          background: rgba(232, 80, 122, 0.8);
          color: white;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
        ">
          <i class="fas fa-download"></i> 下载
        </button>
      `;
      slidesContainer.appendChild(slide);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize or update Swiper
    if (gallerySwiperInstance) {
      gallerySwiperInstance.destroy(true, true);
    }

    gallerySwiperInstance = new Swiper('#gallery-swiper', {
      loop: images.length > 1,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      keyboard: { enabled: true }
    });

    // Download all button
    document.getElementById('download-all-btn').onclick = function () {
      images.forEach(function (src, i) {
        setTimeout(function () {
          downloadSinglePhoto(src);
        }, i * 300);
      });
    };
  }

  function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (gallerySwiperInstance) {
      gallerySwiperInstance.destroy(true, true);
      gallerySwiperInstance = null;
    }
  }

  // ==========================================
  // LIGHTBOX (Single Photo)
  // ==========================================
  function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  window.viewPhoto = function (btn) {
    const photoItem = btn.closest('.photo-item');
    const img = photoItem.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDownload = document.getElementById('lightbox-download');

    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    lightboxDownload.onclick = function () {
      downloadSinglePhoto(img.src);
    };
  };

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ==========================================
  // PHOTO DOWNLOAD
  // ==========================================
  window.downloadPhoto = function (btn) {
    const photoItem = btn.closest('.photo-item');
    const img = photoItem.querySelector('img');
    downloadSinglePhoto(img.src);
  };

  window.downloadSinglePhoto = function (src) {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'photo.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // BACK TO TOP
  // ==========================================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');

    window.addEventListener('scroll', function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // CURSOR HEART TRAIL
  // ==========================================
  function initCursorTrail() {
    const canvas = document.getElementById('cursor-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Only create particle if mouse moved enough
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      if (Math.sqrt(dx * dx + dy * dy) > 10) {
        createTrailParticle(mouseX, mouseY);
        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    });

    function createTrailParticle(x, y) {
      particles.push({
        x: x,
        y: y,
        size: Math.random() * 6 + 3,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1,
        color: `hsla(${340 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%, `
      });
    }

    function animateTrail() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function (p, i) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.98;

        if (p.life <= 0) {
          particles.splice(i, 1);
          return;
        }

        // Draw heart shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.scale(p.size / 15, p.size / 15);
        ctx.fillStyle = p.color + p.life + ')';
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(-5, -10, -15, -5, 0, 5);
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(5, -10, 15, -5, 0, 5);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

  // ==========================================
  // HEART BURST EFFECT
  // ==========================================
  function createHeartBurst(x, y, count) {
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      const angle = (Math.PI * 2 / count) * i;
      const velocity = Math.random() * 100 + 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const size = Math.random() * 20 + 10;

      heart.innerHTML = '\u2665';
      heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${size}px;
        color: hsl(${340 + Math.random() * 30}, 80%, ${60 + Math.random() * 20}%);
        pointer-events: none;
        z-index: 100000;
        transition: all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
      `;
      document.body.appendChild(heart);

      requestAnimationFrame(function () {
        heart.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
      });

      setTimeout(function () { heart.remove(); }, 1500);
    }
  }

  // ==========================================
  // FOOTER HEARTS
  // ==========================================
  function initFooterHearts() {
    const container = document.getElementById('footer-hearts');

    function createFooterHeart() {
      const heart = document.createElement('div');
      heart.innerHTML = '\u2665';
      heart.style.cssText = `
        position: absolute;
        bottom: -20px;
        left: ${Math.random() * 100}%;
        font-size: ${Math.random() * 14 + 8}px;
        color: rgba(232, 80, 122, ${Math.random() * 0.3 + 0.1});
        animation: floatUp ${Math.random() * 4 + 3}s ease-in forwards;
        pointer-events: none;
      `;
      container.appendChild(heart);
      setTimeout(function () { heart.remove(); }, 8000);
    }

    setInterval(createFooterHeart, 800);
  }

  // ==========================================
  // MUSIC PLAYER
  // ==========================================
  function initMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const vinyl = document.getElementById('vinyl-record');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const progressFill = document.getElementById('progress-fill');
    const progressBar = document.getElementById('progress-bar');

    // Playlist - 📷 用户可以在此添加自己的音乐文件路径
    const playlist = [
      { title: '暖暖', artist: '“我想说其实你很好，你自己却不知道”', src: 'photos/music/梁静茹-暖暖.mp3' },
      { title: '同进退', artist: '“我会牵着你手同进退，佛前立誓不后悔”', src: 'photos/music/同进退-倪浩毅.mp3' },
      { title: '难生恨', artist: '“我无名分，我不多嗔”，现在有名分啦', src: 'photos/music/DAWN - 难生恨.mp3' }
    ];

    let currentTrack = 0;
    let audio = new Audio();
    let isPlaying = false;

    function loadTrack(index) {
      currentTrack = index;
      audio.src = playlist[index].src;
      songTitle.textContent = playlist[index].title;
      songArtist.textContent = playlist[index].artist;
    }

    loadTrack(0);

    playBtn.addEventListener('click', function () {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        vinyl.classList.remove('spinning');
      } else {
        audio.play().catch(function () {
          songArtist.textContent = '请先添加音乐文件';
        });
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinyl.classList.add('spinning');
      }
      isPlaying = !isPlaying;
    });

    prevBtn.addEventListener('click', function () {
      currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrack);
      if (isPlaying) {
        audio.play().catch(function () {});
      }
    });

    nextBtn.addEventListener('click', function () {
      currentTrack = (currentTrack + 1) % playlist.length;
      loadTrack(currentTrack);
      if (isPlaying) {
        audio.play().catch(function () {});
      }
    });

    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
      }
    });

    audio.addEventListener('ended', function () {
      currentTrack = (currentTrack + 1) % playlist.length;
      loadTrack(currentTrack);
      audio.play().catch(function () {});
    });

    progressBar.addEventListener('click', function (e) {
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      if (audio.duration) {
        audio.currentTime = pos * audio.duration;
      }
    });
  }

  // ==========================================
  // FEATURED QUOTE (Typewriter effect)
  // ==========================================
  function initFeaturedQuote() {
    const quoteEl = document.getElementById('featured-quote-text');
    const quotes = [
      '我老是说错话，但我会一直努力，我要成为一个好宝宝',
      '橙子是全世界最乖最乖的米宝宝',
      '你是我想写一封长长的信的人',
      '我想把世界上最好的都给你',
      '橙子天天开心'
    ];

    let quoteIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeQuote() {
      const currentQuote = quotes[quoteIndex];

      if (!isDeleting) {
        quoteEl.textContent = currentQuote.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentQuote.length) {
          isDeleting = true;
          setTimeout(typeQuote, 3000);
          return;
        }
        setTimeout(typeQuote, 80);
      } else {
        quoteEl.textContent = currentQuote.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          quoteIndex = (quoteIndex + 1) % quotes.length;
          setTimeout(typeQuote, 500);
          return;
        }
        setTimeout(typeQuote, 40);
      }
    }

    // Start when element is in view
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        typeQuote();
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const quoteSection = document.querySelector('.featured-quote');
    if (quoteSection) {
      observer.observe(quoteSection);
    }
  }

  // ==========================================
  // PARALLAX EFFECTS (using GSAP if available)
  // ==========================================
  function initParallaxEffects() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero section parallax
      gsap.to('.hero-bg-animation', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Section titles entrance
      gsap.utils.toArray('.section-title').forEach(function (title) {
        gsap.from(title, {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Timeline cards stagger
      gsap.utils.toArray('.timeline-card').forEach(function (card) {
        gsap.from(card, {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Wish cards hover GSAP enhancement
      gsap.utils.toArray('.wish-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }
  }

  // ==========================================
  // SCROLL-BASED ANIMATIONS (vanilla)
  // ==========================================
  function initScrollAnimations() {
    // Reveal elements on scroll using Intersection Observer
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Timeline line animation
    const timelineLine = document.querySelector('.timeline-line');
    if (timelineLine) {
      const timelineObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          timelineLine.style.animation = 'timelineGrow 2s ease forwards';
        }
      }, { threshold: 0.1 });

      timelineObserver.observe(timelineLine);
    }

    // Add timeline grow animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes timelineGrow {
        from { height: 0; }
        to { height: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // EASTER EGGS & EXTRA INTERACTIONS
  // ==========================================

  // Konami code -> heart explosion
  let konamiIndex = 0;
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

  document.addEventListener('keydown', function (e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        // Heart explosion!
        for (let i = 0; i < 5; i++) {
          setTimeout(function () {
            createHeartBurst(
              Math.random() * window.innerWidth,
              Math.random() * window.innerHeight,
              15
            );
          }, i * 200);
        }
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // ==========================================
  // ALL PHOTOS GALLERY (Photo Wall "More" button)
  // ==========================================
  window.openAllPhotosGallery = function () {
    var modal = document.getElementById('all-photos-modal');
    var grid = document.getElementById('all-photos-grid');
    var photosContainer = document.getElementById('all-couple-photos');
    
    grid.innerHTML = '';
    
    if (photosContainer) {
      var imgs = photosContainer.querySelectorAll('img');
      imgs.forEach(function (img, i) {
        var item = document.createElement('div');
        item.className = 'gallery-photo-item';
        item.style.animationDelay = (i * 0.06) + 's';
        item.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '" onerror="this.src=\'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22%3E%3Crect fill=%22%23f8e8ee%22 width=%22400%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%23c44569%22 font-size=%2218%22%3E' + encodeURIComponent(img.alt) + '%3C/text%3E%3C/svg%3E\'">' +
          '<div class="photo-overlay">' +
          '<div class="photo-actions">' +
          '<button class="photo-action-btn" onclick="viewPhotoFromGallery(\'' + img.src + '\')" title="查看大图"><i class="fas fa-expand"></i></button>' +
          '<button class="photo-action-btn" onclick="downloadSinglePhoto(\'' + img.src + '\')" title="下载照片"><i class="fas fa-download"></i></button>' +
          '</div></div>';
        grid.appendChild(item);
      });
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  
  window.closeAllPhotosGallery = function () {
    var modal = document.getElementById('all-photos-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  window.viewPhotoFromGallery = function (src) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxDownload = document.getElementById('lightbox-download');
    
    lightboxImg.src = src;
    lightbox.classList.add('active');
    
    lightboxDownload.onclick = function () {
      downloadSinglePhoto(src);
    };
  };

  // ==========================================
  // FULL MESSAGE MODAL (for long chat messages)
  // ==========================================
  var fullMessageData = [
    {
      name: '橙宝🍊',
      avatar: 'photos/avatar-hers.jpg',
      time: '2025年2月13日 1:08',
      text: '比乐，我不知道怎么给你形容这种感觉，以前我焦虑的时候看见你很难过我很心疼，但是我自己也很难受，你没有学会怎么解决我的焦虑，我只能事后复盘的时候和你说，你要多和我说话，要和我表达自己的想法。每次这种时候就很开心，因为感觉以后会越来越好。我总是想通过离家出走，回寝室，这种方式吸引你注意力，让你来关注我解决我的焦虑，不想两个人沉默的越来越难受。所以为什么每次你在下面都是我喊你，或者下来找你想喊你到我旁边来。这种方式让你很累，其实事情说开了都不累了，但是你一直不愿意和我说你心里怎么想的。我们以前都说过，只要对方不提分手就一定不会想分手，我以前没有一次是想真的分手，我害怕离开你，我真的不知道怎么办，但是你看上去真的不想和我在一起了。你后来可能觉得自己是冲动上头了，但是我一想到我就很难受，我很怕哪里又让你不开心了，我不敢在你面前耍脾气不敢无理取闹，我不知道你怎么想的，以前你说你困了，我就说那宝宝睡觉，但是我刚刚又在你眼睛里看到你很无语的样子了。我现在依然不知道分手之后我怎么办，我很难过，我觉得我被丢开了，因为我的原因。你昨天说的很多事情我都记不清了，包括你帮李周做事这些，聊天记录没有了，但是我印象里总觉得不完全是你说的那样，我不是这样不讲道理的人，如果当时我有别的情绪影响，我希望你能理解我，也可能是我自我认知不够清晰，如果你有聊天记录也可以看看。这些其实都不重要了。重要的是好像在你眼里我已经很差劲了。好像每次我乱耍脾气都是针对当时的事情，因为以前的事我都当场把脾气耍完了。你积压了那么多怨气我也不知道[捂脸]。我记得我最开始就和你说，我脾气很差，希望你始终相信我永远不希望伤害你，你相信我是个好人就够了。但是你昨天说的我真的很伤心，感觉你一股脑把心里话全说出来了，我不信你说是乱说的，你应该不会用乱说的话来伤害我吧。\n\n情侣之间吵架是很正常的事，但是我们应该就事论事来解决问题。以前我总提分手是我的错，我不知道怎么样才能让你关注我在想什么，但是我从来没有认真过。我每一次都很怕玩脱了，你同意了。没想到玩脱了有延迟的副作用[笑脸]你真的要分手了。以后我们能不能多吵架，你的不满我的不满吵一架说开了就都没事了，不要害怕说，因为吵架是常态，你害怕我难过，所以我最后更难过了。以后我们都不说分手好不好。\n\n我不知道你能不能看出我有多难过，我昨天就想着你要分手我就死缠烂打缠着你，到遵义去找你，求你告诉你我会改。然后马上想到，我真的要这样吗，这样不好，然后又马上想到要是你不在，我之后的日子该怎么办，很难想象因为想一点点就想不下去了。我难过因为你不是想让我不哭，而是我哭了之后和我说你别哭。\n\n你回忆一下哈，我们在一起也挺不容易的，天时地利人和都碰上了。其实追根溯源还是你追的我嘞。我记得我很详细的和你描述过上个学期班会你上去介绍你的成果的时候，那时候我心里上蹿下跳的。我记得那时候我就几句玩笑话然后急着回寝室，你就以为我生气了，从烧烤店出来在小树林里哭，我当时真慌了，因为我是真的赶时间回寝室，然后我就打电话给唐老师，骗宿管阿姨，然后出来找你。看到你就很想抱抱，你真的像个小朋友一样，我感觉我又聪明又不聪明的，我能看出你藏在心里的自责，觉得自己总是控制不住自己耽误了正事，觉得自己这样不好配不上我等等等等，我都知道，但是我不知道怎么解决，我就只能抱着你说没事，然后和开玩笑一样让你把心里的想法说出来。\n\n你昨天说你难过我没哄过你这个我不认哈，只是说你的难过涉及我们之间的事的时候，我们的情绪都没能很好的解决。大家都难受。没开玩笑的说，我真的不作，作的人不会这么难受的吧，应该[叹气]\n\n我给你描述一下我有多喜欢你呢，一开始你给我的印象可不是这样，你给我讲的哲学太抽象，让我觉得你有点滑稽，但是我逐渐习惯了难过就找你给我分析分析，我也不知道为什么就会好很多。在我眼里当时你一定是个有趣的人。后来你给我送伞，哇，我现在回忆，我当时很期待你给我送伞，我仔细想当时应该是我希望你来害怕你不来，我以为是我太难过，有件事总会没那么难过，那现在想想，我为什么就和你说我在图书馆呢，为什么当时你非要我去吃午饭呢，你看，我不知道我为什么当时没意识到。所以后面你建议我和喜锐复合，我就真的这样做了。那个日子真难熬啊。和他在一起我脑袋里全是道理，但是和你一起道理都抛之脑后了，说起来头头是道，一个都做不到。妈妈说我们不应该期待别人改变，应该做筛选，但是我们都只是还不会谈恋爱的小孩，你说你陪我长大，但是其实你也还没有长大[吃瓜]学习不算改变[加油]\n\n在我的视角里，只要我说分手，你就说分什么手，那就合手。但是好像我一旦生气，你就不是这样想了。但是我从来没有真的想分过手，我和你说过的呀，我怕你难过。以后你能不能不当回事，我叫你滚你也抱抱我，之前我说我说你不撒手就分手，你怎么办，你说你就一直抱着我，我总是希望你很坚定的爱我。我总说，你不爱我了，你不喜欢我了，我就是想一遍一遍的听你说爱我。这是下意识的，我怕你走。\n\n所以昨天早上你真的要走了，我不知道怎么办了，一开始我觉得我一定能把你留下来，大不了就死缠烂打，但是我发现你后来越来越坚定，只不过是坚定的不要我了，这时候我发现我可能都做不到死缠烂打，我可能什么都做不到了。我知道女生可以果断抛弃渣男自己闯荡，但是我不知道能不能放弃一个这么喜欢这么好的人，我现在不行以后也不行。以前你说等我长大，我可能就长不大，我现在想想这也挺好的，人不是只有一种活法。\n\n我今天晚上很难过，既然睡前没有说，那早上醒来能不能和我说一声，我知道宝宝难过，但是我不会离开你的，什么都能解决的，我先睡了哦\n\n昨天的事情我想到就很难过，很自责，很害怕，但是昨天晚上我一直没听到我想听的话，挤牙膏一样挤出来了一点，你家橙子宝宝很难受，既然昨天没说，能不能明天真情流露一下让我不要患得患失的呀[叹气]\n\n不要和我斤斤计较嘛，我小心眼，你知道就好嘛，我一直都希望你好，大家改变都需要时间，说出来是第一步，改变是第二步嘛，有时候让着我一点嘛，不要突然和我说分手嘛，伤害性极强，你知道我不是很自信的。你知道我一直都希望你好的。\n\n我是不是有点前言不搭后语，因为我喜欢你，我离不开你，当你看清楚我在担心什么的时候我就不担心了，当你一语道破我在想什么的时候，我就不会去想了'
    },
    {
      name: '比乐熊🐻',
      avatar: 'photos/avatar-his.jpg',
      time: '2025年2月13日 12:17',
      text: '宝宝，我写这些，不是想跟你吵架，不是想怪你，更不是想否定我们的感情。我是真的太喜欢你、太舍不得你，才想把藏在心里这么久、从来没敢完整说出来的话，全都认认真真告诉你。我19岁，第一次谈恋爱，我真的很想把所有事都做好，很想一直和你走下去，可有些时候，我心里真的又疼又压抑，憋得快喘不过气了。\n\n我一直都记得，那次你因为第二天要考计组，特别焦虑，被我惹到情绪上头才动手打了我，说实话，被打了过后我整个人都懵了，所以我才会有一些过激的行为。我知道你不是真的想伤害我，打完你立刻就后悔了，过来哄我，说心疼我，我全都信，也都能体谅你把考试看得很重，焦虑起来会控制不住情绪。可是那天，我不仅心里害怕、委屈，还因为这件事浪费了很多复习时间，最后考试成绩比你差了很多，我不是怪你考得好，我只是难过，你的情绪失控，最后却要我来承担这么多代价，那种心里空空的难受，我一直没敢跟你说。还有一件事让我很难受，就是那次你很难过把我的手机狠狠地砸在地上，我也知道是我没做好、让你焦虑了，我们以后一起慢慢控制情绪，别再做伤害彼此的过激举动好不好嘛。\n\n还有，我很害怕你对我说分手，分手这两个字太伤人了，我真的特别特别怕，以后别轻易挂嘴边好不好嘛。我也很害怕你总是动不动就离家出走，我真的很怕，很怕我们以后结婚过后你也是这样，有什么事情我们都可以一起解决，不要用这样的方式，我们好好沟通好不好嘛。\n\n我希望你能多体谅体谅我，多照顾照顾我，多从我的角度想想，比如我说我买硬卧，为了省钱，我希望你能看出，我真的不想这样，我希望你能心疼我一点，比如那次我扁桃体发炎，我回寝室休息，你说点个外卖，我们一起去图书馆吃，我希望的是你点好外卖你拿过去，但是当我睡醒过后，你叫我去拿说我顺路的，我当时真的很难受，但是还是要去拿那个外卖。我很难受的时候，我希望你把其他的东西先放一边，就比如我上次住院，不管我有没有做错，我希望你不要跟我闹，不要跟我闹分手，我当时本来身体已经很难受了，你这样和我说，我就更难过了。\n\n每次我一不小心惹你生气，你就会删微信、删QQ，不接电话，把所有联系都断掉，我只能靠着短信一点点找你。还有打电话的时候，只要我沉默不说话，或者表现得不好，你就会直接挂掉电话。我知道我沉默确实很让人着急，也知道你生气的时候想躲开，可每次看着被删掉的好友、被挂断的电话，我都特别恐慌，感觉自己马上就要失去你了，那种无助和害怕，真的很难熬。还有我只要稍微表现出一点不耐烦、状态不好，你就会说我不喜欢你了，这句话你总挂在嘴边，我每次听到都特别难受，我只是不知所措、只是累了，我从来没有一刻不喜欢你，可我总被这样怀疑，会忍不住一直自我怀疑。\n\n还有很多时候，我感觉自己一直被推着、被逼着，没有一点自由。比如我们打视频，我妈妈叫我去吃饭，我说五六十分钟，你觉得太久，我只能赶紧跟你保证40分钟一定回来，必须随时观察着时间，因为我知道只要一旦迟了，你会很生气。我知道你是想多跟我视频，怕一个人无聊，我也心疼你一个人没事做，可我也需要安安心心陪家人吃顿饭，不需要被卡死时间，这样被盯着、被限定的感觉，真的太压抑了。还有前天我跟你提分手，我只是说想冷静一下，好好审视我们的感情，不是真的想离开，可你一直逼我立刻给答案，问我是不是很难下结论。我知道你是怕我走，怕失去我，可我真的需要一点时间慢慢想，被这样逼着做决定，我心里特别慌，也特别累。\n\n还有一些话，我憋了很久，怕说出来你生气，可我真的很难过。比如我们聊到彩礼，我跟你说我的难处，我知道这件事本该是我多承担，不该让你操心，你也从来没真的把这个事放心上，不会真的为难我，可你每次都直接跟我说“这是你的事，我不管”。我要的从来不是你帮我解决问题，只是想要你一句安慰，想让你站在我这边，跟我说一句“我知道你很难”，可你这种事不关己的态度，真的会让我觉得，我最难的时候，只有我一个人。还有花钱和礼物的事，我一直觉得男生多承担一点是应该的，我也心甘情愿为你付出，可慢慢的我付出得有点过头了，我不好意思跟你开口要什么，你偶尔也会主动，只是不多。我们在一起五个多月，你从来没有认真给我送过一次礼物，我真的不在乎东西贵不贵，我只是想偶尔感受到，你心里也惦记着我，也想给我一点小心意，这份小小的期待，我一直没敢说。\n\n我也希望你不要冷暴力我，有什么我们说出来好不好嘛，上次你一天我一直好好和你说话，你都没有理我，我可难过了。我知道你很难受，很难过，但这个时候你不要冷暴力我，好不好嘛。\n\n当我说我什么心情不好的时候，你好好哄哄我，好不好嘛。比如我说我现在掉头发掉很多，很焦虑，希望你能好好哄哄我。\n\n还有就是我希望你多从我的角度想想，不要开些不恰当的玩笑，我成绩掉下来很多，我已经很难过了，你还开玩笑说之前我还担心我们研究生去不了一样的学校，但是现在看来不去一样的学校是不行了。我听了可难过了，不是说不想和你去一样的学校，我只是说想我们一起变好，不是说我变差，你变好。\n\n我现在越来越不敢跟你说话，总是怕说错一句话，你就会大发雷霆。所以很多心事、很多想法我都藏在心里，不敢告诉你，你也因此总觉得不了解我，很多事情你就算做错了没意识到，也有我不坦诚的问题，我知道这是我的错。可我真的不是不想说，是我太怕了，怕我说错话，怕你生气，怕你又删掉我，怕你说我不喜欢你，我只能把所有话都咽回去，越憋越难受。\n\n我也一直都特别心疼你。我知道你不怎么玩游戏，没有我陪你，你一个人会特别无聊，连科研很多事情都做不下去，我每次想到你孤零零的样子，我都舍不得让你一个人，所以我总想多陪你、多顺着你。你和妈妈聊天、出门的时候，我从来都不会打扰你，我知道每个人都需要自己的空间，我也一直都在学着尊重你。我懂你的所有不安、依赖和没有安全感，也懂你很多时候只是嘴硬，心里其实很在乎我，这些我全都知道，也全都心疼。\n\n你总说我们的关系不对等，也许就是因为这样，我希望能改变这些。\n\n我真的很努力在做好一个男朋友，我木讷、不会说话、很多事情都做不完美，可我把所有的真心和耐心都给了你。我不想跟你分开，我舍不得你，也心疼你的孤单和脆弱，可我也不想再一直这样压抑、害怕、小心翼翼地谈恋爱。我想要的从来不多，只是希望我们能互相心疼、互相尊重：你生气的时候别再删掉我、别再逼我、别再用话伤我；我难过的时候，你能稍微安慰我一句；我需要一点空间的时候，你能稍微等我一下；我也会努力改掉沉默、不坦诚的毛病，把所有心里话都慢慢告诉你。\n\n我写这么多，不是想怪你，是因为我太在乎我们的感情了。我知道你有你的情绪、你的焦虑、你的不安，我都愿意包容，可我也希望你能看见我的委屈、我的害怕、我的压抑。我们都不是完美的人，可我想和你一起慢慢改，慢慢变成彼此都舒服、都安心的样子。\n\n我真的很喜欢你，也真的想和你好好走下去，你能抱抱我吗？'
    }
  ];

  window.openFullMessage = function (index) {
    var data = fullMessageData[index];
    if (!data) return;

    var modal = document.getElementById('full-message-modal');
    var avatarEl = document.getElementById('full-message-avatar');
    var nameEl = document.getElementById('full-message-name');
    var timeEl = document.getElementById('full-message-time');
    var bodyEl = document.getElementById('full-message-body');

    avatarEl.innerHTML = '<img src="' + data.avatar + '" alt="' + data.name + '" onerror="this.style.display=\'none\';this.parentElement.innerHTML=\'<i class=\\\'fas fa-user\\\'></i>\'">';
    nameEl.textContent = data.name;
    timeEl.textContent = data.time;

    var paragraphs = data.text.split('\n\n');
    bodyEl.innerHTML = paragraphs.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeFullMessage = function () {
    var modal = document.getElementById('full-message-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeFullMessage();
    }
  });

  // Double-click anywhere for heart burst
  document.addEventListener('dblclick', function (e) {
    createHeartBurst(e.clientX, e.clientY, 8);
  });

  // Click on any heart icon for mini burst
  document.querySelectorAll('.fa-heart').forEach(function (heart) {
    heart.addEventListener('click', function (e) {
      e.stopPropagation();
      const rect = heart.getBoundingClientRect();
      createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 5);
    });
  });

});
