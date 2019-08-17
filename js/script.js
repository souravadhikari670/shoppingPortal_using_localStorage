// function load()
// {
// location.reload()
// }load()

var aCreateProductLink = document.getElementById("aCreateProductLink")
var divCreateProduct = document.getElementById("divCreateProduct")
var divProductList = document.getElementById("divProductList")
var  divEditProduct = document.getElementById("divEditProduct")
var productArray = [];
// set productId and Index
function setProductIdAndIndex()
{
    if( !localStorage.productArray || JSON.parse(localStorage.productArray).length == [] )
    {
        alert('No Item Found')
        localStorage.productArray = JSON.stringify([])
        localStorage.setItem('index', 0)
        localStorage.setItem('productId', 1)
    }else{
        productArray = JSON.parse(localStorage.productArray)
        var indexCount = localStorage.getItem('index')
        var productIdCount =localStorage.getItem('productId')
        localStorage.setItem('index', ++indexCount)
        localStorage.setItem('productId', ++productIdCount)

        var products = JSON.parse( localStorage.productArray )
        addProductToDom(products)
    }
}setProductIdAndIndex()
var productId = localStorage.getItem('productId')
var index = localStorage.getItem('index')
//checkproductqty
checkProductQty()
function checkProductQty()
{
    var productsArray = localStorage.getItem('productArray')
    var products = JSON.parse(productsArray)
    for(i=0;i<products.length;i++)
    {
        if(products[i].pQty == 0)
        {
            removeFromProductArray(i)
        }
    }    
}
//create product panel
aCreateProductLink.addEventListener( "click", function(event){
    createProductItem();
})

function createProductItem()
{
    //hidden create link
    insertNewLine(1);
    divCreateProduct.setAttribute("class", "container bg-light")

    // create heading
    var createNewProduct = document.createElement("label")
    createNewProduct.innerHTML = "Create New Product"
    createNewProduct.setAttribute("style", "font-weight: bold; font-size: 22px")
    divCreateProduct.appendChild(createNewProduct)
    insertNewLine(2);

    //create Product quantity
    var productQuantity = document.createElement("input");
    productQuantity.setAttribute("type", "number")
    productQuantity.setAttribute("placeholder", "Type Product Quantity")
    productQuantity.setAttribute("id", "productQuantity")
    productQuantity.setAttribute("class","form-control")
    divCreateProduct.appendChild(productQuantity)
    insertNewLine(2)

    // create product name
    var productName = document.createElement("input");
    productName.setAttribute("type", "text")
    productName.setAttribute("placeholder", "Type product name")
    productName.setAttribute("id", "productName")
    productName.setAttribute("class","form-control")
    divCreateProduct.appendChild(productName)
    insertNewLine(2);

    //create product description
    var productDescription = document.createElement("textarea")
    productDescription.setAttribute("placeholder", "Type product description")
    productDescription.setAttribute("id", "productDescription")
    productDescription.setAttribute("class","form-control")
    divCreateProduct.appendChild(productDescription);
    insertNewLine(2)

    //create product price
    var productPrice = document.createElement("input");
    productPrice.setAttribute("type","number")
    productPrice.setAttribute("placeholder", "Type product price")
    productPrice.setAttribute("id", "productPrice")
    productPrice.setAttribute("class","form-control")
    divCreateProduct.appendChild(productPrice)
    insertNewLine(2)

    //create addProductbutton
    var btnAddProductbtn = document.createElement("button");
    btnAddProductbtn.setAttribute("type", "submit")
    btnAddProductbtn.innerHTML = "Add Product"
    btnAddProductbtn.setAttribute("class", "form-control btn btn-success")
    btnAddProductbtn.setAttribute("id", "btnAddProduct")
    divCreateProduct.appendChild(btnAddProductbtn)
    insertNewLine(3)

    //addEventListener to addProductbtn
    btnAddProductbtn.addEventListener("click", function(event){
        event.preventDefault()
        // hideDivCreateProduct()
        createListProductArray();

        document.getElementById("productQuantity").value = ""
        document.getElementById("productName").value = ""
        document.getElementById("productDescription").value = ""
        document.getElementById("productPrice").value =""
        hideDivCreateProduct()
    })
}

