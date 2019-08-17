
var divCartListContainer = document.getElementById("divCartListContainer")
var divCartList = document.getElementById("divCartList")
var btnCheckOut = document.getElementById('btnCheckOut')
var cartArray = []
function createCartArraryInLocal()
{
    if( !localStorage.cartArrayLocal || JSON.parse( localStorage.cartArrayLocal).length == [])
    {
        localStorage.cartArrayLocal = JSON.stringify([])
   } 
}
createCartArraryInLocal()
setUserName()
function setUserName()
{
    if( sessionStorage.loggedIn)
    {
        var user = sessionStorage.getItem('loggedIn')
        var userName = JSON.parse(user)
        document.getElementById('username').innerHTML = "Welcome" + userName[0].uName
        document.getElementById('btnLogout').style.display = "block"
    }else{
        document.getElementById('btnRegister').style.display = "block"
        document.getElementById('btnLogin').style.display = "block"
    }
}
viewList()
function viewList()
{ 
    var products = localStorage.getItem('productArray')
    var viewProducts = JSON.parse(products)
var index = viewProducts.length
for(i=0;i<index;i++){
var divList = document.createElement('div')
divList.setAttribute("class", "container p-2")
divList.setAttribute("id", viewProducts[i].pId)

var pQuantity = document.createElement("label")
pQuantity.innerHTML = "<b> Product Quantity : </b>" + viewProducts[i].pQty
divList.appendChild(pQuantity)
insertBlankLine(divList)

var pName = document.createElement("label")
pName.innerHTML = "<b> Product Name : </b>"+ viewProducts[i].pName
divList.appendChild(pName)
insertBlankLine(divList)

var pDescription = document.createElement("label")
pDescription.innerHTML = "<b> Product Description : </b>" +  viewProducts[i].pDes
divList.appendChild(pDescription)
insertBlankLine(divList)

var pPrice = document.createElement("label")
pPrice.innerHTML = "<b> Product Price : </b>" + viewProducts[i].pPrice
divList.appendChild(pPrice)
insertBlankLine(divList)

    var qtyField = document.createElement("input")
    qtyField.setAttribute("type", "number")
    qtyField.setAttribute("class","form-control mb-4")
    qtyField.setAttribute("placeholder","type the quantity")
    qtyField.setAttribute("id", "inputQty")
divList.appendChild(qtyField)

var btnAddCart = document.createElement("button");
btnAddCart.setAttribute("type", "button")
btnAddCart.innerHTML = "Add To Cart"
btnAddCart.setAttribute("class", " btn btn-success")
btnAddCart.setAttribute("id", "btnAddCart")
divList.appendChild(btnAddCart)

var hr = document.createElement("hr")
divList.appendChild(hr)
insertBlankLine(divList)  

divCartListContainer.appendChild(divList)

//cart add button functionality
btnAddCart.addEventListener("click", function( event ){
    if( sessionStorage.loggedIn )
    {
    var targetParent = event.target.parentNode;
    var selectProductIndex = findProductIndex( parseInt(targetParent.id))
    var inputQtyValue = findValueOfInputQty(targetParent)
    //check available quantity
    checkavailablity( parseInt(targetParent.id), selectProductIndex, inputQtyValue )
    targetParent.querySelector("#inputQty").value = ""
    }else{
        alert('Please Login or Create Account First')
    }
})
}
 }
