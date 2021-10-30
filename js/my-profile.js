//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoPerfil = {
    nombre:'',
    apellido:'',
    edad:0,
    email:'',
    number:0
};

function showContenedorDatos(){//funcion que me ayuda a cerrar el mensaje que pide introducir datos la primera vez que el usuario ingresa
    let contenedor =  document.getElementById("infoProfile");//capturo lo que es el mi contenedor
    if ( localStorage.getItem("datos") === null ) {//pregunto si existe mi "variable datos" en el localstorage
        let cerrar = document.getElementById("botoncerrar");//capturo el boton que se agrega cuando no hay datos introducidos aun
        contenedor.className = contenedor.className.replace("invisible","");// le saco la propiedad de boostrap que lo hace invisible
        cerrar.setAttribute("data-dismiss", "alert");//agrego el atributo al boton que permite cerrar el alerta de boostrap al presionar la x
    }else{
        contenedor.className = contenedor.className.replace("invisible","");// le saco la propiedad de boostrap que lo hace invisible
    }

}

function savePhoto(){ //funcion que nos permite guardar la foto el codigo ya esta comentado y lo deje tal cual nos lo mostraron mas que nada por comodidad
 //hay cosas que creo que para nuestro caso es inecesarias como por ejemplo la fecha 
// localStorage with image
var storageFiles = JSON.parse(localStorage.getItem("storageFiles")) || {},
    photoprofile = document.getElementById("photoprofile"),
    storageFilesDate = storageFiles.date,
    date = new Date(),
    todaysDate = (date.getMonth() + 1).toString() + date.getDate().toString();

// Compare date and create localStorage if it's not existing/too old   
if (typeof storageFilesDate === "undefined" || storageFilesDate < todaysDate) {
    // Set initial image src    
    //photoprofile.setAttribute("src", "https://i.ibb.co/6FDczWb/man-1.jpg");
        // Take action when the image has loaded 
    photoprofile.addEventListener("load", function () {
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");

        // Make sure canvas is as big as the picture
        imgCanvas.width = photoprofile.width;
        imgCanvas.height = photoprofile.height;

        // Draw image into canvas element
        imgContext.drawImage(photoprofile, 0, 0, photoprofile.width, photoprofile.height);

        // Save image as a data URL
        storageFiles.photoprofile = imgCanvas.toDataURL("image/png");

        // Set date for localStorage
        storageFiles.date = todaysDate;

        // Save as JSON in localStorage
        try {
            localStorage.setItem("storageFiles", JSON.stringify(storageFiles));
        }
        catch (e) {
            console.log("Storage failed: " + e);
        }
    }, false);

    // Set initial image src    
    photoprofile.setAttribute("src", "https://i.ibb.co/6FDczWb/man-1.jpg");
}
else {
    // Use image from localStorage
    photoprofile.setAttribute("src", storageFiles.photoprofile);
}
}
function haydatos(){ //funcion que nos permite saber si hay que introducir los datos por primera vez o mostrarlos en pantalla
    let html=""; //variable que nos servira para mostrar en la pagina el mensaje para que el usuario introduzca sus datos por primera vez en ser necesario
    if (localStorage.getItem("datos") === null) {//verificamos que no tengamos datos guardados en el localstorage
        //lo siguiente es todo lo que mostrariamos en caso de ser necesario
        html += `
        <div class="alert alert-danger" role="alert" style="position: relative; width:auto; ">
        <button type="button"  class="close" id="botoncerrar"  aria-label="Close" onclick="showContenedorDatos()">
        <span aria-hidden="true">&times;</span>
      </button>
        <h4 class="alert-heading">Perfil incompleto </h4>
        <p>Debe completar su perfil con sus datos personales, para eso haga click en la x en este recuadro para visualizar el botón modificar </p>
      </div>
  
        `
        document.getElementById("mensaje").innerHTML = html;//aca lo agregamos al contenedor mensaje en el html
    }else{//en caso de tener que mostrar los datos llamamos a la funcion showdatos
        showDatos();
    }
}
function cargarinfo(){//funcion que nos permite cargar la informacion guardada en el localstorage
    if (localStorage.getItem("datos") != null) {//verificamos que tengamos algo que mostrar en pantalla
        infoPerfil =  JSON.parse(localStorage.getItem("datos"));//la informacion guardada la transformamos en un objeto 
        //luego mostramos la informacion guardada en sus respectivos lugares en el html
        document.getElementById("nombre").value = infoPerfil.nombre;
        document.getElementById("apellido").value = infoPerfil.apellido;
        document.getElementById("edad").value = parseInt(infoPerfil.edad);
        document.getElementById("correoelectronico").value = infoPerfil.email;
        document.getElementById("numerocontacto").value = infoPerfil.number;

    }
}
function obtenerInfo(){//funcion que nos permite obtener los datos que introduce el usuario para luego manipularlos 
        infoPerfil.nombre = document.getElementById("nombre").value; //en funcion del id de cada input capturamos la informacion y la guardamos en un objeto 
        infoPerfil.apellido = document.getElementById("apellido").value;
        infoPerfil.edad = document.getElementById("edad").value;
        infoPerfil.email = document.getElementById("correoelectronico").value;
        infoPerfil.number = document.getElementById("numerocontacto").value;
    
}
function limpiarCampos(){//funcion que limpia los campos del pop-up que nos permite modificar los datos es para simular el envio de datos
    //como tiene animacion es muy sutil el cambio
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("edad").value="";
    document.getElementById("correoelectronico").value="";
    document.getElementById("numerocontacto").value="";
}
function saveDatos(){//funcion que nos permite guardar en el localstorage los datos que introdujo el usuario
    let datosstring = JSON.stringify(infoPerfil)//convertimos nuestro objeto con los datos a "string"
    localStorage.setItem("datos",datosstring);//lo guardamos en el localstorage
    infoPerfil = {};//limpio el objeto ya que lo uso en otras funciones y asi evito errores 
}

function showDatos(){//funcion que nos permite mostrar los datos en pantalla
    showContenedorDatos();//mostramos el contenedor de los datos en pantalla
    infoPerfil =  JSON.parse(localStorage.getItem("datos"));//recuperamos la informacion guardada en el localstorage y la convertimos en objeto
    //luego muestro la informacion en su lugar correspondiente en le html para eso capturo cada elemento gracias a su id
    document.getElementById("name").innerHTML = infoPerfil.nombre + " " + infoPerfil.apellido;
    document.getElementById("age").innerHTML = infoPerfil.edad.toString();
    document.getElementById("email").innerHTML = infoPerfil.email;
    document.getElementById("tel").innerHTML = infoPerfil.number.toString();
}

function showModificarDatos(mostrar){ //funcion que sirve para mostrar ventana pop-up que nos permite modificar los datos del usuario
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

document.addEventListener("DOMContentLoaded", function (e) {
    haydatos();//vemos que hay que mostrar
    savePhoto();//mostramos y guardamos la foto
    document.getElementById("modificarDatos").addEventListener("click",function(){
        showModificarDatos("si");//mostramos el pop-up
        cargarinfo();//cargamos la informacion del usuario guardada si es que la hay
    });
    document.getElementById("cancel").addEventListener("click",function(){
        showModificarDatos("no");//cerramos el pop-up
    });
    document.getElementById("save").addEventListener("click", function(){
        obtenerInfo();//obtengo los datos ingresados 
        saveDatos();//guardo los datos ingresados
        limpiarCampos();//limpio los campos del pop-up
        showModificarDatos("no");//cierro el pop-up
        showDatos();//muestro los datos modificados en pantalla 
    });
});