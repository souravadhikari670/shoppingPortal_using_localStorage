var usersArray = []
function setUserArrayAndId() {
    if (!localStorage.userArrayLocal || JSON.parse(localStorage.userArrayLocal).length == []) {
        localStorage.userArrayLocal = JSON.stringify([])
        localStorage.setItem('userId', 1)
        localStorage.setItem('userIndex', 0)
    } else {
        usersArray = JSON.parse(localStorage.userArrayLocal)
        var userCount = localStorage.getItem('userId')
        var userIndexCount = localStorage.getItem('userIndex')
        localStorage.setItem('userId', ++userCount)
        localStorage.setItem('userIndex', ++userIndexCount)
    }
}
setUserArrayAndId()
var userId = localStorage.getItem('userId')
var userIndex = localStorage.getItem('userIndex')

var btnRegister = document.getElementById('btnRegister')
btnRegister.onclick = function(){
    var username = document.getElementById('username').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var rePassword = document.getElementById('rePassword').value
    if( username != '' && email != '' && password != '' && rePassword != '')
    {
        if( password === rePassword)
        {
            var userAddObj = new Object()
            userAddObj.uId = userId
            userAddObj.uName = username
            userAddObj.uEmail = email
            userAddObj.uPassword = password
            usersArray.push(userAddObj)
            addTolocalStorage( usersArray)
        }else{
            alert('password donot match please correct it..')
        }
    }else{
        alert('please fill all the fields')
    }
}
function addTolocalStorage( usersArray)
{
    localStorage.userArrayLocal = JSON.stringify(usersArray)
    localStorage.setItem('userIndex', userIndex++)
    localStorage.setItem('userId', userId++)
    alert('successfully register ')
}
