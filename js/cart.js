var productosCarrito = [];
var subtotal = 0;
var entrada = [];
var htmlToAppend = "";
var moneda = "";

function mostrarSubtotal(){//creo el elemento de la tabla que contendra el costo de todos los productos del carrito
    let html = "";
    html += `
    <tr>
    <td></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle">Total</td>
    <td class="align-middle" id="total">${subtotal}</td>
    </tr>`
    return  html;
}

/*completa la función para actualizar el subtotal del producto al modificar la cantidad del mismo*/
function updateProductoSubtotal(moneda){
    subtotal = 0;//vacio el subtotal para poder calcular el nuevo subtotal con las nuevas cantidades de productos
    entrada = document.getElementsByName("producto");//selecciono todos los elementos de mi tabla de tipo input 
    let i = 0;
    let result = 0;
    for (let article of productosCarrito){//recorro el arreglo de productos para saber el precio de ellos 
        if (entrada[i].value<1) {//compruebo que no se ingreses un numero menor a 1 en el input
            entrada[i].value = 1;
        }
        if (moneda === "UYU") {//verifico que tipo de moneda es la que se mostrara
            if (article.currency==="USD") {//hago conversion si es necesario
                result = ((article.unitCost*40)*entrada[i].value);
                subtotal = subtotal + result;
            }else{         
                result = (article.unitCost*entrada[i].value);
                subtotal = subtotal + result; 
            }

        }else{
            if (article.currency === "UYU") {//hago conversion si es necesario
                result = ((article.unitCost/40)*entrada[i].value);
                subtotal = subtotal + result;
            }else{
                result = (article.unitCost*entrada[i].value);
                subtotal = subtotal + result; 
            }
        }
       
        document.getElementById(i).innerHTML = result.toString();//trasformo el resultado del total por producto en string para poder mostrarlo en el html
        i=i+1;
    }
    document.getElementById("total").innerHTML = subtotal.toString(); //transformo el subtotal en string para poder mostrarlo en el html
}


function showCarrito(moneda){

    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
     htmlToAppend = "";
    let j =0;
    
    for(let article of productosCarrito){//recorremos todos los productos a mostrar en el carrito
        if (moneda === "UYU") {//evaluamos en que tipo de moneda debemos mostrar los productos

            if (article.currency ==="USD") {//con este if hago la conversion de moneda en caso de ser necesario
           
                htmlToAppend += `
                <tr>
                <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
                <td class="align-middle">${article.name}</td>
                <td class="align-middle">UYU  ${article.unitCost*40}</td>
                <td class="align-middle"><input type="number" min ="1" value=${article.count} onchange="updateProductoSubtotal(moneda)" name="producto"></td>
                <td class="align-middle" id="${j}">${(article.unitCost*40)*article.count}</td>
                </tr>`
                subtotal = subtotal + ((article.unitCost*40)*article.count);
            }else{
                htmlToAppend += `
                   <tr>
                   <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
                   <td class="align-middle">${article.name}</td>
                   <td class="align-middle">${article.currency} ${article.unitCost}</td>
                   <td class="align-middle"><input type="number" min ="1" value=${article.count} onchange="updateProductoSubtotal(moneda)" name="producto"></td>
                  <td class="align-middle" id="${j}">${article.unitCost*article.count}</td>
                   </tr>`
                   subtotal = subtotal + (article.unitCost*article.count);
                       }

            
        }else{
            if (article.currency ==="UYU") {//con este if hago la conversion de moneda en caso de ser necesario
                htmlToAppend += `
                <tr>
                <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
                <td class="align-middle">${article.name}</td>
                <td class="align-middle">UYU  ${article.unitCost/40}</td>
                <td class="align-middle"><input type="number" min ="1" value=${article.count} onchange="updateProductoSubtotal(moneda)" name="producto"></td>
                <td class="align-middle" id="${j}">${(article.unitCost/40)*article.count}</td>
                </tr>`
                subtotal = subtotal + ((article.unitCost/40)*article.count);
            }
            else{
                htmlToAppend += `
              <tr>
              <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
              <td class="align-middle">${article.name}</td>
              <td class="align-middle">${article.currency} ${article.unitCost}</td>
               <td class="align-middle"><input type="number" min ="1" value=${article.count} onchange="updateProductoSubtotal(moneda)" name="producto"></td>
               <td class="align-middle" id="${j}">${article.unitCost*article.count}</td>
               </tr>`
              subtotal = subtotal + (article.unitCost*article.count);
            }
        }
        j = j+1;
       
    }
    htmlToAppend += mostrarSubtotal(); //muestro el subtotal que viene precargado
    document.getElementById("carrito").innerHTML = htmlToAppend;//muestro productos en html


}

//Función que se ejecuta una vez que se haya lanzado el evento de  
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Mostramos datos desde la siguiente url CART_INFO_URL
document.addEventListener("DOMContentLoaded", function(e){
  //  getJSONData(CART_INFO_URL).then(function(resultObj){
      getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){
        if (resultObj.status === "ok") {
            productosCarrito = resultObj.data.articles;
           moneda = "UYU";
           
            showCarrito("UYU");
        }
    });
//evento de los input de tipo radio que nos permiten cambiar el tipo de moneda que se mostrara el costo de los productoss
    document.getElementById("monedaUYU").addEventListener("click", function(){
        subtotal = 0;
        moneda = "UYU";
        
        showCarrito("UYU");
    });
    document.getElementById("monedaUSD").addEventListener("click", function(){
        subtotal = 0;
        moneda = "USD";
        
        showCarrito("USD");
    });
});