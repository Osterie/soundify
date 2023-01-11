
fetch('/test.txt')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    //    var div = document.getElementById("output");
    //    div.innerHTML = JSON.stringify(data);
    }) 
    .catch(error => {
        console.log('Error:', error);
    });

//! playlist = JSON.parse(filinnhold)


// var files = fs.readdirSync('./spillelister');

// for (let i = 0; i < files.length; i++) {
//     const para = document.createElement("p");
//     const node = document.createTextNode('hwi');
//     para.appendChild(node);

//     const element = document.getElementById("div1");
//     element.appendChild(para);
    
// }

// console.log(files)

class spor{

    constructor(){
        //new fetures here!
    }

}
class spilleliste{

    constructor(){

    }

}