function createListProductArray()
{
        
        //create product List
        var productQuantity = document.getElementById("productQuantity").value
        var productName = document.getElementById("productName").value
        var productDescription = document.getElementById("productDescription").value
        var productPrice = document.getElementById("productPrice").value

        var objProduct = new Object()
        objProduct.pId = productId
        objProduct.pQty = productQuantity
        objProduct.pName = productName
        objProduct.pDes = productDescription
        objProduct.pPrice = productPrice
        productArray.push( objProduct )
        // addProductToDom( productArray )
        addProductToLocalStorage( productArray )
        getFromLocalStorage()
        console.log(productArray)
        productId++;
}
function addProductToLocalStorage( productArray )
{
    localStorage.productArray = JSON.stringify( productArray )
    localStorage.setItem('index',index++)
    localStorage.setItem('productId', productId)
} 
function getFromLocalStorage()
{
    var products = JSON.parse( localStorage.productArray )
    addProductToDom( products )
}
// Add Product to DOM
function addProductToDom( products )
{
    hideDivProductList()
    var index = products.length
    for(i=0;i<index;i++){
    var divList = document.createElement("div")
    divList.setAttribute("class", "container p-2")
    divList.setAttribute("id", products[i].pId)

    var labelProQty = document.createElement("label")
    labelProQty.innerHTML = "<b>Product Qty : </b>"+products[i].pQty
    divList.appendChild(labelProQty)
    insertBlankLine(divList)

    var labelProName = document.createElement("label")
    labelProName.innerHTML = " <b>Product Name : </b>"+products[i].pName
    divList.appendChild(labelProName)
    insertBlankLine(divList)

    var labelProDes = document.createElement("label")
    labelProDes.innerHTML = " <b>Product Des : </b>"+products[i].pDes
    divList.appendChild(labelProDes)
    insertBlankLine(divList)

    var labelProPrice = document.createElement("label")
    labelProPrice.innerHTML = " <b>Product Price : </b>"+products[i].pPrice
    divList.appendChild(labelProPrice)
    insertBlankLine(divList)

    var btnEdit = document.createElement("button")
    btnEdit.setAttribute("class", "btn btn-primary mr-4")
    btnEdit.innerHTML = "Edit"
    divList.appendChild(btnEdit)

    var btnDelete = document.createElement("button")
    btnDelete.setAttribute("class", "btn btn-danger mr-4")
    btnDelete.innerHTML = "Delete"
    divList.appendChild(btnDelete)

    insertBlankLine(divList)

    var hr = document.createElement("hr")
    divList.appendChild(hr)

    divProductList.appendChild(divList)


    //DELETE FUNCTIONALITY
    btnDelete.addEventListener("click", function(event){
        var targetParent = event.target.parentNode;
        var selectProductIndex = findProductIndex( parseInt(targetParent.id))
        removeFromProductArray( selectProductIndex )
        targetParent.parentNode.removeChild(targetParent);
    })

    //EDIT FUNCTIONALITY
    btnEdit.addEventListener("click", function(event){
        var targetParent = event.target.parentNode
        var selectProductIndex = findProductIndex( parseInt(targetParent.id))
        createUpdatePanel( selectProductIndex, parseInt(targetParent.id) )
    })  
}
}

//find parent index
function findProductIndex( id )
{
    for(i = 0; i<productArray.length;i++)
    {
        if( productArray[i].pId == id )
            return i
    }
}

//remove from product array
function removeFromProductArray( index )
{
    productArray.splice(index, 1)
    // console.log(productArray)
    var products = JSON.parse(localStorage.productArray)
    products.splice(index, 1)
    localStorage.productArray = JSON.stringify( products)
}

