// ==========================================
// 1. LÓGICA DE CARGA INTELIGENTE
// ==========================================
async function datos() {
    const portfolioGrid = document.querySelector("#portfolio-grid");
    const servicesTrack = document.querySelector("#services-track-dynamic");

    // Loader inicial
    if (portfolioGrid) {
        portfolioGrid.innerHTML = `<div class="loader-container"><div class="spinner"></div></div>`;
    }

    // Simulación de carga pequeña para suavidad
    setTimeout(() => {
        if (typeof DATOS_GLOBALES !== 'undefined') {
            const listaProyectos = DATOS_GLOBALES.proyectos;
            const listaServicios = DATOS_GLOBALES.servicios;

            if (portfolioGrid) renderizarProyectos(listaProyectos, portfolioGrid);
            if (servicesTrack) renderizarServicios(listaServicios, servicesTrack);
        } else {
            console.error("Error: No se encontró data.js");
            if(portfolioGrid) portfolioGrid.innerHTML = "<p style='text-align:center; padding:40px;'>Error al cargar datos. Verifica que data.js esté enlazado.</p>";
        }
    }, 300);
}

function renderizarProyectos(listaTrabajos, contenedor) {
    contenedor.innerHTML = ''; 
    if(!listaTrabajos || listaTrabajos.length === 0) {
        contenedor.innerHTML = '<div style="grid-column: span 12; text-align:center;">No hay proyectos aún.</div>';
        return;
    }
    
    // Observer para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    listaTrabajos.forEach((trabajo) => {
        const item = document.createElement('a');
        const claseVisual = (trabajo.claseTamano && trabajo.claseTamano.trim() !== "") ? trabajo.claseTamano : "item-normal";
        
        item.className = `gallery-item ${claseVisual} reveal-element`; 
        item.href = `proyect.html?id=${trabajo.id}`; 
        item.setAttribute('data-category', trabajo.filtro); 
        const imgUrl = trabajo.imagen || 'https://via.placeholder.com/500';

        item.innerHTML = `
            <img src="${imgUrl}" alt="${trabajo.titulo}" loading="lazy" onerror="this.src='https://via.placeholder.com/500?text=Imagen'">
            <div class="gallery-overlay">
                <h3 class="overlay-title">${trabajo.titulo}</h3>
                <span class="overlay-cat">${trabajo.categoria}</span>
            </div>
        `;
        contenedor.appendChild(item);
        observer.observe(item);
    });
    initGalleryFilters();
}

function renderizarServicios(listaServicios, contenedor) {
    contenedor.innerHTML = '';
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    // Tarjetas de Servicios
    listaServicios.forEach((servicio, index) => {
        const card = document.createElement('a');
        card.className = 'service-card reveal-element'; 
        card.href = `gallery.html?filter=${servicio.filtro}`; 
        card.style.transitionDelay = `${index * 0.1}s`;

        let toolsHTML = '';
        if(servicio.herramientas) {
            toolsHTML = `<div class="service-tools-grid">` + 
                        servicio.herramientas.map(t => `<div class="s-bubble"><i class="ph ${getIconForTool(t)}"></i> ${t}</div>`).join('') + 
                        `</div>`;
        }
        card.innerHTML = `
            <div class="service-arrow"><i class="ph ph-arrow-up-right"></i></div>
            <i class="ph ${servicio.icono} service-icon-large"></i>
            <div>
                <h3>${servicio.titulo}</h3>
                <p>${servicio.descripcion}</p>
                ${toolsHTML}
            </div>
        `;
        contenedor.appendChild(card);
        observer.observe(card);
    });

    // Tarjeta CTA final
    const contactCard = document.createElement('a');
    contactCard.className = 'service-card reveal-element';
    contactCard.href = 'contact.html'; 
    contactCard.style.backgroundColor = 'var(--bg-accent)'; // Amarillo
    contactCard.style.borderColor = 'var(--text-color)'; 
    contactCard.style.transitionDelay = `${listaServicios.length * 0.1}s`; 

    contactCard.innerHTML = `
        <div class="service-arrow" style="opacity: 1; color: var(--text-color);"><i class="ph ph-arrow-right"></i></div>
        <i class="ph ph-chat-circle-text service-icon-large" style="color: var(--text-color);"></i>
        <div style="margin-top: auto;"> 
            <h3 style="font-size: 2.5rem; line-height: 1; margin-bottom: 10px;">¿Tu Turno?</h3>
            <p style="opacity: 1; font-weight: 500;">Cuéntame tu desafío y busquemos la solución estratégica.</p>
            <div class="s-bubble" style="display: inline-flex; border-color: var(--text-color); margin-top: 20px;">HABLEMOS</div>
        </div>
    `;
    contenedor.appendChild(contactCard);
    observer.observe(contactCard);
}

