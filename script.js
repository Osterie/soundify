// const directory = '../spillelister/innhold';
// const directory = './spillelister/innhold/pop.json';
// fetch(directory)
//   .then(response => response.json())
//   .then(jsonData => { console.log('what', jsonData)
//     // do something with jsonData
//   })
//   .catch(error => console.error(error));

var filinnhold = ''
window.onload = winInit;  	// Hendelse onload(nettsida ferdig lasta): winInit kjøres automatisk
function winInit(){ 
    var spillelister = document.querySelectorAll('.spilleliste')	
    console.log(spillelister)

    for (let i = 0; i < spillelister.length; i++) {
        spillelister[i].addEventListener('click', function(){
            lesFil1(spillelister[i].innerHTML);
        });
        
    }
    // elGetId('spilleliste').onclick = lesFil1;  
}

//--- Funksjoner lagd spesifikt for dette programmet følger her. 
//--- Fellesfunksjoner hentes fra ../kodebiblioteker
function elGetId(idName){ // Forenkler henting av html-objektet
	return document.getElementById(idName);
}

function lastInn(file) {
    return fetch(file).then((response) => response.text() );
}


async function lesFil1(filnavn) {
    filnavn = filnavn.toLowerCase().trim()

	filinnhold = await lastInn(`./spillelister/innhold/${filnavn}.json`);
    
    //Makes into object
    var container = document.createElement("div")  
    container.id = 'container'


    filinnhold = JSON.parse(filinnhold)

        if (document.getElementById("container")) {
        document.getElementById('container').remove()
    }

    
    
    document.body.appendChild(container)

    
    for (let i = 0; i < filinnhold.length; i++) {

        
        var sang = document.createElement("div");
        sang.innerHTML = `${filinnhold[i].artist} - ${filinnhold[i].tittel}` ;
        sang.classList.add("album");

        container.appendChild(sang);

        var bilde = document.createElement("img")
        bilde.src = `./spillelister/pop/${filinnhold[i].bilde}`
        
        container.appendChild(bilde);


        var audio = document.createElement('audio');

        audio.src = `./spillelister/pop/${filinnhold[i].musikk}`;

        audio.autoplay = false;
        audio.controls = true;

        container.appendChild(audio);
        


        // console.log(filinnhold[i].tittel)
        // console.log(filinnhold[i].artist)
        // console.log(filinnhold[i].bilde)
        // console.log(filinnhold[i].musikk)
        
    }
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

