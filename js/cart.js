var productosCarrito = [];
var subtotal;
var entrada = [];
var htmlToAppend = "";
var moneda = "";
var aux;


//--------------------------------- estas dos funciones estan escritas para poder ayudar con la apariencia de la pagina
function volverButton(){//funcion que permite vover a resaltar el boton de seleccion de tipo de moneda 
    aux.className +="active";//le agrego la clase "active" al elemento que la tenia anterirmente antes de abrir el modal
}

function busquedaButton(){//funcion que me permite dejar de resaltar el boton que te permite seleccionar el tipo de moneda en que se muestran los precios
    let boton = document.getElementsByName("labeloptions");//seleccion los elementos del radiobutton
    let i = 0;
    while (!boton[i].className.includes("active")){//busco cual es el que tiene la clase "active"
        i += 1;
    };
    aux = boton[i];//paso ese elemento a otra variable que me servira para luego volver a mostarlo
    boton[i].className = boton[i].className.replace("active","");//le saco la clase "active"
    
}

//--------------------------------------------------------------------------------------------------------------------

function busquedaEnvio(){//funcion que sirve para buscar cual es el tipo de envio seleccionado por el usuario
    //observacion en caso de que el usuarion no seleccione el tipo de envio el que queda marcado de forma predeterminada es el standard
    let envios = document.getElementsByName("envio");//busco todos los elementos del radiobutton que tienen la informacion del envio
    let i = 0;
    while (!(envios[i].checked)) {//busco cual es el que esta seleccionado
        i +=1;
    };
    return envios[i].value;//devuelvo su valor
}

function updateEnvio(porcentaje){//funcion que calcula el porcentaje del costo de envio 
    let costoenvio = (subtotal*porcentaje)/100;//realiza el calculo con el valor del total de productos a comprar
    document.getElementById("totalenvio").innerHTML = costoenvio.toString();//lo muestra en el html el costo de envio
    document.getElementById("total").innerHTML = (subtotal+costoenvio).toString();//muestra en el html el costo total
}


function mostrarSubtotal(){//creo el elemento de la tabla que contendra el costo de todos los productos del carrito y del envio
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
                
        }
        j = j+1;
       
    }
    htmlToAppend += mostrarSubtotal(); //muestro el subtotal que viene precargado
    document.getElementById("carrito").innerHTML = htmlToAppend;//muestro productos en html
    updateEnvio(busquedaEnvio());


}

function showIngresoDatosPago() {//funcion que nos sirve para mostrar o ocultar los campos de entrada de datos para pagar
    //esto dependiendo de la opcion que este seleccionada en el modal
    element = document.getElementById("datostarjeta");//capturo el conteneor que deseo mostrar en caso de que se selecciones la opcion tarjeta de credito
    check = document.getElementById("credito");//capturo el elemento del radiobutton que me permitira mostar los campos de la tarjeta de credito cuando se seleccione
    if (check.checked) {//verifico si esta seleccionado el radio que corresponde a la tarjeta de credito
        element.style.display='block';//muestro mi contenedor destinado a los datos de la tarjeta 
        document.getElementById("datostransferencia").style.display = 'none';//oculto el contenedor que esta destinado a los datos para la transferencia 
    }
    else {
        element.style.display='none';//oculto mi contenedor destinado a los datos de la tarjeta 
        document.getElementById("datostransferencia").style.display = 'block';//muestro el contenedor que esta destinado a los datos para la transferencia 
    }
}

function showAlert(mostrar,cual){//funcion que me permite ocultar o mostrar los mensajes de alerta que tengo en la pagina
    //la funcion recibe la accion a realizar en "mostrar" y en "cual" la terminacion del id del alert que quiero mostrar
    let mensaje = document.getElementById("alert"+cual);
    if (mostrar === "si" ) {//en caso de que quiera mostrar solo le saca la clase "invisible" que es la que no lo muestra 
        mensaje.className = mensaje.className.replace("invisible","");

    }
    if((mostrar === "no")&&(!mensaje.className.includes("invisible"))){ //en caso de no querer mostrar el alert le agrego la clase "invisible" siempre y cuando ya no la tenga

        mensaje.className += "invisible";
        
    }
}

function simularEnvio(){//funcion que simula el envio de datos borrando los campos que fueron llenados y mostrando un alerta que te confirma la compra realizada
     document.getElementById("street").value="";
     document.getElementById("number").value="";
    document.getElementById("esquina").value="";
    document.getElementById("pais").value="";
    document.getElementById("owner").value="";
    document.getElementById("cvv").value="";
    document.getElementById("cardNumber").value="";
    document.getElementById("accountNumber").value="";
    showAlert("si","3");
}

function validacionInputsDireccion(){//funcion que verifica que los inputs no esten vacios para eso se utilica una bandera para saber cuales inputs va a validar
//campos de envio a validar
    let calle = document.getElementById("street").value;
    let numeropuerta = document.getElementById("number").value;
    let esquina = document.getElementById("esquina").value;
    let pais = document.getElementById("pais").value;

//verificacion de campos vacios referentes a la direcion de evio
        if ( (calle === "") || (numeropuerta === "")||(esquina ==="")||(pais === "")) {//si alguno de los campos esta vacion muestro un mensaje
        showAlert("si","1");
    }else{//si los campos no estan vacios abre el modal para introduccir los datos de pago y si llegara a pasar que el mensaje de que faltan datos esta en pantalla y el usuario
        //no lo cerro lo cierro al abrir el modal
        
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
         if ((nombrepropietario === "")||(codigoseguridad === "")||(numerotarjeta==="")){//muestro un mensaje si hay campos vacios
                
              showAlert("si","2");
         }else{//si estan todos los campos llenos simulo envio y muestro mensaje que confirma la compra 
             simularEnvio();
             showAlert("no","2");
             showModal("no");
             showAlert("si","3");
             volverButton();
         };
    }
    else {//verificacion de campos vacios referente a la transferencia bancaria
        if (numerotransferencia === "") {//muestro un mensaje si hay campos vacios
            showAlert("si","2");
        }else{//si estan todos los campos llenos simulo envio y muestro mensaje que confirma la compra 
            simularEnvio();
            showAlert("no","2");
            showModal("no");
            showAlert("si","3");
            volverButton();
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
        
      
    });
    document.getElementById("cancelar").addEventListener("click",function(){
        showModal("no");
        volverButton();
    });

});