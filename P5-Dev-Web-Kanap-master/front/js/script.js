const url = "http://localhost:3000/api/products";


async function produitInfos() {
    
    try {
        const requete = await fetch(url,{
            method: "GET"
        })

        let donnees = await requete.json();

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
        alert("Une erreur est survenue !");
    }
}

produitInfos();
