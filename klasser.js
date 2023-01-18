let timer = 3
let minutter = 4
let sekunder = 50

let ny_sekunder = sekunder + minutter*60 + timer*3600
let ny_minutter = ny_sekunder/60
let ny_timer = ny_minutter/60
    
console.log(ny_sekunder)
console.log(ny_minutter)
console.log(ny_timer)

class Spor{

    constructor(artist, tittel, bildefil, lydfil, id, path_bilde_lyd){
        this.artist = artist
        this.tittel = tittel
        this.bildefil = bildefil
        this.lydfil = lydfil
        this.id = id
        this.path_bilde_lyd = path_bilde_lyd
    }

    spill_sang(){
        // var element = document.querySelector('[src]');
        // console.log(element);
        let audioElements = document.getElementsByClassName("lyd");
        let targetSrc = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        for (let i = 0; i < audioElements.length; i++) {
            if((audioElements[i].src).includes(targetSrc)) {
                audioElements[i].play();
                break;
            }
        }
    }
}

class Spilleliste{

    constructor(){
        this.spilleliste_navn = ''
        this.sanger = []
        this.current_lydspor_id = 0
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
                this.innhold_objekt[i].id,
                this.path_playlist
                )

            this.sanger.push(sang_info)
        }
        this.updater_nettside()
    }

    spill_sang_spilleliste(index){
        this.sanger[index].spill_sang()
    }
    spill_neste(){

    }
    spill_random(){
        // this.index = Math.random Something
    }

    updater_nettside(){

        //TODO: lag en placeholder i html, som container blir lagt til i istedenfor slik?

        let container = document.createElement("div")  
        container.id = 'container'
        //om containeren allerede er laget, blir den fjernet og etterhvert byttet ut mot en ny en.
        if (document.getElementById(container.id)) {
            document.getElementById(container.id).remove()
        }
        document.body.appendChild(container)


        //lager spill av knappen
        let spillav = document.createElement("button");
        spillav.innerHTML = 'Spill av'
        spillav.id = ("spill_knapp");
        spillav.addEventListener("click", (event) => this.spill_sang_spilleliste(this.current_lydspor_id), false);
        container.appendChild(spillav);


        //lager knappen hvor man kan endre avspillings modus
        let modus = document.createElement("button");
        modus.innerHTML = 'ENDRE MODUS'
        modus.id = ("modus");
        container.appendChild(modus);

    //lager elmentene som inneholder informajsonene om bilde til sangen, tittel, artist, og lyden
    for (let i = 0; i < this.sanger.length; i++) {

        let sang_kort = document.createElement("div")  
        sang_kort.classList.add('sang_kort')
        container.appendChild(sang_kort);

        let sang = document.createElement("div");
        sang.innerHTML = `${this.sanger[i].artist} - ${this.sanger[i].tittel}` ;
        sang.classList.add("album");
        sang_kort.appendChild(sang);

        
        let bilde = document.createElement("img")
        bilde.src = `${this.path_playlist}/${this.sanger[i].bildefil}`
        bilde.classList.add("bilde");
        sang_kort.appendChild(bilde);

        let lyd = document.createElement('audio');
        lyd.src = `${this.path_playlist}/${this.sanger[i].lydfil}`;
        lyd.classList.add('lyd')
        lyd.autoplay = false;
        lyd.controls = true;
        sang_kort.appendChild(lyd);

        }
    }
}
