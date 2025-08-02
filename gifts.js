document.addEventListener('DOMContentLoaded', function () {
    // Funcionalidade de filtro de categorias
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
            document.getElementById('gift-payment-form').addEventListener('submit', function (e) {
                e.preventDefault();

                // Pegar os dados do formulário
                const giftName = document.querySelector('.gift-selected h3').textContent;
                const userName = document.getElementById('gift-name').value;
                const giftAmount = document.getElementById('gift-amount') ? document.getElementById('gift-amount').value : null;

                // Mostrar instruções de PIX
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
                                <span class="pix-key">seuemail@exemplo.com</span>
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
                    navigator.clipboard.writeText(pixKey).then(() => {
                        this.textContent = 'Copiado!';
                        setTimeout(() => {
                            this.textContent = 'Copiar Chave PIX';
                        }, 2000);
                    });
                });

                // Adicionar funcionalidade de fechar
                document.querySelector('.close-instructions').addEventListener('click', function () {
                    modal.style.display = 'none';
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

    // Funcionalidade de copiar PIX
    const pixCopyButton = document.querySelector('.copy-pix');
    if (pixCopyButton) {
        pixCopyButton.addEventListener('click', function () {
            const pixKey = document.querySelector('.pix-key').textContent;
            navigator.clipboard.writeText(pixKey).then(() => {
                this.textContent = 'Copiado!';
                setTimeout(() => {
                    this.textContent = 'Copiar Chave PIX';
                }, 2000);
            });
        });
    }
});