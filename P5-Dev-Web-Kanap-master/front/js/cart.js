const panier = JSON.parse(localStorage.getItem('panier'));
const urlApi = "http://localhost:3000/api/products";
let totalArticle = 0;
let prixTotal = 0;



async function infos() {
    
    try {
        const requete = await fetch(urlApi,{
            method: "GET"
        })
        let donnees = await requete.json();
        
        for (x of panier) {
            for (y of donnees) {
                if (x.id == y._id) {

                    quantite = x.quantite;
                    console.log(quantite)
                    
                    let article = document.createElement('article');
                    let imgDiv = document.createElement('div');
                    let img = document.createElement('img');
                    let descri = document.createElement('div');
                    let input = document.createElement('div');
                    let supp = document.createElement('div');
                    imgDiv.className = "cart__item__img"
                    //
                    article.className = "cart__item";
                    article.setAttribute('data-id', x.id);
                    article.setAttribute('data-colors', x.couleur);
                    //
                    img.src = y.imageUrl;
                    img.alt = y.altTxt;
                    // 
                    descri.className = 'cart__item__content__description';
                    descri.innerHTML += '<h2>' + y.name + '</h2><p>' + x.couleur + '</p><p>' + y.price +' €</p>'

                    //
                    input.className = 'cart__item__content__settings'
                    input.innerHTML += '<div class="cart__item__content__settings__quantity"> <p>Qté : ' + x.quantite +' </p> <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value='+ x.quantite +'>'
                    //
                    supp.className += 'cart__item__content__settings__delete'
                    supp.innerHTML += '<p class="deleteItem">Supprimer</p>'
                    //
                    document.querySelector("#cart__items").append(article);
                    article.append(imgDiv);
                    imgDiv.append(img);
                    article.append(descri);
                    article.append(input);
                    input.append(supp);
                    //
                    totalArticle += x.quantite;
                    prixTotal += x.quantite * y.price;
                    document.querySelector('#totalQuantity').textContent = totalArticle;
                    document.querySelector('#totalPrice').textContent = prixTotal + ",00";
                    
                }
            }
        }
        
    } catch {
        alert("Une erreur est survenue !");
    }
    
}

infos();