//create Edit Product Panel
function createUpdatePanel( index ,id )
{
    hideDivCreateProduct()
    var products = JSON.parse(localStorage.productArray)
    insertBlankLine(divEditProduct)
    divEditProduct.setAttribute("class", "container bg-light")

    // create heading
    var updateProduct = document.createElement("label")
    updateProduct.innerHTML = "Update Product"
    updateProduct.setAttribute("style", "font-weight: bold; font-size: 22px")
    divEditProduct.appendChild(updateProduct)
    insertBlankLine(divEditProduct)

    //create Product quantity
    var updateProductQuantity = document.createElement("input");
    updateProductQuantity.setAttribute("type", "number")
    updateProductQuantity.setAttribute("placeholder", "Type Product Quantity")
    updateProductQuantity.setAttribute("id", "updateProductQuantity")
    updateProductQuantity.setAttribute("class","form-control")
    updateProductQuantity.setAttribute("value",products[index].pQty)
    divEditProduct.appendChild(updateProductQuantity)
    insertBlankLine(divEditProduct)

    // create product name
    var updateProductName = document.createElement("input");
    updateProductName.setAttribute("type", "text")
    updateProductName.setAttribute("placeholder", "Type product name")
    updateProductName.setAttribute("id", "updateProductName")
    updateProductName.setAttribute("class","form-control")
    updateProductName.setAttribute("value",products[index].pName)
    divEditProduct.appendChild(updateProductName)
    insertBlankLine(divEditProduct)

    //create product description
    var updateProductDescription = document.createElement("input")
    updateProductDescription.setAttribute("placeholder", "Type product description")
    updateProductDescription.setAttribute("id", "updateProductDescription")
    updateProductDescription.setAttribute("class","form-control")
    updateProductDescription.setAttribute("value",products[index].pDes)
    divEditProduct.appendChild(updateProductDescription);
    insertBlankLine(divEditProduct)

    //create product price
    var updateProductPrice = document.createElement("input");
    updateProductPrice.setAttribute("type","text")
    updateProductPrice.setAttribute("placeholder", "Type product price")
    updateProductPrice.setAttribute("id", "updateProductPrice")
    updateProductPrice.setAttribute("class","form-control")
    updateProductPrice.setAttribute("value",products[index].pPrice)
    divEditProduct.appendChild(updateProductPrice)
    insertBlankLine(divEditProduct)

    //create addProductbutton
    var btnUpdateProduct = document.createElement("button");
    btnUpdateProduct.setAttribute("type", "submit")
    btnUpdateProduct.innerHTML = "Update Product"
    btnUpdateProduct.setAttribute("class", "form-control btn btn-primary")
    btnUpdateProduct.setAttribute("id", "btnUpdateProduct")
    divEditProduct.appendChild(btnUpdateProduct)
    insertBlankLine(divEditProduct)

    btnUpdateProduct.addEventListener("click", function(event){

        products[index].pQty = document.getElementById("updateProductQuantity").value;
        products[index].pName = document.getElementById("updateProductName").value;
        products[index].pDes = document.getElementById("updateProductDescription").value;
        products[index].pPrice = document.getElementById("updateProductPrice").value;

        console.log(productArray)
        var parentEditNode = document.getElementById(id);
        parentEditNode.childNodes[0].innerHTML = "<b>Product Qty : </b>"+products[index].pQty
        parentEditNode.childNodes[2].innerHTML = "<b>Product Name : </b>"+products[index].pName
        parentEditNode.childNodes[4].innerHTML = "<b>Product Des: </b>"+products[index].pDes
        parentEditNode.childNodes[6].innerHTML = "<b>Product Price : </b>"+products[index].pPrice

        localStorage.productArray = JSON.stringify(products)
        hideDivEditProduct()
    })
}

function hideDivCreateProduct()
{
    var child = divCreateProduct.lastElementChild;  
    while (child) { 
        divCreateProduct.removeChild(child); 
        child = divCreateProduct.lastElementChild; 
    } 
}

//hide Edit div
function hideDivEditProduct()
{
    var child = divEditProduct.lastElementChild;  
    while (child) { 
        divEditProduct.removeChild(child); 
        child = divEditProduct.lastElementChild; 
    } 
}

function hideDivProductList()
{
    var child = divProductList.lastElementChild;  
    while (child) { 
        divProductList.removeChild(child); 
        child = divProductList.lastElementChild; 
    } 
}

function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}

function insertNewLine(n)
{
    for(i=0;i<n;i++)
    {
    var br = document.createElement("br");
    divCreateProduct.appendChild(br);
    }
}