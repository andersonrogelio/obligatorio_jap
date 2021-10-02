//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var infoProducts = {}; //declaro variables auxiliares
var photos = [];
var arrayComments = [];
var products = [];
/*
"name": "Chevrolet Onix Joy",
        "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
        "cost": 13500,
        "currency": "USD",
        "imgSrc": "img/prod1.jpg",
        "soldCount": 14
*/


function showRelatedProducts(arrayrelacted) {
    htmlContentToAppend = "";
    getJSONData(PRODUCTS_URL).then(function(resultObj){//obtengo la lista de productos
        if (resultObj.status === "ok"){// verifico que la lista venga correcta
            products = resultObj.data;//la guardo en infoProducts
            for (let i = 0; i < arrayrelacted.length; i++) {
                let product = products[arrayrelacted[i]];
                htmlContentToAppend +=`
                <div class="card product">
                     <img src="`+ product.imgSrc +`">
                     <h4>`+ product.name +`</h4>
                   <p>`+ product.description +`</p>
                   <a href="#">Leer más</a>
                 </div>
                `
            };
            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
        }
    });
}

function showProductInfo(){ //definicion de funcion para mostrar descripcion del producto y sus imagenes
let htmlContentToAppend = ""; //declaracion de variable que nos servira para mostrar la informacion  y imagenes en el html
    htmlContentToAppend += `
    <div class="col">
    <div class="d-flex w-100 justify-content-between">
        <h4 class="mb-1">`+ infoProducts.name +`</h4>
    </div>
    <strong><p class="text-muted">`+ infoProducts.currency +`: ` + infoProducts.cost + `</p></strong>
    
    <p class="mb-1">` + infoProducts.description + `</p>
    <strong><p class="text-muted"> Cantidad de `+ infoProducts.name +` vendidos :` + infoProducts.soldCount + `</p></strong>
</div>
</div>
    `;//arrmado y guardado de la estructura que quiero que se muestre en mi html con la informacion obtenida de la variable global infoProducts
     photos = infoProducts.images; //el arreglo con las direcciones de las imagenes de los productos los guardo en photos
    

document.getElementById("description").innerHTML = htmlContentToAppend; //agrego la descripcion y info del producto en el html

htmlContentToAppend = ""; //vacio la variable para volverla a usar para agregar las imagenes al carousel
    for (let j = 0; j < photos.length; j++) { //definicion de for para recorrer el arreglo con las direcciones de las imagenes

        let photo = photos[j];//en cada repeticion del for cada direccion la guardo en la variable photo para mas comodidad al trabajar
        if (j == 0){ //este if sirve para poder decir cual imagen es la primera en mostrarse ya que para eso tengo que colocar la clase active en el contrenedor de la imagen
           //si el contador esta en el inicio del recorrido le agrega la clase active al contenedor de la imagen y la vuelve la primera en mostrar
            htmlContentToAppend += `
        <div class="carousel-item active ">
        <img class="d-block w-100 " src="`+ photo +`" alt="`+ j +` slide">
      </div>
        ` 
        }else{ //si el contador no es el primero le deja de agregar la clase active y las siguientes imagenes pasan a ser "secundarias"
            htmlContentToAppend += `
            <div class="carousel-item  ">
            <img class="d-block w-100 " src="`+ photo +`" alt="`+ j +` slide">
          </div>
            ` 
        }
       
         
    }
    document.getElementById("itemimagenes").innerHTML = htmlContentToAppend //agrego las imagenes al carrousel
    htmlContentToAppend = "";
    showRelatedProducts(infoProducts.relatedProducts);
}

