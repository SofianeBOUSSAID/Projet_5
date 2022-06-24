const panier = JSON.parse(localStorage.getItem('panier'));
const urlApi = "http://localhost:3000/api/products";
let totalArticle = 0;
let prixTotal = 0;


    let pan = panier;



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
                    
                    let article = document.createElement('article');
                    let imgDiv = document.createElement('div');
                    let img = document.createElement('img');
                    let descri = document.createElement('div');
                    let inputDiv = document.createElement('div');
                    let input = document.createElement('input');
                    let supp = document.createElement('div');
                    let qte = document.createElement('p');
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
                    inputDiv.className = 'cart__item__content__settings';
                    inputDiv.innerHTML += '<div class="cart__item__content__settings__quantity"> ';
                    input.type = 'number';
                    input.className = "itemQuantity";
                    input.name = "itemQuantity";
                    input.min = "1";
                    input.max = "100";
                    input.value = x.quantite;
                    qte.innerHTML = '<p>Qté : ' + x.quantite +' </p>';
                    
                    //
                    supp.className += 'cart__item__content__settings__delete'
                    supp.innerHTML += '<p class="deleteItem">Supprimer</p>'
                    //
                    document.querySelector("#cart__items").append(article);
                    article.append(imgDiv);
                    imgDiv.append(img);
                    article.append(descri);
                    article.append(inputDiv);
                    inputDiv.append(input);
                    inputDiv.append(qte);
                    inputDiv.append(supp);
                    //
                    totalArticle += x.quantite;
                    prixTotal += x.quantite * y.price;
                    document.querySelector('#totalQuantity').textContent = totalArticle;
                    document.querySelector('#totalPrice').textContent = prixTotal + ",00";
                    //
                    input.addEventListener("change", ()=>{
                        if (input.value > 100) {
                            alert('Quantité maximale (100) dépassée.')
                            input.value = 100;
                        }
                        x.quantite = input.value;
                        qte.innerHTML = '<p>Qté : ' + x.quantite +' </p>';
                        // localStorage.setItem('panier', JSON.stringify(panier))
                        // console.log(panier[0])
                        console.log(pan)
                    })
                }
            }
        }
        
    } catch {
        alert("Une erreur est survenue !");
    }
    
}
infos();






