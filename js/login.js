var NOMBRE_DEL_USUARIO; //creacion de variable que guardara el usuario introduccido
const myForm = document.getElementById("myForm"); //capturamos el formulario para poder manipularlo 
myForm.addEventListener("submit", function(e){//agregamos un detctor del evento submit para poder manipular la informacion del form
e.preventDefault();//interrupccion del evento submit
NOMBRE_DEL_USUARIO = document.getElementById("nombre_del_usuario").value; //cuardado de usuario introduccido
localStorage.setItem("user",NOMBRE_DEL_USUARIO);//guardado local del nombre del ususario
window.location.href="principal.html"//redireccion  a la pagina principal
// hice la redirreccion por javascript ya que como interrumpi el evento submit el atributo action pierde su funcionalidad
});


/*Esto era un posible codigo por si no conseguia hacer funcionar el evento submit

var CONTRASENA;

function obtener_Usuario(){
  NOMBRE_DEL_USUARIO = document.getElementById("nombre_del_usuario").value;
  localStorage.setItem("nombre", NOMBRE_DEL_USUARIO)

}
function validacion(){
  NOMBRE_DEL_USUARIO = document.getElementById("nombre_del_usuario").value;
    CONTRASENA = document.getElementById("contraseña").value;
    if ((NOMBRE_DEL_USUARIO !== "")&&(CONTRASENA !== "")) {
      obtener_Usuario();
      window.location.href="principal.html"
    } else {
      alert("Debe completar los campos")
    }
    alert(NOMBRE_DEL_USUARIO);
}*/

document.addEventListener("DOMContentLoaded", function(e){

  document.getElementById("Inicio_Sesion").addEventListener("click", function(){
    
  });

});

