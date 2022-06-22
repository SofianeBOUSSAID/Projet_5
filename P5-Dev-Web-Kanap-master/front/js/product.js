const urlApi = "http://localhost:3000/api/products/";
var str = window.location.href;
var url = new URL(str);

let search = new URLSearchParams(url.search);



if(search.has('id')){
    var id = search.get("id");
}

async function infos() {
    try {
        const requete = await fetch(urlApi,{
            method: "GET"
        })
        var donnees = await requete.json();
        
        for(x of donnees){
            if(x._id === id){
                let image = document.createElement("img");
                image.src = x.imageUrl;
                image.alt = x.altTxt;
                document.querySelector(".item__img").append(image);
                
                let title = document.createElement('h1')
                title.textContent = x.name;
                document.querySelector('#title').append(title);
                
                document.querySelector("#price").textContent= x.price;
                
                document.querySelector('#description').textContent = x.description;
                
                
                
                for(colors of x.colors) {
                    let option = document.createElement("option");
                    option.value = colors;
                    option.textContent = colors;
                    document.querySelector('#colors').append(option);
                    
                    
                }
            }
        }
        
    } catch{
        console.log("Une erreur est survenue...");
    }
}

infos();



class Article{ 
    constructor (id, quantite, couleur){
        this.id = id,
        this.quantite = quantite,
        this.couleur = couleur
    }
}

var panier = [];


let ajout = document.querySelector("#addToCart");


function saveBasket(panier) {
    localStorage.setItem('panier', JSON.stringify(panier))
}

function getBasket() {
    return (JSON.parse(localStorage.getItem("panier")) || [])
}

ajout.addEventListener("click",()=>{
    let quantite = parseInt(document.querySelector("#quantity").value);
    console.log(quantite)
    let couleurChoisie = document.querySelector('#colors').value;
    if (quantite < 1 || quantite > 100 || couleurChoisie == "") { 
        return alert('Selectionnez entre 1 et 100 articles et une couleur.');
    }
    
    let panier = getBasket()
    article = new Article(id, quantite, couleurChoisie);
    
    const itemIndex = panier.findIndex(item => {
        return item.id == article.id && item.couleur == article.couleur
    })
    
    if (itemIndex >= 0) {
        panier[itemIndex].quantite += article.quantite
    } else {
        panier.push(article)
    }
    
    saveBasket(panier)
});

/*
let pan = JSON.parse(localStorage.getItem('panier'));
let quantite = parseInt(document.querySelector("#quantity").value);
let couleurChoisie = document.querySelector('#colors').value;
article = new Article(id, quantite, couleurChoisie);
if (0 >= quantite || quantite > 100 || couleurChoisie == "") {
    return alert('Selectionnez entre 1 et 100 articles et une couleur.');
}
if (!localStorage.getItem("panier")) {
    panier.push(article);
    return localStorage.setItem('panier', JSON.stringify(panier));
}
else if(pan.length>0) {
    for(x of pan){
        console.log(x);
        if (x.id == article.id && x.couleur == article.couleur) {
            // parseInt(x.quantite) += parseInt(quantite);
            x.quantite = parseInt(x.quantite) + parseInt(quantite);
            x.quantite >100 && (x.quantite = 100, alert("Nombre d'article maximum dépassé, nombre actualisé à 1OO."));
            // Short circuit
            localStorage.setItem('panier', JSON.stringify(pan));
            return alert("Sélection ajoutée au panier.");
        }
        
    }
}
pan.push(article);
return localStorage.setItem('panier', JSON.stringify(pan));
*/



