/*
class Basket {
    constructor(items) {
        this.items = items
    }
    
    static fetch() {
        const localValue = localStorage.getItem('panier')
        const json = JSON.parse(localValue) || []
        return Basket(json)
    }
    
    save() {
        localStorage.setItem('panier', JSON.stringify(this));
    }
}

class BasketItem {
    constructor(id, quantity, couleur) {
        this.id = id
        this.quantity = quantity
        this.couleur = couleur
    }
}
*/

const panier = JSON.parse(localStorage.getItem('panier'));
let urlApi = "http://localhost:3000/api/products/";
const prixTotalCalcul = [];
const quantiteTotalCalcul = [];

function getBasket() {
    const panier = JSON.parse(localStorage.getItem('panier'));
    return panier || [];
}

function saveBasket(basket) {
    localStorage.setItem('panier', JSON.stringify(basket));
}

// Fonction modifier la quantité d'article

function updateBasketItem(item, newQuantity) {
    console.log("update quantity for " + item.id + " at " + newQuantity);
    const basket = getBasket()
    const index = basket.findIndex(canap => { return canap.id == item.id && canap.couleur == item.couleur})
    if (index >= 0) {
        basket[index].quantite = parseInt(newQuantity)
        quantiteTotalCalcul[index] = parseInt(newQuantity)
        console.log(quantiteTotalCalcul)
        saveBasket(basket);
    }
}

// Fonction supprimer l'article

function deleteItem(article, item) {
    console.log(`L'article ${item.id} de couleur ${item.couleur} a bien été supprimé.`)
    const panier = getBasket();
    const index = panier.findIndex(article => { return article.id == item.id && article.couleur == item.couleur} )
    console.log(panier[index]);
    
    panier.splice(index,1);
    saveBasket(panier);
}

// Calcul des totaux

function totalCalcul(){
    let totalPrice = 0;
    let totalQuantity = 0;
    for (let i = 0; i < prixTotalCalcul.length; i++) {
        totalQuantity += parseInt(quantiteTotalCalcul[i]);
        totalPrice += parseInt(prixTotalCalcul[i]) * parseInt(quantiteTotalCalcul[i]) ;
    }
    document.getElementById('totalQuantity').textContent = totalQuantity;
    document.getElementById('totalPrice').textContent = totalPrice;
    console.log(totalPrice)
    }

// Fontion d'affichage de l'article

function articleDiv(canap, donnees) {
    let article = document.createElement('article');
    let imgDiv = document.createElement('div');
    let img = document.createElement('img');
    let descri = document.createElement('div');
    let inputDiv = document.createElement('div');
    let input = document.createElement('input');
    let supp = document.createElement('div');
    let qte = document.createElement('p');  
    let price = donnees.price;
    let quantite = canap.quantite;
    
    article.className = "cart__item";
    article.setAttribute('data-id', canap.id);
    article.setAttribute('data-colors', canap.couleur);
    //
    imgDiv.className = "cart__item__img";
    //
    img.src = donnees.imageUrl;
    img.alt = donnees.altTxt;
    // 
    descri.className = 'cart__item__content__description';
    descri.innerHTML += '<h2>' + donnees.name + '</h2><p>' + canap.couleur + '</p><p>' + price +' €</p>'
    
    //
    inputDiv.className = 'cart__item__content__settings';
    inputDiv.innerHTML += '<div class="cart__item__content__settings__quantity"> ';
    input.type = 'number';
    input.className = "itemQuantity";
    input.name = "itemQuantity";
    input.min = "1";
    input.max = "100";
    input.value = quantite;
    qte.innerHTML = '<p>Qté : ' + quantite +' </p>';
    //
    
    
    //
    supp.className += 'cart__item__content__settings__delete'
    supp.innerHTML += '<p class="deleteItem">Supprimer</p>'
    //
    
    article.append(imgDiv);
    imgDiv.append(img);
    article.append(descri);
    article.append(inputDiv);
    inputDiv.append(input);
    inputDiv.append(qte);
    inputDiv.append(supp);
    
    prixTotalCalcul.push(price);
    quantiteTotalCalcul.push(quantite);
    
    input.addEventListener("input", (event) => {
        updateBasketItem(canap, input.value);
        qte.innerHTML = '<p>Qté : ' + event.target.value +' </p>';
        totalCalcul();
    });
    
    supp.addEventListener('click',(event)=>{
        if (confirm('Voulez-vous supprimer cet article de votre panier?')) {
            deleteItem(article, canap);
            article.remove();
            location.reload();
        }
    })
    totalCalcul();
    
    return article
}

async function infos() {
    const itemsSection = document.querySelector("#cart__items");
    
    for (canap of panier) {
        const res = await fetch("http://localhost:3000/api/products/" + canap.id);
        const donnees = await res.json();
        const article = articleDiv(canap, donnees);
        itemsSection.appendChild(article);
    }
}
infos();
