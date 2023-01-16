
//TODO: kan ha forksjlleige javascript filer, en for klasser og dette?
class Spor{

    constructor(artist, tittel, bildefil, lydfil, id){
        this.artist = artist
        this.tittel = tittel
        this.bildefil = bildefil
        this.lydfil = lydfil
        this.id = id
    }

    spill_sang(){
        //kun en sang, spill sangen når denne metoden kjøres
    }
}

class Spilleliste{

    constructor(){
        this.spilleliste_navn = ''
        this.sanger = []
    }

    async lastinn_fra_json(path_json, spilleliste_navn){
        
        this.sanger = []
        this.path_json = path_json
        
        //gjør om til små bokstaver og fjerner whitespace
        spilleliste_navn = spilleliste_navn.toLowerCase().trim()
        this.spilleliste_navn = spilleliste_navn
        this.path_playlist = `spillelister/${this.spilleliste_navn}`
        
        this.innhold = await lastInn(`${this.path_json}${this.spilleliste_navn}.json`);

        this.innhold_objekt = JSON.parse(this.innhold)

        for (let i = 0; i < this.innhold_objekt.length; i++) {
            let sang_info = new Spor(this.innhold_objekt[i].tittel,
                this.innhold_objekt[i].artist,
                this.innhold_objekt[i].bildefil,
                this.innhold_objekt[i].lydfil,
                this.innhold_objekt[i].id
                )

            this.sanger.push(sang_info)
        }
        this.updater_nettside()
    }

    spill_sang(index){
        // Audio.play or whatever
    }
    spill_neste(){

    }
    spill_random(){
        // this.index = Math.random Something
    }

    updater_nettside(){

        let container = document.createElement("div")  
        container.id = 'container'

        //om containeren allerede er laget, blir den fjernet og etterhvert byttet ut mot en ny en.
        if (document.getElementById("container")) {
            document.getElementById('container').remove()
        }

        //legger til containeren
        document.body.appendChild(container)

        let spillav = document.createElement("button");
        spillav.innerHTML = 'Spill av'
        spillav.id = ("spill_knapp");

        container.appendChild(spillav);

        let modus = document.createElement("button");
        modus.innerHTML = 'ENDRE MODUS'
        modus.id = ("modus");
        container.appendChild(modus);


    
    for (let i = 0; i < this.sanger.length; i++) {

        let sang = document.createElement("div");
        sang.innerHTML = `${this.sanger[i].artist} - ${this.sanger[i].tittel}` ;
        sang.classList.add("album");
        container.appendChild(sang);

        
        let bilde = document.createElement("img")
        bilde.src = `${this.path_playlist}/${this.sanger[i].bildefil}`
        container.appendChild(bilde);

        let audio = document.createElement('audio');
        audio.src = `${this.path_playlist}/${this.sanger[i].lydfil}`;
        audio.autoplay = false;
        audio.controls = true;

        container.appendChild(audio);
        }
    }
}

// class Html_element{
//     constructor(container){
//         this.container = container

//     }

//     lag_bilde_element(){}

//     lag_lyd_element(){}

// }
//TODODODODODO Eller lag en metode i Spilleliste()?
//todo klasse for det å lage html elementene ut i fra gitt informasjon som 
//todo bilde, lyd, artist, tittel

let spillelister_array = [];
let nåværende_spilleliste = new Spilleliste();

window.onload = winInit;
function winInit(){ 

    hendelser()
}

function hendelser(){

    //henter DOM elementer med klasse spilleliste
    let spillelister_navn = document.querySelectorAll('.spilleliste')

    // gir DOM elementene eventlistener click
    for (let i = 0; i < spillelister_navn.length; i++) {
        spillelister_navn[i].addEventListener('click', function() {
            //ved å bruke this er det som å bruke variabelen spillelister_navn[i]
            //Men det går ikke for i er ikke lenger definert når løkken er ferdig.
            nåværende_spilleliste.lastinn_fra_json('./spillelister/innhold/', this.innerHTML)
        });
    }
}


function play(index) {
    nåværende_spilleliste.spill_sang(index)
}

// function lag_spilleliste(spilleliste_navn){
//     nåværende_spilleliste.lastinn_fra_json('./spillelister/innhold/', spilleliste_navn)
// }

function lastInn(filnavn) {
    return fetch(filnavn).then((response) => response.text() );
}













// async function lesFil1_klasser(filnavn){
//     //make song
//     //legg sang til spille_lister_array[x]

// 	filinnhold = await lastInn(`./spillelister/innhold/${filnavn}.json`);
    
//     filinnhold = JSON.parse(filinnhold)

//     // console.log('\n\n\n\n\n')
//     for (let i = 0; i < filinnhold.length; i++) {
//         // console.log(filinnhold[i])
//     }
// }


// async function lesFil1(filnavn) {
//     filnavn = filnavn.toLowerCase().trim()

// 	filinnhold = await lastInn(`./spillelister/innhold/${filnavn}.json`);
    
//     //Makes into object
//     let container = document.createElement("div")  
//     container.id = 'container'


//     filinnhold = JSON.parse(filinnhold)

//     //om containeren allerede er laget, blir den fjernet og etterhvert byttet ut mot en ny en.
//     if (document.getElementById("container")) {
//     document.getElementById('container').remove()
//     }

    
//     //legger til containeren
//     document.body.appendChild(container)

//     let spillav = document.createElement("button");
//     spillav.innerHTML = 'Spill av'
//     spillav.id = ("spill_knapp");
//     container.appendChild(spillav);

//     let modus = document.createElement("button");
//     modus.innerHTML = 'ENDRE MODUS'
//     modus.id = ("modus");
//     container.appendChild(modus);


    
//     for (let i = 0; i < filinnhold.length; i++) {

//         let sang = document.createElement("div");
//         sang.innerHTML = `${filinnhold[i].artist} - ${filinnhold[i].tittel}` ;
//         sang.classList.add("album");

//         container.appendChild(sang);

//         let bilde = document.createElement("img")
//         bilde.src = `./spillelister/pop/${filinnhold[i].bilde}`
        
//         container.appendChild(bilde);


//         let audio = document.createElement('audio');

//         audio.src = `./spillelister/pop/${filinnhold[i].musikk}`;

//         audio.autoplay = false;
//         audio.controls = true;

//         container.appendChild(audio);

//     }

//     // audio.play()
// 	// visInnhold();
// }