function getIconForTool(toolName) {
    const t = toolName.toLowerCase();
    if(t.includes("shop")) return "ph-shopping-bag";
    if(t.includes("word") || t.includes("web")) return "ph-globe";
    if(t.includes("html") || t.includes("css")) return "ph-code";
    if(t.includes("illustrator") || t.includes("pen")) return "ph-pen-nib";
    if(t.includes("photoshop") || t.includes("image")) return "ph-image";
    if(t.includes("indesign") || t.includes("figma")) return "ph-layout";
    if(t.includes("camera") || t.includes("photo")) return "ph-camera";
    if(t.includes("package") || t.includes("dieline")) return "ph-package";
    return "ph-wrench";
}

// ==========================================
// 4. LÓGICA DE DETALLE DE PROYECTO
// ==========================================
async function cargarDetalleProyecto() {
    const tituloDOM = document.getElementById("dyn-title");
    if (!tituloDOM) return; 

    const params = new URLSearchParams(window.location.search);
    const idProyecto = params.get('id');
    if (!idProyecto) { window.location.href = 'gallery.html'; return; }

    // USAMOS LA VARIABLE GLOBAL
    let trabajos = [];
    if (typeof DATOS_GLOBALES !== 'undefined') {
        trabajos = DATOS_GLOBALES.proyectos;
    } else {
        console.error("No se han cargado los datos.");
        return;
    }

    const indexProyecto = trabajos.findIndex(item => item.id === idProyecto);
    const proyectoEncontrado = trabajos[indexProyecto];

    if (proyectoEncontrado) {
        // 1. Textos Básicos
        document.getElementById("dyn-title").innerText = proyectoEncontrado.titulo;
        document.getElementById("dyn-client").innerText = proyectoEncontrado.cliente || "-";
        document.getElementById("dyn-year").innerText = proyectoEncontrado.year || "-";
        document.getElementById("dyn-services").innerText = Array.isArray(proyectoEncontrado.servicios) ? proyectoEncontrado.servicios.join(", ") : (proyectoEncontrado.servicios || "-");
        if(document.getElementById("dyn-desc")) document.getElementById("dyn-desc").innerText = proyectoEncontrado.descripcion || "";

        // 2. Toolkit (Sidebar) - Se mantiene si quieres mostrarlo
        // Pero como lo movimos a la derecha, este puede ser opcional o eliminarse si ya está en narrativa.
        // Dejaré el código por si decides mantenerlo, pero recuerda que en HTML lo quitamos del sidebar.
        const toolsContainer = document.getElementById("dyn-tools-container");
        if(toolsContainer && proyectoEncontrado.herramientas) {
            toolsContainer.innerHTML = ''; 
            proyectoEncontrado.herramientas.forEach(tool => {
                const bubble = document.createElement("div");
                bubble.className = "s-bubble"; 
                bubble.innerHTML = `<i class="ph ${getIconForTool(tool)}"></i> ${tool}`;
                toolsContainer.appendChild(bubble);
            });
        }

        // 3. Hero Image
        const heroImg = document.getElementById("dyn-hero-img");
        if(heroImg) {
            if(proyectoEncontrado.imagen) {
                heroImg.src = proyectoEncontrado.imagen;
                heroImg.parentElement.style.display = "block";
            } else {
                heroImg.parentElement.style.display = "none";
            }
        }

        // 4. Galería Dinámica (Usando array 'galeria')
        const galleryContainer = document.getElementById("dynamic-gallery-container");
        if (galleryContainer) {
            galleryContainer.innerHTML = ''; 
            
            if (proyectoEncontrado.galeria && Array.isArray(proyectoEncontrado.galeria)) {
                proyectoEncontrado.galeria.forEach((imgUrl, index) => {
                     if (imgUrl && imgUrl.trim() !== "") {
                        const wrapper = document.createElement("div");
                        wrapper.className = "detail-image-wrapper reveal-element"; 
                        
                        const imgElement = document.createElement("img");
                        imgElement.src = imgUrl;
                        imgElement.alt = `${proyectoEncontrado.titulo} detalle ${index + 1}`;
                        wrapper.appendChild(imgElement);
                        
                        galleryContainer.appendChild(wrapper);
                     }
                });
            }
        }

        // 5. Narrativa Integrada (Desafío + Solución + Toolkit)
        const narrativeContainer = document.getElementById("dyn-narrative-container");
        if (narrativeContainer) {
            narrativeContainer.innerHTML = '';
            let narrativeHTML = '';

            if (proyectoEncontrado.desafio && proyectoEncontrado.desafio.trim() !== "") {
                narrativeHTML += `
                    <div class="narrative-text-block reveal-element">
                        <div class="section-header">El Desafío</div>
                        <p style="font-size: 1.2rem;">${proyectoEncontrado.desafio}</p>
                    </div>
                `;
            }

            let solutionContent = '';
            if (proyectoEncontrado.solucion && proyectoEncontrado.solucion.trim() !== "") {
                solutionContent += `<p style="font-size: 1.2rem; margin-bottom: 30px;">${proyectoEncontrado.solucion}</p>`;
            }

            let toolsHTML = '';
            if (proyectoEncontrado.herramientas && proyectoEncontrado.herramientas.length > 0) {
                toolsHTML += `<div style="margin-top:20px;"><h4 style="text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.1em; margin-bottom: 15px; opacity: 0.5;">Toolkit</h4><div class="service-tools-grid">`;
                proyectoEncontrado.herramientas.forEach(tool => {
                    toolsHTML += `<div class="s-bubble"><i class="ph ${getIconForTool(tool)}"></i> ${tool}</div>`;
                });
                toolsHTML += `</div></div>`;
            }

            if (solutionContent !== '' || toolsHTML !== '') {
                narrativeHTML += `
                    <div class="narrative-text-block reveal-element">
                        <div class="section-header">La Solución</div>
                        ${solutionContent}
                        ${toolsHTML}
                    </div>
                `;
            }

            narrativeContainer.innerHTML = narrativeHTML;
        }

        // 6. Cita
        const quoteContainer = document.getElementById("dyn-quote-container");
        if (quoteContainer && proyectoEncontrado.cita) {
            document.getElementById("dyn-quote-text").innerText = proyectoEncontrado.cita;
            document.getElementById("dyn-quote-author").innerText = proyectoEncontrado.cliente || "Cliente";
            quoteContainer.style.display = "block";
        } else if (quoteContainer) {
            quoteContainer.style.display = "none";
        }

        // 7. Siguiente Proyecto
        document.title = `${proyectoEncontrado.titulo} | Isabel Puelma`;
        const nextIndex = (indexProyecto + 1) % trabajos.length;
        const nextProject = trabajos[nextIndex];
        const nextLink = document.getElementById("next-project-link");
        const nextName = document.getElementById("next-project-name");

        if(nextLink && nextName && nextProject) {
            nextLink.href = `proyect.html?id=${nextProject.id}`;
            nextName.innerText = nextProject.titulo;
        }
        
        initScrollAnimations();

    } else {
        // Error 404
        const mainContainer = document.querySelector('.project-detail-layout');
        if(mainContainer) {
            mainContainer.style.display = "flex";
            mainContainer.style.flexDirection = "column";
            mainContainer.style.alignItems = "center";
            mainContainer.style.justifyContent = "center";
            mainContainer.style.minHeight = "60vh";
            mainContainer.innerHTML = `<div style="text-align: center; padding: 40px;"><h1 class="display-text" style="font-size: 8rem; color: var(--line-color);">404</h1><h2 style="font-size: 2rem; margin-bottom: 20px; text-transform: uppercase;">Proyecto no encontrado</h2><p style="margin-bottom: 40px; opacity: 0.6;">Lo sentimos, el proyecto que buscas no existe.</p><a href="gallery.html" class="submit-btn" style="text-decoration:none; display:inline-block;">Volver al Archivo</a></div>`;
        }
    }
}

