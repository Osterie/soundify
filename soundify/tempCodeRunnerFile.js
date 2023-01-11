
fetchURL('./spillelister/innhold/pop.json')
    .then(response => response.text())
    .then(data => console.log(data));
