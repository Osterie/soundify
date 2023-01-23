
class Spor{

    constructor(artist, tittel, bildefil, lydfil, id, path_bilde_lyd){
        this.artist = artist
        this.tittel = tittel
        this.bildefil = bildefil
        this.lydfil = lydfil
        this.id = id
        this.path_bilde_lyd = path_bilde_lyd
    }

    spill_pause_sang(){

        let audioElements = document.getElementsByClassName("lyd");
        let targetSrc = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        for (let i = 0; i < audioElements.length; i++) {
            if((audioElements[i].src).includes(targetSrc)) {
                //spiller om sangen er pauset
                if (audioElements[i].paused){
                    audioElements[i].play();
                }
                //pauser om sangen spiller
                else{
                    audioElements[i].pause();
                }
                break;
            }
        }
    }
    

    reset_sang(){

        let audioElements = document.getElementsByClassName("lyd");
        let targetSrc = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        for (let i = 0; i < audioElements.length; i++) {
            if((audioElements[i].src).includes(targetSrc)) {
                audioElements[i].pause();
                audioElements[i].currentTime = 0;
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
        this.spill_modus = 'neste'
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

    spill_sang_spilleliste(){

        //om spill_modus er satt til å spille neste øker sang index med 1 (eller til 0)
        if (this.spill_modus == 'neste'){
            //om slutten av spillelisten er nådd, begynner den på nytt, ellers er det bare neste som spilles
            this.current_lydspor_id += 0
            if (this.current_lydspor_id == this.sanger.length){
                this.current_lydspor_id = 0
            }
            
            this.spill_neste()
        }

        //om sang modus er tilfeldig spilles av en tilfeldig sang(som ikke er samme sang som allerede spiller)
        else if (this.spill_modus == 'tilfeldig'){
            this.spill_random()
            }
            // this.sanger[index].spill_pause_sang()
        }
    

    spill_neste(){
        //om sangen resetes blir den ikke pauset!!!!
        // for (let i = 0; i < this.sanger.length; i++) {
        //     this.sanger[i].reset_sang();
        // }
        this.sanger[this.current_lydspor_id].spill_pause_sang()
    }

    spill_random(){

        //random tall fra og med 0 til og med lengden på playlisten
        //velger ett nytt tilfedlig tall om det er det samme som forrige
        let index = Math.floor(Math.random() * this.sanger.length);
        while (index == this.current_lydspor_id){
            index = Math.floor(Math.random() * this.sanger.length);
        }

        for (let i = 0; i < this.sanger.length; i++) {
            this.sanger[i].reset_sang();
        }
        this.current_lydspor_id = index
        this.sanger[this.current_lydspor_id].spill_pause_sang()    

    }

    endre_modus(){
        if (this.spill_modus == 'neste'){
            this.spill_modus = 'tilfeldig'
        }
        else if (this.spill_modus == 'tilfeldig'){
            this.spill_modus = 'neste'
        }
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
        spillav.addEventListener("click", () => { 
            this.spill_sang_spilleliste(this.current_lydspor_id)
        });

        container.appendChild(spillav);


        //lager knappen hvor man kan endre avspillings modus
        let modus_knapp = document.createElement("button");
        modus_knapp.innerHTML = 'ENDRE MODUS'
        modus_knapp.id = ("modus");
        modus_knapp.addEventListener("click", () => {
            if (this.spill_modus === 'neste'){
                modus_knapp.style.backgroundColor = 'green'
            }
            else if (this.spill_modus === 'tilfeldig'){
                modus_knapp.style.backgroundColor = 'white'
            }
            this.endre_modus();
        });
        container.appendChild(modus_knapp);

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
        
        lyd.addEventListener("ended", () => {
            this.current_lydspor_id += 1
            this.spill_sang_spilleliste()
        });

        lyd.classList.add('lyd')
        lyd.autoplay = false;
        lyd.controls = true;
        sang_kort.appendChild(lyd);

        }
    }
}

//TODO kan bruke arv
// new Spilleliste_gui