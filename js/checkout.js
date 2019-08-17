var divCheckOutList = document.getElementById('divCheckOutList')
var checkOutArray = []
var orderDetailArray = []
var totalBill = 0
var countinuebtn = document.getElementById("countinuebtn").style.display = "none";
var paybtn = document.getElementById("paybtn")
function createCheckOutArraryInLocal()
{
    if( !localStorage.checkOutArrayLocal || JSON.parse( localStorage.checkOutArrayLocal).length == [])
    {
        localStorage.checkOutArrayLocal = JSON.stringify([])
    }
    //order details......
    if( !localStorage.orderDetailLocal || JSON.parse(localStorage.orderDetailLocal).length == [] )
    {
        localStorage.orderDetailLocal = JSON.stringify([])
    }else{
        orderDetailArray = JSON.parse(localStorage.orderDetailLocal)
    }
}
createCheckOutArraryInLocal()
//add all cart product to checkoutarray
function addCartProductToCheckOutArray()
{
    var products = localStorage.getItem('cartArrayLocal')
    checkOutArray = JSON.parse(products)
    localStorage.checkOutArrayLocal = JSON.stringify(checkOutArray)
}addCartProductToCheckOutArray()

// show checkoutlist

function showCheckOutList()
{
    var checkOutProductsArrayLocal = localStorage.getItem('checkOutArrayLocal')
    var checkOutList = JSON.parse(checkOutProductsArrayLocal)

    var table = document.createElement('table')
    table.setAttribute("class","table")
    var thead = document.createElement('thead')
    thead.setAttribute('class',"table-dark")
    
    var trhead = document.createElement('tr')
    var th1 = document.createElement('th')
    th1.setAttribute('class', "text-center")
    th1.innerHTML = "Product Name"
    var th2 = document.createElement('th')
    th2.setAttribute('class', "text-center")
    th2.innerHTML = "Product Description"
    var th3 = document.createElement('th')
    th3.setAttribute('class', "text-center")
    th3.innerHTML = "Product Quantity"
    var th4 = document.createElement('th')
    th4.setAttribute('class', "text-center")
    th4.innerHTML = "Product Price"
    var th5 = document.createElement('th')
    th5.innerHTML = "Remove Product"
    trhead.appendChild(th1)
    trhead.appendChild(th2)
    trhead.appendChild(th3)
    trhead.appendChild(th4)
    trhead.appendChild(th5)
    thead.appendChild(trhead)
        table.appendChild(thead)
    for(index = 0; index <checkOutList.length; index++)
    {
        var tbody = document.createElement('tbody')
        tbody.setAttribute("id", "tableBody")  
    var tr = document.createElement('tr')
    var td1 = document.createElement('td')
    td1.setAttribute('class',"text-center font-weight-bold")
    td1.innerHTML = checkOutList[index].pName
    var td2 = document.createElement('td')
    td2.setAttribute('class',"text-center font-weight-bold")
    td2.innerHTML = checkOutList[index].pDes
    var td3 = document.createElement('td')
    td3.setAttribute('class',"text-center font-weight-bold")
    td3.innerHTML = checkOutList[index].inputQty
    var td4 = document.createElement('td')
    td4.setAttribute('class',"text-center font-weight-bold")
    td4.innerHTML = checkOutList[index].pPrice
    var td5 = document.createElement('td')
    td5.setAttribute('class',"center")
       var btnDelete = document.createElement('button')
       btnDelete.setAttribute('class',"btn btn-danger")
       btnDelete.setAttribute('id', checkOutList[index].pId)
       btnDelete.innerHTML = "Remove" 
    td5.appendChild(btnDelete)

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)
    tr.appendChild(td5)
    tbody.appendChild(tr)

    table.appendChild(tbody)
    divCheckOutList.appendChild(table)

//remove items from checkoutlist
btnDelete.addEventListener('click', function(event){
    var thisElementId = event.target.id
    var index = findIndexOfCheckOutArray( thisElementId)
    removeCheckOutProduct(index)
    location.reload()
    })
 } 
    calculateBill()
    billTable()
}showCheckOutList()
//find index of remove checkOutProducts
function findIndexOfCheckOutArray( id )
{
    var products = localStorage.getItem('checkOutArrayLocal')
    var checkOutProducts = JSON.parse(products)
    for(i = 0; i<checkOutProducts.length;i++)
    {
        if( checkOutProducts[i].pId == id)
            return i;
    }
}
//delete checkout product
function removeCheckOutProduct(index)
{
    var cartProducts = JSON.parse(localStorage.cartArrayLocal)
    cartProducts.splice(index, 1)
    localStorage.cartArrayLocal = JSON.stringify(  cartProducts )
}
//calculate bill
function calculateBill()
{
    var checkOutProductsArrayLocal = localStorage.getItem('checkOutArrayLocal')
    var checkOutList = JSON.parse(checkOutProductsArrayLocal)
    for( i=0; i < checkOutList.length; i++)
    {
        totalBill = totalBill + (checkOutList[i].pPrice)
    } 
    if( totalBill == 0)
    {
        paybtn.setAttribute('disabled','disabled')
        document.getElementById("countinuebtn").style.display = "block";
    }

}
//Bill table
function billTable()
{
    var table2 = document.createElement('table')
    table2.setAttribute('class','table')
    var tbody2 = document.createElement("tbody")
    tbody2.setAttribute('class', "thead-dark")
    var tr = document.createElement('tr')
    var th1 = document.createElement('th')
    th1.innerHTML = "Here is Your Total Payable Bill : "+totalBill
       tr.appendChild(th1)

       tbody2.appendChild(tr)
       table2.appendChild(tbody2) 
    divCheckOutList.appendChild(table2)   
}

