var divorderProductList = document.getElementById('divorderProductList')
// var checkOutArray = []
// var orderDetailArray = []
// var totalBill = 0
// var countinuebtn = document.getElementById("countinuebtn").style.display = "none";
// var paybtn = document.getElementById("paybtn")
// function createCheckOutArraryInLocal()
// {
//     if( !localStorage.checkOutArrayLocal || JSON.parse( localStorage.checkOutArrayLocal).length == [])
//     {
//         localStorage.checkOutArrayLocal = JSON.stringify([])
//     }
//     //order details......
//     if( !localStorage.orderDetailLocal || JSON.parse(localStorage.orderDetailLocal).length == [] )
//     {
//         localStorage.orderDetailLocal = JSON.stringify([])
//     }else{
//         orderDetailArray = JSON.parse(localStorage.orderDetailLocal)
//     }
// }
// createCheckOutArraryInLocal()
// //add all cart product to checkoutarray
// function addCartProductToCheckOutArray()
// {
//     var products = localStorage.getItem('cartArrayLocal')
//     checkOutArray = JSON.parse(products)
//     localStorage.checkOutArrayLocal = JSON.stringify(checkOutArray)
// }addCartProductToCheckOutArray()

showorderProductList()

function showorderProductList() {
    var orderProductsArrayLocal = localStorage.getItem('orderDetailLocal')
    var orderProductList = JSON.parse(orderProductsArrayLocal)
    var table = document.createElement('table')
    table.setAttribute("class", "table")
    var thead = document.createElement('thead')
    thead.setAttribute('class', "table-dark")

    var trhead = document.createElement('tr')
    var th1 = document.createElement('th')
    th1.setAttribute('class', "text-center")
    th1.innerHTML = "Order Date & Time"
    var th2 = document.createElement('th')
    th2.setAttribute('class', "text-center")
    th2.innerHTML = "Product Qty"
    var th3 = document.createElement('th')
    th3.setAttribute('class', "text-center")
    th3.innerHTML = "Product Name"
    var th4 = document.createElement('th')
    th4.setAttribute('class', "text-center")
    th4.innerHTML = "Product Price"
    var th5 = document.createElement('th')
    th5.setAttribute('class', "text-center")
    th5.innerHTML = "User Id"
    var th6 = document.createElement('th')
    th6.setAttribute('class', 'text-center')
    th6.innerHTML = "User Name"
    var th7 = document.createElement('th')
    th7.setAttribute('class', 'text-center')
    th7.innerHTML = "User Email"
    trhead.appendChild(th1)
    trhead.appendChild(th2)
    trhead.appendChild(th3)
    trhead.appendChild(th4)
    trhead.appendChild(th5)
    trhead.appendChild(th6)
    trhead.appendChild(th7)
    thead.appendChild(trhead)
    table.appendChild(thead)
    for (index = 0; index < orderProductList.length; index++) {
        var tbody = document.createElement('tbody')
        tbody.setAttribute("id", "tableBody")
        var tr = document.createElement('tr')
        var td1 = document.createElement('td')
        td1.setAttribute('class', "text-center font-weight-bold")
        td1.innerHTML = orderProductList[index].date + "  "+orderProductList[index].time
        var td2 = document.createElement('td')
        td2.setAttribute('class', "text-center font-weight-bold")
        td2.innerHTML = orderProductList[index].inputQty
        var td3 = document.createElement('td')
        td3.setAttribute('class', "text-center font-weight-bold")
        td3.innerHTML = orderProductList[index].pName
        var td4 = document.createElement('td')
        td4.setAttribute('class', "text-center font-weight-bold")
        td4.innerHTML = orderProductList[index].pPrice
        var td5 = document.createElement('td')
        td5.setAttribute('class', "text-center font-weight-bold")
        td5.innerHTML = orderProductList[index].uId
        var td6 = document.createElement('td')
        td6.setAttribute('class', "text-center font-weight-bold")
        td6.innerHTML = orderProductList[index].uName
        var td7 = document.createElement('td')
        td7.setAttribute('class', "text-center font-weight-bold")
        td7.innerHTML = orderProductList[index].uEmail

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        tbody.appendChild(tr)

        table.appendChild(tbody)
        divorderProductList.appendChild(table)
    }
}

// //remove items from orderProductList
// btnDelete.addEventListener('click', function(event){
//     var thisElementId = event.target.id
//     var index = findIndexOfCheckOutArray( thisElementId)
//     removeCheckOutProduct(index)
//     location.reload()
//     })
//  } 
//     calculateBill()
//     billTable()
// }showorderProductList()
// //find index of remove checkOutProducts
// function findIndexOfCheckOutArray( id )
// {
//     var products = localStorage.getItem('checkOutArrayLocal')
//     var checkOutProducts = JSON.parse(products)
//     for(i = 0; i<checkOutProducts.length;i++)
//     {
//         if( checkOutProducts[i].pId == id)
//             return i;
//     }
// }
// //delete checkout product
// function removeCheckOutProduct(index)
// {
//     var cartProducts = JSON.parse(localStorage.cartArrayLocal)
//     cartProducts.splice(index, 1)
//     localStorage.cartArrayLocal = JSON.stringify(  cartProducts )
// }
// //calculate bill
// function calculateBill()
// {
//     var checkOutProductsArrayLocal = localStorage.getItem('checkOutArrayLocal')
//     var orderProductList = JSON.parse(checkOutProductsArrayLocal)
//     for( i=0; i < orderProductList.length; i++)
//     {
//         totalBill = totalBill + (orderProductList[i].pPrice)
//     } 
//     if( totalBill == 0)
//     {
//         paybtn.setAttribute('disabled','disabled')
//         document.getElementById("countinuebtn").style.display = "block";
//     }

// }
// //Bill table
// function billTable()
// {
//     var table2 = document.createElement('table')
//     table2.setAttribute('class','table')
//     var tbody2 = document.createElement("tbody")
//     tbody2.setAttribute('class', "thead-dark")
//     var tr = document.createElement('tr')
//     var th1 = document.createElement('th')
//     th1.innerHTML = "Here is Your Total Payable Bill : "+totalBill
//        tr.appendChild(th1)

//        tbody2.appendChild(tr)
//        table2.appendChild(tbody2) 
//     divorderProductList.appendChild(table2)   
// }