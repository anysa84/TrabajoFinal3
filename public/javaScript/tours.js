

 
/* Compra de Tickets //pasar por looop */

document.getElementById('comprarTicket1').addEventListener('click', function() {
    let comprarTicket1 = document.getElementById('comprarTicket_1');
    let valor = parseInt(comprarTicket1.textContent);
    if (valor > 0) {
        comprarTicket1.textContent = valor - 1;
    }
});

document.getElementById('comprarTicket2').addEventListener('click', function() {
    let comprarTicket2 = document.getElementById('comprarTicket_2');
    let valor = parseInt(comprarTicket2.textContent);
    if (valor > 0) {
        comprarTicket2.textContent = valor - 1;
    }
});

document.getElementById('comprarTicket3').addEventListener('click', function() {
    let comprarTicket3 = document.getElementById('comprarTicket_3');
    let valor = parseInt(comprarTicket3.textContent);
    if (valor > 0) {
        comprarTicket3.textContent = valor - 1
   }

});







/*   corazon  cambiar a modo clase   Old */

const corazon = document.getElementById('corazon');
const colores = ['#f55959', '#fdfdfd' ];


corazon.addEventListener('click', () => {
const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
corazon.style.color = colorAleatorio;
});