//payBill
function payBill()
{
    //substract product qty
    substractProductQty()
    removeCheckOutTable()
    var heading = document.getElementById('heading')
    heading.innerHTML = "Congratulations ..."
    
    var h1 = document.createElement('h1')
    h1.setAttribute('calss', 'display-1 p-2 mt-4 text-danger')
    h1.innerHTML = "Your Order is Successfully Submitted . ."
    var h2 = document.createElement('h2')
    h2.setAttribute('calss', 'display-2 p-2 mt-4 ')
    h2.innerHTML = "You Pay : "+totalBill+" rs"

    divCheckOutList.appendChild(h1);
    divCheckOutList.appendChild(h2);
    totalBill = 0
    
    $('#paybtn').remove()
        document.getElementById("countinuebtn").style.display = "block";

            var checkoutproduct= localStorage.getItem('checkOutArrayLocal')
            var checkoutproductarray = JSON.parse(checkoutproduct)
            for(i=0;i<checkoutproductarray.length;i++)
            {
                var orderDetailObj = new Object()
                var today = new Date()
                var date = today.getDate() + '-' + (today.getMonth() + 1) + '- ' + today.getFullYear();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                orderDetailObj.date = date
                orderDetailObj.time = time
                orderDetailObj.uId = checkoutproductarray[i].uId
                orderDetailObj.uName = checkoutproductarray[i].uName
                orderDetailObj.uEmail = checkoutproductarray[i].uEmail
                orderDetailObj.pId = checkoutproductarray[i].pId
                orderDetailObj.pName = checkoutproductarray[i].pName
                orderDetailObj.inputQty = checkoutproductarray[i].inputQty
                orderDetailObj.pPrice = checkoutproductarray[i].pPrice / checkoutproductarray[i].inputQty
                
                orderDetailArray.push(orderDetailObj)
                localStorage.orderDetailLocal = JSON.stringify(orderDetailArray)
            }
        // else{
        //     var orderDetailObj = {}
        //     var checkoutproductarray = localStorage.getItem('checkOutArrayLocal')
        //     for(i=0;i<checkoutproductarray.length;i++)
        //     {
        //         orderDetailObj[i] = checkoutproductarray[i]
        //     }
        //     orderDetailArray.push(orderDetailObj)
        //     localStorage.orderDetailLocal = JSON.stringify(orderDetailArray)
        // }
        localStorage.checkOutArrayLocal = JSON.stringify([])
        localStorage.cartArrayLocal = JSON.stringify([])
}
//remove child of table
function removeCheckOutTable()
{
    var child = divCheckOutList.lastElementChild;  
    while (child) { 
        divCheckOutList.removeChild(child); 
        child = divCheckOutList.lastElementChild; 
    }
}

//substract product qty
function substractProductQty()
{
    var checkOutArrayLocal = localStorage.getItem('checkOutArrayLocal')
    var checkOutProducts = JSON.parse(checkOutArrayLocal);
    var mainProductArrayLocal = localStorage.getItem('productArray')
    var mainProduct = JSON.parse(mainProductArrayLocal)
    for(i=0;i<checkOutProducts.length;i++)
    {
        for(j=0;j<mainProduct.length;j++)
        {
            if(mainProduct[j].pId == checkOutProducts[i].pId)
            {
                mainProduct[j].pQty = mainProduct[j].pQty - checkOutProducts[i].inputQty
            }
        }
    }
    localStorage.productArray = JSON.stringify(mainProduct)
}
