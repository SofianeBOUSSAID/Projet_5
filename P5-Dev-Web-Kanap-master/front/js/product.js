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
                    option.textContent = colors;
                    document.querySelector('#colors').append(option);

                }
            }
        }
        
    } catch{
        console.log("Une erreur est survenue...")
    }
}

infos();