//declaracion de variables que usare para poder mostrar la puntuacion de los comentarios 
var contador;
var calificacionAmostrar="";
function calificar(item){//funcion que pinta estrellas de la puntacion que tuvo el producto
    if (typeof item === 'number') {//aca vemos como hacer para pintar las estrellas en funcion de donde se obtenga la peticion 
        //en esta parte pintamos estrellas a la hora de publicar los comentarios en el html
        contador = item; //guarda el numero si lo que recibe es de tipo entero
        for (let i = 1; i <= 5; i++) {
            if (i<=contador) {
                calificacionAmostrar += `<span class="fa fa-star checked"></span>` 
            }else{
                calificacionAmostrar += `<span class="fa fa-star "></span>` 
            }
            
            
        }
    }else{
        //esta sirve para pintar las estrellas antes de enviar los comentarios 
          contador = item.id[0];//captura el primer caracter si lo que recibe es un id
      for (let i = 1; i <= 5; i++) {//funcion que pinta las estrellitas 
        if (i<=contador) { //verifico en funcion de mi id de estrella clickeada cuantos tengo que pintar y de que color
            document.getElementById((i)+"estrella").style.color = "orange";
        }else{
            document.getElementById((i)+"estrella").style.color = "black"
        }
        
    }
        


    }
    
   
}
//esta funcion sirve para hace resetear la calificacion en estrellas de la seccion de comentario
function limpiarCalificacion() {
    for (let i = 1; i <= 5; i++) {//funcion que pinta las estrellitas de  negro 
            document.getElementById((i)+"estrella").style.color = "black"
    }
}
 
function showComments() {//funcion para mostrar los comentarios  
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayComments.length; i++) {
        //recorro el arreglo de comentarios 
        let comment = arrayComments[i];//cada elemento del arreglo lo guardo en commment dentro de la ejecucion del for 
        calificar(comment.score);//llamo la funcion calificar para poder mostrar la calificacion en estrellas 
        comment.user = comment.user.replace('_', ' ');//aca le saco el guio a los nombres de usuario para que tenga una estetica mejor
        //armo la estructura que quiero mostrar en el html
        htmlContentToAppend +=`
        <div class="card">
             <div class="card-header d-flex">
             <h6 class="mr-auto " >`+ comment.user +`</h6> 
             `+ calificacionAmostrar +` 
                  </div>
        <div class="card-body d-flex">
         <p class="mb-1 mr-auto ">` + comment.description + `</p>
         <p class="text-muted ">`+ comment.dateTime +`</p>
       
           </div>
      </div>
        `;
        calificacionAmostrar = "";//limpio la variable porque es una variable global que la uso en calificar para mostrar la calificacion en estrellas
        contador=0;//limpio contador para poder limpiar las estrellas mostradas en pantalla
        
    }
    document.getElementById("comments").innerHTML = htmlContentToAppend;
  
}

function guardarComment(){//generamos lo que es el comentario que luego lo guardaremos en el arreglo de comentarios para asi mostrarlos de forma dinamica
    let date = new Date();
    let formatDate =  date.getFullYear().toString()+ "-"+ (date.getMonth()+1).toString().padStart(2,"0")+"-"+date.getDate().toString().padStart(2,"0")+" "+date.getHours().toString().padStart(2,"0")+":"+date.getMinutes()+":"+date.getSeconds();//aca guardamos la year-month-day hour-minute-second
    contador = parseInt(contador); //convierto contador a entero para poder guardarlo en el arreglo de comentarios
    let commentAdd={//creamos la estructura de lo que guardaremos como comentario
        score:contador,
        description:document.getElementById("comentario").value,
        user: localStorage.getItem("user"),
        dateTime: formatDate
    };
    arrayComments.unshift(commentAdd); //insertamos el comentario al inicio del arreglo
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){//obtengo la info del producto
        if (resultObj.status === "ok"){// verifico que la info venga correcta
            infoProducts = resultObj.data;//la guardo en infoProducts
            showProductInfo();//la muestro la informacion

         
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){//obtengo los comentarios del producto
        if (resultObj.status === "ok"){// verifico que los comentarios vengan de forma correcta
            arrayComments = resultObj.data;//guardo los comentarios obtenidos en arrayComments
            showComments();//mustro los comentarios obtenidos
            

         
        }
    });


    document.getElementById("sendcomment").addEventListener("click",function() {//al hacer click en el boton de enviar
        if ((contador>0) && (contador<6) &&(document.getElementById("comentario").value !="")){//verifico que tenga un comentario y una calificacion que guardar
            guardarComment();//guardo el comentario en mi arreglo de comentarios 
        document.getElementById("comentario").value ="";//limpio el campo de texto
        limpiarCalificacion();//limpio la clasificacion del producto
        showComments();//mustro los comentarios
          contador=0;//limpio contador para poder limpiar las estrellas mostradas en pantalla
        }else{
            alert("Porfavor ingrese una calificación antes de enviar el comentario.")//muestro mensaje por si no hay datos que guardar
        }
        
       
    });

});
