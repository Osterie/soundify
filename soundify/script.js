//--- Grunnleggende koding med JS/HTML/CSS
//--- Eksempelprogram med innlesing av serverfiler
//--- Deklarasjon av GLOBALE variabler legges inn her )før window.onload)
var filinnhold = ''
window.onload = winInit;  	// Hendelse onload(nettsida ferdig lasta): winInit kjøres automatisk
function winInit(){ 		// Hovedprogrammet
	elGetId('lesFil1').onclick = lesFil1;  
}

//--- Funksjoner lagd spesifikt for dette programmet følger her. 
//--- Fellesfunksjoner hentes fra ../kodebiblioteker
function elGetId(idName){ // Forenkler henting av html-objektet
	return document.getElementById(idName);
}

function lastInn(file) {
    return fetch(file).then((response) => response.text() );
}


function addElement() {
    // create a new div element
  
    // and give it some content
  
    // add the text node to the newly created div
  
    // add the newly created element and its content into the DOM

  }

async function lesFil1() {
	filinnhold = await lastInn('../spillelister/innhold/pop.json');
    
    //Makes into object
    filinnhold = JSON.parse(filinnhold)

    for (let i = 0; i < filinnhold.length; i++) {

        var newDiv = document.createElement("div");
        newDiv.innerHTML = "Hello, World!";
        document.body.appendChild(newDiv);

        newDiv.classList.add("album");


        console.log(filinnhold[i].tittel)
        console.log(filinnhold[i].artist)
        console.log(filinnhold[i].bilde)
        console.log(filinnhold[i].musikk)
        
    }
    console.log(filinnhold.length)
	visInnhold();
}

async function lesFil2() {
	filinnhold = await lastInn('ToMuffinsFormer.csv');
	visInnhold();
}

function visInnhold(){ // Hva som skjer klikk på knapp2. 
	// filinnhold = filinnhold.split('\n').join('<br>');
	elGetId('utskrift').innerHTML = filinnhold;
}
class spor{

    constructor(){
        //new fetures here!
    }

}
class spilleliste{

    constructor(){

    }

}

