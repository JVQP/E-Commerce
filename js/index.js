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


