SOUNDIFY

Denne tekstfilen var laget med formatet markdown, som er en VS Code Extension med navn "Markdown All in One". 


Om prosjekt

I dette prosjektet skal vi lage en app som brukes til å spille musikk, ala spotify, hvor man kan gå inn på forskjellige spillelister der man kan spille av sanger. 

Github

Denne appen er laget av Adrian og Håkon.

Planlegging og arbeidsfordeling

I dette prosjektet startet vi først med å planlegge hvordan designet på appen skulle være, det vil si at vi lagde en wireframe som vi skulle holde oss til. Etter det fant vi ut at det var viktig å finne ut hvordan filstrukturen skulle være, slik at det blir lett for begge å arbeide uten at en av oss må forandre på den. Adrian hadde fokus hovedsakelig på backend og Håkon på frontend. Vi brukte github til å dele kode og begge hadde tilgang til å forandre på både frontend og backend. 

Hjemsiden til appen skal inneholde tittelen "Soundify" og spillelistene man kan trykke på for å få opp sangene til den spesifikke spillelisten. 

Når man trykker på en spilleliste, skal det komme opp 2 knapper, "Spill av og Sekvensiell". Man skal kunne trykke på en av disse knappene, og hvis man trykker på "Spill av", skal en sang spilles av. Trykker man på Sekvensiell, skal knappen byttes om til "Tilfeldig", og neste sang blir da tilfeldig valgt ut.

Backend plan



Hvordan vi lastet inn sangene


For at denne appen skal fungere, trengte vi å laste ned sanger og bruke JSON for å lese de inn. Dette gjorde vi ved å bruke JSON.parse.