const nåværende_spilleliste = new Spilleliste();



// const knapp = document.getElementById('knapp')

// console.log(knapp);

// knapp.addEventListener('click', spill_pause_tilstand)
{/* <button id='knapp' class="knapp_pauset"></button> */}



window.onload = winInit;
function winInit(){ 
    hendelser()
}

function hendelser(){

    //henter DOM elementer med klasse lik "spilleliste"
    const spillelister_navn = document.querySelectorAll('.spilleliste')

    //gir DOM elementene eventlistener click
    for (let i = 0; i < spillelister_navn.length; i++) {
        spillelister_navn[i].addEventListener('click', function() {
            //ved å bruke this er det som å bruke variabelen spillelister_navn[i]
            //Men det går ikke for i er ikke lenger definert når løkken er ferdig.
            nåværende_spilleliste.lastinn_fra_json('./spillelister/innhold/', this.innerHTML)
        });
    }
}
