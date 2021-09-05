//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_PRICE = "Menormayor";
const ORDER_DESC_BY_PRICE = "Mayormenor";
const ORDER_RELEVANCIA = "CantidadVendidos";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minPrecio = undefined;
var maxPrecio = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_ASC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
            
        });
    }else if (criteria === ORDER_RELEVANCIA){
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.soldCount);
            let bPrice = parseInt(b.soldCount);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
            
        });
    }


    return result;
}

function showProductsList(){

    let htmlContentToAppend = "";
    //Declaro variable string
    for(let i = 0; i < currentProductsArray.length; i++){
        //hago el for para recorrer el arreglo de productos
        let producto = currentProductsArray[i];
        //Le asigno a producto cada elemento del arreglo de productos
        /*<a href="product-info.html" class="list-group-item list-group-item-action"> </a>*/
        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(producto.cost) >= minPrecio)) &&
        ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt(producto.cost) <= maxPrecio))){
            //Se evalua el precio de cada producto y si esta dentro del rango lo agrega al html
            htmlContentToAppend += `
            
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
            
            `
           
            //agrego el codigo que quiero que se muestre en el HTML
            //Muestra los productos en una lista 
            //imagen - Nombre y descripcion
            
        
          }
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        //Lo agrego al HTML
    }


    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsArray = productsArray;
        }
    
        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    
        //Muestro las categorías ordenadas
        showProductsList();
    }

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME,resultObj.data)
        }
    });
//});
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortAscPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
    document.getElementById("sortDescPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);

    });
    document.getElementById("sortRelevancia").addEventListener("click", function(){
        sortAndShowProducts(ORDER_RELEVANCIA);

    });
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrecio = undefined;
        maxPrecio = undefined;

        
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minPrecio = document.getElementById("rangeFilterPriceMin").value;
        maxPrecio = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrecio != undefined) && (minPrecio != "") && (parseInt(minPrecio)) >= 0){
            minPrecio = parseInt(minPrecio);
        }
        else{
            minPrecio = undefined;
        }

        if ((maxPrecio != undefined) && (maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
            maxPrecio = parseInt(maxPrecio);
        }
        else{
            maxPrecio = undefined;
        }

        showProductsList();
    });
});