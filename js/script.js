document.addEventListener('DOMContentLoaded', () => {
    
    // 1. DYNAMIC GLOW BALL (Smoother Parallax)
    const glowBall = document.querySelector('.glow-ball');
    if (glowBall) {
        let mouseX = 0, mouseY = 0;
        let ballX = 0, ballY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop for smooth "lagging" follow effect
        const animateGlow = () => {
            // Adjust the 0.1 for more or less "weight" (0.05 is heavier, 0.2 is snappier)
            ballX += (mouseX - ballX) * 0.1;
            ballY += (mouseY - ballY) * 0.1;

            glowBall.style.transform = `translate(${ballX - 200}px, ${ballY - 200}px)`;
            requestAnimationFrame(animateGlow);
        };
        animateGlow();
    }

    // 2. ACCORDION LOGIC (Exclusive: Only one open at a time)
    const drawers = document.querySelectorAll('.drawer-item');
    document.querySelectorAll('.drawer-header').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            const isActive = parent.classList.contains('active');

            // Close all other drawers
            drawers.forEach(item => item.classList.remove('active'));

            // If it wasn't already active, open it
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });

    // 3. IMAGE LIGHTBOX (Improved Closing)
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("maximizedImg");
    const closeBtn = document.querySelector(".close-lightbox");

    const zoomableImages = document.querySelectorAll('.glass-card img, .gallery-item img, .zoomable, .skill-item img');
    
    zoomableImages.forEach(image => {
        image.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = "flex"; // Better for centering
                lightboxImg.src = image.src;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeAll = () => {
        if (lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    };

    if (closeBtn) closeBtn.onclick = closeAll;
    
    // Close on 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") closeAll();
    });

    // 4. REVEAL ON SCROLL (Staggered Animation)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay based on order for a "wave" effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); 
            }
        });
    }, observerOptions);

    const scrollItems = document.querySelectorAll('.skill-item, .timeline-block, .section-header, .drawer-item, .bento-item, .contact-card');
    scrollItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)';
        observer.observe(item);
    });

    // 5. IMPROVED TYPING EFFECT
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const fullContent = typingText.textContent;
        typingText.textContent = '';
        let charIndex = 0;

        const type = () => {
            if (charIndex < fullContent.length) {
                typingText.textContent += fullContent.charAt(charIndex);
                charIndex++;
                setTimeout(type, 70);
            }
        };
        // Delay start slightly for a cleaner page load
        setTimeout(type, 500);
    }
});