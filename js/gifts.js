document.addEventListener('DOMContentLoaded', function () {
    // Dicionário de chaves PIX para cada presente
    const pixKeys = {
        "Jogo de Cama King": "00020126880014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620226Presente jogo de cama king5204000053039865406299.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BEC6B5B423236054126304413A",
        "Jogo de Toalhas": "00020126820014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620220Presente Kit Toalhas5204000053039865406249.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BF072520D3910182836304852E",
        "Cortinas para Sala": "00020126880014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620226Presente Cortina para Sala5204000053039865406349.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BF488C96F077998104630439B2",
        "Air Fryer": "00020126800014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620218Presente Air fryer5204000053039865406299.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BFB5D2C4D5053727476304D994",
        "Kit de Panelas": "00020126860014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620224Presente jogo de panelas5204000053039865406490.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892C316BC80B5908358736304CB1B",
        "Liquidificador": "00020126850014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620223Presente liquidificador5204000053039865406129.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BD4B0413259025202563046480",
        "Jantar Romântico": "00020126870014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620225Presente Jantar romantico5204000053039865406790.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892C2EC707E30274744676304144F",
        "Lava e Seca": "00020126820014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620220Presente Lava e seca5204000053039865406950.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BD1D848670154278226304BCA8",
        "Lua de Mel": "00020126810014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620219Presente Lua de Mel5204000053039865406690.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BE02EA7F42033959626304C921",
        "Forninho Elétrico": "00020126880014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620226Presente forninho eletrico5204000053039865406599.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BCE96423329774418263047F1C",
        "Reforma do Apartamento": "00020126880014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620226Presente reforma para Sala5204000053039865406880.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BF819D466139504543630446CE",
        "Itens de Cozinha": "00020126870014br.gov.bcb.pix0136d8c1ca58-a0a7-4c88-9e77-9e3231d045620225Presente Itens de cozinha5204000053039865406149.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BD8CB7AAE2356898906304538F",
        "Faqueiro": "00020126570014br.gov.bcb.pix0114+55479910816020217Presente Faqueiro5204000053039865406199.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BDB78C3DA496342447630417F1",
        "Par de Alianças": "00020126570014br.gov.bcb.pix0114+55479910816020217Presente aliancas5204000053039865406750.005802BR5922JEFFERSON FREIRE MARIA6009Sao Paulo62290525REC6892BE7F7756A48723271463045A51",
    };

    // Funcionalidade de filtro de categorias (seu código existente)
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

            // Filtrar os itens de presente
            giftItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal de Presente
    const modal = document.getElementById('gift-modal');
    const modalContent = document.getElementById('gift-modal-content');
    const closeModal = document.querySelector('.close-modal');
    const giftButtons = document.querySelectorAll('.gift-btn');

    giftButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Pegar informações do presente
            const giftItem = this.closest('.gift-item');
            const giftName = giftItem.querySelector('h3').textContent;
            const giftPrice = giftItem.querySelector('.gift-price').textContent;
            const isContribution = this.textContent === 'Contribuir';

            // Preencher o modal
            modalContent.innerHTML = `
                <div class="gift-selected">
                    <h3>${giftName}</h3>
                    <p>${giftPrice}</p>
                </div>
                <form id="gift-payment-form">
                    <div class="gift-form-group">
                        <label for="gift-name">Seu Nome</label>
                        <input type="text" id="gift-name" required>
                    </div>
                    ${isContribution ? `
                        <div class="gift-form-group">
                            <label for="gift-amount">Valor da Contribuição (R$)</label>
                            <input type="number" id="gift-amount" min="10" step="10" required>
                        </div>
                    ` : ''}
                    <div class="gift-form-group">
                        <label for="gift-payment">Forma de Pagamento</label>
                        <select id="gift-payment" required>
                            <option value="pix">PIX</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary gift-form-submit">Finalizar Presente</button>
                </form>
            `;

            // Mostrar o modal
            modal.style.display = 'block';

            // Adicionar event listener para o formulário
            document.getElementById('gift-payment-form').addEventListener('submit', async function (e) {
                e.preventDefault();

                // Pegar os dados do formulário
                const giftName = document.querySelector('.gift-selected h3').textContent;
                const userName = document.getElementById('gift-name').value;
                const giftAmount = document.getElementById('gift-amount') ? document.getElementById('gift-amount').value : null;

                // Validações básicas
                if (!userName) {
                    alert('Por favor, preencha seu nome.');
                    return;
                }

                try {
                    // Salvar no Firebase (você pode manter ou remover esta parte)
                    await db.collection('presentes').add({
                        presente: giftName,
                        nomeComprador: userName,
                        isContribuicao: !!giftAmount,
                        precoOriginal: giftPrice,
                        dataCompra: firebase.firestore.FieldValue.serverTimestamp(),
                        status: 'pendente'
                    });

                } catch (error) {
                    console.error('Erro ao salvar presente:', error);
                    // Continua mesmo com erro no Firebase
                }

                // ✨ AQUI É A MUDANÇA: Obter a chave PIX específica para este presente
                const pixKey = pixKeys[giftName] || pixKeys["default"];

                // Mostrar instruções de PIX com a chave específica
                modalContent.innerHTML = `
                    <div class="pix-instructions">
                        <h3>Instruções para Pagamento</h3>
                        <div class="gift-selected">
                            <p><strong>Presente:</strong> ${giftName}</p>
                            <p><strong>Nome:</strong> ${userName}</p>
                            <p><strong>Valor:</strong> ${giftAmount ? 'R$ ' + giftAmount : giftPrice}</p>
                        </div>
                        
                        <div class="pix-info">
                            <h4>Chave PIX:</h4>
                            <div class="pix-key-container">
                                <span class="pix-key">${pixKey}</span>
                                <button type="button" class="copy-pix btn-secondary">Copiar Chave PIX</button>
                            </div>
                        </div>
                        
                        <div class="pix-instructions-text">
                            <h4>Como fazer o pagamento:</h4>
                            <ol>
                                <li>Abra o app do seu banco</li>
                                <li>Selecione a opção PIX</li>
                                <li>Cole a chave PIX copiada</li>
                                <li>Confirme o valor e efetue o pagamento</li>
                                <li>Envie o comprovante para confirmar</li>
                            </ol>
                        </div>
                        
                        <button type="button" class="btn-primary close-instructions">Fechar</button>
                    </div>
                `;

                // Adicionar funcionalidade de copiar PIX
                const copyButton = document.querySelector('.copy-pix');
                copyButton.addEventListener('click', function () {
                    const pixKey = document.querySelector('.pix-key').textContent;

                    // Função de cópia melhorada para mobile
                    copyToClipboard(pixKey).then(() => {
                        this.textContent = '✅ Chave Copiada!';
                        this.classList.add('copied');

                        // Feedback tátil no mobile
                        if (navigator.vibrate) {
                            navigator.vibrate(100);
                        }

                        setTimeout(() => {
                            this.textContent = 'Copiar Chave PIX';
                            this.classList.remove('copied');
                        }, 2500);
                    }).catch(() => {
                        this.textContent = '❌ Erro ao copiar';
                        setTimeout(() => {
                            this.textContent = 'Copiar Chave PIX';
                        }, 2000);
                    });
                });

                // Adicionar funcionalidade de fechar
                document.querySelector('.close-instructions').addEventListener('click', function () {
                    // Mostrar agradecimento antes de fechar
                    modalContent.innerHTML = `
                        <div class="thank-you-message">
                            <div class="thank-you-icon">
                                <i class="fas fa-heart"></i>
                            </div>
                            <h3>Muito obrigado!</h3>
                            <p>Ficamos muito felizes com seu presente!</p>
                            <p>Mal podemos esperar para celebrar com você! 💕</p>
                            <button type="button" class="btn-primary final-close">Fechar</button>
                        </div>
                    `;

                    // Fechar após 3 segundos ou ao clicar no botão
                    const finalClose = () => {
                        modal.style.display = 'none';
                    };

                    document.querySelector('.final-close').addEventListener('click', finalClose);
                    setTimeout(finalClose, 3000);
                });
            });
        });
    });

    // Fechar o modal
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Funcionalidade de copiar PIX principal da página
    const pixCopyButton = document.querySelector('.copy-pix');
    if (pixCopyButton) {
        pixCopyButton.addEventListener('click', function () {
            const pixKey = document.querySelector('.pix-key').textContent;
            copyToClipboard(pixKey).then(() => {
                this.textContent = '✅ Chave Copiada!';
                this.classList.add('copied');

                setTimeout(() => {
                    this.textContent = 'Copiar Chave PIX';
                    this.classList.remove('copied');
                }, 2500);
            }).catch(() => {
                this.textContent = '❌ Erro ao copiar';
                setTimeout(() => {
                    this.textContent = 'Copiar Chave PIX';
                }, 2000);
            });
        });
    }

    // Função para copiar texto (compatível com mobile)
    function copyToClipboard(text) {
        return new Promise((resolve, reject) => {
            // Método moderno (funciona em contexto seguro)
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text)
                    .then(resolve)
                    .catch(reject);
                return;
            }

            // Fallback melhorado para mobile
            try {
                // Criar um elemento temporário
                const textArea = document.createElement('textarea');
                textArea.value = text;

                // Importante: Estas propriedades são necessárias para iOS
                textArea.style.position = 'fixed';
                textArea.style.left = '0';
                textArea.style.top = '0';
                textArea.style.width = '100%';
                textArea.style.height = '100px';
                textArea.style.padding = '10px';
                textArea.style.boxSizing = 'border-box';
                textArea.style.zIndex = '9999';

                // Para iOS, precisamos que seja visível por um momento
                textArea.style.opacity = '0.01';

                document.body.appendChild(textArea);

                // Selecionar o texto (crucial para mobile)
                textArea.focus();
                textArea.select();
                textArea.setSelectionRange(0, 99999); // Para iOS

                // Executar o comando de cópia
                const successful = document.execCommand('copy');

                // Remover o elemento
                setTimeout(() => {
                    document.body.removeChild(textArea);
                }, 100);

                // Resolver a promise baseado no resultado
                if (successful) {
                    resolve();
                } else {
                    reject(new Error('Não foi possível copiar o texto'));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    // ADICIONAR delegate para eventos de cópia (para botões dinâmicos)
    document.body.addEventListener('click', function (event) {
        // Verificar se o clique foi em um botão de cópia
        if (event.target.classList.contains('copy-pix') ||
            event.target.closest('.copy-pix')) {

            const button = event.target.classList.contains('copy-pix') ?
                event.target : event.target.closest('.copy-pix');

            // Encontrar o elemento com a chave PIX mais próximo
            const container = button.closest('.pix-key-container') ||
                button.closest('.pix-info') ||
                button.closest('.pix-instructions');

            if (!container) return;

            const pixKeyElement = container.querySelector('.pix-key');
            if (!pixKeyElement) return;

            const pixKey = pixKeyElement.textContent.trim();

            // Desabilitar o botão temporariamente para evitar cliques múltiplos
            button.disabled = true;

            // Tentar copiar
            copyToClipboard(pixKey)
                .then(() => {
                    // Sucesso
                    const originalText = button.textContent;
                    button.textContent = '✅ Chave Copiada!';
                    button.classList.add('copied');

                    // Feedback tátil no mobile
                    if (navigator.vibrate) {
                        navigator.vibrate(100);
                    }

                    // Mostrar toast
                    showCopyToast('Chave PIX copiada com sucesso!', 'success');

                    // Voltar ao normal após 2.5s
                    setTimeout(() => {
                        button.textContent = originalText || 'Copiar Chave PIX';
                        button.classList.remove('copied');
                        button.disabled = false;
                    }, 2500);
                })
                .catch((err) => {
                    console.error('Erro ao copiar:', err);
                    button.textContent = '❌ Erro ao copiar';

                    // Mostrar erro e instruções
                    showCopyToast('Erro ao copiar. Selecione e copie manualmente.', 'error');

                    // Mostrar modal de fallback para cópia manual
                    showManualCopyFallback(pixKey);

                    setTimeout(() => {
                        button.textContent = 'Copiar Chave PIX';
                        button.disabled = false;
                    }, 2000);
                });

            // Impedir outros handlers
            event.preventDefault();
            event.stopPropagation();
        }
    });

    // ADICIONAR função para mostrar toast
    function showCopyToast(message, type = 'success') {
        // Remover toast existente
        const existingToast = document.querySelector('.copy-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = `copy-toast ${type === 'error' ? 'copy-toast-error' : ''}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Estilos inline para garantir que funcione
        toast.style.position = 'fixed';
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.background = type === 'success' ? '#28a745' : '#dc3545';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        toast.style.zIndex = '10000';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        toast.style.maxWidth = '300px';
        toast.style.fontSize = '14px';

        document.body.appendChild(toast);

        // Forçar reflow
        toast.offsetHeight;

        // Mostrar com animação
        toast.style.transform = 'translateX(0)';

        // Remover após 3s
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ADICIONAR função para mostrar fallback de cópia manual
    function showManualCopyFallback(pixKey) {
        const fallbackModal = document.createElement('div');
        fallbackModal.className = 'manual-copy-modal';
        fallbackModal.innerHTML = `
            <div class="manual-copy-content">
                <h3>📋 Copie Manualmente</h3>
                <p>Segure e copie a chave PIX abaixo:</p>
                <div class="manual-copy-key">${pixKey}</div>
                <button class="manual-copy-close">Fechar</button>
            </div>
        `;

        // Estilos inline
        fallbackModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        `;

        const content = fallbackModal.querySelector('.manual-copy-content');
        content.style.cssText = `
            background: white;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            max-width: 400px;
            width: 100%;
        `;

        const key = fallbackModal.querySelector('.manual-copy-key');
        key.style.cssText = `
            background: #f8f9fa;
            border: 2px solid #007bff;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-family: monospace;
            font-size: 14px;
            word-break: break-all;
            user-select: all;
            -webkit-user-select: all;
            -moz-user-select: all;
        `;

        const closeBtn = fallbackModal.querySelector('.manual-copy-close');
        closeBtn.style.cssText = `
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        `;

        document.body.appendChild(fallbackModal);

        // Fechar modal
        closeBtn.addEventListener('click', () => {
            fallbackModal.remove();
        });

        fallbackModal.addEventListener('click', (e) => {
            if (e.target === fallbackModal) {
                fallbackModal.remove();
            }
        });
    }
});