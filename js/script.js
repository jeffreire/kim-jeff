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

    // === FORMULÁRIO RSVP
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Pegar os dados do formulário
            const formData = new FormData(this);
            const name = formData.get('name');
            const attendance = formData.get('attendance');

            if (!name || !attendance) {
                showCustomAlert('Por favor, preencha todos os campos.', 'warning');
                return;
            }

            // Desabilitar o botão de envio
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            submitButton.style.opacity = '0.7';

            try {
                // Verificar se Firebase está disponível
                if (typeof db === 'undefined') {
                    throw new Error('Firebase não está inicializado');
                }

                // Salvar no Firebase Firestore
                await db.collection('rsvp').add({
                    nome: name,
                    presenca: attendance === 'yes' ? 'Sim' : 'Não',
                    dataConfirmacao: firebase.firestore.FieldValue.serverTimestamp(),
                    ip: await getClientIP()
                });

                // Sucesso com mensagem elegante
                showCustomAlert(
                    `Obrigado, ${name}! Sua confirmação foi enviada com sucesso.`,
                    'success',
                    attendance === 'yes' ? 'Mal podemos esperar para celebrar com você!' : 'Sentiremos sua falta, mas entendemos.'
                );
                this.reset();

            } catch (error) {
                console.error('Erro ao salvar confirmação:', error);
                showCustomAlert('Ops! Algo deu errado. Por favor, tente novamente.', 'error');
            } finally {
                // Reabilitar o botão
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.style.opacity = '1';
            }
        });
    }
    // Função para mostrar alertas customizados elegantes
    function showCustomAlert(message, type = 'info', subtitle = '') {
        // Remover alerta anterior se existir
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Criar elementos do alerta
        const alertOverlay = document.createElement('div');
        alertOverlay.className = 'custom-alert-overlay';

        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert custom-alert-${type}`;

        // Ícone baseado no tipo
        const icons = {
            success: 'fas fa-heart',
            error: 'fas fa-exclamation-triangle',
            warning: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };

        alertBox.innerHTML = `
        <div class="custom-alert-content">
            <div class="custom-alert-icon">
                <i class="${icons[type]}"></i>
            </div>
            <div class="custom-alert-text">
                <h3>${message}</h3>
                ${subtitle ? `<p>${subtitle}</p>` : ''}
            </div>
            <button class="custom-alert-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

        alertOverlay.appendChild(alertBox);
        document.body.appendChild(alertOverlay);

        // Adicionar animação de entrada
        setTimeout(() => {
            alertOverlay.classList.add('show');
        }, 10);

        // Fechar o alerta
        const closeAlert = () => {
            alertOverlay.classList.remove('show');
            setTimeout(() => {
                alertOverlay.remove();
            }, 300);
        };

        // Event listeners para fechar
        alertBox.querySelector('.custom-alert-close').addEventListener('click', closeAlert);
        alertOverlay.addEventListener('click', (e) => {
            if (e.target === alertOverlay) closeAlert();
        });

        // Auto fechar após 5 segundos para mensagens de sucesso
        if (type === 'success') {
            setTimeout(closeAlert, 5000);
        }
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

});

async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'Não disponível';
    }
}