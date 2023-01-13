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
    var get_spillelister = document.querySelectorAll('.spilleliste')	
    // console.log(get_spillelister)

    var spillelister_array = []

    for (let i = 0; i < get_spillelister.length; i++) {

        
        var spilleliste_navn = get_spillelister[i].innerHTML.trim().toLowerCase()
        spillelister_array[i] = new spilleliste(spilleliste_navn)
        
        console.log(spillelister_array)
        lesFil1_klasser(get_spillelister[i].innerHTML);
        
        // console.log(spillelister_array)

        
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


filnavn = filnavn.toLowerCase().trim()
async function lesFil1_klasser(filnavn){

    //make song
    //legg sang til spille_lister_array[x]

	filinnhold = await lastInn(`./spillelister/innhold/${filnavn}.json`);
    
    filinnhold = JSON.parse(filinnhold)

    console.log('\n\n\n\n\n')
    for (let i = 0; i < filinnhold.length; i++) {
        console.log(filinnhold[i])
        
    }
    
}


async function lesFil1(filnavn) {
    filnavn = filnavn.toLowerCase().trim()

	filinnhold = await lastInn(`./spillelister/innhold/${filnavn}.json`);
    
    //Makes into object
    var container = document.createElement("div")  
    container.id = 'container'


    filinnhold = JSON.parse(filinnhold)

    //om containeren allerede er laget, blir den fjernet og etterhvert byttet ut mot en ny en.
    if (document.getElementById("container")) {
    document.getElementById('container').remove()
    }

    
    //legger til containeren
    document.body.appendChild(container)

    var spillav = document.createElement("button");
    spillav.innerHTML = 'Spill av'
    spillav.id = ("spill_knapp");
    container.appendChild(spillav);

    var modus = document.createElement("button");
    modus.innerHTML = 'ENDRE MODUS'
    modus.id = ("modus");
    container.appendChild(modus);


    
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

    // audio.play()
	// visInnhold();
}

async function lesFil2() {
	filinnhold = await lastInn('ToMuffinsFormer.csv');
	// visInnhold();
}

// function visInnhold(){ // Hva som skjer klikk på knapp2. 
// 	// filinnhold = filinnhold.split('\n').join('<br>');
// 	elGetId('utskrift').innerHTML = filinnhold;
// }






class spor{

    constructor(artist, tittel, bilde, lydspor){
        this.artist = artist
        this.tittel = tittel
        this.bilde = bilde
        this.lydspor = lydspor
    }

}
class spilleliste{

    constructor(navn){
        this.navn = navn
        this.sanger = []

    }

    legg_til_sang(sang){
        this.sanger.push(sang)
    }

}


