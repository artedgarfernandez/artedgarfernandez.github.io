// ---------- DATOS DE LAS OBRAS (REEMPLAZA CON TUS IMÁGENES) ----------
const obras = [
    {
        src: "imagenes/La tregua del pensamiento.webp",
        title: "La tregua del Pensamiento",
        medium: "Óleo sobre lienzo, 37x45 cm",
        format: "square"
    },
    {
        src: "imagenes/Misterioso Conocimiento.webp",
        title: "Misterioso conocimiento",
        medium: "Óleo sobre lienzo, 86x87 cm",
        format: "vertical"
    },
    {
        src: "imagenes/Nahiara Azulada.webp",
        title: "Nahiara Azulada",
        medium: "Óleo sobre lienzo, 37x45 cm",
        format: "square"
    },
    {
        src: "imagenes/Soledad no deseada.webp",
        title: "Soledad no deseada",
        medium: "Óleo sobre lienzo, 37x45 cm",
        format: "horizontal"
    },
    {
        src: "imagenes/Romero.webp",
        title: "Romero - Santa Cruz de Mora",
        medium: "Acrílico sobre papel, 21x27 cm",
        format: "vertical"
    },
];

// ---------- CARGAR GALERÍA ----------
function cargarGaleria() {
    const gallery = document.getElementById('gallery');
    if (!gallery) return;
    gallery.innerHTML = '';
    
    obras.forEach((obra, index) => {
        const artworkDiv = document.createElement('div');
        artworkDiv.className = `artwork ${obra.format}`;
        artworkDiv.style.animationDelay = `${index * 0.05}s`;
        
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        const img = document.createElement('img');
        img.src = obra.src;
        img.alt = obra.title;
        img.loading = 'lazy';
        imgContainer.appendChild(img);
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        const titleP = document.createElement('p');
        titleP.className = 'title';
        titleP.textContent = obra.title;
        const mediumP = document.createElement('p');
        mediumP.className = 'medium';
        mediumP.textContent = obra.medium;
        infoDiv.appendChild(titleP);
        infoDiv.appendChild(mediumP);
        
        artworkDiv.appendChild(imgContainer);
        artworkDiv.appendChild(infoDiv);
        
        artworkDiv.addEventListener('click', () => {
            abrirLightbox(obra.src, obra.title, obra.medium);
        });
        
        gallery.appendChild(artworkDiv);
    });
}

// ---------- LIGHTBOX ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeLightboxBtn');

function abrirLightbox(src, title, medium) {
    if (lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxCaption.innerHTML = `<strong>${title}</strong><br>${medium}`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeBtn) {
    closeBtn.addEventListener('click', cerrarLightbox);
}
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) cerrarLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        cerrarLightbox();
    }
});

// ---------- NAVEGACIÓN ENTRE TRABAJOS Y ACERCA DE ----------
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = {
        trabajos: document.getElementById('trabajos-section'),
        acerca: document.getElementById('acerca-section')
    };
    
    function showSection(sectionId) {
        // Ocultar todas
        Object.values(sections).forEach(section => {
            if (section) section.classList.remove('active-section');
        });
        // Mostrar la seleccionada
        if (sections[sectionId]) {
            sections[sectionId].classList.add('active-section');
        }
        // Actualizar botón activo
        navBtns.forEach(btn => {
            if (btn.dataset.section === sectionId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.dataset.section;
            if (sectionId === 'trabajos') {
                showSection('trabajos');
                // Si la galería aún no se ha cargado, la cargamos (por si acaso)
                if (document.getElementById('gallery').children.length === 0) {
                    cargarGaleria();
                }
            } else if (sectionId === 'acerca') {
                showSection('acerca');
            }
        });
    });
    
    // Mostrar trabajos por defecto
    showSection('trabajos');
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    cargarGaleria();
    initNavigation();
});

