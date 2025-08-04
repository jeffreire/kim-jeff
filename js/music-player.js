document.addEventListener('DOMContentLoaded', function () {
	const musicToggle = document.getElementById('music-toggle');
	const backgroundMusic = document.getElementById('background-music');

	if (!musicToggle || !backgroundMusic) {
		console.error('Elementos do player de música não encontrados');
		return;
	}

	// Garantir que o volume está normalizado
	backgroundMusic.volume = 1.0;

	// Flag para verificar se um clique já foi feito na página
	let userInteracted = false;

	// Recuperar estado da música do localStorage
	const musicState = localStorage.getItem('musicState') || 'paused';
	const musicPosition = parseFloat(localStorage.getItem('musicPosition') || '0');
	const lastPage = localStorage.getItem('lastPage') || '';
	const currentPage = window.location.pathname.split('/').pop();

	// Configurar interface do botão com base no estado salvo
	if (musicState === 'playing') {
		musicToggle.classList.add('playing');
		musicToggle.querySelector('.music-status').textContent = 'Pausar Música';

		// Tenta reproduzir a música somente se houver interação
		document.addEventListener('click', function initialPlay() {
			if (!userInteracted) {
				userInteracted = true;
				tryPlayMusic(musicPosition);
				document.removeEventListener('click', initialPlay);
			}
		}, { once: true });

		// Para browsers que permitem autoplay
		window.addEventListener('load', function () {
			if (document.visibilityState === 'visible') {
				tryPlayMusic(musicPosition);
			}
		});
	}

	function tryPlayMusic(position) {
		backgroundMusic.currentTime = position;
		const playPromise = backgroundMusic.play();

		if (playPromise !== undefined) {
			playPromise.then(() => {
				console.log('Música reproduzida com sucesso!');
			}).catch(error => {
				console.error('Erro ao reproduzir música:', error);
				// Mostrar back visual que o usuário precisa clicar para ouvir música
				musicToggle.classList.add('attention');
			});
		}
	}

	// Alternar reprodução ao clicar no botão
	musicToggle.addEventListener('click', function () {
		userInteracted = true;
		musicToggle.classList.remove('attention');

		if (backgroundMusic.paused) {
			tryPlayMusic(parseFloat(localStorage.getItem('musicPosition') || '0'));
			musicToggle.classList.add('playing');
			musicToggle.querySelector('.music-status').textContent = 'Pausar Música';
			localStorage.setItem('musicState', 'playing');
		} else {
			backgroundMusic.pause();
			musicToggle.classList.remove('playing');
			musicToggle.querySelector('.music-status').textContent = 'Tocar Música';
			localStorage.setItem('musicState', 'paused');
		}
	});

	// Salvar posição atual a cada 2 segundos
	setInterval(() => {
		if (!backgroundMusic.paused) {
			localStorage.setItem('musicPosition', backgroundMusic.currentTime.toString());
			localStorage.setItem('lastPage', currentPage);
		}
	}, 2000);

	// Salvar estado antes de sair da página
	window.addEventListener('beforeunload', function () {
		localStorage.setItem('musicPosition', backgroundMusic.currentTime.toString());
		localStorage.setItem('musicState', backgroundMusic.paused ? 'paused' : 'playing');
		localStorage.setItem('lastPage', currentPage);
	});
});