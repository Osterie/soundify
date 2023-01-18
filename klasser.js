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

        // container.appendChild(spillav);

        let modus = document.createElement("button");
        modus.innerHTML = 'ENDRE MODUS'
        modus.id = ("modus");
        // container.appendChild(modus);


    
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

        let audio = document.createElement('audio');
        audio.src = `${this.path_playlist}/${this.sanger[i].lydfil}`;
        audio.autoplay = false;
        audio.controls = true;

        sang_kort.appendChild(audio);
        }
    }
}
