let texto = 'Sejam Bem Vindos !!';
let n = 0; 

setInterval(() => {
    if(n < texto.length){
        document.getElementById('titulo-login').innerHTML += texto[n];
        n ++
    }
}, 200)