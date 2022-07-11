let str = window.location.href;
let url = new URL(str);

let search = new URLSearchParams(url.search);

if(search.has('id')){
    var id = search.get("id");
}
else{
    var id = "Vous n'avez rien commandé."
}

let text = document.querySelector('#orderId');

text.textContent = id;