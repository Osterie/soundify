class Spor{

    constructor(artist, tittel, bildefil, lydfil, id, path_bilde_lyd){
        this.artist = artist
        this.tittel = tittel
        this.bildefil = bildefil
        this.lydfil = lydfil
        this.path_bilde_lyd = path_bilde_lyd
        this.id = id
    }

    //spiller sangen om den ikke spiller, pauser om den spilles
    spill_pause_sang(){

        const lyd_elementer = document.getElementsByClassName("lyd");
        const mål_src = `${this.path_bilde_lyd}/${this.lydfil}`;
        
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
    
    //sangen sin tid resetes til null og den pauses, kan brukes når en ny sang spilles av og den tidligere sangen sin spilltid skal resetes
    reset_sang(){

        const lyd_elementer = document.getElementsByClassName("lyd");

        //Dette er kun pathen til dette objektets lydfil.
        const mål_src = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        //sjekker src til alle lyd elementer, om den 
        for (let i = 0; i < lyd_elementer.length; i++) {
            if((lyd_elementer[i].src).includes(mål_src)) {
                lyd_elementer[i].pause();
                lyd_elementer[i].currentTime = 0;
                break;
            }
        }
    }

    //sangen sin tid resetes til null
    reset_tid(){
        const lyd_elementer = document.getElementsByClassName("lyd");
        const mål_src = `${this.path_bilde_lyd}/${this.lydfil}`;
        
        //sjekker src til alle lyd elementer, om den 
        for (let i = 0; i < lyd_elementer.length; i++) {
            if((lyd_elementer[i].src).includes(mål_src)) {
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
    
        //Husker de tidligere spilte sanger, kun for tilfeldig spill modus
        this.spilte_sanger_indexer = []
        //id for hvor i arrayen vi er
        this.spilte_sanger_index = -1
        //forteller om sangen som spiller er del av this.spilte_sanger_indexer
        this.old_songs = false

    }

    async lastinn_fra_json(path_json, spilleliste_navn){
        
        
        //Kort sagt: Spilleliste objekter kan kun inneholde informasjonen til en spilleliste.
        
        //Lengre: I tilfelle en ny spilleliste lastes inn for klass objektet som lages,
        //nullstilles informajsonen til spillelisten, det sikrer at det kun være 
        //en spilleliste sitt innhold i hvert "Spilleliste" klasse objekt som lages.
        this.sanger = []
        this.nåværende_lydspor_id = 0
        this.spilte_sanger_indexer = []
        this.spilte_sanger_index = -1
        this.old_songs = false

        
        this.spilleliste_navn = spilleliste_navn.toLowerCase().trim()
        this.path_spilleliste = `spillelister/${this.spilleliste_navn}`

        this.innhold = await lastInn(`${path_json}${this.spilleliste_navn}.json`);
        this.innhold_objekt = JSON.parse(this.innhold)

        //Lagrer informajsonen fra JSON filen som et klasse objekt (Spor klassen) og legger klass object inn i en array (sanger)
        for (let i = 0; i < this.innhold_objekt.length; i++) {
            const sang_info = new Spor(this.innhold_objekt[i].tittel,
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

    spill_sang_spilleliste(sang_index){

        //om spill_modus er satt til å spille sekvensiell øker sang index med 1 (eller til 0)
        if (this.spill_modus === 'sekvensiell'){
            this.spill_sekvensiell(sang_index)
        }

        //om sang modus er tilfeldig spilles av en tilfeldig sang(som ikke er samme sang som allerede spiller)
        else if (this.spill_modus === 'tilfeldig'){
            this.spill_random(sang_index)
        }
    }

    spill_sekvensiell(sang_index){
        //om slutten av spillelisten er nådd, begynner den på nytt, ellers er det bare sekvensiell som spilles
        if (sang_index === this.sanger.length){
            sang_index = 0
        }
        else if (sang_index === -1){
            sang_index = this.sanger.length -1
        }
        this.nåværende_lydspor_id = sang_index
        this.reset_nesten_alle_sanger(this.nåværende_lydspor_id)
        this.sanger[this.nåværende_lydspor_id].spill_pause_sang()
    }

    spill_random(gammelt_lydspor_id){
        //random tall fra og med 0 til og med lengden på playlisten
        //velger ett nytt tilfedlig tall om det er det samme som forrige
        let ny_lydspor_id = Math.floor(Math.random() * this.sanger.length);
        while (ny_lydspor_id == gammelt_lydspor_id){
            ny_lydspor_id = Math.floor(Math.random() * this.sanger.length);
        }

        this.reset_nesten_alle_sanger(ny_lydspor_id)
        this.nåværende_lydspor_id = ny_lydspor_id
        this.sanger[this.nåværende_lydspor_id].spill_pause_sang()   
    }

    endre_spill_modus(nytt_modus){

        if (nytt_modus === 'sekvensiell'){
            this.spill_modus = 'sekvensiell'
            this.modus_knapp.innerHTML = 'Sekvensiell'
            this.modus_knapp.style.backgroundColor = 'red'
        }
        else if (nytt_modus === 'tilfeldig'){
            this.spill_modus = 'tilfeldig'
            this.modus_knapp.innerHTML = 'Tilfeldig'
            this.modus_knapp.style.backgroundColor = 'yellow'
        }
    }

    //reseter alle sanger, utenom unntak sangen, som den nye sangen som skal spilles av.
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

        const kontainer = document.getElementById('kontainer_spilleliste')
        
        //fjerner innholdet til kontaineren.
        kontainer.replaceChildren()

        if(this.bunn_bar){
            this.bunn_bar.remove()
            this.bunn_bar = undefined
            this.spill_pause_lyd = undefined
            this.skip_baklengs_sang_knapp = undefined
            this.skip_sang_knapp = undefined
        }

        //lager spill av knappen
        const spillav = document.createElement("button");
        spillav.innerHTML = 'Spill av'
        spillav.id = ("spill_knapp");
        spillav.addEventListener("click", () => { 
            //TODO: add this.spilte_sanger her!
            this.spill_sang_spilleliste(this.nåværende_lydspor_id)
        });

        // this.hendelser_bunn_bar(this.nåværende_lydspor_id)
        kontainer.appendChild(spillav);

        //lager knappen hvor man kan endre avspillings modus
        this.modus_knapp = document.createElement("button");
        this.modus_knapp.id = ("modus_knapp");

        this.modus_knapp.addEventListener("click", () => {
            if (this.spill_modus === 'sekvensiell'){
                this.endre_spill_modus('tilfeldig');
            }
            else if (this.spill_modus === 'tilfeldig'){
                this.endre_spill_modus('sekvensiell');
            }
        });

        if (this.spill_modus === 'sekvensiell'){
            this.modus_knapp.innerHTML = 'Sekvensiell'
            this.modus_knapp.style.backgroundColor = 'red'
        }
        else if (this.spill_modus === 'tilfeldig'){
            this.modus_knapp.innerHTML = 'Tilfeldig'
            this.modus_knapp.style.backgroundColor = 'yellow'
        }

        kontainer.appendChild(this.modus_knapp);


        //lager elmentene som inneholder informajsonene om bilde til sangen, tittel, artist, og lyden
        for (let i = 0; i < this.sanger.length; i++) {

            const innhold_kort = document.createElement("div")  
            innhold_kort.classList.add('innhold_kort')
            kontainer.appendChild(innhold_kort);

            const artist_tittel = document.createElement("p1");
            artist_tittel.classList.add("album");
            artist_tittel.innerHTML = `${this.sanger[i].artist} - ${this.sanger[i].tittel}` ;
            innhold_kort.appendChild(artist_tittel);

            const bilde = document.createElement("img")
            bilde.classList.add("bilde");
            bilde.src = `${this.path_spilleliste}/${this.sanger[i].bildefil}`
            innhold_kort.appendChild(bilde);

            const lyd = document.createElement('audio');
            lyd.classList.add('lyd')
            lyd.src = `${this.path_spilleliste}/${this.sanger[i].lydfil}`;
            lyd.autoplay = false;
            lyd.controls = true;      
            
            lyd.addEventListener("ended", () => {
                this.nåværende_lydspor_id = parseInt(this.sanger[i].id) + 1
                this.spill_sang_spilleliste(this.nåværende_lydspor_id)
                this.hendelser_bunn_bar(this.sanger[this.nåværende_lydspor_id])
            });

            lyd.addEventListener("play", () => {

                if (this.spill_modus === 'tilfeldig' && this.old_songs === false){
                    if (this.spilte_sanger_indexer[this.spilte_sanger_indexer.length - 1] != this.nåværende_lydspor_id) {
                        this.spilte_sanger_indexer.push(this.nåværende_lydspor_id)
                        this.spilte_sanger_index += 1
                    }
                }

                this.nåværende_lydspor_id = parseInt(this.sanger[i].id)
                this.reset_nesten_alle_sanger(this.nåværende_lydspor_id)
                this.hendelser_bunn_bar(this.sanger[this.nåværende_lydspor_id])
                //endrer nåværende_lydsport_id til id-en til sangen som blir valgt å spilles av
                //manuelt av bruker
            });

            lyd.addEventListener("pause", () => {
                spill_pause_tilstand(this.spill_pause_lyd)
            });

            innhold_kort.appendChild(lyd);
        }
    }

    //lager en "bottom bar"
    hendelser_bunn_bar(spor){
        
        if (!this.bunn_bar){
            this.bunn_bar = document.createElement("div");
            this.bunn_bar.id = ("bunn_bar");
            document.body.appendChild(this.bunn_bar);
        }


        if (!this.skip_baklengs_sang_knapp){

            this.skip_baklengs_sang_knapp = document.createElement("button")
            this.bunn_bar.appendChild(this.skip_baklengs_sang_knapp); 
            
            this.skip_baklengs_sang_img = document.createElement("img");
            this.skip_baklengs_sang_img.src = "./bilder/previous_track_button.png"
            this.skip_baklengs_sang_img.id = ("skip_baklengs_sang_img");
            this.skip_baklengs_sang_knapp.appendChild(this.skip_baklengs_sang_img); 
    
            this.skip_baklengs_sang_knapp.addEventListener('click', () => {
                if (this.spill_modus === 'sekvensiell'){
                    this.nåværende_lydspor_id -= 1
                    this.spill_sang_spilleliste(this.nåværende_lydspor_id)
                }
    
                else if (this.spill_modus == 'tilfeldig'){

                    if (this.spilte_sanger_index > 0){
                        this.old_songs = true
                        this.spilte_sanger_index -= 1
                        this.sanger[(this.spilte_sanger_indexer[this.spilte_sanger_index])].spill_pause_sang()
                    }
                    else{
                        //Første sang i "spilte sanger" arrayen, derfor resets bare tiden
                        this.sanger[(this.spilte_sanger_indexer[this.spilte_sanger_index])].reset_tid()
                    }
                }
            })
        }


        if(!this.spill_pause_lyd){
            this.spill_pause_lyd = document.createElement('button')
            this.spill_pause_lyd.classList.add('spill_pause_knapp')            
            this.spill_pause_lyd.classList.add('knapp_pauset')  
            spill_pause_tilstand(this.spill_pause_lyd)

            bunn_bar.appendChild(this.spill_pause_lyd);

            this.spill_pause_lyd.addEventListener('click', () => {
                this.sanger[this.nåværende_lydspor_id].spill_pause_sang()
            })
        }

        spill_pause_tilstand(this.spill_pause_lyd)

        if (!this.skip_sang_knapp) {

            this.skip_sang_knapp = document.createElement("button")
            this.bunn_bar.appendChild(this.skip_sang_knapp); 

            this.skip_sang_img = document.createElement("img");
            this.skip_sang_img.src = "./bilder/next_track_button_larger.png"
            this.skip_sang_img.id = ("skip_sang_img");
            this.skip_sang_knapp.appendChild(this.skip_sang_img); 

            this.skip_sang_knapp.addEventListener('click', () => {
                if (this.spill_modus == 'sekvensiell'){
                    this.nåværende_lydspor_id += 1
                    this.spill_sang_spilleliste(this.nåværende_lydspor_id)
                }
                else if (this.spill_modus == 'tilfeldig'){


                    if (this.spilte_sanger_index < this.spilte_sanger_indexer.length - 1){
                        this.old_songs = true
                        this.spilte_sanger_index += 1
                        this.sanger[(this.spilte_sanger_indexer[this.spilte_sanger_index])].spill_pause_sang()
                    }
                    else{
                        this.old_songs = false
                        this.spill_sang_spilleliste(this.nåværende_lydspor_id)
                    }
                }
            })
        }    
    }
}

//TODO kan bruke arv
// new Spilleliste_gui