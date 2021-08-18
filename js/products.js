//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//var currentProductsArray = [];


function showProductsList(ProductsArray){

    let htmlContentToAppend = "";
    //Declaro variable string
    for(let i = 0; i < ProductsArray.length; i++){
        //hago el for para recorrer el arreglo de productos
        let producto = ProductsArray[i];
        //Le asigno a producto cada elemento del arreglo de productos
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ producto.name +`</h4>
                            <strong><p class="text-muted">`+ producto.currency +`: ` + producto.cost + `</p></strong>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
            </a>
            `
            //agrego el codigo que quiero que se muestre en el HTML
            //Muestra los productos en una lista 
            //imagen - Nombre y descripcion
            //<small class="text-muted">`+ producto.currency +`: ` + producto.cost + `</small>
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        //Lo agrego al HTML
    }


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            showProductsList(resultObj.data);
        }
    })
});