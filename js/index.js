var login = 'Registre-se';
var n = 0;

setInterval(() => {
    if(n < login.length){
        document.getElementById('login').innerHTML += login[n];
        n++
    }
}, 100)
