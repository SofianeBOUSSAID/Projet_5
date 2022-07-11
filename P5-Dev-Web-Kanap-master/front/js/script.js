// Je récupère l'url de l'API
const url = "http://localhost:3000/api/products";

// J'utilise une fonction async pour récuperer les données de l'API
async function produitInfos() {
    
    try {
        const requete = await fetch(url,{
            method: "GET"
        })

        // Je stock la réponse dans la variable "donnees"
        let donnees = await requete.json();

        // J'utilise une boucle "for of" pour créer des éléments pour chacun des produits présent dans l'API
        for(x of donnees) {
            let lien = document.createElement('a');
            lien.href =  `./product.html?id=${x._id}`;
            document.querySelector("#items").append(lien);
            
            let article = document.createElement("article");
            lien.append(article);
            
            let image = document.createElement("img");
            image.src = x.imageUrl;
            image.alt = x.altTxt;
            article.append(image);
            
            
            let nom = document.createElement("h3");
            nom.textContent = x.name;
            nom.className = "productName";
            article.append(nom);
            
            let description = document.createElement("p");
            description.textContent = x.description;
            description.className = "productDescription";
            article.append(description);
        }
    } catch {
        // Si il problème survient une alert apparait
        alert("Une erreur est survenue !");
    }
}

//J'exécute la fonction
produitInfos();
