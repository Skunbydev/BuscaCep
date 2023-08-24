document.addEventListener('DOMContentLoaded', function() {
    const selectInputField = document.querySelector('#cep');
    const btnSearch = document.querySelector('#btn-search');
    const btnLimpar = document.querySelector('#btn-limpar'); // Botão Limpar
    const btnBack = document.querySelector('#btn-back');
    const initialSection = document.querySelector('.mid-content-container:not(.disable)');
    const resultSection = document.querySelector('.mid-content-container.disable');
    const correctCepMessage = document.querySelector('.correct-cep');

    function isValidCepFormat(cep) {
        return /^\d{5}-\d{3}$/.test(cep);
    }

    function formatCep(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 5) {
            cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
        }
        return cep;
    }

    selectInputField.addEventListener('input', function(event) {
        const input = event.target;
        const formattedCep = formatCep(input.value);
        input.value = formattedCep;

        const isValidFormat = isValidCepFormat(formattedCep);
        btnSearch.disabled = !isValidFormat;
        correctCepMessage.style.display = isValidFormat ? 'none' : 'block';
    });

    btnSearch.addEventListener('click', function() {
        const cep = selectInputField.value;
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => response.json())
            .then((data) => {
                document.querySelector('#logradouro').value = data.logradouro;
                document.querySelector('#bairro').value = data.bairro;
                document.querySelector('#cidade').value = data.localidade;
                document.querySelector('#estado').value = data.uf;

                initialSection.classList.add('disable');
                resultSection.classList.remove('disable');
            });
    });

    btnLimpar.addEventListener('click', function() {
        selectInputField.value = ''; // Limpa o campo CEP
        btnSearch.disabled = true;
        correctCepMessage.style.display = 'none';
    });

    btnBack.addEventListener('click', function() {
        initialSection.classList.remove('disable');
        resultSection.classList.add('disable');
    });
});
