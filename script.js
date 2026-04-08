// Lista de obras - ¡REEMPLAZA LAS URLs POR TUS PROPIAS IMÁGENES!
// Puedes poner rutas como "imagenes/mi-obra1.jpg"
const obras = [
    {
        src: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=800&h=500&fit=crop",
        title: "Silencio en el taller",
        medium: "Óleo sobre lienzo, 80x100 cm",
        format: "horizontal"
    },
    {
        src: "https://images.unsplash.com/photo-1549490349-864f9f2c0a64?w=600&h=750&fit=crop",
        title: "Mirada interior",
        medium: "Carboncillo y pastel, 50x70 cm",
        format: "vertical"
    },
    {
        src: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800&h=800&fit=crop",
        title: "Figura en reposo",
        medium: "Acrílico sobre tabla, 60x60 cm",
        format: "square"
    },
    {
        src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=500&fit=crop",
        title: "El pensamiento",
        medium: "Tinta y grafito, 70x50 cm",
        format: "horizontal"
    },
    {
        src: "https://images.unsplash.com/photo-1579783902614-a3fb3927c4b6?w=600&h=800&fit=crop",
        title: "Encuentro",
        medium: "Óleo sobre lienzo, 90x120 cm",
        format: "vertical"
    },
    {
        src: "https://images.unsplash.com/photo-1577720643270-5d8cfdd1a013?w=800&h=600&fit=crop",
        title: "Luz de estudio",
        medium: "Acuarela y lápiz, 40x55 cm",
        format: "horizontal"
    },
    {
        src: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=700&h=700&fit=crop",
        title: "Bodegón figurativo",
        medium: "Mixta sobre papel, 50x50 cm",
        format: "square"
    },
    {
        src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=850&fit=crop",
        title: "La modelo",
        medium: "Pastel al óleo, 65x90 cm",
        format: "vertical"
    }
];

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

// Lightbox
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

document.addEventListener('DOMContentLoaded', cargarGaleria);