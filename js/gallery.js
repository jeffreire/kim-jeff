// Lista manual de imagens (para garantir a ordem)
const manualImages = [
	'assets/images/1.webp',
	'assets/images/2.webp',
	'assets/images/3.webp',
	'assets/images/4.webp',
	'assets/images/5.webp',
	'assets/images/6.webp',
	'assets/images/7.webp',
	'assets/images/8.webp',
	'assets/images/9.webp',
	'assets/images/10.webp',
	'assets/images/11.webp',
	'assets/images/14.webp',
	'assets/images/15.webp',
	'assets/images/16.webp',
	'assets/images/17.webp',
	'assets/images/18.webp',
	'assets/images/19.webp',
	'assets/images/20.webp',
	'assets/images/21.webp',
	'assets/images/22.webp',
	'assets/images/24.webp',
	'assets/images/31.webp',
	'assets/images/32.webp',
	'assets/images/33.webp',
	'assets/images/36.webp',
	'assets/images/39.webp',
	'assets/images/41.webp',
	'assets/images/42.webp',
	'assets/images/44.webp',
	'assets/images/45.webp',
	'assets/images/47.webp',
	'assets/images/48.webp',
	'assets/images/50.webp',
	'assets/images/51.webp',
	'assets/images/52.webp',
	'assets/images/54.webp',
	'assets/images/56.webp',
	'assets/images/60.webp',
];

// Função para gerar o carousel usando apenas a lista manual
async function generateGalleryCarousel() {
	const carouselTrack = document.querySelector('.carousel-track');
	if (!carouselTrack) {
		console.log('❌ Carousel track não encontrado');
		return;
	}

	carouselTrack.innerHTML = '';

	const infiniteImages = [...manualImages, ...manualImages];

	infiniteImages.forEach((imagePath, index) => {
		const slide = createImageSlide(imagePath, index + 1);
		carouselTrack.appendChild(slide);
	});
}

// Função para criar slide de imagem
function createImageSlide(imagePath, number) {
	const slide = document.createElement('div');
	slide.className = 'carousel-slide';

	const img = document.createElement('img');
	img.src = imagePath;
	img.alt = `Foto do casal ${number}`;
	img.loading = 'lazy';
	img.className = 'zoomable';

	img.onload = function () {
		console.log(`✅ Imagem carregada: ${imagePath}`);
	};

	img.onerror = function () {
		console.log(`❌ Imagem não encontrada: ${imagePath}`);
		slide.style.display = 'none';
	};

	img.addEventListener('click', function () {
		openImageModal(imagePath, img.alt);
	});

	slide.appendChild(img);
	return slide;
}

// Função para abrir modal de imagem
function openImageModal(imageSrc, imageAlt) {
	const modal = document.getElementById('image-modal');
	const modalImg = document.getElementById('modal-img');

	if (modal && modalImg) {
		modal.style.display = 'block';
		modalImg.src = imageSrc;
		modalImg.alt = imageAlt;
	}
}

// Função para fechar modal
function closeImageModal() {
	const modal = document.getElementById('image-modal');
	if (modal) {
		modal.style.display = 'none';
	}
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
	console.log('🚀 DOM carregado, inicializando galeria...');
	generateGalleryCarousel();

	// Adicionar evento para fechar modal
	const closeBtn = document.querySelector('.close-modal');
	if (closeBtn) {
		closeBtn.addEventListener('click', closeImageModal);
	}

	// Fechar modal clicando fora da imagem
	const modal = document.getElementById('image-modal');
	if (modal) {
		modal.addEventListener('click', function (e) {
			if (e.target === modal) {
				closeImageModal();
			}
		});
	}
});

// Fechar modal com ESC
document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		closeImageModal();
	}
});