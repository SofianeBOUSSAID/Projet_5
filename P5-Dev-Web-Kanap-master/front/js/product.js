const urlApi = "http://localhost:3000/api/products";
var str = window.location.href;
var url = new URL(str);

let search = new URLSearchParams(url.search);

if(search.has('id')){
    var id = search.get("id");
    

}
console.log(id);