// ==========================================
// 5. INICIALIZACIÓN GENERAL
// ==========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarApp);
} else {
    iniciarApp();
}

function iniciarApp() {
    initGeneralFunctions();
    initHeaderScroll();
    initScrollAnimations(); 
    datos(); // Carga desde data.js
    
    // Esperar a que los datos estén disponibles antes de cargar detalles
    if (document.getElementById("dyn-title")) {
        setTimeout(() => {
            cargarDetalleProyecto();
        }, 350); // Esperar un poco más que datos()
    }
    
    if (document.getElementById("quotesCarousel")) {
        setTimeout(() => {
            cargarCitasDesdeDatos();
        }, 350);
    }
}

async function cargarCitasDesdeDatos() {
    const carouselContainer = document.getElementById("quotesCarousel");
    if (!carouselContainer) return;

    let proyectos = [];
    if (typeof DATOS_GLOBALES !== 'undefined') {
        proyectos = DATOS_GLOBALES.proyectos;
    }

    const proyectosConCita = proyectos.filter(p => p.cita && p.cita.trim() !== "");

    if (proyectosConCita.length > 0) {
        carouselContainer.innerHTML = ''; 
        proyectosConCita.forEach((p, index) => {
            const quoteItem = document.createElement("div");
            quoteItem.className = `review-item ${index === 0 ? 'active' : ''}`;
            if (index !== 0) quoteItem.style.display = 'none';
            quoteItem.innerHTML = `<p class="review-quote-editorial">"${p.cita}"</p><div class="review-author-editorial">${p.cliente || "Cliente Confidencial"} — ${p.titulo}</div>`;
            carouselContainer.appendChild(quoteItem);
        });
        initReviewsCarousel(); 
    }
}

