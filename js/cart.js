var productosCarrito = [];
var subtotal;
var entrada = [];
var htmlToAppend = "";
var moneda = "";
var aux;

function volverButton(){
    aux.className +="active";
}

function busquedaButton(){
    let boton = document.getElementsByName("labeloptions");
    let i = 0;
    while (!boton[i].className.includes("active")){
        i += 1;
    };
    aux = boton[i];
    boton[i].className = boton[i].className.replace("active","");
  //  boton[i].className = boton[i].replace("focus","");
}
function busquedaEnvio(){
    let envios = document.getElementsByName("envio");
    let i = 0;
    while (!(envios[i].checked)) {
        i +=1;
    };
    return envios[i].value;
}

function updateEnvio(porcentaje){
    let costoenvio = (subtotal*porcentaje)/100;
    document.getElementById("totalenvio").innerHTML = costoenvio.toString();
    document.getElementById("total").innerHTML = (subtotal+costoenvio).toString();
}


function mostrarSubtotal(){//creo el elemento de la tabla que contendra el costo de todos los productos del carrito
    let html = "";
    html += `
    <tr>
    <td></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle">Envío</td>
    <td class="align-middle" id="totalenvio"></td>
    </tr>
    <tr>
    <td></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle">Total</td>
    <td class="align-middle" id="total"></td>
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
   // document.getElementById("total").innerHTML = subtotal.toString(); //transformo el subtotal en string para poder mostrarlo en el html
    updateEnvio(busquedaEnvio());
}


function showCarrito(moneda){
     subtotal = 0;
    /*mostrar los productos del carrito con el input correspondiente a la cantidad*/
     htmlToAppend = "";
    let j =0;
    
    for(let article of productosCarrito){//recorremos todos los productos a mostrar en el carrito
        if (moneda === "UYU") {//evaluamos en que tipo de moneda debemos mostrar los productos

            if (article.currency ==="USD") {//con este if hago la conversion de moneda en caso de ser necesario
           
                htmlToAppend +=`
                <tr>
                <td><img src="${article.src}" class = "img-fluid" style ="max-width:50px!important"></td>
                <td class="align-middle">${article.name}</td>
                <td class="align-middle">UYU  ${article.unitCost*40}</td>
                <td class="align-middle"><input type="number" min ="1" value=${article.count} onchange="updateProductoSubtotal(moneda)" name="producto"></td>
                <td class="align-middle" id="${j}">${(article.unitCost*40)*article.count}</td>
                <td class="align-middle"><button type="button" class="btn btn-secondary " id="${j +"e"}" onclick="borrarProducto(this.id)"> Eliminar</button></td>
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
                  <td class="align-middle"><button type="button" class="btn btn-secondary " id="${j +"e"}" onclick="borrarProducto(this.id)"> Eliminar</button></td>
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
                <td class="align-middle"><button type="button" class="btn btn-secondary " id="${j +"e"}" onclick="borrarProducto(this.id)"> Eliminar</button></td>
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
               <td class="align-middle"><button type="button" class="btn btn-secondary " id="${j +"e"}" onclick="borrarProducto(this.id)"> Eliminar</button></td>
               </tr>`
              subtotal = subtotal + (article.unitCost*article.count);
            } 
                /*funcion para quitar elementos 
                function borrarElemento(id){
    productosCarrito.splice(id, 1);//quitar elemento del array de productos
    showCarrito();//actualizar carrito
    sumaSubtotales();//actualizar subtotal
    modificarTotal();//actualizar costos
}

                
                
                
                `
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
            }*/
        }
        j = j+1;
       
    }
    htmlToAppend += mostrarSubtotal(); //muestro el subtotal que viene precargado
    document.getElementById("carrito").innerHTML = htmlToAppend;//muestro productos en html
    updateEnvio(busquedaEnvio());


}

function showIngresoDatosPago() {
    element = document.getElementById("datostarjeta");
    check = document.getElementById("credito");
    if (check.checked) {
        element.style.display='block';
        document.getElementById("datostransferencia").style.display = 'none';
    }
    else {
        element.style.display='none';
        document.getElementById("datostransferencia").style.display = 'block';
    }
}

function showAlert(mostrar,cual){
    let mensaje = document.getElementById("alert"+cual);
    if (mostrar === "si" ) {
        mensaje.className = mensaje.className.replace("invisible","");

    }
    if((mostrar === "no")&&(!mensaje.className.includes("invisible"))){

        mensaje.className += "invisible";
        
    }
}

function simularEnvio(){
     document.getElementById("street").value="";
     document.getElementById("number").value="";
    document.getElementById("esquina").value="";
    document.getElementById("pais").value="";
    document.getElementById("owner").value="";
    document.getElementById("cvv").value="";
    document.getElementById("cardNumber").value="";
    document.getElementById("accountNumber").value="";
}

function validacionInputsDireccion(){//funcion que verifica que los inputs no esten vacios para eso se utilica una bandera para saber cuales inputs va a validar
//campos de envio a validar
    let calle = document.getElementById("street").value;
    let numeropuerta = document.getElementById("number").value;
    let esquina = document.getElementById("esquina").value;
    let pais = document.getElementById("pais").value;

//verificacion de campos vacios referentes a la direcion de evio
    //if ((bandera === "pagar") && ( (calle === "") || (numeropuerta === "")||(esquina ==="")||(pais === ""))) {
        if ( (calle === "") || (numeropuerta === "")||(esquina ==="")||(pais === "")) {
        showAlert("si","1");
    }else{
        
            showModal("si");
            busquedaButton();
            showAlert("no","1");   
        
    };
};

function validacionInputsPago(){
    //campos de la tarjeta de credito
    let nombrepropietario =  document.getElementById("owner").value;
    let codigoseguridad = document.getElementById("cvv").value;
    let numerotarjeta = document.getElementById("cardNumber").value;
    let numerotransferencia = document.getElementById("accountNumber").value;

   let element = document.getElementById("datostarjeta");
   let check = document.getElementById("credito");
    if (check.checked) {
          //verificacion de campos vacios referentes a los datos de la tarjeta de credito
         if ((nombrepropietario === "")||(codigoseguridad === "")||(numerotarjeta==="")){
                
              showAlert("si","2");
         }else{
             simularEnvio();
             showAlert("no","2");
         };
    }
    else {
        if (numerotransferencia === "") {
            showAlert("si","2");
        }else{
            simularEnvio();
            showAlert("no","2");
        }

    }
}

function borrarProducto(id){//funcion que sirve para eliminar el producto de mi arreglo de productos 
    id=id.replace("e","");//convierto el id en indice del producto en el arreglo de productos para luego poder eliminar ese elemento del arreglo
    productosCarrito.splice(id, 1);//quitar elemento del array de productos
    showCarrito(moneda);//actualizar carrito

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

    document.getElementById("pagar").addEventListener("click", function(){
        validacionInputsDireccion();
        
    });

    document.getElementById("confirmarpago").addEventListener("click",function(){
        validacionInputsPago();
        showModal("no");
        showAlert("si","3");
      
    });
    document.getElementById("cancelar").addEventListener("click",function(){
        showModal("no");
        volverButton();
    });

    

  /*  document.getElementById("credito").addEventListener("click", function(){
        showIngresoDatosTarjeta();*/

});