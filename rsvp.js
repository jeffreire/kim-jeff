document.addEventListener('DOMContentLoaded', function () {
	const rsvpForm = document.getElementById('rsvp-form');

	if (rsvpForm) {
		rsvpForm.addEventListener('submit', function (e) {
			e.preventDefault();

			// Obter valores do formulário
			const nome = document.getElementById('nome').value;
			const presenca = document.querySelector('input[name="presenca"]:checked').value;

			// Exibir indicador de carregamento
			const submitBtn = rsvpForm.querySelector('button[type="submit"]');
			const originalBtnText = submitBtn.textContent;
			submitBtn.textContent = 'Enviando...';
			submitBtn.disabled = true;

			// Salvar no Firebase
			db.collection('confirmacoes').add({
				nome: nome,
				presenca: presenca,
				dataEnvio: new Date()
			})
				.then(() => {
					// Sucesso
					submitBtn.textContent = 'Enviado com Sucesso!';

					// Limpar formulário
					rsvpForm.reset();

					// Mostrar mensagem de sucesso
					const successMessage = document.createElement('div');
					successMessage.className = 'success-message';
					successMessage.textContent = 'Sua confirmação foi registrada. Obrigado!';
					rsvpForm.parentNode.insertBefore(successMessage, rsvpForm.nextSibling);

					// Restaurar botão após 3 segundos
					setTimeout(() => {
						submitBtn.textContent = originalBtnText;
						submitBtn.disabled = false;
					}, 3000);
				})
				.catch((error) => {
					// Erro
					console.error("Erro ao salvar: ", error);
					submitBtn.textContent = 'Erro ao enviar';

					// Mostrar mensagem de erro
					const errorMessage = document.createElement('div');
					errorMessage.className = 'error-message';
					errorMessage.textContent = 'Ocorreu um erro ao registrar sua confirmação. Por favor, tente novamente.';
					rsvpForm.parentNode.insertBefore(errorMessage, rsvpForm.nextSibling);

					// Restaurar botão após 3 segundos
					setTimeout(() => {
						submitBtn.textContent = originalBtnText;
						submitBtn.disabled = false;
					}, 3000);
				});
		});
	}
});