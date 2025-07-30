document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.horizontal-carousel-container');
    if (!carousel) return;

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);

    // Detectar se é Safari Mobile
    const isSafariMobile = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isSafariMobile) {
        // Para Safari Mobile, usar scroll manual em vez de animação
        carousel.style.overflowX = 'auto';
        carousel.style.scrollBehavior = 'smooth';
        track.style.animation = 'none';
        track.style.display = 'flex';
        track.style.width = 'max-content';

        // Adicionar scroll snap
        carousel.style.scrollSnapType = 'x mandatory';
        slides.forEach(slide => {
            slide.style.scrollSnapAlign = 'start';
        });

        // Auto-scroll para Safari Mobile
        let scrollPosition = 0;
        const slideWidth = 308; // 300px + 8px margin

        function autoScroll() {
            if (scrollPosition >= track.scrollWidth / 2) {
                scrollPosition = 0;
            } else {
                scrollPosition += slideWidth;
            }

            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }

        // Auto-scroll a cada 3 segundos
        setInterval(autoScroll, 3000);

    } else {
        // Para outros browsers, duplicar slides para animação infinita
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Modal de imagem
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".close-modal");

    if (modal && modalImg && closeModal) {
        document.querySelectorAll('.zoomable').forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = "block";
                modalImg.src = this.src;
            });
        });

        closeModal.addEventListener('click', function () {
            modal.style.display = "none";
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});