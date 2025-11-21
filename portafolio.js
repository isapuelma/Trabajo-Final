document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollToTop();
    initContactForm();
    initReviewsCarousel();
});

/**
 * 1. Menú Hamburguesa y Navegación Móvil
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (!hamburger || !mobileNav) return;

    const toggleMenu = () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('active');
        });
    });
}

/**
 * 2. Botón de Scroll al Footer
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToFooterBtn');
    const footer = document.getElementById('theFooter');

    if (scrollBtn && footer) {
        scrollBtn.addEventListener('click', () => {
            footer.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

/**
 * 3. Formulario de Contacto (Simulación)
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        // Estado de carga
        btn.innerText = 'Enviando...';
        btn.style.opacity = '0.7';
        
        // Simular petición al servidor
        setTimeout(() => {
            btn.innerText = '¡Mensaje Enviado!';
            btn.classList.add('success');
            btn.style.opacity = '1';
            
            this.reset(); 
            
            // Resetear botón
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove('success');
            }, 4000);
        }, 1500);
    });
}

/**
 * 4. Carrusel de Reseñas
 */
function initReviewsCarousel() {
    const carousel = document.getElementById('quotesCarousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.review-item');
    let currentIndex = 0;

    const updateCarousel = () => {
        items.forEach((item, index) => {
            if (index === currentIndex) {
                item.classList.add('active');
                item.style.display = 'block';
            } else {
                item.classList.remove('active');
                item.style.display = 'none';
            }
        });
    };

    updateCarousel();

    // Delegación de eventos para mejor rendimiento
    document.addEventListener('click', (e) => {
        if (e.target.closest('.next-btn')) {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % items.length;
            updateCarousel();
        }
        
        if (e.target.closest('.prev-btn')) {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateCarousel();
        }
    });
}