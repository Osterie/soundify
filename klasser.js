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

        let lyd_elementer = document.getElementsByClassName("lyd");
        let mål_src = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        for (let i = 0; i < lyd_elementer.length; i++) {
            if((lyd_elementer[i].src).includes(mål_src)) {
                //spiller om sangen er pauset
                if (lyd_elementer[i].paused){
                    lyd_elementer[i].play();
                }
                //pauser om sangen spiller
                else{
                    lyd_elementer[i].pause();
                }
                break;
            }
        }
    }
    
    reset_sang(){

        let lyd_elementer = document.getElementsByClassName("lyd");
        let mål_src = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        //sjekker src til alle lyd elementer, om den 
        for (let i = 0; i < lyd_elementer.length; i++) {
            if((lyd_elementer[i].src).includes(mål_src)) {
                lyd_elementer[i].pause();
                lyd_elementer[i].currentTime = 0;
                break;
            }
        }
    }
}
class Spilleliste{

    constructor(){
        this.spilleliste_navn = ''
        this.sanger = []
        this.nåværende_lydspor_id = 0
        this.spill_modus = 'sekvensiell'
    }

    async lastinn_fra_json(path_json, spilleliste_navn){
        
        this.sanger = []
        this.path_json = path_json
        
        //gjør om til små bokstaver og fjerner whitespace
        spilleliste_navn = spilleliste_navn.toLowerCase().trim()
        this.spilleliste_navn = spilleliste_navn
        this.path_spilleliste = `spillelister/${this.spilleliste_navn}`

        this.innhold = await lastInn(`${this.path_json}${this.spilleliste_navn}.json`);
        this.innhold_objekt = JSON.parse(this.innhold)

        for (let i = 0; i < this.innhold_objekt.length; i++) {
            let sang_info = new Spor(this.innhold_objekt[i].tittel,
                this.innhold_objekt[i].artist,
                this.innhold_objekt[i].bildefil,
                this.innhold_objekt[i].lydfil,
                this.innhold_objekt[i].id,
                this.path_spilleliste
                )
                
            this.sanger.push(sang_info)
        }
        this.updater_nettside()
    }

    spill_sang_spilleliste(){

        //om spill_modus er satt til å spille sekvensiell øker sang index med 1 (eller til 0)
        if (this.spill_modus === 'sekvensiell'){
            //om slutten av spillelisten er nådd, begynner den på nytt, ellers er det bare sekvensiell som spilles
            if (this.nåværende_lydspor_id === this.sanger.length){
                this.nåværende_lydspor_id = 0
            }
            this.spill_sang()
        }

        //om sang modus er tilfeldig spilles av en tilfeldig sang(som ikke er samme sang som allerede spiller)
        else if (this.spill_modus === 'tilfeldig'){
            this.spill_random()
            }
        }

    spill_sang(){
        this.reset_nesten_alle_sanger(this.nåværende_lydspor_id)
        this.sanger[this.nåværende_lydspor_id].spill_pause_sang()
    }

    spill_random(){
        //random tall fra og med 0 til og med lengden på playlisten
        //velger ett nytt tilfedlig tall om det er det samme som forrige
        let ny_lydspor_id = Math.floor(Math.random() * this.sanger.length);
        while (ny_lydspor_id === this.nåværende_lydspor_id){
            ny_lydspor_id = Math.floor(Math.random() * this.sanger.length);
        }
        this.reset_nesten_alle_sanger()
        this.nåværende_lydspor_id = ny_lydspor_id
        this.sanger[this.nåværende_lydspor_id].spill_pause_sang()    
    }

    endre_modus(){
        if (this.spill_modus === 'sekvensiell'){
            this.spill_modus = 'tilfeldig'
        }
        else if (this.spill_modus === 'tilfeldig'){
            this.spill_modus = 'sekvensiell'
        }
    }

    reset_nesten_alle_sanger(unntak){
        for (let i = 0; i < this.sanger.length; i++) {
            //Om man trykker spill av igjen og har modus "sekvensiell", resets ikke sangen.
            if (i === unntak){
                continue
            }
            this.sanger[i].reset_sang();
        }
    }

    updater_nettside(){

        let kontainer = document.getElementById('kontainer_spilleliste')
        //fjerner innholdet til kontaineren.
        kontainer.replaceChildren()

        //lager spill av knappen
        let spillav = document.createElement("button");
        spillav.innerHTML = 'Spill av'
        spillav.id = ("spill_knapp");
        spillav.addEventListener("click", () => { 
            this.spill_sang_spilleliste(this.nåværende_lydspor_id)
        });

        kontainer.appendChild(spillav);

        //lager knappen hvor man kan endre avspillings modus
        let modus_knapp = document.createElement("button");
        modus_knapp.innerHTML = 'ENDRE MODUS'
        modus_knapp.id = ("modus");
        modus_knapp.addEventListener("click", () => {
            if (this.spill_modus === 'sekvensiell'){
                modus_knapp.style.backgroundColor = 'green'
            }
            else if (this.spill_modus === 'tilfeldig'){
                modus_knapp.style.backgroundColor = 'white'
            }
            this.endre_modus();
        });
        kontainer.appendChild(modus_knapp);

    //lager elmentene som inneholder informajsonene om bilde til sangen, tittel, artist, og lyden
    for (let i = 0; i < this.sanger.length; i++) {

        let sang_kort = document.createElement("div")  
        sang_kort.classList.add('sang_kort')
        kontainer.appendChild(sang_kort);

        let sang = document.createElement("div");
        sang.innerHTML = `${this.sanger[i].artist} - ${this.sanger[i].tittel}` ;
        sang.classList.add("album");
        sang_kort.appendChild(sang);

        let bilde = document.createElement("img")
        bilde.src = `${this.path_spilleliste}/${this.sanger[i].bildefil}`
        bilde.classList.add("bilde");
        sang_kort.appendChild(bilde);

        let lyd = document.createElement('audio');
        lyd.src = `${this.path_spilleliste}/${this.sanger[i].lydfil}`;
        lyd.addEventListener("ended", () => {
            //current_lysdpor_id blir 1 større enn den sangen som er avsluttet
            //om modus er "tilfeldig" spiller det ingen rolle
            this.nåværende_lydspor_id = parseInt(this.sanger[i].id) + 1
            this.spill_sang_spilleliste()
        });

        lyd.addEventListener("play", () => {
            this.nåværende_lydspor_id = parseInt(this.sanger[i].id)
            this.reset_nesten_alle_sanger(this.nåværende_lydspor_id)

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