function initReviewsCarousel() {
    const section = document.getElementById('reviews-section');
    if (!section) return;
    
    const oldPrev = section.querySelector('.prev-btn');
    const oldNext = section.querySelector('.next-btn');
    const prevBtn = oldPrev.cloneNode(true);
    const nextBtn = oldNext.cloneNode(true);
    
    oldPrev.parentNode.replaceChild(prevBtn, oldPrev);
    oldNext.parentNode.replaceChild(nextBtn, oldNext);

    const items = section.querySelectorAll('.review-item');
    if(!items.length) return;

    let currentIndex = 0;
    items.forEach((item, i) => {
        if (i === 0) { item.classList.add('active'); item.style.display = 'block'; item.style.opacity = '1'; } 
        else { item.classList.remove('active'); item.style.display = 'none'; item.style.opacity = '0'; }
    });

    const showItem = (index) => {
        items.forEach(item => { item.classList.remove('active'); item.style.display = 'none'; item.style.opacity = '0'; });
        const currentItem = items[index];
        currentItem.style.display = 'block';
        requestAnimationFrame(() => { currentItem.classList.add('active'); currentItem.style.opacity = '1'; });
    };

    nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % items.length; showItem(currentIndex); });
    prevBtn.addEventListener('click', () => { currentIndex = (currentIndex - 1 + items.length) % items.length; showItem(currentIndex); });
}

