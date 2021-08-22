//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;

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
    }/*else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }*/

    return result;
}

function showProductsList(ProductsArray){

    let htmlContentToAppend = "";
    //Declaro variable string
    for(let i = 0; i < ProductsArray.length; i++){
        //hago el for para recorrer el arreglo de productos
        let producto = ProductsArray[i];
        //Le asigno a producto cada elemento del arreglo de productos
        /*<a href="product-info.html" class="list-group-item list-group-item-action"> </a>*/
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
            //<small class="text-muted">`+ producto.currency +`: ` + producto.cost + `</small>
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
        showProductsList(currentProductsArray);
    }

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME,resultObj.data)
        }
    });
});
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });