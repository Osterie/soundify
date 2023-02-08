function lastInn(filnavn) {
    return fetch(filnavn).then((response) => response.text() );
}