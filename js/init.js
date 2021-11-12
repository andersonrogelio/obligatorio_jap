const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";


var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
function mostrar_Usuario() {//declaracion de funcion mostrar_Usuario
  let usuario = localStorage.getItem("user");//creamos y le asignamos el nombre del usuario que teniamos guardado a la variable usuario
  if ((usuario != undefined)&&(usuario !="") ) {//verificamos que la variable no este sin definir o vacia 
    //si la variable tiene un nombre dentro la agregamos al html en la barra de navegacion
    document.getElementById("usuario_Actual").innerHTML = usuario; 
  }

}

mostrar_Usuario();//llamamos la funcion para poder mostrar el nombre de usuario en la barra de navegacion de nuestra web

function borrarUsuario(){//Esta funcion sirve para poder borrar el nombre de usuario guardado y asi simular el cierre de sesion
  localStorage.removeItem("user");//elimina la "variable" user del localstorage
  
}

function showModal(mostrar){ //funcion que sirve para mostrar ventana pop-up que nos permite modificar los datos del usuario
  //en funcion del parametro que le pasemos es si la funcion muestra o no la ventana
  let ventana;
  let subventana;
  ventana =  document.getElementById("ventanamodal");//accedo a mi contenedor principal de la ventana que quiero mostrar para poder modificar las clases que contienen
  subventana = document.getElementById("sub-ventanamodal");//accedo a mi subcontenedor para poder modificar las clases que contienen
  if (mostrar === "si") {//bandera que me permite decidir que es lo que debe de hacer la funcion
      //agrego la clase show que es lo que me permite mostrar mi ventana
      ventana.className += " show";    
      subventana.className += " show";
  }else{
      //le quito la clase show que es lo que me permite dejar de mostrar mi ventana
      ventana.className = ventana.className.replace(" show","");    
      
      subventana.className = subventana.className.replace(" show","");
      
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});
