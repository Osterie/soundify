function lastInn(filnavn) {
    return fetch(filnavn).then((response) => response.text() );
}

function spill_pause_tilstand(spill_pause_knapp){
    console.log(spill_pause_knapp.classList)

    if (spill_pause_knapp.classList.value.includes('knapp_pauset')){
        spill_pause_knapp.classList.remove('knapp_pauset')
        spill_pause_knapp.classList.add('knapp_spiller')
    }
    else if (spill_pause_knapp.classList.value.includes('knapp_spiller')){
        spill_pause_knapp.classList.remove('knapp_spiller')
        spill_pause_knapp.classList.add('knapp_pauset')
    }
}
