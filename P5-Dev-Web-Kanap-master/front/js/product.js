// Je récupère l'url de l'API
const urlApi = "http://localhost:3000/api/products/";
// Je récupère l'url du navigateur
var str = window.location.href;
var url = new URL(str);

let search = new URLSearchParams(url.search);


// Je cherche le paramètre "id" dans l'url
if(search.has('id')){
    var id = search.get("id");
}

// J'utilise une fonction async pour récuperer les données de l'API
async function infos() {
    try {
        const requete = await fetch(urlApi,{
            method: "GET"
        })
        // Je stock la réponse dans la variable "donnees"
        var donnees = await requete.json();
        
        for(x of donnees){
            // Si le paramètre "id" de l'url est le même que celui d'un produit de l'API il s'affiche
            // Cela permet de d'afficher le bon produit
            // Création des éléments pour le produit
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


// Création de la classe "Article"
class Article{ 
    constructor (id, quantite, couleur){
        this.id = id,
        this.quantite = quantite,
        this.couleur = couleur
    }
}

// Création du tableau panier
var panier = [];


let ajout = document.querySelector("#addToCart");

// Création de la fonction permettant de mettre à jouer/créer le panier dans le LocalStorage
function saveBasket(panier) {
    localStorage.setItem('panier', JSON.stringify(panier))
}

// Création de la fonction permettant de récupérer le panier du LocalStorage
function getBasket() {
    return (JSON.parse(localStorage.getItem("panier")) || [])
}

// Création d'un événement sur le boutton
ajout.addEventListener("click",()=>{
    let quantite = parseInt(document.querySelector("#quantity").value);
    let couleurChoisie = document.querySelector('#colors').value;
    if (quantite < 1 || quantite > 100 || couleurChoisie == "") { 
        return alert('Selectionnez entre 1 et 100 articles et une couleur.');
    }
    //Récupération du panier
    let panier = getBasket();
    // Création d'un objet à partir de la classe "Article"
    article = new Article(id, quantite, couleurChoisie);
    
    const itemIndex = panier.findIndex(item => {
        return item.id == article.id && item.couleur == article.couleur
    })
    
    // Addition de la quantité si doublon
    if (itemIndex >= 0) {
        panier[itemIndex].quantite += article.quantite
        // Maximisation de la quantité à 100
        if(panier[itemIndex].quantite > 100){
            panier[itemIndex].quantite = 100;
            alert("Quantité maximale dépassée. Quantité actualisée à 100.")
        }
    }

    else {
        // Ajout de l'article dans le tableau panier
        panier.push(article)
    }
    //Sauvegarde du panier
    saveBasket(panier)
    alert("Actualisation du panier.");
});


// Input passage de commande => message d'erreur
// stephnguets@yahoo.fr