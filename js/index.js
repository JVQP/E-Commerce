
if (window.location.pathname == '/autenticacao') {

    var texto = 'Sejam Bem Vindos.';
    var n = 0;

    function texto_animado() {
        if (n < texto.length) {
            document.getElementById('titulo-login').innerHTML += texto[n];
            n++
            setTimeout(texto_animado, 200);
        }
    }
    texto_animado();

}

if (window.location.pathname == '/redefinir_senha') {
    var texto1 = 'Redefinir Senha.'
    var n1 = 0;

    function texto_animado1() {

        if (n1 < texto1.length) {
            document.getElementById('tittle_senha').innerHTML += texto1[n1];
            n1++
            setTimeout(texto_animado1, 200)
        }

    }
    texto_animado1();
}

if (window.location.pathname == '/redefinir') {
    var texto1 = 'Redefinir Senha.'
    var n1 = 0;

    function texto_animado1() {

        if (n1 < texto1.length) {
            document.getElementById('tittle_senha').innerHTML += texto1[n1];
            n1++
            setTimeout(texto_animado1, 200)
        }

    }
    texto_animado1();
}

if (window.location.pathname == '/usuarios') {
    var texto2 = 'Cadastrar Usuário.'
    var n2 = 0;

    function texto_animado2() {

        if (n2 < texto2.length) {
            document.getElementById('titulo_cadastro').innerHTML += texto2[n2];
            n2++
            setTimeout(texto_animado2, 200)
        }

    }
    texto_animado2();
}

// evento de remoção de produto

function excluir(event) {
    event.preventDefault();
    let deletar = confirm('Você realmente deseja excluir ?');
    if (deletar === true) {
      window.location.href = event.target.href;
    }
}


function alterar(){
    alert('Produto alterado com sucesso');
}