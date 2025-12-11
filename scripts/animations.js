// scripts/animations.js — Enhanced animations for Sunflour Bakery
(function () {
    'use strict';

    // ============================================
    // ANIMATED STATS COUNTER
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out quad)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString() + (element.dataset.suffix || '');

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString() + (element.dataset.suffix || '');
            }
        }

        requestAnimationFrame(update);
    }

    function initStatsCounter() {
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const statNumbers = statsSection.querySelectorAll('.stat h3, .stat-number');
        let hasAnimated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    statNumbers.forEach((el, index) => {
                        // Parse the number from text content
                        const text = el.textContent.replace(/[^0-9]/g, '');
                        const target = parseInt(text, 10) || 0;
                        const suffix = el.textContent.includes('+') ? '+' : '';

                        el.dataset.suffix = suffix;
                        el.textContent = '0';

                        // Stagger the animations
                        setTimeout(() => {
                            animateCounter(el, target, 2000);
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // ============================================
    // TESTIMONIAL CAROUSEL
    // ============================================
    function initTestimonialCarousel() {
        const container = document.querySelector('.testimonial-grid');
        if (!container) return;

        const testimonials = container.querySelectorAll('.testimonial');
        if (testimonials.length <= 1) return;

        // Wrap testimonials in a carousel track
        const track = document.createElement('div');
        track.className = 'testimonial-track';

        testimonials.forEach(t => {
            t.classList.add('testimonial-slide');
            track.appendChild(t);
        });

        container.innerHTML = '';
        container.classList.add('testimonial-carousel');
        container.appendChild(track);

        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';

        testimonials.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        container.appendChild(dotsContainer);

        let currentIndex = 0;
        let autoplayInterval;
        const slideCount = testimonials.length;

        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            // Update dots
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            goToSlide((currentIndex + 1) % slideCount);
        }

        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 5000);
        }

        function pauseAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Start autoplay
        startAutoplay();

        // Pause on hover/focus
        container.addEventListener('mouseenter', pauseAutoplay);
        container.addEventListener('focusin', pauseAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
        container.addEventListener('focusout', startAutoplay);

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            pauseAutoplay();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoplay();
        }, { passive: true });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    goToSlide((currentIndex - 1 + slideCount) % slideCount);
                }
            }
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.category-item, .product-card, .benefit, .faq-item, .team-member');

        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        animatedElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // ============================================
    // INIT ALL ANIMATIONS
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        initStatsCounter();
        initTestimonialCarousel();
        initScrollAnimations();
    });
})();
