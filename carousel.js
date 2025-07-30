document.addEventListener('DOMContentLoaded', function () {
    // Efeito de duplicação do carrossel para scroll infinito
    const carousel = document.querySelector('.horizontal-carousel-container');
    if (!carousel) return;

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children); // CORRIGIDO para Safari

    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    // Modal de imagem
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeModal = document.querySelector(".close-modal");

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

    modal.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    });

    modal.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    });
});
