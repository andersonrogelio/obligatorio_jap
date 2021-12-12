var http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const cors = require("cors");
const { dirname } = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());

app.listen(8000,function(){//iniciamos el sevidor en el puerto  8000
    console.log("Servidor levantado en el puerto 8000");
});
//Le damos una respuesta a cada pagina del servidor usando el metodo get
app.get("/",(req,res)=>{
    res.send("Esta es la dirección raíz del servidor");
});

app.get("/category",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/category/all.json")
  
});

app.get("/publicar_product",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/product/publish.json")
  
});

app.get("/category_info",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/category/1234.json")
  
});

app.get("/products",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/product/all.json")
  
});

app.get("/product_info",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/product/5678.json")
  
});

app.get("/product_info_comments",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/product/5678-comments.json")
  
});

app.get("/cart_info",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/cart/987.json")
  
});

app.get("/cart_buy",(req,res)=>{
    res.sendFile(__dirname+"/ecommerce-api-master/cart/buy.json")
  
});
//obtenemos los datos enviados a traves del metodo post
var j = 0;
app.post('/compras_realizadas', function(request, response){
    response.send('Todo Correcto');
    
    let body =JSON.stringify(request.body);   
    console.log(body);

   
   fs.writeFile('./Compra Realizada'+j+'.json',body,function(err) {
        if (err){
            console.log(err);
            
        }else{
            console.log("Compra guardada correctamente");
            j +=1;
            
            
            }

            

    });


});