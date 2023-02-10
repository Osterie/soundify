const nåværende_spilleliste = new Spilleliste();

//henter DOM elementer med klasse lik "spilleliste"
const spillelister = document.querySelectorAll('.spilleliste')

window.onload = winInit;
function winInit(){ 
    hendelser_spillelister(spillelister)
}

function hendelser_spillelister(spillelister){


    //gir DOM elementene eventlistener click
    for (let i = 0; i < spillelister.length; i++) {
        spillelister[i].addEventListener('click', function() {
            //ved å bruke this er det som å bruke variabelen spillelister[i]
            //Men det går ikke for i er ikke lenger definert når løkken er ferdig.
            nåværende_spilleliste.lastinn_fra_json('./spillelister/innhold/', this.innerHTML)
        });
    }
}
