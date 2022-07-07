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
    alert("Selection ajoutée au panier.")
});


