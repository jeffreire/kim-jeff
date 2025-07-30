document.addEventListener('DOMContentLoaded', function () {
    // === CONFIGURAÇÃO DE DATAS ===
    const weddingDate = new Date(2025, 8, 13, 17, 0);

    // === CONTAGEM REGRESSIVA ===
    function updateCountdown() {
        const now = new Date();
        const difference = weddingDate - now;

        // Verifica se os elementos da contagem regressiva existem na página
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        // Se não encontrar os elementos, sai da função
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            return; // Sai da função se algum elemento não existir
        }

        // Cálculos de tempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Atualização dos elementos
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // === ROLAGEM SUAVE EM LINKS ÂNCORA ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                document.querySelectorAll('.bottom-nav a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // === FORMULÁRIO RSVP ===
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Presença confirmada! Obrigado por nos responder.');
            rsvpForm.reset();
        });
    }

    // === CARROSSEL ===
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-control');
    const nextBtn = document.querySelector('.next-control');

    if (track && slides.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        let slideWidth = slides[0].getBoundingClientRect().width;

        const setTrackWidth = () => {
            slideWidth = slides[0].getBoundingClientRect().width;
            track.style.width = `${slideWidth * slides.length}px`;
            updateCarousel();
        };

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        const goToPrev = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = slides.length - 1;
                track.style.transition = 'none';
                track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 10);
            }
            updateCarousel();
        };

        const goToNext = () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(0)`;
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease';
                }, 10);
            }
            updateCarousel();
        };

        prevBtn.addEventListener('click', goToPrev);
        nextBtn.addEventListener('click', goToNext);

        // Navegação por teclado
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goToPrev();
            else if (e.key === 'ArrowRight') goToNext();
        });

        // Swipe (toque)
        let startX = 0;
        track.addEventListener('touchstart', e => startX = e.changedTouches[0].screenX);
        track.addEventListener('touchend', e => {
            const endX = e.changedTouches[0].screenX;
            const diffX = endX - startX;
            if (diffX > 50) goToPrev();
            else if (diffX < -50) goToNext();
        });

        // Autoplay
        let autoplay = setInterval(goToNext, 5000);
        const stopAutoplay = () => clearInterval(autoplay);
        const startAutoplay = () => autoplay = setInterval(goToNext, 5000);

        [track, prevBtn, nextBtn].forEach(el => {
            el.addEventListener('mouseenter', stopAutoplay);
            el.addEventListener('mouseleave', startAutoplay);
        });

        // Redimensionamento
        window.addEventListener('resize', setTrackWidth);
        setTrackWidth();
    }

    // === HEADER ESCONDIDO AO ROLAR ===
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const scrollThreshold = 50; // Quantidade mínima de rolagem para ativar

    window.addEventListener('scroll', function () {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Verifica se está no topo da página
        if (currentScrollTop <= 0) {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
            return;
        }

        // Ignora pequenas oscilações
        if (Math.abs(lastScrollTop - currentScrollTop) <= scrollThreshold) {
            return;
        }

        // Rolando para baixo
        if (currentScrollTop > lastScrollTop) {
            header.classList.add('header-hidden');
            header.classList.remove('header-visible');
        }
        // Rolando para cima
        else {
            header.classList.remove('header-hidden');
            header.classList.add('header-visible');
        }

        lastScrollTop = currentScrollTop;
    });


    const categoryButtons = document.querySelectorAll('.category-btn');
    const giftItems = document.querySelectorAll('.gift-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remover classe ativa de todos os botões
            categoryButtons.forEach(btn => btn.classList.remove('active'));

            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');

            // Pegar a categoria do botão
            const category = this.getAttribute('data-category');

            // Filtrar os itens de presente com animação
            giftItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.classList.remove('filtered-out');
                } else {
                    item.classList.add('filtered-out');
                }
            });
        });
    });

    // Animação ao copiar PIX
    const pixCopyButton = document.querySelector('.copy-pix');
    if (pixCopyButton) {
        pixCopyButton.addEventListener('click', function () {
            const pixKey = document.querySelector('.pix-key').textContent;
            navigator.clipboard.writeText(pixKey).then(() => {
                this.textContent = 'Copiado!';
                this.classList.add('copy-animation');

                setTimeout(() => {
                    this.textContent = 'Copiar Chave PIX';
                    this.classList.remove('copy-animation');
                }, 2000);
            });
        });
    }

    // Animação em elementos ao rolar
    const scrollElements = document.querySelectorAll('.gift-categories, .pix-container, #gift-pix h2');
    scrollElements.forEach(el => {
        el.classList.add('scroll-animate');
    });

    function handleScrollAnimation() {
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    // Verificar elementos visíveis ao carregar
    handleScrollAnimation();

    // Verificar elementos visíveis ao rolar
    window.addEventListener('scroll', handleScrollAnimation);

    // const backgroundMusic = document.getElementById('background-music');
    // const musicToggle = document.getElementById('music-toggle');
    // const musicStatus = document.querySelector('.music-status');

    // // Iniciar com o status correto
    // let isMuted = true;
    // musicToggle.classList.add('playing');

    // // Função para alternar o som
    // function toggleSound() {
    //     if (isMuted) {
    //         // Ativar o som
    //         backgroundMusic.muted = false;
    //         musicStatus.textContent = 'Pausar Música';

    //         // Garantir que está tocando
    //         backgroundMusic.play().catch(error => {
    //             console.log('Não foi possível iniciar a reprodução:', error);
    //             backgroundMusic.muted = true;
    //             musicStatus.textContent = 'Ativar Som';
    //             isMuted = true;
    //         });
    //     } else {
    //         // Desativar o som (mas continuar tocando)
    //         backgroundMusic.muted = true;
    //         musicStatus.textContent = 'Ativar Som';
    //     }

    //     isMuted = !isMuted;
    // }

    // // Adicionar event listener ao botão
    // if (musicToggle) {
    //     musicToggle.addEventListener('click', toggleSound);
    // }

    // // Tentar tocar automaticamente (mesmo que mudo)
    // if (backgroundMusic) {
    //     // Atraso para garantir que o navegador está pronto
    //     setTimeout(() => {
    //         backgroundMusic.play().catch(error => {
    //             console.log('Reprodução automática bloqueada:', error);
    //         });
    //     }, 1000);
    // }
});