function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.display-text, .bio-text-large, .project-item, .manifesto-text, .process-row, .review-item, .detail-image-block, .detail-title-large, .contact-left > *, .contact-right, .reveal-element');
    elementsToAnimate.forEach(el => el.classList.add('reveal-element'));
    
    // Mostrar elementos del hero inmediatamente (sin esperar scroll)
    const heroElements = document.querySelectorAll('.hero-minimal .reveal-element');
    heroElements.forEach(el => {
        setTimeout(() => el.classList.add('active'), 100);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) { entry.target.classList.add('active'); }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    elementsToAnimate.forEach(el => observer.observe(el));
}

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { header.classList.add('scrolled'); } 
        else { header.classList.remove('scrolled'); }
    });
}

function initGeneralFunctions() {
    initMobileMenu();
    initScrollInteractions();
    // initCustomCursor(); // Eliminado
    initContactForm();
    initReviewsCarousel(); 
    initBackToTop();
    updateCopyrightYear();
}

// --- LOGICA DE TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
    // Buscar contenedor o crearlo
    let container = document.getElementById('toast-container');
    if (!container) {
        // Fallback por seguridad si no está en HTML
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Crear toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icono según tipo
    const icon = type === 'success' ? '<i class="ph ph-check-circle"></i>' : '<i class="ph ph-warning-circle"></i>';
    
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Eliminar después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Esperar transición de salida
    }, 4000);
}

function updateCopyrightYear() {
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) {
        const currentYear = new Date().getFullYear();
        footerCopyright.innerHTML = `© ${currentYear} Isabel Puelma. Todos los derechos reservados.`;
    }
}

function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="ph ph-arrow-up"></i>';
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileNav.classList.toggle('active');
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileNav.classList.remove('active');
        });
    });
}

function initScrollInteractions() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href === '') return; 
        anchor.addEventListener('click', function (e) {
            if (href.startsWith("#")) {
                const target = document.querySelector(href);
                if(target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
            }
        });
    });
}

function initGalleryFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.gallery-item');
    
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get('filter');

    if (buttons.length > 0 && urlFilter) {
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${urlFilter}"]`);
        if(targetBtn) { setTimeout(() => targetBtn.click(), 100); }
    }

    if (!buttons.length || !items.length) return;
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            items.forEach(item => {
                const categories = item.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = 'block'; 
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form');
    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        // Estado de carga
        btn.innerText = "ENVIANDO...";
        btn.disabled = true; 
        
        // --- TUS CREDENCIALES ---
        const serviceID = 'service_yrjbcj4';
        const templateID = 'template_9uib6ij';
        const publicKey = '5C3-LO9f7xgwnNPfB'; // <--- AGREGAMOS ESTO AQUÍ

        if (typeof emailjs !== 'undefined') {
            // Pasamos la publicKey como 4to argumento para asegurar la conexión
            emailjs.sendForm(serviceID, templateID, form, publicKey)
                .then(() => {
                    // ÉXITO
                    btn.innerText = "¡ENVIADO!";
                    btn.style.backgroundColor = "#4CAF50";
                    form.reset();
                    showToast("¡Mensaje enviado con éxito!", "success");
                    
                    setTimeout(() => { 
                        btn.innerText = originalText; 
                        btn.style.backgroundColor = ""; 
                        btn.disabled = false; 
                    }, 3000);
                }, (err) => {
                    // ERROR
                    btn.innerText = "ERROR AL ENVIAR";
                    btn.style.backgroundColor = "#FF5252"; 
                    
                    // Mostramos el error real en la consola para depurar
                    console.error('FAILED...', err);
                    
                    showToast("Error al enviar. Revisa la consola (F12).", "error");
                    
                    setTimeout(() => { 
                        btn.innerText = originalText; 
                        btn.style.backgroundColor = ""; 
                        btn.disabled = false; 
                    }, 3000);
                });
        } else {
            console.error("EmailJS no está cargado. Revisa tu script en el HTML.");
            showToast("Error: Librería EmailJS no encontrada.", "error");
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });
}