// find product index
function findProductIndex( id )
{
    var products = localStorage.getItem('productArray')
    var viewProducts = JSON.parse(products)
    for(i = 0; i<viewProducts.length;i++)
    {
        if( viewProducts[i].pId == id)
            return i;
    }
}
// find input qty
function findValueOfInputQty( targetParent )
{
    return targetParent.querySelector("#inputQty").value
}
//check availability quantity
function checkavailablity( id, index, inputQtyValue )
{
    var mainProductArrayLocal = localStorage.getItem('productArray')
    var mainProduct = JSON.parse(mainProductArrayLocal)
   if( inputQtyValue <= 0 )
   {
        alert('Please give input minimum 1 ')
   } else if( Number(mainProduct[index].pQty) < inputQtyValue )
   {
       alert("Only "+ mainProduct[index].pQty +" product available")
   }
    else if( inputQtyValue <= Number(mainProduct[index].pQty) )
   {
        findDuplicateInCart(id, index, inputQtyValue)  
   }
}
function findDuplicateInCart( id, index, inputQtyValue )
{
    if( JSON.parse( localStorage.cartArrayLocal).length == [])
    {
        addToChartArrayLocal( index, inputQtyValue )
        createCartTable()
   } else if( JSON.parse( localStorage.cartArrayLocal).length != [])
   {
    var cartArrayLocal = localStorage.getItem('cartArrayLocal')
    var cartArray = JSON.parse(cartArrayLocal)
    var flag = 0
    for( i=0;i<cartArray.length;i++)
    {
        if( cartArray[i].pId == id )
        {
            flag++
            break
        }
    }if(flag == 0)
    {
        addToChartArrayLocal( index, inputQtyValue )
        createCartTable()
    }else if( flag != 0){
        alert('Dont Accept Duplicate Item')
    }
}
}
// //add to cart local storage
function addToChartArrayLocal(index, inputQtyValue)
{

    var products = localStorage.getItem('productArray')
    var viewProducts = JSON.parse(products)
    var userArray = sessionStorage.getItem('loggedIn')
    var user = JSON.parse(userArray)
    var cartObj = new Object()
    cartObj.uId = user[0].uId
    cartObj.uEmail = user[0].uEmail
    cartObj.uName = user[0].uName
    cartObj.pId = viewProducts[index].pId
    cartObj.pName = viewProducts[index].pName
    cartObj.pDes = viewProducts[index].pDes
    cartObj.inputQty = inputQtyValue
    cartObj.pPrice = viewProducts[index].pPrice * inputQtyValue

    cartArray.push(cartObj)
    localStorage.cartArrayLocal = JSON.stringify(cartArray)
}
//create Cart Table
function createCartTable( )
{
    removeChildOfTable()
    var products = localStorage.getItem('cartArrayLocal')
    var viewCartProducts = JSON.parse(products)

    for(index=0; index < viewCartProducts.length; index++)
    {
    var table = document.createElement('table')
    table.setAttribute("class","table border border-danger")    
    var tbody = document.createElement('tbody')
    tbody.setAttribute("id", "tableBody")
    var tr = document.createElement('tr')
    var td1 = document.createElement('td')
    td1.innerHTML = viewCartProducts[index].pId
    var td2 = document.createElement('td')
    td2.innerHTML = viewCartProducts[index].pDes
    var td3 = document.createElement('td')
    td3.innerHTML = viewCartProducts[index].inputQty
    var td4 = document.createElement('td')
    td4.innerHTML = viewCartProducts[index].pPrice
    var btnRem = document.createElement("button")
    btnRem.setAttribute('class', 'btn btn-danger')
    btnRem.setAttribute('id', viewCartProducts[index].pId)
    btnRem.innerHTML = "Remove"

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(btnRem)
    tbody.appendChild(tr)
    
    table.appendChild(tbody)
    divCartList.appendChild(table)

    btnRem.addEventListener('click', function(event){
        var targetId = event.target.id;
        var index = findIndexOfremoveProduct( targetId)
        removeProductFromLocal( index )
        createCartTable()
    })
    } 
}
function findIndexOfremoveProduct( id )
{
    var products = localStorage.getItem('cartArrayLocal')
    var cartProducts = JSON.parse(products)
    for(i=0;i<cartProducts.length;i++)
    {
        if( cartProducts[i].pId == id)
        {
            return i;
        }
    }
}
//remove productfrom local
function removeProductFromLocal( index )
{
    cartArray.splice(index,1)
    var cartProducts = JSON.parse(localStorage.cartArrayLocal)
    cartProducts.splice(index, 1)
    localStorage.cartArrayLocal = JSON.stringify(  cartProducts )
}

//remove child of table
function removeChildOfTable()
{
    var child = divCartList.lastElementChild;  
    while (child) { 
        divCartList.removeChild(child); 
        child = divCartList.lastElementChild; 
    }
}
//insert break
function insertBlankLine(targetElement)
{
	var br = document.createElement("br");
    targetElement.appendChild(br);
}
//list container
// var productQuantity = document.createElement("div")
// productQuantity.setAttribute("class","container p-2")
// productQuantit

//logout
function logout()
{
    sessionStorage.setItem('loggedIn', '')
    location.href = 'http://127.0.0.1//Create_Product/login.html'
}
function register()
{
    sessionStorage.setItem('loggedIn', '')
    location.href = 'http://127.0.0.1//Create_Product/register.html'
}
function login()
{
    sessionStorage.setItem('loggedIn', '')
    location.href = 'http://127.0.0.1//Create_Product/login.html'
}