const urlApi = "http://localhost:3000/api/products/";
let str = window.location.href;
let url = new URL(str);

let search = new URLSearchParams(url.search);

if(search.has('id')){
    var id = search.get("id");
}

let text = document.querySelector('#orderId');

text.textContent = id;